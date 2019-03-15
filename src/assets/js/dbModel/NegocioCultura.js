export default class NegocioCultura {
  id = null;
  negocio_id = null;
  safra_cultura_id = null;
  is_pagar = null;
  quantidade = null;
  unidade_medida_id = null;
  prazo_entrega_inicial = null;
  prazo_entrega_final = null;
  observacoes = null;
  created_at = null;
  updated_at = null;
  deleted_at = null;

  constructor(negocioCultura) {
    this.id = negocioCultura.id;
    this.negocio_id = negocioCultura.negocio_id;
    this.safra_cultura_id = negocioCultura.safra_cultura_id;
    this.is_pagar = negocioCultura.is_pagar;
    this.quantidade = negocioCultura.quantidade;
    this.unidade_medida_id = negocioCultura.unidade_medida_id;
    this.prazo_entrega_inicial = negocioCultura.prazo_entrega_inicial;
    this.prazo_entrega_final = negocioCultura.prazo_entrega_final;
    this.observacoes = negocioCultura.observacoes;
    this.created_at = negocioCultura.created_at;
    this.updated_at = negocioCultura.updated_at;
    this.deleted_at = negocioCultura.deleted_at;
  }
}
