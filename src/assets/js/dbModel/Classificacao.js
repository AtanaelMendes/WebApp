export default class Classificacao {
  id = null;
  nome = null;
  created_at = null;
  updated_at = null;
  deleted_at = null;


  constructor(classificacao) {
    this.id = classificacao.id;
    this.nome = classificacao.nome;
    this.created_at = classificacao.created_at;
    this.updated_at = classificacao.updated_at;
    this.deleted_at = classificacao.deleted_at;
  }
}
