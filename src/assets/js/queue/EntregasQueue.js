import BaseQueue from "./BaseQueue";

export default class EntregasQueue extends BaseQueue{

  constructor() {
    super('entregas');
  }

  getById(id){
    return super.get(id);
  }

  getByUrlAndMethod(url, method) {
    return super.getByUrlAndMethod(url, method);
  }

  add(request){
    return super.add(request)
  };

  remove(){

  }
}
