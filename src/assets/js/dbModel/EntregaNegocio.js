export default class EntregaNegocio {
  id = null;
  negocio_cultura_id = null;
  entrega_id = null;
  quantidade = null;
  created_at = null;
  updated_at = null;
  deleted_at = null;

  constructor(entregaNegocio) {
    this.id = entregaNegocio.id;
    this.negocio_cultura_id = entregaNegocio.negocio_cultura_id;
    this.entrega_id = entregaNegocio.entrega_id;
    this.quantidade = entregaNegocio.quantidade;
    this.created_at = entregaNegocio.created_at;
    this.updated_at = entregaNegocio.updated_at;
    this.deleted_at = entregaNegocio.deleted_at;
  }
}

