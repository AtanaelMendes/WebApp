<template>
  <q-modal key="safraCultura" v-model="isModalOpened" maximized @hide="closeModal">

    <q-stepper key="sendCargo" ref="stepper" contractable color="positive" v-model="currentStep" class="no-shadow">

      <!--PASSO 1 ESCOLHER NEGOCIO-->
      <!--TODO ordenar por data vencimento-->
      <q-step default title="Negócico" v-if="stepNegocio" name="negocio">
        <div class="row justify-center items-center gutter-sm space-end" style="min-height: 80vh">

          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="negocioCultura in negocioCulturas" :key="negocioCultura.id">

            <q-card @click.native="selectNegocioCultura(negocioCultura)" class="cursor-pointer	">

              <q-card-title>
                {{negocioCultura.negocio.pessoa}}
                <q-btn v-if="sendEntrega.negocioCulturaId == negocioCultura.id" slot="right" round size="8px" icon="done" color="positive"/>
                <span slot="subtitle" v-if="negocioCultura.negocio.numero_contrato != ''">
                  {{negocioCultura.negocio.numero_contrato}}
                </span>
              </q-card-title>
              <q-card-separator />
              <q-list dense>

                <!-- Prazo -->
                <q-item>
                  <q-item-side icon="mdi-calendar" />
                  <q-item-main>
                    <q-item-tile label>
                      {{moment(negocioCultura.prazo_entrega_final).format('DD/MMM/YYYY')}}
                    </q-item-tile>
                    <q-item-tile sublabel>
                      {{moment(negocioCultura.prazo_entrega_final).fromNow()}}
                    </q-item-tile>
                  </q-item-main>
                </q-item>

                <!-- Quantidade -->
                <q-item>
                  <q-item-side icon="mdi-scale" />
                  <q-item-main>
                    <q-item-tile label>
                      {{numeral(negocioCultura.quantidade).format('0,0')}} {{negocioCultura.unidade_medida_sigla}}
                    </q-item-tile>
                    <q-item-tile sublabel>
                      Quantidade Total
                    </q-item-tile>
                  </q-item-main>
                </q-item>

                <!-- entregue -->
                <q-item>
                  <q-item-side icon="mdi-arrow-top-right" color="green" />
                  <q-item-main v-if="negocioCultura.quantidade_entregue">
                    <q-item-tile label>
                      {{numeral(negocioCultura.quantidade_entregue).format('0,0')}} {{negocioCultura.unidade_medida_sigla}}
                    </q-item-tile>
                    <q-item-tile sublabel>
                      Já Entregue
                    </q-item-tile>
                  </q-item-main>
                  <q-item-main v-else>
                    Nada entregue
                  </q-item-main>

                </q-item>

                <!-- Quantidade -->
                <q-item>
                  <q-item-side icon="mdi-arrow-bottom-left" color="red" />
                  <q-item-main>
                    <q-item-tile label>
                      {{numeral(negocioCultura.quantidade_restante).format('0,0')}} {{negocioCultura.unidade_medida_sigla}}
                    </q-item-tile>
                    <q-item-tile sublabel>
                      Faltando
                      <span class="text-negative" v-if="negocioCultura.entregas_pendentes">
                        <br />{{negocioCultura.entregas_pendentes}} Cargas aguardando no armazém
                      </span>
                    </q-item-tile>
                  </q-item-main>
                </q-item>

              </q-list>


            </q-card>
          </div>
          <div v-if="negocioCulturas.length === 0" class="list-empty">
            <q-icon name="warning" />
            <span>Nenhum negócio disponível para seleção</span>
          </div>
        </div>
      </q-step>

      <!--PASSO 2 ESCOLHER ARMAZEM -->
      <q-step title="Armazém" v-if="stepArmazem" name="armazem">

        <div class="row justify-center gutter-sm" style="">

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
      <q-step title="Motorista" v-if="stepMotorista" name="motorista">
        <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">

          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="motorista in motoristas" :key="motorista.id">
            <q-card @click.native="selectMotorista(motorista)" class="cursor-pointer">
              <q-card-media overlay-position="full">
                <ap-image size="800x500" :file-name="motorista.image_file_name" />
                <q-card-title slot="overlay" align="end" v-if="sendEntrega.motoristaId === motorista.id">
                  <q-icon name="check_circle" size="30px" color="positive"/>
                </q-card-title>
              </q-card-media>
              <q-card-main>
                {{motorista.nome}}
              </q-card-main>
            </q-card>
          </div>


          <q-btn
            color="deep-orange"
            icon="mdi-account-plus"
            round
            @click="newMotoristaDialog()"
            size="33px"
            class="q-ma-xl"
          />

        </div>
      </q-step>

      <!--PASSO 4 INFORMACOES -->
      <q-step title="Nota Fiscal" v-if="stepInformacoes" name="informacoes">
        <div class="row justify-center gutter-sm space-end" style="">

          <div class="col-xs-12 col-sm-9 col-md-7 col-lg-5 col-xl-3">
            <div class="row gutter-xs">


              <div class="col-7">
                <q-select v-model="sendEntrega.serie" float-label="Série" :options="parseNotasFiscaisSeSeries(notasFiscaisSeries)" @input="changeNumeroSerie()"/>
              </div>

              <div class="col-5">
                <q-input type="number" v-model="sendEntrega.notaNumero" float-label="Numero" align="right"/>
              </div>

              <div class="col-7">
                <q-datetime v-model="sendEntrega.emissao.value" float-label="Emissão" type="date" align="center" format="DD/MM/YYYY" modal/>
              </div>

              <div class="col-5">
                <q-select v-model="sendEntrega.unidadeMedidaId" float-label="Unidade" :options="parseUnidadesMedida(unidadesMedida)" align="right"/>
              </div>

              <div class="col-4">
                <q-input type="number" v-model="sendEntrega.peso" @input="calculaTotal()" float-label="Peso" align="right"/>
              </div>

              <div class="col-3">
                <q-input type="number" v-model="sendEntrega.valor" @input="calculaTotal()" float-label="Valor" align="right"/>
              </div>

              <div class="col-5">
                <q-input type="number" v-model="sendEntrega.total" @input="calculaValor()" float-label="Total" align="right"/>
              </div>

              <div class="col-4">
                <q-input type="number" v-model="cfopSearchText" float-label="CFOP" @input="getCfopByNumero()" align="center" />
              </div>
              <div class="col-8 self-center" >
                <span class="q-caption text-faded" v-if="cfopDescricao">{{cfopDescricao}}</span>
                <span class="q-caption text-negative" v-if="cfopError">CFOP não encontrado!</span>
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
  import motoristaService from 'assets/js/service/motorista/MotoristaService'
  import unidadeMedidaService from 'assets/js/service/UnidadeMedidaService'
  import SendEntrega from 'assets/js/model/entrega/SendEntrega'
  import customInputText from 'components/CustomInputText.vue'
  import customInputDateTime from 'components/CustomInputDateTime.vue'
  import negocioService from 'assets/js/service/negocio/NegocioService'
  import notaFiscalService from 'assets/js/service/NotaFiscalService'
  import cfopService from 'assets/js/service/CfopService'
  import apImage from 'components/ApImage'
  import AgroUtils from "../../assets/js/AgroUtils";

  export default {
    name: "stepper-send-carga",
    components:{
      customInputDateTime,
      customInputText,
      apImage,
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
        cfopSearchText: null,
        cfopDescricao: null,
        cfopError: false,
      }
    },
    computed: {
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
      calculaTotal: function () {
        console.log('aqui calculaTotal')
        this.sendEntrega.total = AgroUtils.math.round(this.sendEntrega.valor  * this.sendEntrega.peso)
      },
      calculaValor: function() {
        console.log('aqui calculaValor')
        if (this.sendEntrega.peso > 0) {
          this.sendEntrega.valor = AgroUtils.math.round(this.sendEntrega.total / this.sendEntrega.peso)
        } else {
          this.sendEntrega.valor = this.sendEntrega.total
        }
      },
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
            this.sendEntrega.peso = object.caminhao.lotacao;
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
                negocio => negocio.negocio_cultura.id === negocioCultura.id
              ) === undefined;
            })
          }
        });
      },
      selectNegocioCultura: function(negocioCultura){
        this.sendEntrega.unidadeMedidaId = negocioCultura.safra_cultura.cultura.default_unidade_pesagem_id;
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
      newMotoristaDialog: function(){
        this.$q.dialog({
          title: 'Novo motorista',
          //message: 'Modern front-end framework on steroids.',
          prompt: {
            model: '',
            type: 'text' // optional
          },
          cancel: true,
          color: 'secondary'
        }).then(data => {
          motoristaService.saveMotorista({nome: data}).then(response => {
            if(response.status === 201){
              this.sendEntrega.motoristaId = response.data.id;
              this.listMotoristas();
            }
          })
        }).catch(() => {})
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
          this.unidadesMedida = response.data;
        })
      },
      parseUnidadesMedida(unidadesMedida){
        return unidadesMedida.map(unidade => {
          return {
            label: unidade.sigla,
            value: unidade.id
          }
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
      getCfopByNumero(){
        let numero = this.cfopSearchText;
        cfopService.getCfopByNumero(numero).then(response => {
          if(response.status === 200){
            this.cfopDescricao = response.data.descricao;
            this.sendEntrega.cfop = response.data;
            this.cfopError = false;
          }
        }).catch(error => {
          this.cfopDescricao = null;
          this.cfopError = true;
          this.sendEntrega.cfop = null;
        })
      },
    },
  }
</script>
<style scoped>

  .list-empty{
    height: 55px;
    text-align: center;
    padding-top: 15px;
  }
  .list-empty span{
    color: #8c8c8c;
    font-weight: 300;
  }
    font-size: 15px;
  .list-empty i{
    color: #ffb500;
    font-size: 20px;
    margin-right: 6px;
  }

</style>
