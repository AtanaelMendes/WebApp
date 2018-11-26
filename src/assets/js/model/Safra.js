import { helpers} from 'vuelidate/lib/validators'

export default class{
  inicio = {
    value: null,
    errorMessage: null
  };
  fim = {
    value: null,
    errorMessage: null
  };
  area = {
    value: null,
    errorMessage: null
  };
  talhao = {
    value: null,
    errorMessage: null
  };
  culturas = [];

  constructor(){

  }

  addCultura(cultura){
    this.culturas.push(cultura);
  };
  editCultura(cultura, index){
    this.culturas[index] = cultura;
  };
  removeCultura(index){
    this.culturas.splice(index, 1);
  };

  isValid(){
    let hasError = false;
    if(!helpers.req(this.inicio.value)){
      this.inicio.errorMessage = "Digite o ano de inicio da safra.";
      hasError = true;
    }else if(helpers.len(this.inicio.value) < 4){
      this.inicio.errorMessage = "O formato do ano esta inválido.";
      hasError = true;
    }

    if(!helpers.req(this.fim.value)){
      this.fim.errorMessage = "Digite o ano de fim da safra.";
      hasError = true;
    }else if(helpers.len(this.fim.value) < 4){
      this.fim.errorMessage = "O formato do ano esta inválido.";
      hasError = true;
    }

    if (!helpers.req(this.area.value)) {
      this.area.errorMessage = "Informe uma área";
      hasError = true;
    }

    if (!helpers.req(this.talhao.value)) {
      this.talhao.errorMessage = "Informe um talhão";
      hasError = true;
    }
    return !hasError;
  };

  getValues(){
    return{
      ano_inicio: this.inicio.value,
      ano_fim: this.fim.value,
      area_id: this.area.value,
      talhao_id: this.talhao.value.id,
      culturas: this.parseCulturas(this.culturas)

    }
  }

  parseCulturas(culturas){
    console.log(culturas);
    let culturasParsed = [];
    for(let cultura of culturas){
      culturasParsed.push(cultura.getValues())
    }

    return culturasParsed;
  }
}
