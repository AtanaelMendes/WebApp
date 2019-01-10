<template>
  <q-modal key="safraCultura" v-model="isModalOpened" maximized @hide="closeModal">

    <q-stepper key="sendCargo" ref="stepper" contractable color="positive" v-model="currentStep" class="no-shadow">

      <!--PASSO 1 ESCOLHER NEGOCIO-->
      <!--TODO ordenar por data vencimento-->
      <q-step default title="Escolher Negócico" v-if="stepNegocio" name="negocio">
        <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">

          <div class="col-12 text-center q-title">
            Escolha o negócio
          </div>

          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="negocioCultura in negocioCulturas" :key="negocioCultura.id">
            <q-card @click.native="selectNegocioCultura(negocioCultura)" class="cursor-pointer	">

              <q-card-title>
                {{negocioCultura.nome}}
                <q-btn v-if="sendCarga.negocioCulturaId == negocioCultura.id" slot="right" round size="8px" icon="done" color="positive"/>
              </q-card-title>
              <q-card-separator/>

              <q-card-main class="row gutter-y-xs">
                <div class="col-12">
                  {{numeral(30000).format('0,0')}} SC
                </div>
                <div class="col-12">
                  {{numeral(28000).format('0,0')}} SC Entregue
                </div>
                <div class="col-12">
                  {{numeral(2000).format('0,0')}} SC Restante
                </div>
                <div class="col-12">
                  {{moment().format('DD MMM YYYY')}}
                </div>
                <!--<div class="col-12 text-warning" v-if="negocio == 2">-->
                  <!--2 Cargas aguardando no armazém-->
                <!--</div>-->
              </q-card-main>

            </q-card>
          </div>
        </div>
      </q-step>

      <!--PASSO 2 ESCOLHER ARMAZEM -->
      <q-step title="Escolher Armazém" v-if="stepArmazem" name="armazem">
        <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">

          <div class="col-12 text-center q-title">
            Escolha o Armazém
          </div>

          <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4" >
            <q-list no-border separator link>
              <q-item v-for="armazem in armazens" :key="armazem.id" @click.native="selectArmazem(armazem)">
                <q-item-side>
                  <q-btn v-if="sendCarga.armazemId === armazem.id" size="8px" icon="done" color="positive" round/>
                </q-item-side>
                <q-item-main>
                  <q-item-tile>
                    {{armazem.nome}}
                  </q-item-tile>
                  <q-item-tile sublabel>
                    {{armazem.endereco}}
                  </q-item-tile>
                </q-item-main>
              </q-item>
            </q-list>
          </div>

        </div>
      </q-step>

      <!--PASSO 3 ESCOLHER MOTORISTA -->
      <q-step title="Escolher Motorista" v-if="stepMotorista" name="motorista">
        <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">

          <div class="col-12 text-center q-title">
            Escolha o Motorista
          </div>

          <div class="col-xs-12 col-sm-6 col-md-3 col-lg-2" v-for="motorista in motoristas" :key="motorista.id">
            <q-card @click.native="selectMotorista(motorista)" class="cursor-pointer">
              <q-card-media overlay-position="full">
                <img src="assets/images/icon-no-image.svg" v-if="!motorista.image"/>
                <img :src="motorista.image" v-if="motorista.image"/>

                <q-card-title slot="overlay" align="end" v-if="sendCarga.motoristaId === motorista.id">
                  <q-icon name="check_circle" size="30px" color="positive"/>
                </q-card-title>
              </q-card-media>
              <q-card-separator/>

              <q-card-main>
                {{motorista.nome}}
              </q-card-main>

            </q-card>
          </div>

          <div class="col-xs-12 col-sm-6 col-md-3 col-lg-2" >
            <q-card @click.native=""  class="cursor-pointer">
              <q-card-media align="center">
                <q-icon name="add" color="primary" flat size="200px" />
              </q-card-media>
              <q-card-separator/>
              <q-card-main>
                Novo motorista
              </q-card-main>
            </q-card>
          </div>

        </div>
      </q-step>

      <!--PASSO 4 INFORMACOES -->
      <q-step title="Informações" v-if="stepInformacoes" name="informacoes">
        <div class="row justify-center items-center gutter-sm space-end" style="min-height: 80vh">

          <div class="col-xs-12 col-sm-8 col-md-6 col-lg-3">
            <div class="row gutter-xs">

              <div class="col-12">
                <q-select v-model="sendCarga.serie" float-label="Série" :options="parseNotasFiscaisSeSeries(notasFiscaisSeries)" align="right" @input="changeNumeroSerie()"/>
              </div>

              <div class="col-12">
                <q-input type="number" v-model="sendCarga.notaNumero" float-label="Numero da nota" align="right"/>
              </div>

              <div class="col-6">
                <!--VIR PREECHIDO O PESO DO CAMINHAO-->
                <q-input type="number" v-model="sendCarga.peso" float-label="Peso" align="right"/>
              </div>

              <div class="col-6">
                <q-select v-model="sendCarga.unidadeMedidaId" float-label="Unidade Medida" :options="unidadesMedida" align="right"/>
              </div>

              <div class="col-6">
                <q-input type="number" v-model="sendCarga.valor" float-label="Valor" align="right"/>
              </div>

              <div class="col-6">
                <q-input type="number" v-model="totalCalc" float-label="Total" align="right"/>
              </div>

              <div class="col-12">
                <q-select v-model="sendCarga.cfop" float-label="CFOP" :options="parseCfops(cfops)" align="right"/>
              </div>

              <div class="col-12">
                <custom-input-date-time type="date" label="Emissão" :model="sendCarga.emissao"/>
              </div>

            </div>
          </div>
        </div>
      </q-step>

    </q-stepper>

    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
      <q-btn label="próximo" color="primary" @click="goToNextStep" :disable="isNextStepEnabled()" v-if="isBtnVisible"/>
      <q-btn label="salvar" color="primary" @click="saveSendEntrega" :disable="isNextStepEnabled()" v-if="!isBtnVisible"/>
    </q-page-sticky>

  </q-modal>
