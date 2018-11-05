import { helpers} from 'vuelidate/lib/validators'

export default class{
  pessoaType = 1;
  produtor_id = null;
  nome = {
    value: null,
    errorMessage: null
  };
  tamanho = {
    value: null,
    errorMessage: null
  };
  localizacao = {
    value: null,
    errorMessage: null
  };
  unidade_medida = {
    value: null,
    errorMessage: null
  };
  talhoes = [];
  constructor(area){
    if(area !== undefined){
      this.nome.value = area.nome.value;
      this.tamanho.value = area.tamanho.value;
      this.localizacao.value = area.localizacao.value;
      this.unidade_medida.value = area.unidade_medida.value;
      this.produtor_id = area.produtor_id;

    }
  };
  isValid(){
    let hasError = false;

    if(!helpers.req(this.nome.value)){
      this.nome.errorMessage = "Digite um nome";
      hasError = true;
    }else if(helpers.len(this.nome.value) < 3){
      this.nome.errorMessage = "O nome deve ter no mínimo 3 caracteres";
      hasError = true;
    }

    if(!helpers.req(this.tamanho.value)){
      this.tamanho.errorMessage = "Informe o tamanho da área";
      hasError = true;
    }

    if (!helpers.req(this.localizacao.value)) {
      this.localizacao.errorMessage = "Informe a Localização";
      hasError = true;
    }

    if (!helpers.req(this.unidade_medida.value)) {
      this.unidade_medida.errorMessage = "Informe unidade de medida";
      hasError = true;
    }

    return !hasError;
  };

  getValues(){
    return{
      produtor_id: null,
      nome: this.nome.value,
      tamanho: this.tamanho.value,
      localizacao: this.localizacao.value,
      unidade_medida: this.unidade_medida.value,
      talhoes: this.talhoes
    }
  }
}
