export default class Unidade {
  id = null;
  sigla = null;
  nome = null;
  plural = null;
  descricao = null;
  is_area = null;
  is_medida = null;
  created_at = null;
  updated_at = null;
  deleted_at = null;


  constructor(unidade) {
    this.id = unidade.id;
    this.sigla = unidade.sigla;
    this.nome = unidade.nome;
    this.plural = unidade.plural;
    this.descricao = unidade.descricao;
    this.is_area = unidade.is_area;
    this.is_medida = unidade.is_medida;
    this.created_at = unidade.created_at;
    this.updated_at = unidade.updated_at;
    this.deleted_at = unidade.deleted_at;
  }
}
