import BaseQueue from "./BaseQueue";

export default class EntregasQueue extends BaseQueue{

  static NOVA_ENTREGA = 'nova_entrega';
  static NOVO_TALHAO = 'novo_talhao';

  constructor() {
    super('entregas');
  }

  getById(id){
    return super.get(id);
  }

  getByUrlAndMethod(url, method) {
    return super.getByUrlAndMethod(url, method);
  }

  add(request, type){
    return super.add(request, type)
  };

  remove(){

  }
}
