import BaseQueue from "./BaseQueue";
export default class MotoristaQueue extends BaseQueue{

  add(request){
    return super.add(request, 'motoristas')
  };

  remove(){

  }
}
