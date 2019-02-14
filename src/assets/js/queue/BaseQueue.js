import QueueItem from "../dbModel/QueueItem";
import RequestQueueRepository from "../repository/RequestQueueRepository";

export default class BaseQueue{
  #grouper = null;
  #requestQueueRepository = null;

  constructor(grouper) {
    this.grouper = grouper;
    this.requestQueueRepository = new RequestQueueRepository();
  }

  add(request){
    let queueItem = new QueueItem(this.grouper, request.url, request.method, request.data, request.headers);

    this.requestQueueRepository.save(queueItem).then(response => {
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
}

function registerEvent(){
  navigator.serviceWorker.ready.then(function(swRegistration) {
    return swRegistration.sync.register('queueSync');
  });
}