</template>
<script>
  import entregaService from 'assets/js/service/entrega/EntregaService'
  import armazemService from 'assets/js/service/armazem/ArmazemService'
  import motoristaService from 'assets/js/service/motorista/MotoristaService'
  import unidadeMedidaService from 'assets/js/service/UnidadeMedidaService'
  import SendEntrega from 'assets/js/model/entrega/SendEntrega'
  import customInputText from 'components/CustomInputText.vue'
  import customInputDateTime from 'components/CustomInputDateTime.vue'
  import negocioService from 'assets/js/service/negocio/NegocioService'
  import notaFiscalService from 'assets/js/service/NotaFiscalService'
  import cfopService from 'assets/js/service/CfopService'

  export default {
    name: "stepper-send-carga",
    components:{
      customInputDateTime,
      customInputText,
    },
    data () {
      return {
        currentStep: 'negocio',
        sendCarga: new SendEntrega(),
        isModalOpened: false,
        negocioCulturas: [],
        armazens: [],
        motoristas: [],
        unidadesMedida: [],

        stepNegocio: false,
        stepArmazem: false,
        stepMotorista: false,
        stepInformacoes: false,
        funcao: '',
        notasFiscaisSeries:[],
        cfops: [],
      }
    },
    computed: {
      totalCalc: function () {
        if (this.sendCarga.valor) {
          let result  = this.sendCarga.valor  * this.sendCarga.peso;
          this.sendCarga.total = result;
          return result;
        }
        return null;
      },
      isBtnVisible: function () {
        if(this.currentStep === 'informacoes'){
          return false
        }
        if(this.funcao === 'updateMotorista'){
          return false
        }
        return true
      },
    },
    methods: {
      // FUNCAO = sendEntrega, updateNota, desdobrarCarga
      openModal: function(funcao){
        this.funcao = funcao;
        switch (funcao) {
          case 'sendEntrega':
            this.currentStep = 'negocio';
            this.stepNegocio = true;
            this.stepArmazem = true;
            this.stepMotorista = true;
            this.stepInformacoes = true;
          break;

          case 'updateNota':
            this.currentStep = 'informacoes';
            this.stepNegocio = false;
            this.stepArmazem = false;
            this.stepMotorista = false;
            this.stepInformacoes = true;
          break;

          case 'desdobrarCarga':
            this.currentStep = 'negocio';
            this.stepNegocio = true;
            this.stepArmazem = false;
            this.stepMotorista = false;
            this.stepInformacoes = true;
          break;

          case 'updateMotorista':
            this.currentStep = 'motorista';
            this.stepNegocio = false;
            this.stepArmazem = false;
            this.stepMotorista = true;
            this.stepInformacoes = false;
          break;
        }
        this.isModalOpened = true;
        this.listNegocioCulturas();
        this.listArmazens();
        this.listMotoristas();
        this.getUnidadesMedida();
        this.listNotasFiscaisSeries(1)
        this.listCfops();
      },
      closeModal: function(){
        this.isModalOpened = false;
      },
      isNextStepEnabled: function(){
        if(this.sendCarga.negocioCulturaId == null && this.currentStep === 'negocio'){
          return true
        }
        if(this.sendCarga.motoristaId == null && this.currentStep === 'motorista'){
          return true
        }
        if(this.sendCarga.armazemId == null && this.currentStep === 'armazem'){
          return true
        }
        if(!this.sendCarga.isValid()){
          return true
        }
        return false;
      },
      listNegocioCulturas: function(){
        negocioService.listNegociosCulturasByProdutor().then(response => {
          this.negocioCulturas = response.data;
        });
      },
      selectNegocioCultura: function(negocioCultura){
        this.sendCarga.negocioCulturaId = negocioCultura.id;
        this.goToNextStep()
      },
      listArmazens: function(){
        armazemService.listArmazens().then(response => {
          this.armazens = response.data;
        })
      },
      selectArmazem: function(armazem){
        this.sendCarga.armazemId = armazem.id;
        this.goToNextStep()
      },
      listMotoristas: function(){
        motoristaService.listMotoristas().then(response => {
          this.motoristas = response.data;
        })
      },
      selectMotorista: function(motorista){
        this.sendCarga.motoristaId = motorista.id;
        this.goToNextStep()
      },
      saveSendEntrega: function(){
        let entregaId = this.$route.params.id;
        entregaService.sendEntregaToArmazen(entregaId, this.sendCarga.getValues()).then(response => {
          if(response.status === 200) {
            this.$q.notify({type: 'positive', message: 'Carga enviada com sucesso'});
            this.closeModal();
            this.$root.$emit('refreshEntregasList', 'no_armazem')
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });
      },
      goToNextStep(){
        this.$refs.stepper.next();
      },

      getUnidadesMedida:function(){
        unidadeMedidaService.listUnidadesMedida().then(response => {
          this.unidadesMedida = response.data.map(unidade => {
            return {
              label: unidade.nome,
              value: unidade
            }
          })
        })
      },
      listNotasFiscaisSeries(pessoa_id){
        notaFiscalService.listSeries(pessoa_id).then(response => {
          this.notasFiscaisSeries = response.data;
        })
      },
      changeNumeroSerie(){
        this.sendCarga.notaNumero = this.sendCarga.serie.ultima_nota_emitida + 1;
      },
      parseNotasFiscaisSeSeries: function(notasFiscaisSeries){
        return  notasFiscaisSeries.map(serie => {
          return {
            value: serie,
            label: serie.nome
          }
        });
      },
      listCfops(){
        cfopService.listCfops().then(response => {
          this.cfops = response.data;
        });
      },
      parseCfops: function(cfops){
        return cfops.map(cfop => {
          return {
            value: cfop,
            label: String(cfop.numero),
            sublabel: cfop.descricao
          }
        });
      },
    },
  }
</script>
<style>
  .space-end{
    margin-bottom: 150px;
  }
</style>
