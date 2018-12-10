export default class{

  id = null;
  estimativa = null;
  estimativa_unidade_medida_id = null;
  tamanho = null;
  //cultivar_id = null;
  //unidade = null;

  constructor(talhao){
      if(talhao !== undefined || talhao != null){
        this.id = talhao.id;
        this.tamanho = parseFloat(talhao.tamanho);
        this.estimativa = 10;
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
