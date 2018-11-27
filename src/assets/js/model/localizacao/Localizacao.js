import { helpers} from 'vuelidate/lib/validators'
export default class{
  nome = {
    value: null,
    errorMessage: null
  };
  cidadeId = {
    value: null,
    errorMessage: null
  };
  endereco = {
    value: null,
    errorMessage: null
  };
  numero = {
    value: null,
    errorMessage: null
  };
  complemento = {
    value: null,
    errorMessage: null
  };
  bairro = {
    value: null,
    errorMessage: null
  };
  cep = {
    value: null,
    errorMessage: null
  };
  isCobranca = {
    value: false,
    errorMessage: null
  };
  isFiscal = {
    value: false,
    errorMessage: null
  };
  constructor(localizacao){
    if(localizacao !== undefined){
      this.cidadeId.value = localizacao.cidadeId.value;
      this.endereco.value = localizacao.endereco.value;
      this.numero.value = localizacao.numero.value;
      this.complemento.value = localizacao.complemento.value;
      this.bairro.value = localizacao.bairro.value;
      this.cep.value = localizacao.cep.value;
      this.isCobranca.value = localizacao.isCobranca.value;
      this.isFiscal.value = localizacao.isFiscal.value;

    }
  };
  isValid(){
    let hasError = false;
    if(!helpers.req(this.cidadeId.value)){
      this.cidadeId.errorMessage = "Informe a Cidade";
      hasError = true;
    }
    if(!helpers.req(this.endereco.value)){
      this.endereco.errorMessage = "Informe um endereço";
      hasError = true;
    }else if(helpers.len(this.endereco.value) < 3){
      this.endereco.errorMessage = "O endereço deve ter no mínimo 3 caracteres";
      hasError = true;
    }
    if(!helpers.req(this.numero.value)){
      this.numero.errorMessage = "Informe o número do endereço";
      hasError = true;
    }
    if (!helpers.req(this.bairro.value)) {
      this.bairro.errorMessage = "Informe o bairro";
      hasError = true;
    }
    return !hasError;
  };
  getValues(){
    return{
      cidade_id: this.cidadeId.value,
      endereco: this.endereco.value,
      numero: this.numero.value,
      complemento: this.complemento.value,
      bairro: this.bairro.value,
      cep: this.cep.value,
      is_cobranca: this.isCobranca.value,
      is_fiscal: this.isFiscal.value,
    }
  }
}

