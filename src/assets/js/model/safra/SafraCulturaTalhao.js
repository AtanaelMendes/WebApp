export default class{

  id = null;
  estimativa = null;
  estimativa_unidade_medida_id = null;
  tamanho = null;
  nome = null;
  unidade = {
    nome: null,
    sigla: null,
    plural: null
  };

  constructor(talhao){
      if(talhao !== undefined || talhao != null){
        this.id = talhao.id;
        this.tamanho = parseFloat(talhao.tamanho);
        this.estimativa = 10;
        this.nome = talhao.nome;
        this.unidade.nome = talhao.unidade.nome;
        this.unidade.plural = talhao.unidade.plural;
        this.unidade.sigla = talhao.unidade.sigla;
      }
    }

  getValues(){
    return {
      id: this.id,
      estimativa: this.estimativa,
      estimativa_unidade_medida_id: this.estimativa_unidade_medida_id,
      tamanho: this.tamanho
    }
  }
}
