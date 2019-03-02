import QueueItem from "../dbModel/QueueItem";
import RequestQueueRepository from "../repository/RequestQueueRepository";
import QueueApiIdRelationsRepository from "../repository/QueueApiIdRelationsRepository";

export default class BaseQueue{
  #grouper = null;
  #requestQueueRepository = null;
  #queueApiIdRelationsRepository = null;

  constructor(grouper) {
    this.grouper = grouper;
    this.requestQueueRepository = new RequestQueueRepository();
    this.queueApiIdRelationsRepository = new QueueApiIdRelationsRepository();
  }

  async add(request, type){
    if(request.url.match("(queue::([0-9]*))")) {
      request.url = await this.fixUrl(request.url);
    }

    let queueItem = new QueueItem(this.grouper, type, request.url, request.method, request.data, request.headers);

    this.requestQueueRepository.save(queueItem).then(response => {
      if(request.method === "post") {
        this.queueApiIdRelationsRepository.save(response, null);
      }
      registerEvent();
      return response;
    })
  };

  get(id){
    return this.requestQueueRepository.getById(id)
  }

  getByUrlAndMethod(url, method){
    return this.requestQueueRepository.getByGrouperAndUrlAndMethod(this.grouper, url, method);
  }

  listByType(type){
    return this.requestQueueRepository.listByType(type);
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

}

function registerEvent(){
  navigator.serviceWorker.ready.then(function(swRegistration) {
    return swRegistration.sync.register('queueSync');
  });
}
