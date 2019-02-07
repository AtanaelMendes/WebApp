export default class Cultura {
  id = null;
  nome = null;
  default_estimativa = null;
  image_id = null;
  default_unidade_medida_id = null;
  default_unidade_area_id = null;
  default_unidade_preco_id = null;
  default_unidade_pesagem_id = null;
  created_at = null;
  updated_at = null;
  deleted_at = null;


  constructor(cultura) {
    this.id = cultura.id;
    this.nome = cultura.nome;
    this.default_estimativa = cultura.default_estimativa;
    this.image_id = cultura.image_id;
    this.default_unidade_medida_id = cultura.default_unidade_medida_id;
    this.default_unidade_area_id = cultura.default_unidade_area_id;
    this.default_unidade_preco_id = cultura.default_unidade_preco_id;
    this.default_unidade_pesagem_id = cultura.default_unidade_pesagem_id;
    this.created_at = cultura.created_at;
    this.updated_at = cultura.updated_at;
    this.deleted_at = cultura.deleted_at;
  }
}
