import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  nome: {
    value: null,
    errorMessage: null
  },

  getValidation(){
    return {nome: { value: { required, minLength: minLength(3) } },}
  },

  isValid(context){
    context.$v.$touch();

    if ( context.$v.$error ) {
      if(!context.$v.nome.value.required){
        this.nome.errorMessage = "Digite um nome"
      }else if(!context.$v.nome.value.minLength){
        this.nome.errorMessage = "O nome deve ter no mínimo 3 caracteres"
      }
      return false;
    }
    return true;
  },

  getValues(){

  }
}
