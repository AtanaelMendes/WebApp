import BaseItem from "../BaseItem";

export default class EntregaNoArmazemListItem extends BaseItem{
  id = null;
  caminhao = {
    image_file_name: null,
    nome: null,
    placa: null,
  };
  armazem = {
    nome: null,
    localizacao: null,
  };
  motorista = {
    nome: null,
    image_file_name: null,
  };
  envio_armazem = null;



  constructor(entrega) {
    super();
    if(entrega){
      this.id = entrega.id;
      this.caminhao.image_file_name = entrega.caminhao.image_file_name;
      this.caminhao.nome = entrega.caminhao.nome;
      this.caminhao.placa = entrega.caminhao.placa;
      this.armazem.nome = entrega.armazem.nome;
      this.armazem.localizacao = entrega.armazem.localizacao;
      this.motorista.nome = entrega.motorista.nome;
      this.motorista.image_file_name = entrega.motorista.image_file_name;
      this.envio_armazem = entrega.envio_armazem;
    }
  }
}
