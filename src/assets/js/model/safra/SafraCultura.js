export default class{

  cultura_id = null;
  unidade_medida_pesagem_id = null;
  unidade_medida_preco_id = null;
  unidade_medida_area_id = null;

  getValues(){
    return {
      cultura_id: this.cultura_id,
      unidade_medida_pesagem_id: this.unidade_medida_pesagem_id,
      unidade_medida_preco_id: this.unidade_medida_preco_id,
      unidade_medida_area_id: this.unidade_medida_area_id
    }
  }
}
