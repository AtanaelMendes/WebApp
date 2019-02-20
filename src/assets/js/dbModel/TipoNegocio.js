export default class TipoNegocio {
  id = null;
  nome = null;
  created_at = null;
  updated_at = null;
  deleted_at = null;


  constructor(tipo_negocio) {
    this.id = tipo_negocio.id;
    this.nome = tipo_negocio.nome;
    this.created_at = tipo_negocio.created_at;
    this.updated_at = tipo_negocio.updated_at;
    this.deleted_at = tipo_negocio.deleted_at;
  }
}
