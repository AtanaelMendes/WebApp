export default class Area{
  id = null;
  localizacao_id = null;
  nome = null;
  image_id = null;
  created_at = null;
  updated_at = null;
  deleted_at = null;


  constructor(area) {
    this.id = area.id;
    this.localizacao_id = area.localizacao_id;
    this.nome = area.nome;
    this.image_id = area.image_id;
    this.created_at = area.created_at;
    this.updated_at = area.updated_at;
    this.deleted_at = area.deleted_at;
  }
}
