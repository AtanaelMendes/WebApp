import { helpers} from 'vuelidate/lib/validators'

export default{
  pessoaType: 1,
  nome: {
    value: null,
    errorMessage: null
  },
  tamanho: {
    value: null,
    errorMessage: null
  },
  loacalizacao_id: {
    value: null,
    errorMessage: null
  },
  produtor_id: {
    value: null,
    errorMessage: null
  },
  unidade_medida_id: {
    value: null,
    errorMessage: null
  },
  isValid(){
    let hasError = false;

    if(!helpers.req(this.nome.value)){
      this.nome.errorMessage = "Digite um nome";
      hasError = true;
    }else if(helpers.len(this.nome.value) < 3){
      this.nome.errorMessage = "O nome deve ter no mínimo 3 caracteres";
      hasError = true;
    }

    if(!helpers.req(this.grupoEconomico.value)){
      this.grupoEconomico.errorMessage = "Selecione um Grupo Econòmico";
      hasError = true;
    }

    if(this.pessoaType === 1){
      if(!helpers.req(this.cpf.value)){
        this.cpf.errorMessage = "Digite um CPF";
        hasError = true;
      }
    }else if(this.pessoaType === 2) {
      if (!helpers.req(this.cnpj.value)) {
        this.cnpj.errorMessage = "Digite um CNPJ";
        hasError = true;
      }

      if (!helpers.req(this.razaoSocial.value)) {
        this.razaoSocial.errorMessage = "Digite uma razão social";
        hasError = true;
      }

      if (!helpers.req(this.nomeFantasia.value)) {
        this.nomeFantasia.errorMessage = "Digite um nome fantasia";
        hasError = true;
      }
    }

    return !hasError;
  },

  getValues(){
    return{
      nome: this.nome.value,
      grupo_economico_id: this.grupoEconomico.value,
      cpf: this.cpf.value,
      cnpj: this.cnpj.value,
      inscricao_estadual: this.inscricaoEstadual.value,
      inscricao_municipal: this.inscricaoMunicipal.value,
      razao_social: this.razaoSocial.value,
      nome_fantasia: this.nomeFantasia.value
    }
  }

}
