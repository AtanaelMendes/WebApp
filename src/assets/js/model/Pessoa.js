import { helpers} from 'vuelidate/lib/validators';
import CPF from 'gerador-validador-cpf';
import inscricaoEstadualValidator from 'assets/js/InscricaoEstadualValidator';

export default class {
  pessoaType = 1;
  nome = {
    value: null,
    errorMessage: null
  };
  razaoSocial = {
    value: null,
    errorMessage: null
  };
  grupoEconomico = {
    value: null,
    errorMessage: null
  };
  cpf = {
    value: null,
    errorMessage: null
  };
  cnpj = {
    value: null,
    errorMessage: null
  };
  inscricaoEstadual = {
    value: null,
    errorMessage: null
  };
  inscricaoEstadualIndicador = {
    value: null,
    errorMessage: null
  };
  uf = {
    value: null,
    errorMessage: null
  };
  inscricaoMunicipal = {
    value: null,
    errorMessage: null
  };
  inscricaoSuframa = {
    value: null,
    errorMessage: null
  };
  inscricaoEstrangeiro = {
    value: null,
    errorMessage: null
  };
  cnae = {
    value: null,
    errorMessage: null
  };
  crt = {
    value: null,
    errorMessage: null
  };
  isConsumidor = {
    value: false,
    errorMessage: null
  };
  constructor(pessoaType, pessoa) {
    this.pessoaType = pessoaType;
    if (pessoa !== undefined || pessoa != null) {
      this.nome.value = pessoa.nome.value;
      this.razaoSocial.value = pessoa.razaoSocial.value;
      this.grupoEconomico.value = pessoa.grupoEconomico.value;
      this.cpf.value = pessoa.cpf.value;
      this.cnpj.value = pessoa.cnpj.value;
      this.inscricaoEstadual.value = pessoa.inscricaoEstadual.value;
      this.inscricaoEstadualIndicador.value = pessoa.inscricaoEstadualIndicador.value;
      this.uf.value = pessoa.uf.value;
      this.inscricaoMunicipal.value = pessoa.inscricaoMunicipal.value;
      this.inscricaoSuframa.value = pessoa.inscricaoSuframa.value;
      this.inscricaoEstrangeiro.value = pessoa.inscricaoEstrangeiro.value;
      this.cnae.value = pessoa.cnae.value;
      this.crt.value = pessoa.crt.value;
      this.isConsumidor.value = pessoa.isConsumidor.value;
    }
  };

  isValid() {
    let hasError = false;

    if (this.inscricaoEstadual.value != null) {
      if (!helpers.req(this.uf.value)) {
        this.uf.errorMessage = "Selecione um estado.";
        hasError = true;
      } else {
        if (!inscricaoEstadualValidator.validar(this.uf.value, this.inscricaoEstadual.value)) {
          this.inscricaoEstadual.errorMessage = "Inscrição Inválida";
          hasError = true;
        }
      }
    }

    if (this.inscricaoEstadual.value != null) {
      this.inscricaoEstadualIndicador.errorMessage = 'Informe o indicador da inscrição estadual'
      hasError = true;
    }

    if (!helpers.req(this.nome.value)) {
      this.nome.errorMessage = "Digite um nome";
      hasError = true;
    } else if (helpers.len(this.nome.value) < 3) {
      this.nome.errorMessage = "O nome deve ter no mínimo 3 caracteres";
      hasError = true;
    }

    if (!helpers.req(this.grupoEconomico.value)) {
      this.grupoEconomico.errorMessage = "Selecione um Grupo Econòmico";
      hasError = true;
    }

    if (this.pessoaType === 1) {
      if (!helpers.req(this.cpf.value)) {
        this.cpf.errorMessage = "Digite um CPF";
        hasError = true;
      } else if (!CPF.validate(this.cpf.value)) {
        this.cpf.errorMessage = "O CPF é inválido";
        hasError = true;
      }
    } else if (this.pessoaType === 2) {
      if (!helpers.req(this.cnpj.value)) {
        this.cnpj.errorMessage = "Digite um CNPJ";
        hasError = true;
      } else if (!isValidCnpj(this.cnpj.value)) {
        this.cnpj.errorMessage = "O CNPJ é inválido.";
        hasError = true;
      }

      if (!helpers.req(this.razaoSocial.value)) {
        this.razaoSocial.errorMessage = "Digite uma razão social";
        hasError = true;
      }

    }
    return !hasError;
  };

  getValues(){
    if (this.pessoaType === 1) {
      return {
        grupo_economico_id: this.grupoEconomico.value,
        nome: this.nome.value,
        cpf: this.cpf.value.replace(/[^0-9]/g, ''),
        cnpj: null,
        razao_social: this.razaoSocial.value,
        inscricao_estadual: this.inscricaoEstadual.value ? this.inscricaoEstadual.value.replace(/[^0-9]/g, '') : null,
        inscricao_estadual_indicador: this.inscricaoEstadualIndicador.value,
        uf: this.uf.value,
        inscricao_municipal: this.inscricaoMunicipal.value ? this.inscricaoMunicipal.value.replace(/[^0-9]/g, '') : null,
        inscricao_Suframa: this.inscricaoSuframa.value,
        inscricao_estrangeiro: this.inscricaoEstrangeiro.value,
        cnae: this.cnae.value,
        crt: this.crt.value,
        is_consumidor: this.isConsumidor.value,
      }
    } else if (this.pessoaType === 2) {
      return {
        grupo_economico_id: this.grupoEconomico.value,
        nome: this.nome.value,
        cpf: null,
        cnpj: this.cnpj.value.replace(/[^0-9]/g, ''),
        razao_social: this.razaoSocial.value,
        inscricao_estadual: this.inscricaoEstadual.value ? this.inscricaoEstadual.value.replace(/[^0-9]/g, '') : null,
        inscricao_estadual_indicador: this.inscricaoEstadualIndicador.value,
        uf: this.uf.value,
        inscricao_municipal: this.inscricaoMunicipal.value ? this.inscricaoMunicipal.value.replace(/[^0-9]/g, '') : null,
        inscricao_Suframa: this.inscricaoSuframa.value,
        inscricao_estrangeiro: this.inscricaoEstrangeiro.value,
        cnae: this.cnae.value,
        crt: this.crt.value,
        is_consumidor: this.isConsumidor.value,
      }
    }
  };
}

function isValidCnpj(value) {

  value = value.replace(/[^0-9]/g, '');
  if (value.length != 14) {
    return false;
  }

  let soma = 0;
  for (let i = 0, j = 5; i < 12; i++) {
    soma += value.charAt(i) * j;
    j = (j == 2) ? 9 : j - 1;
  }

  let resto = soma % 11;
  if (value.charAt(12) != (resto < 2 ? 0 : 11 - resto)) {
    return false;
  }

  soma = 0;
  for (let i = 0, j = 6; i < 13; i++) {
    soma += value.charAt(i) * j;
    j = (j == 2) ? 9 : j - 1;
  }

  resto = soma % 11;
  return value.charAt(13) == (resto < 2 ? 0 : 11 - resto);
};
