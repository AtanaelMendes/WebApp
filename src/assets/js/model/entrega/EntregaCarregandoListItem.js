import BaseItem from "../BaseItem";

export default class EntregaCarregandoListItem extends BaseItem{
  id = null;
  caminhao = {
    image_file_name: null,
    nome: null,
    placa: null,
  };
  inicio_carregamento = null;
  safra_culturas_talhoes = []; //percentual, safra(nome/inicio/fim), area.nome, talhao


  constructor(entrega) {
    super();
    if(entrega){
      this.id = entrega.id;
      this.caminhao.image_file_name = entrega.caminhao.image_file_name;
      this.caminhao.nome = entrega.caminhao.nome;
      this.caminhao.placa = entrega.caminhao.placa;
      this.inicio_carregamento = entrega.inicio_carregamento;
      this.safra_culturas_talhoes = entrega.safra_culturas_talhoes;
    }
  }
}
