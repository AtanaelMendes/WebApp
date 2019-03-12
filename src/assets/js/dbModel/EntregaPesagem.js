export default class EntregaPesagem {
  id = null;
  entrega_id = null;
  peso_bruto_total = null;
  peso_tara = null;
  peso_bruto_produto = null;
  peso_desconto = null;
  peso_liquido = null;
  unidade_medida_id = null;
  numero_ticket = null;
  emissao = null;
  created_at = null;
  updated_at = null;
  deleted_at = null;


  constructor(entregaPesagem) {
    this.id = entregaPesagem.id;
    this.entrega_id = entregaPesagem.entrega_id;
    this.peso_bruto_total = entregaPesagem.peso_bruto_total;
    this.peso_tara = entregaPesagem.peso_tara;
    this.peso_bruto_produto = entregaPesagem.peso_bruto_produto;
    this.peso_desconto = entregaPesagem.peso_desconto;
    this.peso_liquido = entregaPesagem.peso_liquido;
    this.unidade_medida_id = entregaPesagem.unidade_medida_id;
    this.numero_ticket = entregaPesagem.numero_ticket;
    this.emissao = entregaPesagem.emissao;
    this.created_at = entregaPesagem.created_at;
    this.updated_at = entregaPesagem.updated_at;
    this.deleted_at = entregaPesagem.deleted_at;
  }
}

