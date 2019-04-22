import { helpers} from 'vuelidate/lib/validators'
export default class{
  nome = {
    value: null,
    errorMessage: null
  };
  defaultEstimativa = {
    value: null,
    errorMessage: null
  };
  defaultUnidadeMedidaId = {
    value: null,
    errorMessage: null
  };
  defaultUnidadeAreaId = {
    value: null,
    errorMessage: null
  };
  defaultUnidadePesagemId = {
    value: null,
    errorMessage: null
  };
  defaultUnidadePrecoId = {
    value: null,
    errorMessage: null
  };
  classificacoes = {
    value: null,
    errorMessage: null
  };

  constructor(cultura){
    if(cultura !== undefined || cultura != null){
      this.nome.value = cultura.nome.value;
      this.defaultEstimativa.value = cultura.defaultEstimativa.value;
      this.defaultUnidadeMedidaId.value = cultura.defaultUnidadeMedidaId.value;
      this.defaultUnidadeAreaId.value = cultura.defaultUnidadeAreaId.value;
      this.defaultUnidadePrecoId.value = cultura.defaultUnidadePrecoId.value;
      this.defaultUnidadePesagemId.value = cultura.defaultUnidadePesagemId.value;
    }
  }

  isValid(currentStep){
    let hasError = false;

    if(currentStep === 0) {
      if (!helpers.req(this.nome.value)) {
        this.nome.errorMessage = "Informe o nome da cultura";
        hasError = true;
      }

      if (!helpers.req(this.defaultEstimativa.value)) {
        this.defaultEstimativa.errorMessage = "Informe uma estimativa";
        hasError = true;
      }

      if (this.defaultEstimativa.value <= 0) {
        this.defaultEstimativa.errorMessage = "Estimativa inválida";
        hasError = true;
      }

      if (!helpers.req(this.defaultUnidadeMedidaId.value)) {
        this.defaultUnidadeMedidaId.errorMessage = "Selecione uma unidade de medida";
        hasError = true;
      }

      if (!helpers.req(this.defaultUnidadePesagemId.value)) {
        this.defaultUnidadePesagemId.errorMessage = "Selecione uma unidade de peso";
        hasError = true;
      }

      if (!helpers.req(this.defaultUnidadeAreaId.value)) {
        this.defaultUnidadeAreaId.errorMessage = "Selecione uma unidade de área";
        hasError = true;
      }

      if (!helpers.req(this.defaultUnidadePrecoId.value)) {
        this.defaultUnidadePrecoId.errorMessage = "Selecione uma unidade de preço";
        hasError = true;
      }
    }

    if(currentStep === 1) {
      if (this.classificacoes.value.find(classificacao => classificacao.selected && (classificacao.tolerancia === null || classificacao.tolerancia < 0)) !== undefined) {
        this.classificacoes.errorMessage = "Preencha corretamente a tolerância das classificações";
        hasError = true;
      }
    }

    return !hasError;
  };

  getValues(){
    return{
      nome: this.nome.value,
      default_estimativa: this.defaultEstimativa.value,
      default_unidade_medida_id: this.defaultUnidadeMedidaId.value,
      default_unidade_area_id: this.defaultUnidadeAreaId.value,
      default_unidade_preco_id: this.defaultUnidadePrecoId.value,
      default_unidade_pesagem_id: this.defaultUnidadePesagemId.value,
      classificacoes: this.classificacoes.value.filter(classificacao => classificacao.selected).map(function (classificacao) {
        return {
          id: classificacao.id,
          tolerancia: classificacao.tolerancia
        }
      })
    }
  }
}
