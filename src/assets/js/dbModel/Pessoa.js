export default class Pessoa {
  id = null;
  grupo_economico_id = null;
  nome = null;
  cpf = null;
  cnpj = null;
  inscricao_estadual = null;
  inscricao_municipal = null;
  razao_social = null;
  nome_fantasia = null;
  created_at = null;
  updated_at = null;
  deleted_at = null;

  constructor(pessoa) {
    this.id = pessoa.id;
    this.grupo_economico_id = pessoa.grupo_economico_id;
    this.nome = pessoa.nome;
    this.cpf = pessoa.cpf;
    this.cnpj = pessoa.cnpj;
    this.inscricao_estadual = pessoa.inscricao_estadual;
    this.inscricao_municipal = pessoa.inscricao_municipal;
    this.razao_social = pessoa.razao_social;
    this.nome_fantasia = pessoa.nome_fantasia;
    this.created_at = pessoa.created_at;
    this.updated_at = pessoa.updated_at;
    this.deleted_at = pessoa.deleted_at;
  }
}
