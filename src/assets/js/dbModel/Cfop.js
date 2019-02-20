export default class Cfop{
  id = null;
  numero = null;
  descricao = null;
  is_saida = null;
  is_nfe = null;
  is_comunicacao = null;
  is_transporte = null;
  is_devolucao = null;
  created_at = null;
  updated_at = null;
  deleted_at = null;

  constructor(cfop) {
    this.id = cfop.id;
    this.numero = cfop.numero;
    this.descricao = cfop.descricao;
    this.is_saida = cfop.is_saida;
    this.is_nfe = cfop.is_nfe;
    this.is_comunicacao = cfop.is_comunicacao;
    this.is_transporte = cfop.is_transporte;
    this.is_devolucao = cfop.is_devolucao;
    this.created_at = cfop.created_at;
    this.updated_at = cfop.updated_at;
    this.deleted_at = cfop.deleted_at;
  }
}
