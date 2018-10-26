import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default{
  pessoaType: 1,
  nome: {
    value: null,
    errorMessage: null
  },
  grupoEconomico: {
    value: null,
    errorMessage: null
  },
  cpf: {
    value: null,
    errorMessage: null
  },
  cnpj: {
    value: null,
    errorMessage: null
  },
  inscricaoEstadual: {
    value: null,
    errorMessage: null
  },
  inscricaoMunicipal: {
    value: null,
    errorMessage: null
  },
  razaoSocial: {
    value: null,
    errorMessage: null
  },
  nomeFantasia: {
    value: null,
    errorMessage: null
  },

  getValidation(){
    let validation;

    validation = {
      nome: { value: { required, minLength: minLength(3), maxLength: maxLength(20) } },
      grupoEconomico: { value: {required} }
    };

    if(this.pessoaType === 1){
      validation.cpf = {value: required};
    }else if(this.pessoaType === 2){
      validation.cnpj = {value: required};
      validation.razaoSocial = {value: required};
      validation.nomeFantasia = {value: required};
    }
    return validation;
  },

  isValid(context){
    context.$v.$touch();

    if ( context.$v.$error ) {
      if(!context.$v.nome.value.required){
        this.nome.errorMessage = "Digite um nome"
      }else if(!context.$v.nome.value.minLength){
        this.nome.errorMessage = "O nome deve ter no mínimo 3 caracteres"
      }

      if(!context.$v.grupoEconomico.value.required){
        this.grupoEconomico.errorMessage = "Selecione um Grupo Econòmico"
      }

      if(this.pessoaType === 1){
        if(!context.$v.cpf.value.required){
          this.cpf.errorMessage = "Digite um CPF"
        }
      }else if(this.pessoaType === 2){
        if(!context.$v.cnpj.value.required){
          this.cnpj.errorMessage = "Digite um CNPJ"
        }

        if(!context.$v.razaoSocial.value.required){
          this.razaoSocial.errorMessage = "Digite uma razão social"
        }

        if(!context.$v.nomeFantasia.value.required){
          this.nomeFantasia.errorMessage = "Digite um nome fantasia"
        }
      }

      return false;
    }
    return true;
  },

  getValues(){
    return{
      nome: this.form.nome.value,
      grupo_economico_id: this.form.grupoEconomico.value,
      cpf: this.form.cpf.value,
      cnpj: this.form.cnpj.value,
      inscricao_estadual: this.form.inscricaoEstadual.value,
      inscricao_municipal: this.form.inscricaoMunicipal.value,
      razao_social: this.form.razaoSocial.value,
      nome_fantasia: this.form.nomeFantasia.value
    }
  }
}
