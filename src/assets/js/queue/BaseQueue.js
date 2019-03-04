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

}

function registerEvent(){
  navigator.serviceWorker.ready.then(function(swRegistration) {
    return swRegistration.sync.register('queueSync');
  });
}
