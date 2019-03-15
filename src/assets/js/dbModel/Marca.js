export default class Marca {
  id = null;
  nome = null;
  image_id = null;
  created_at = null;
  updated_at = null;
  deleted_at = null;

  constructor(marca) {
    this.id = marca.id;
    this.nome = marca.nome;
    this.image_id = marca.image_id;
    this.created_at = marca.created_at;
    this.updated_at = marca.updated_at;
    this.deleted_at = marca.deleted_at;
  }
}
