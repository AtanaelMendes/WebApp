export default class{

  id = null;
  estimativa = null;
  estimativa_unidade_medida_id = null;
  tamanho = null;
  cultivar_id = null;

  constructor(talhao){
      if(talhao !== undefined || talhao != null){
        this.id = talhao.id;
        this.tamanho = parseFloat(talhao.tamanho)
      }
    }

  getValues(){
    return this
  }
}
