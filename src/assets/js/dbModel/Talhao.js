export default class Talhao {
  id = null;
  area_id = null;
  nome = null;
  tamanho = null;
  unidade_area_id = null;
  image_id = null;
  created_at = null;
  updated_at = null;
  deleted_at = null;


  constructor(talhao) {
    this.id = talhao.id;
    this.area_id = talhao.area_id;
    this.nome = talhao.nome;
    this.tamanho = talhao.tamanho;
    this.unidade_area_id = talhao.unidade_area_id;
    this.image_id = talhao.image_id;
    this.created_at = talhao.created_at;
    this.updated_at = talhao.updated_at;
    this.deleted_at = talhao.deleted_at;
  }
}
