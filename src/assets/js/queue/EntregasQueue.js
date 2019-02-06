import requestQueueRepository from 'assets/js/repository/RequestQueueRepository'
import QueueItem from "../model/QueueItem";
class EntregasQueue{
  add(request){
    let queueItem = new QueueItem(request.url, 'entregas', request);

    return requestQueueRepository.save(queueItem)
  };
  remove(){

  }
}
