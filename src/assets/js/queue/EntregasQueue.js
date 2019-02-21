import BaseQueue from "./BaseQueue";

export default class EntregasQueue extends BaseQueue{

  static NOVA_ENTREGA = 'nova_entrega';
  static ENVIAR_PARA_ARMAZEM = 'enviar_para_armazem';
  static INFORMAR_PESAGEM = 'informar_pesagem';
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
