import BaseItem from "../BaseItem";

export default class EntregaEntregueListItem extends BaseItem{
  id = null;
  caminhao = {
    image_file_name: null,
    placa: null,
  };
  armazem = null;
  motorista = null;
  entregue = null;
  peso = null;
  safra = null;



  constructor(entrega) {
    super();
    if(entrega){
      this.id = entrega.id;
      this.caminhao.image_file_name = entrega.caminhao.image_file_name;
      this.caminhao.placa = entrega.caminhao.placa;
      this.armazem = entrega.armazem;
      this.motorista = entrega.motorista;
      this.entregue = entrega.entregue;
      this.peso = entrega.peso;
      this.safra = entrega.safra;
    }
  }
}
