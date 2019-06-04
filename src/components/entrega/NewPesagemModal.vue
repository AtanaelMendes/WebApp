<template>
  <q-modal key="safraCultura" v-model="isModalOpened" maximized @hide="closeModal">

    <q-stepper key="sendCargo" ref="stepper" contractable color="positive" v-model="currentStep" class="no-shadow q-mb-xl" v-if="entrega">

      <!--PASSO 1 DADOS DA ENTREGA-->
      <q-step default title="Dados da Entrega" name="dadosDaEntrega">
        <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">

          <div class="col-12 text-center q-title">
            Dados da Entrega
          </div>

          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <custom-input-text type="number" :model="pesagem.numeroTicket" align="right" label="Número do ticket"/>
            <q-datetime v-model="pesagem.emissao.value" type="datetime" label="Data descarga"
                        align="center" modal format="DD/MM/YYYY HH:mm"/>
            <div class="row q-mb-lg">
              <div class="col-8 q-pr-lg ">

                  <!--<q-input class="q-mb-none" type="number" v-model="pesagem.pesoBrutoTotal.value" align="right"
                           float-label="Peso bruto total" :suffix="getUnidadeMedidaSiglaById(pesagem.unidadeMedidaId)"/>-->
                <q-input class="q-mb-none" type="number" v-model="pesagem.pesoBrutoTotal.value" align="right"
                         float-label="Peso bruto total" />

              </div>
            </div>

            <!--<custom-input-text type="number" :model="pesagem.pesoTara" align="right"
                               label="Peso tara" :suffix="getUnidadeMedidaSiglaById(pesagem.unidadeMedidaId)"/>
            <custom-input-text type="number" :model="pesoBrutoProduto" disabled="true" align="right"
                               label="Peso produto" :suffix="getUnidadeMedidaSiglaById(pesagem.unidadeMedidaId)"/>-->

            <custom-input-text type="number" :model="pesagem.pesoTara" align="right"
                               label="Peso tara" />
            <custom-input-text type="number" :model="pesoBrutoProduto" disabled="true" align="right"
                               label="Peso produto" />
          </div>
        </div>
      </q-step>

      <!--PASSO 2 INFORMAR CALISSIFICACAO -->
      <q-step title="Informar Classificação" name="classificacao">
        <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">

          <div class="col-12 text-center q-title">
            Classificação
          </div>

          <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
            <div class="row justify-center">

              <div class="col-12 row q-mb-md">
                <div class="col-4 text-center text-faded q-caption">Classificação</div>
                <div class="col-2 text-center text-faded q-caption">Verificado</div>
                <div class="col-3 text-center text-faded q-caption">Tolerância</div>
                <div class="col-3 text-center text-faded q-caption">Desconto</div>
              </div>

              <div v-for="classificacao in pesagem.entregaClassificacao" class="row q-mb-lg">

                <div class="col-4  self-center">
                  {{classificacao.nome}}
                </div>

                <div class="col-2" :key="classificacao.nome">
                  <!--<custom-input-text suffix="%" align="right" type="number":model="classificacao.verificado"/>-->
                  <q-input suffix="%" align="right" type="number"v-model="classificacao.verificado.value"/>
                </div>

                <div class="col-3 text-faded self-center text-center ">
                  {{classificacao.tolerancia}}%
                </div>

                <div class="col-3">
                  <!--<custom-input-text suffix="KG" align="right" type="number":model="classificacao.peso_desconto"/>-->
                  <q-input align="right" type="number" v-model="classificacao.peso_desconto.value" />
                </div>

              </div>

              <div class="col-12 text-right">
                <!--Total Descontos {{totalDesc}} {{getUnidadeMedidaSiglaById(pesagem.unidadeMedidaId)}}-->
                Total Descontos {{totalDesc}}
              </div>
              <div class="col-12 text-right">
                <!--Total Líquido {{totalLiquido}} {{getUnidadeMedidaSiglaById(pesagem.unidadeMedidaId)}}-->
                Total Líquido {{totalLiquido}}
              </div>
            </div>
          </div>

        </div>
      </q-step>

    </q-stepper>

    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
      <q-btn label="próximo" color="primary" @click="goToNextStep" :disable="isNextStepEnabled()" v-if="currentStep === 'dadosDaEntrega'"/>
      <q-btn label="salvar" color="primary" @click="saveNewPesagem" :disable="isNextStepEnabled()" v-if="currentStep === 'classificacao'"/>
    </q-page-sticky>

  </q-modal>
