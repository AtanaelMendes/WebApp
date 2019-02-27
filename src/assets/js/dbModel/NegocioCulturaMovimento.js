export default class NegocioCulturaMovimento {
  id = null;
  negocio_cultura_movimento_tipo_id = null;
  negocio_cultura_id = null;
  negocio_cultura_transferencia_id = null;
  entrega_id = null;
  quantidade = null;
  created_at = null;
  updated_at = null;
  deleted_at = null;

  constructor(negocioCulturaMovimento) {
    this.id = negocioCulturaMovimento.id;
    this.negocio_cultura_movimento_tipo_id = negocioCulturaMovimento.negocio_cultura_movimento_tipo_id;
    this.negocio_cultura_id = negocioCulturaMovimento.negocio_cultura_id;
    this.negocio_cultura_transferencia_id = negocioCulturaMovimento.negocio_cultura_transferencia_id;
    this.entrega_id = negocioCulturaMovimento.entrega_id;
    this.quantidade = negocioCulturaMovimento.quantidade;
    this.created_at = negocioCulturaMovimento.created_at;
    this.updated_at = negocioCulturaMovimento.updated_at;
    this.deleted_at = negocioCulturaMovimento.deleted_at;
  }
}
