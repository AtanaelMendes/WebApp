import BaseQueue from "./BaseQueue";

export default class EntregasQueue extends BaseQueue{
  add(request){
    return super.add(request, 'entregas')
  };
  remove(){

  }
}