</template>
<script>
  import Pesagem from 'assets/js/model/entrega/Pesagem'
  import customInputText from 'components/CustomInputText.vue'
  import customInputDateTime from 'components/CustomInputDateTime.vue'
  import CulturaClassificacaoService from "../../assets/js/service/cultura/CulturaClassificacaoService";
  import PesagemService from "../../assets/js/service/entrega/PesagemService";
  export default {
    name: "stepper-new-pesagem",
    components:{
      customInputDateTime,
      customInputText,
    },
    data () {
      return {
        pesagemService: new PesagemService(),
        culturaClassificacaoService: new CulturaClassificacaoService(),
        currentStep: 'dadosDaEntrega',
        pesagem: new Pesagem(),
        isModalOpened: false,
        entrega: null,
        errorValue: '',
      }
    },
    watch: {},
    computed: {
      pesoBrutoProduto: function(){
        let value = this.pesagem.pesoBrutoTotal.value - this.pesagem.pesoTara.value;
        this.pesagem.pesoBrutoProduto.value = value;
        return {value: value};
      },
      totalDesc: function () {
        let soma = 0;
        this.pesagem.entregaClassificacao.forEach(function (val) {
          soma += val.peso_desconto.value
        });
        return soma
      },
      totalLiquido: function () {
        let pesoLiquido = this.pesagem.pesoBrutoProduto.value - this.totalDesc;
        this.pesagem.pesoLiquido.value = pesoLiquido;
        return pesoLiquido;
      }
    },
    methods: {
      openModal: function(entrega){
        this.isModalOpened = true;
        this.currentStep = 'dadosDaEntrega';
        this.listClassificacoesByCultura(entrega.negocios[0].negocio_cultura.safra_cultura.cultura.id);
        this.entrega = entrega;
      },
      closeModal: function(){
        this.isModalOpened = false;
        this.pesagem = new Pesagem();
      },
      isNextStepEnabled: function(){
        if(!this.pesagem.isValid()){
          return true
        }
        return false;
      },
      isFormEntregaClassificacaoValid: function(){
        let isValid = true;
        for(var classificacao of this.pesagem.entregaClassificacao){
          if(classificacao.verificado.value === null || classificacao.peso_desconto.value === null){
            isValid = false;
          }
        }
        return isValid;
      },
      saveNewPesagem: function(){

        setTimeout(() => {
          if(this.currentStep === 'classificacao'){
            if(!this.isFormEntregaClassificacaoValid()){
              this.$q.dialog({ title: 'Atenção', message: 'Preencha os campos corretamente.', ok: 'OK', color: 'primary' });
              return
            }
          }

          this.$q.loading.show();
          let entregaId = this.$route.params.id;
          this.pesagemService.savePesagem(entregaId, this.pesagem.getValues()).then(() => {
            this.$q.notify({type: 'positive', message: 'Pesagem criada com sucesso'});
            this.closeModal();
            this.$root.$emit('refreshEntregasList', 'no_armazem');
            this.$root.$emit('refreshEntregasList', 'entregue');
            this.$root.$emit('refreshEntregaView');
            this.$q.loading.hide();

            if(this.entrega.pesagens === null || this.entrega.pesagens === undefined){
              this.$router.back();
            }
          }).catch(error => {
            this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
            this.$q.loading.hide();
          });
        }, 300);
      },
      goToNextStep(){
        if(this.currentStep === 'classificacao'){
          setTimeout(() => {
            if(!this.isFormEntregaClassificacaoValid()){
              this.$q.dialog({
                title: 'Atenção',
                message: 'Preencha os campos corretamente.',
                ok: 'OK',
                color: 'primary'
              })
            }else{
              this.$refs.stepper.next();
            }
          }, 300 /*ms to wait*/)
        }else{
          this.$refs.stepper.next();
        }
      },
      listClassificacoesByCultura(cultura_id){
        this.$q.loading.show();
        this.culturaClassificacaoService.listClassificacoesByCultura(cultura_id).then(classificacoes => {
         if(this.pesagem.entregaClassificacao.length <= 0){
           classificacoes.forEach(function (culturaClassificacao) {
             this.pesagem.entregaClassificacao.push(
               {
                 id: culturaClassificacao.id,
                 classificacao_id: culturaClassificacao.classificacao_id,
                 verificado: {value: null},
                 peso_desconto: {value: null},
                 nome: culturaClassificacao.nome,
                 tolerancia: culturaClassificacao.tolerancia
               }
             )
           }, this)
         }
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.loading.hide();
        })
      },
    },
  }
</script>
<style scoped>
</style>
