export default class ClassificacaoListItem{
  id = null;
  nome = null;
  deleted_at = null;


  constructor(classificacao) {
    if(classificacao) {
      this.id = classificacao.id;
      this.nome = classificacao.nome;
      this.deleted_at = classificacao.deleted_at;
    }
  }
}
