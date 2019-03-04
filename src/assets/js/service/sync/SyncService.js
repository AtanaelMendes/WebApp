import Vue from 'vue'
import RequestQueueRepository from "../../repository/RequestQueueRepository";
import QueueApiIdRelationsRepository from "../../repository/QueueApiIdRelationsRepository";

let requestQueueRepository = null;
let queueApiIdRelationsRepository = null;

export default class SyncService{

  constructor() {
    requestQueueRepository = new RequestQueueRepository();
    queueApiIdRelationsRepository = new QueueApiIdRelationsRepository();
  }

  async doSync(){
    console.log('doSync');
    let queueItens = await requestQueueRepository.getAll().toArray();
    await processRequests(queueItens);

    return Promise.resolve();
  }

  getInitialContent(produtorId){
    /*console.log('getInitialContent: ' + produtorId)
    let urls = [
      'produtor/'+produtorId+'/entrega/filter_option',
      'produtor/'+produtorId+'/safra/safra_cultura',
      'produtor/'+produtorId+'/caminhao/free',
      'safra_cultura/1/safra_cultura_talhao?type=full',
    ];

    urls.forEach(url => {
      Vue.prototype.$axios.get(url)
    })*/
  }
}

async function processRequests(itens){
  itens = await fixItensUrls(itens);

  for(let item of itens){
    await sendRequest(item).then(async response => {
      if(response.status === 200 || response.status === 201) {
        await queueApiIdRelationsRepository.save(item.id, response.data.id);
        await requestQueueRepository.deleteById(item.id);
      }
    }).catch(error => {
      //TODO: Salvar o request falho em algum lugar
    });
  }

  await queueApiIdRelationsRepository.deleteAll();
}

async function fixItensUrls(itens){
  for(let item of itens){
    if(item.request.url.match("(queue::([0-9]*))")) {
      item.request.url = await fixUrl(item.request.url);
    }
  }
  return itens;
}

async function fixUrl(url) {
  if(url.match("(queue::([0-9]*))")) {
    let parentQueueId = await getParentId(url);
    let index = url.match("(queue::([0-9]*))").index;

    return url.substring(0, index) + parentQueueId + url.substring(index + url.match("(queue::([0-9]*))")[0].length, url.length);
  }else{
    return url;
  }
}

async function getParentId(url){
  let id = parseInt(url.match("(queue::([0-9]*))")[2]);
  let queueItem = await requestQueueRepository.getById(id);

  if(queueItem.request.url.match("(queue::([0-9]*))")){
    return await getParentId(queueItem.request.url);
  }else{
    return url.match("(queue::([0-9]*))")[0];
  }
}

async function parseUrl(url){
  let id = parseInt(url.match("(queue::([0-9]*))")[2]);
  let index = url.match("(queue::([0-9]*))").index;
  let relationItem = await queueApiIdRelationsRepository.getByLocalId(id);
  let newUrl = url.substring(0, index) + relationItem.api_id + url.substring(index + url.match("(queue::([0-9]*))")[0].length, url.length);
  return newUrl;
}

async function sendRequest(queueItem){
  if(queueItem.request.url.match("(queue::([0-9]*))")){
    queueItem.request.url = await parseUrl(queueItem.request.url);
  }

  return Vue.prototype.$axios({
    method: queueItem.request.method,
    url: queueItem.request.url,
    data: queueItem.request.body,
  })
}
