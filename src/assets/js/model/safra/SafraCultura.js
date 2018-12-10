import { helpers} from 'vuelidate/lib/validators'
export default class{

  cultura_id = null;
  culturaNome = null;
  talhoes = [];
  view_unidade_medida_id = null;
  view_unidade_area_id = null;


  // constructor(culturas){
  //   if(culturas !== undefined || culturas != null){
  //     this.culturas.value = safra.culturas.id;
  //   }
  // }


  addTalhao(safraCulturaTalhao){
    this.talhoes.push(safraCulturaTalhao);
  }

  removeTalhao(index){
    this.talhoes.splice(index, 1);
  }

  existsTalhaoById(id){
    return this.talhoes.map(talhao => talhao.id).indexOf(id);
  }

  getTalhaoById(id){
    return this.talhoes[this.existsTalhaoById(id)]
  }

  getNotEmptyTalhoes(){
    return this.talhoes.filter(function(talhao){
      return talhao.tamanho > 0;
    })
  }

  getValues(){
    return {
      cultura_id: this.cultura_id,
      talhoes: this.getNotEmptyTalhoes(),
      view_unidade_medida_id: this.view_unidade_medida_id,
      view_unidade_area_id: this.view_unidade_area_id
    }
  }
}
