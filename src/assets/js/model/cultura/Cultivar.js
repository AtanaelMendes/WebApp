import { helpers} from 'vuelidate/lib/validators'
export default class{
  culturaId = null;
  marcaId = null;
  nome = {
    value: null,
    errorMessage: null
  };
  ciclo = {
    value: null,
    errorMessage: null
  };
  cicloDias = {
    value: null,
    errorMessage: null
  };
  isConvencional = {
    value: true,
    errorMessage: null
  };
  isRoundupReady = {
    value: false,
    errorMessage: null
  };
  isInox = {
    value: false,
    errorMessage: null
  };
  isIntacta = {
    value: false,
    errorMessage: null
  };
  observacoes = {
    value: null,
    errorMessage: null
  };
  constructor(cultivar){
    if(cultivar !== undefined || cultivar != null){
      this.culturaId = cultivar.culturaId;
      this.marcaId = cultivar.marcaId;
      this.nome.value = cultivar.nome.value;
      this.ciclo.value = cultivar.ciclo.value;
      this.cicloDias.value = cultivar.cicloDias.value;
      this.isConvencional.value = cultivar.isConvencional.value;
      this.isRoundupReady.value = cultivar.isRoundupReady.value;
      this.isInox.value = cultivar.isInox.value;
      this.isIntacta.value = cultivar.isIntacta.value;
      this.observacoes.value = cultivar.observacoes.value;
    }
  }

  isValid(){
    let hasError = false;
    if(!helpers.req(this.nome.value)){
      this.nome.errorMessage = "Informe o nome do cultivar";
      hasError = true;
    }

    if(!helpers.req(this.ciclo.value)){
      this.ciclo.errorMessage = "Selecione um ciclo";
      hasError = true;
    }

    if(!helpers.req(this.cicloDias.value)){
      this.cicloDias.errorMessage = "Informe a quantidade de dias";
      hasError = true;
    }

    if(this.cicloDias.value != null && this.cicloDias.value < 30){
      this.cicloDias.errorMessage = "Ciclo de dias muito curto";
      hasError = true;
    }
    return !hasError;
  };

  getValues(){
    return{
    nome: this.nome.value,
    marca_id: this.marcaId,
    ciclo: this.ciclo.value,
    ciclo_dias: this.cicloDias.value,
    is_convencional: this.isConvencional.value,
    is_rr: this.isRoundupReady.value,
    is_inox: this.isInox.value,
    is_intacta: this.isIntacta.value,
    observacoes: this.observacoes.value
    }
  }
}
