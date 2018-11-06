import { helpers} from 'vuelidate/lib/validators'
export default class{
  nome = {
    value: null,
    errorMessage: null
  };
  constructor(talhao){
    if(talhao !== undefined){
      this.nome.value = talhao.nome.value;
      this.talhoes = talhao.talhoes;
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
    // var verifyName = 0;
    // this.talhoes.forEach(function (talhao) {
    //   if(talhao.nome == this.nome.value){
    //     verifyName++;
    //   }
    // })
    // if(verifyName > 1){
    //   this.talhoes.pop();
    //   this.nome.errorMessage = "Este nome já foi adicionado";
    //   hasError = true;
    // }
    return !hasError;
  };
  getValues(){
    return{
      nome: this.nome.value,
      talhoes: this.talhoes
    }
  }
}
