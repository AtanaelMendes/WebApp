import Vue from 'vue'
import RequestQueueRepository from "../../repository/RequestQueueRepository";
import QueueApiIdRelationsRepository from "../../repository/QueueApiIdRelationsRepository";
import ResourceService from "./ResourceService";
import ListService from "./ListService";

export default class SyncService{
  static isSynching = false;
  #produtorId;
  #requestQueueRepository;
  #queueApiIdRelationsRepository;
  #resourceService;
  #listService;

  constructor(produtorId) {
    this.produtorId = produtorId;
    this.requestQueueRepository = new RequestQueueRepository();
    this.queueApiIdRelationsRepository = new QueueApiIdRelationsRepository();
    this.resourceService = new ResourceService(produtorId);
    this.listService = new ListService(produtorId);
  }

  async doSync(){
    if(SyncService.isSynching){
      return Promise.reject();
    }

    SyncService.isSynching = true;
    let queueItens = await this.requestQueueRepository.getAll().toArray();

    //console.log('start processRequests');
    await this.processRequests(queueItens);
    //console.log('end processRequests');
    //console.log('start resourceService')
    await this.resourceService.download();
    //console.log('end resourceService')
    //console.log('start listService')
    await this.listService.download();
    //console.log('end listService')

    SyncService.isSynching = false;
    return Promise.resolve();
  }

  //TODO: Colocar todos os métodos abaixos como privado quando atualizar o Babel
  async processRequests(itens){
    itens = await this.fixItensUrls(itens);

    for(let item of itens){
      await this.sendRequest(item).then(async response => {
        if(response.status === 200 || response.status === 201) {
          await this.queueApiIdRelationsRepository.save(item.id, response.data.id);
          await this.requestQueueRepository.deleteById(item.id);
        }
      }).catch(error => {
        //TODO: Salvar o request falho em algum lugar
      });
    }

    await this.queueApiIdRelationsRepository.deleteAll();
  }

  async fixItensUrls(itens){
    for(let item of itens){
      if(item.request.url.match("(queue::([0-9]*))")) {
        item.request.url = await this.fixUrl(item.request.url);
      }
    }
    return itens;
  }

  async fixUrl(url) {
    if(url.match("(queue::([0-9]*))")) {
      let parentQueueId = await this.getParentId(url);
      let index = url.match("(queue::([0-9]*))").index;

      return url.substring(0, index) + parentQueueId + url.substring(index + url.match("(queue::([0-9]*))")[0].length, url.length);
    }else{
      return url;
    }
  }

  async getParentId(url){
    let id = parseInt(url.match("(queue::([0-9]*))")[2]);
    let queueItem = await this.requestQueueRepository.getById(id);

    if(queueItem.request.url.match("(queue::([0-9]*))")){
      return await this.getParentId(queueItem.request.url);
    }else{
      return url.match("(queue::([0-9]*))")[0];
    }
  }

  async parseUrl(url){
    let id = parseInt(url.match("(queue::([0-9]*))")[2]);
    let index = url.match("(queue::([0-9]*))").index;
    let relationItem = await this.queueApiIdRelationsRepository.getByLocalId(id);
    let newUrl = url.substring(0, index) + relationItem.api_id + url.substring(index + url.match("(queue::([0-9]*))")[0].length, url.length);
    return newUrl;
  }

  async sendRequest(queueItem){
    if(queueItem.request.url.match("(queue::([0-9]*))")){
      queueItem.request.url = await this.parseUrl(queueItem.request.url);
    }

    return Vue.prototype.$axios({
      method: queueItem.request.method,
      url: queueItem.request.url,
      data: queueItem.request.body,
    })
  }
}
