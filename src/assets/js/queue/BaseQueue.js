import QueueItem from "../dbModel/QueueItem";
import RequestQueueRepository from 'assets/js/repository/RequestQueueRepository'

export default class BaseQueue{
  add(request, grouper){
    let queueItem = new QueueItem(grouper, request.url, request.method, request.data, request.headers);

    new RequestQueueRepository().save(queueItem).then(response => {
      registerEvent();
      return response;
    })
  };
}

function registerEvent(){
  navigator.serviceWorker.ready.then(function(swRegistration) {
    return swRegistration.sync.register('queueSync');
  });
}
