export default class{

  cultura_id = null;
  view_unidade_medida_id = null;
  view_unidade_area_id = null;

  getValues(){
    return {
      cultura_id: this.cultura_id,
      view_unidade_medida_id: this.view_unidade_medida_id,
      view_unidade_area_id: this.view_unidade_area_id
    }
  }
}
