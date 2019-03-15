export default class Armazem{
  id = null;
  localizacao_id = null;
  nome = null;
  created_at = null;
  updated_at = null;
  deleted_at = null;


  constructor(armazem) {
    this.id = armazem.id;
    this.localizacao_id = armazem.localizacao_id;
    this.nome = armazem.nome;
    this.created_at = armazem.created_at;
    this.updated_at = armazem.updated_at;
    this.deleted_at = armazem.deleted_at;
  }
}
