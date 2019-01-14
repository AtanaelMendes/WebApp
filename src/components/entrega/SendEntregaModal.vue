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
                {{negocioCultura.pessoa}}
                <q-btn v-if="sendEntrega.negocioCulturaId == negocioCultura.id" slot="right" round size="8px" icon="done" color="positive"/>
              </q-card-title>
              <q-card-separator/>

              <q-card-main class="row gutter-y-xs">
                <div class="col-12">
                  {{numeral(parseFloat(negocioCultura.quantidade)).format('0,0')}} {{negocioCultura.unidade_medida_sigla}}
                </div>
                <div class="col-12" v-if="negocioCultura.quantidade_entregue">
                  {{numeral(parseFloat(negocioCultura.quantidade_entregue)).format('0,0')}} {{negocioCultura.unidade_medida_sigla}} Entregue
                </div>
                <div class="col-12 text-warning" v-if="!negocioCultura.quantidade_entregue">
                  Nenhuma quantidade entregue ainda
                </div>
                <div class="col-12" v-if="negocioCultura.quantidade_restante">
                  {{numeral(parseFloat(negocioCultura.quantidade_restante)).format('0,0')}} {{negocioCultura.unidade_medida_sigla}} Restante
                </div>
                <div class="col-12">
                  {{moment(negocioCultura.prazo_entrega_final).format('DD MMM YYYY')}}
                </div>
                <!--<div class="col-12 text-warning" v-if="negocio == 2">-->
                  <!--2 Cargas aguardando no armazém-->
                <!--</div>-->
              </q-card-main>

            </q-card>
          </div>
          <div v-if="negocioCulturas.length === 0" class="list-empty">
            <q-icon name="warning" />
            <span>Nenhum negócio disponível para seleção</span>
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
                  <q-btn v-if="sendEntrega.armazemId === armazem.id" size="8px" icon="done" color="positive" round/>
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

                <q-card-title slot="overlay" align="end" v-if="sendEntrega.motoristaId === motorista.id">
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
                <q-select v-model="sendEntrega.serie" float-label="Série" :options="parseNotasFiscaisSeSeries(notasFiscaisSeries)" align="right" @input="changeNumeroSerie()"/>
              </div>

              <div class="col-12">
                <q-input type="number" v-model="sendEntrega.notaNumero" float-label="Numero da nota" align="right"/>
              </div>

              <div class="col-6">
                <!--VIR PREECHIDO O PESO DO CAMINHAO-->
                <q-input type="number" v-model="sendEntrega.peso" float-label="Peso" align="right"/>
              </div>

              <div class="col-6">
                <q-select v-model="sendEntrega.unidadeMedidaId" float-label="Unidade Medida" :options="unidadesMedida" align="right"/>
              </div>

              <div class="col-6">
                <q-input type="number" v-model="sendEntrega.valor" float-label="Valor" align="right"/>
              </div>

              <div class="col-6">
                <q-input type="number" v-model="totalCalc" float-label="Total" align="right"/>
              </div>

              <div class="col-12">
                <q-select v-model="sendEntrega.cfop" float-label="CFOP" :options="parseCfops(cfops)" align="right"/>
              </div>

              <div class="col-12">
                <custom-input-date-time type="date" label="Emissão" :model="sendEntrega.emissao"/>
              </div>

            </div>
          </div>
        </div>
      </q-step>

    </q-stepper>

    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
      <q-btn label="próximo" color="primary" @click="goToNextStep" :disable="isNextStepEnabled()" v-if="isBtnVisible"/>
      <q-btn label="salvar" color="primary" @click="save" :disable="!isSaveButtonEnabled()" v-if="!isBtnVisible"/>
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
        sendEntrega: new SendEntrega(),
        isModalOpened: false,
        negocioCulturas: [],
        armazens: [],
        motoristas: [],
        unidadesMedida: [],
        selectedNegocio: null, //TODO: Apagar se não estiver usando
        selectedEntrega: null,

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
        if (this.sendEntrega.valor) {
          let result  = this.sendEntrega.valor  * this.sendEntrega.peso;
          this.sendEntrega.total = result;
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
      openModal: function(funcao, object = null){
        this.funcao = funcao;
        this.sendEntrega = new SendEntrega()
        switch (funcao) {
          case 'sendEntrega':
            this.currentStep = 'negocio';
            this.stepNegocio = true;
            this.stepArmazem = true;
            this.stepMotorista = true;
            this.stepInformacoes = true;
            break;

          case 'updateNota':
            this.selectedNegocio = object;

            this.currentStep = 'informacoes';
            this.stepNegocio = false;
            this.stepArmazem = false;
            this.stepMotorista = false;
            this.stepInformacoes = true;
            break;

          case 'novoNegocio':
            this.selectedEntrega = object;
            //this.sendEntrega.negocioCulturaId = negocio.negocio_cultura.safra_cultura.id;
            this.currentStep = 'negocio';
            this.stepNegocio = true;
            this.stepArmazem = false;
            this.stepMotorista = false;
            this.stepInformacoes = true;
            break;

          case 'updateMotorista':
            this.selectedEntrega = object;
            this.sendEntrega.motoristaId = object.motorista.id;
            this.currentStep = 'motorista';
            this.stepNegocio = false;
            this.stepArmazem = false;
            this.stepMotorista = true;
            this.stepInformacoes = false;
            break;
        }
        this.isModalOpened = true;
        this.listNegocioCulturas();
        this.listMotoristas();
        this.getUnidadesMedida();
        this.listNotasFiscaisSeries(1)
        this.listCfops();
      },
      closeModal: function(){
        this.isModalOpened = false;
      },
      isNextStepEnabled: function(){
        if(this.sendEntrega.negocioCulturaId == null && this.currentStep === 'negocio'){
          return true
        }
        if(this.sendEntrega.motoristaId == null && this.currentStep === 'motorista'){
          return true
        }
        if(this.sendEntrega.armazemId == null && this.currentStep === 'armazem'){
          return true
        }

        return false;
      },
      isSaveButtonEnabled: function(){
        switch (this.funcao) {
          case 'sendEntrega':
            return this.sendEntrega.isValid();
          case 'updateNota':
            return this.sendEntrega.isValid();
          case 'novoNegocio':
            return this.sendEntrega.isValid();
          case 'updateMotorista':
            return this.sendEntrega.motoristaId != null
        }
      },
      listNegocioCulturas: function(){
        negocioService.listNegociosCulturasByProdutor().then(response => {
          this.negocioCulturas = response.data;

          if(this.funcao === 'novoNegocio'){
            this.negocioCulturas = this.negocioCulturas.filter(negocioCultura => {
              return this.selectedEntrega.negocios.find(
                negocio => negocio.negocio_cultura.id !== negocioCultura.id
              ) === undefined;
            })
          }
        });
      },
      selectNegocioCultura: function(negocioCultura){
        this.sendEntrega.negocioCulturaId = negocioCultura.id;
        this.listArmazensByNegocioCultura(negocioCultura.id);
        this.goToNextStep()
      },
      listArmazensByNegocioCultura: function(negocioCulturaId){
        negocioService.listArmazensByNegocioCultura(negocioCulturaId).then(response => {
          this.armazens = response.data;
        })
      },
      selectArmazem: function(armazem){
        this.sendEntrega.armazemId = armazem.id;
        this.goToNextStep()
      },
      listMotoristas: function(){
        motoristaService.listMotoristas().then(response => {
          this.motoristas = response.data;
        })
      },
      selectMotorista: function(motorista){
        this.sendEntrega.motoristaId = motorista.id;
        this.goToNextStep()
      },
      save:function(){
        switch (this.funcao) {
          case 'sendEntrega':
            this.saveSendEntrega();
            break;
            case 'updateNota':
              this.updateNota();
            break;
          case 'novoNegocio':
            this.addNegocioToEntrega();
            break;
          case 'updateMotorista':
            this.updateMotorista();
            break;
        }
      },
      saveSendEntrega: function(){
        let entregaId = this.$route.params.id;
        entregaService.sendEntregaToArmazen(entregaId, this.sendEntrega.getValues()).then(response => {
          if(response.status === 200) {
            this.$q.notify({type: 'positive', message: 'Carga enviada com sucesso'});
            this.closeModal();
            this.$root.$emit('refreshEntregasList', 'all');
            this.$root.$emit('refreshEntregaView')
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });
      },
      addNegocioToEntrega: function(){
        let entregaId = this.$route.params.id;
        entregaService.addNegocioToEntrega(entregaId, this.sendEntrega.getValues()).then(response => {
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Negócio adicionado com sucesso'});
            this.closeModal();
            this.$root.$emit('refreshEntregaView')
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });
      },
      updateMotorista: function(){
        let entregaId = this.$route.params.id;
        let param = {
          motorista_id: this.sendEntrega.motoristaId,
          motorista_nome: null
        };
        entregaService.updateMotorista(entregaId, param).then(response => {
          if(response.status === 200) {
            this.$q.notify({type: 'positive', message: 'Motorista atualizado com sucesso'});
            this.closeModal();
            this.$root.$emit('refreshEntregaView')
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });
      },

      updateNota: function(){
        let entregaId = this.$route.params.id;

        entregaService.updateNotaFiscalItemOfNegocio(entregaId, this.selectedNegocio.id, this.sendEntrega.getValues()).then(response => {
          if(response.status === 200) {
            this.$q.notify({type: 'positive', message: 'Nota atualizada com sucesso'});
            this.closeModal();
            this.$root.$emit('refreshEntregaView')
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
        this.sendEntrega.notaNumero = this.sendEntrega.serie.ultima_nota_emitida + 1;
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
<style scoped>
  .space-end{
    margin-bottom: 150px;
  }

  .list-empty{
    height: 55px;
    text-align: center;
    padding-top: 15px;
  }
  .list-empty span{
    color: #8c8c8c;
    font-weight: 300;
    font-size: 15px;
  }
  .list-empty i{
    color: #ffb500;
    font-size: 20px;
    margin-right: 6px;
  }
</style>
