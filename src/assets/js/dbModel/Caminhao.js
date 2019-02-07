export default class Caminhao{
  id = null;
  nome = null;
  placa = null;
  tara = null;
  pbt = null;
  unidade_medida_id = null;
  antt = null;
  image_id = null;
  pessoa_id = null;
  estimativa_carga = null;
  created_at = null;
  updated_at = null;
  deleted_at = null;

  constructor(caminhao) {
    this.id = caminhao.id;
    this.nome = caminhao.nome;
    this.placa = caminhao.placa;
    this.tara = caminhao.tara;
    this.pbt = caminhao.pbt;
    this.unidade_medida_id = caminhao.unidade_medida_id;
    this.antt = caminhao.antt;
    this.image_id = caminhao.image_id;
    this.pessoa_id = caminhao.pessoa_id;
    this.estimativa_carga = caminhao.estimativa_carga;
    this.created_at = caminhao.created_at;
    this.updated_at = caminhao.updated_at;
    this.deleted_at = caminhao.deleted_at;
  }
}
