export default class Negocio {
  id = null;
  pessoa_id = null;
  tipo_negocio_id = null;
  numero_pedido = null;
  numero_contrato = null;
  observacoes = null;
  emissao = null;
  created_at = null;
  updated_at = null;
  deleted_at = null;


  constructor(negocio) {
    this.id = negocio.id;
    this.pessoa_id = negocio.pessoa_id;
    this.tipo_negocio_id = negocio.tipo_negocio_id;
    this.numero_pedido = negocio.numero_pedido;
    this.numero_contrato = negocio.numero_contrato;
    this.observacoes = negocio.observacoes;
    this.emissao = negocio.emissao;
    this.created_at = negocio.created_at;
    this.updated_at = negocio.updated_at;
    this.deleted_at = negocio.deleted_at;
  }
}
