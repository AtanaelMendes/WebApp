import { helpers} from 'vuelidate/lib/validators';
import CPF from 'gerador-validador-cpf';
export default class{
  pessoaType = 1;
  nome= {
    value: null,
    errorMessage: null
  };
  grupoEconomico= {
    value: null,
    errorMessage: null
  };
  cpf= {
    value: null,
    errorMessage: null
  };
  cnpj= {
    value: null,
    errorMessage: null
  };
  inscricaoEstadual= {
    value: null,
    errorMessage: null
  };
  inscricaoMunicipal= {
    value: null,
    errorMessage: null
  };
  razaoSocial= {
    value: null,
    errorMessage: null
  };
  nomeFantasia= {
    value: null,
    errorMessage: null
  };
  constructor(pessoaType, pessoa ){
    this.pessoaType = pessoaType
    if(pessoa !== undefined || pessoa != null){
      this.nome.value = pessoa.nome.value;
      this.grupoEconomico.value = pessoa.grupoEconomico.value;
      this.cpf.value = pessoa.cpf.value;
      this.cnpj.value = pessoa.cnpj.value;
      this.inscricaoEstadual.value = pessoa.inscricaoEstadual.value;
      this.inscricaoMunicipal.value = pessoa.inscricaoMunicipal.value;
      this.nomeFantasia.value = pessoa.nomeFantasia.value;
      this.razaoSocial.value = pessoa.razaoSocial.value;
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

    if(!helpers.req(this.grupoEconomico.value)){
      this.grupoEconomico.errorMessage = "Selecione um Grupo Econòmico";
      hasError = true;
    }

    if(this.pessoaType === 1){
      if(!helpers.req(this.cpf.value)){
        this.cpf.errorMessage = "Digite um CPF";
        hasError = true;
      }else if(!CPF.validate(this.cpf.value)){
        this.cpf.errorMessage = "O CPF é inválido";
        hasError = true;
      }
    }else if(this.pessoaType === 2) {
      if (!helpers.req(this.cnpj.value)) {
        this.cnpj.errorMessage = "Digite um CNPJ";
        hasError = true;
      }else if(!isValidCnpj(this.cnpj.value)){
        this.cnpj.errorMessage = "O CNPJ é inválido.";
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
  };

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
  };
};

function isValidCnpj(cnpj) {
  var b = [6,5,4,3,2,9,8,7,6,5,4,3,2];
  if((cnpj = cnpj.replace(/[^\d]/g,"")).length != 14){
    return false;
  }
  if(/0{14}/.test(cnpj)){
    return false;
  }
  for (var i = 0, n = 0; i < 12; n += cnpj[i] * b[++i]);
  if(cnpj[12] != (((n %= 11) < 2) ? 0 : 11 - n)){
    return false;
  }
  for (var i = 0, n = 0; i <= 12; n += cnpj[i] * b[i++]);
  if(cnpj[13] != (((n %= 11) < 2) ? 0 : 11 - n)){
    return false;
  }
  return true;
};
