<template>
  <q-modal key="safraCultura" v-model="isModalOpened" maximized @hide="closeModal">

    <q-stepper key="sendCargo" ref="stepper" contractable color="positive" v-model="currentStep" class="no-shadow">

      <!--PASSO 1 ESCOLHER NEGOCIO-->
      <q-step default title="Negócico" v-if="stepNegocio" name="negocio">
        <div class="row justify-center gutter-sm space-end" style="min-height: 80vh">

          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="negocioCultura in negocioCulturas" :key="negocioCultura.id">

            <q-card @click.native="selectNegocioCultura(negocioCultura)" class="cursor-pointer	full-height">

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
                <q-item v-if="negocioCultura.prazo_entrega_final">
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

                <!-- QUANTIDADE -->
                <!--SE NAO FINALIZADO-->
                <q-item v-if="negocioCultura.quantidade_entregue < negocioCultura.quantidade">
                  <q-item-side icon="mdi-arrow-bottom-left" color="red" />
                  <q-item-main>

                    <q-item-tile label>
                      {{numeral(negocioCultura.quantidade_restante).format('0,0')}} {{negocioCultura.unidade_medida_sigla}}
                    </q-item-tile>

                    <q-item-tile sublabel>
                      Faltando
                    </q-item-tile>

                    <q-item-tile class="text-negative" v-if="negocioCultura.entregas_pendentes">
                      {{negocioCultura.entregas_pendentes}} Cargas aguardando no armazém
                    </q-item-tile>

                  </q-item-main>
                </q-item>

                <!--SE QUANTIDADE ENTREGUE MAIOR QUE O COMBINADO-->
                <q-item v-if=" Math.floor(negocioCultura.quantidade_entregue) > negocioCultura.quantidade">
                  <q-item-side icon="arrow_upward" color="warning" />
                  <q-item-main>

                    <q-item-tile label>
                      {{numeral(negocioCultura.quantidade_restante).format('0,0')}} {{negocioCultura.unidade_medida_sigla}}
                    </q-item-tile>

                    <q-item-tile sublabel>
                      Passando
                    </q-item-tile>

                    <q-item-tile class="text-negative" v-if="negocioCultura.entregas_pendentes">
                      {{negocioCultura.entregas_pendentes}} Cargas aguardando no armazém
                    </q-item-tile>

                  </q-item-main>
                </q-item>

                <!--SE JA FINALIZADO-->
                <q-item v-if="negocioCultura.quantidade == Math.floor(negocioCultura.quantidade_entregue)">
                  <q-item-side icon="thumb_up_alt" color="positive"/>
                  <q-item-main>
                    Finalizado
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
                <ap-image size="400x250" :file-name="motorista.image_file_name" />
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

          <div class="col-12" align="center" v-if="funcao !== 'updateNota' && funcao !== 'addNota'">
            Deseja informar uma nota fiscal?
            <q-btn-toggle
              v-model="hasNotaFiscal"
              toggle-color="primary"
              :options="[{label: 'Sim', value: true},{label: 'Não', value: false}]"
            />
          </div>

          <div class="col-xs-12 col-sm-9 col-md-7 col-lg-5 col-xl-3">
            <div class="row gutter-xs">
              <div class="col-7">
                <q-datetime v-model="sendEntrega.emissao.value" stack-label="Emissão" type="date" align="center" format="DD/MM/YYYY" modal :disable="!hasNotaFiscal"/>
              </div>
            </div>

            <div class="row gutter-xs">
              <div class="col-7">
                <q-select v-model="sendEntrega.serieId" stack-label="Série" :options="parseNotasFiscaisSeries(notasFiscaisSeries)" @input="changeNumeroSerie()" :disable="!hasNotaFiscal"/>
              </div>

              <div class="col-5">
                <q-input type="number" v-model="sendEntrega.notaNumero" stack-label="Numero" align="right" :disable="!hasNotaFiscal"/>
              </div>
            </div>

            <div class="row gutter-xs">
              <div class="col-4">
                <q-input type="number" v-model="sendEntrega.peso" :suffix="selectedEntrega.safra_cultura.unidade_medida_pesagem.sigla" @input="calculaTotal()" stack-label="Peso" align="right" :disable="!hasNotaFiscal"/>
              </div>

              <div class="col-3">
                <q-input type="number" v-model="sendEntrega.valor" @input="calculaTotal()" stack-label="Valor" align="right" :disable="!hasNotaFiscal"/>
              </div>

              <div class="col-5">
                <q-input type="number" v-model="sendEntrega.total" @input="calculaValor()" stack-label="Total" align="right" :disable="!hasNotaFiscal"/>
              </div>
            </div>

            <div class="row gutter-xs">
              <div class="col-4">
                <q-input type="number" v-model="cfopSearchText" stack-label="CFOP" @input="getCfopByNumero()" align="center" :disable="!hasNotaFiscal"/>
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
  import SendEntrega from 'assets/js/model/entrega/SendEntrega'
  import customInputText from 'components/CustomInputText.vue'
  import customInputDateTime from 'components/CustomInputDateTime.vue'
  import apImage from 'components/ApImage'
  import AgroUtils from "../../../../../assets/js/AgroUtils";
  import NegocioService from "../../../../../assets/js/service/negocio/NegocioService";
  import MotoristaService from "../../../../../assets/js/service/motorista/MotoristaService";
  import ArmazemService from "../../../../../assets/js/service/armazem/ArmazemService";
  import NotaFiscalService from "../../../../../assets/js/service/NotaFiscalService";
  import EntregaService from "../../../../../assets/js/service/entrega/EntregaService";
  import CfopService from "../../../../../assets/js/service/CfopService";

  export default {
    name: "stepper-send-carga",
    components:{
      customInputDateTime,
      customInputText,
      apImage,
    },
    data () {
      return {
        entregaService: new EntregaService(),
        cfopService: new CfopService(),
        armazemService: new ArmazemService(),
        negocioService: new NegocioService(),
        motoristaService: new MotoristaService(),
        notaFiscalService: new NotaFiscalService(),
        currentStep: 'negocio',
        sendEntrega: new SendEntrega(),
        isModalOpened: false,
        negocioCulturas: [],
        armazens: [],
        motoristas: [],
        selectedNota: null,
        selectedNegocio: null,
        selectedEntrega: null,

        hasNotaFiscal: true,
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
        if(this.funcao === 'updateArmazem'){
          return false
        }
        return true
      },
    },
    methods: {
      // FUNCAO = sendEntrega, updateNota, desdobrarCarga
      calculaTotal: function () {
        this.sendEntrega.total = AgroUtils.math.round(this.sendEntrega.valor  * this.sendEntrega.peso)
      },
      calculaValor: function() {
        if (this.sendEntrega.peso > 0) {
          this.sendEntrega.valor = AgroUtils.math.round(this.sendEntrega.total / this.sendEntrega.peso)
        } else {
          this.sendEntrega.valor = this.sendEntrega.total
        }
      },
      openModal: async function(funcao, object = null){
        console.log('openModal', object)
        this.funcao = funcao;
        this.sendEntrega = new SendEntrega();
        switch (funcao) {
          case 'sendEntrega':
            this.currentStep = 'negocio';
            this.stepNegocio = true;
            this.stepArmazem = true;
            this.stepMotorista = true;
            this.stepInformacoes = true;
            this.sendEntrega.peso = object.caminhao.lotacao;
            this.selectedEntrega = object;
            break;
          case 'addNota':
            this.selectedNegocio = object;
            this.stepNegocio = false;
            this.stepArmazem = false;
            this.stepMotorista = false;
            this.stepInformacoes = true;
            break;
          case 'updateNota':
            this.selectedNota = object;
            this.currentStep = 'informacoes';
            this.stepNegocio = false;
            this.stepArmazem = false;
            this.stepMotorista = false;
            this.stepInformacoes = true;
            this.getNotaFiscalItem(object.id);
            break;
          case 'novoNegocio':
            this.selectedEntrega = object;
            this.currentStep = 'negocio';
            this.stepNegocio = true;
            this.stepArmazem = false;
            this.stepMotorista = false;
            this.stepInformacoes = true;
            this.selectedEntrega = object;
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
          case 'updateArmazem':
            this.selectedEntrega = object;
            //this.sendEntrega.motoristaId = object.motorista.id;
            this.currentStep = 'armazem';
            this.stepNegocio = false;
            this.stepArmazem = true;
            this.stepMotorista = false;
            this.stepInformacoes = false;
            this.listArmazensByEntrega(this.selectedEntrega);
            break;
        }
        this.isModalOpened = true;
        this.listNegocioCulturas();
        this.listMotoristas();
        this.listNotasFiscaisSeries()
      },
      closeModal: function(){
        this.isModalOpened = false;
        this.cfopSearchText = null;
        this.cfopDescricao = null;
        this.cfopError = false;
        this.hasNotaFiscal = true;

        this.negocioCulturas = [];
        this.armazens = [];
        this.motoristas = [];
        this.unidadesMedida = [];
        this.notasFiscaisSeries = [];
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
            return this.sendEntrega.isValid(this.hasNotaFiscal);
          case 'addNota':
            return this.sendEntrega.isValid();
          case 'updateNota':
            return this.sendEntrega.isValid();
          case 'novoNegocio':
            return this.sendEntrega.isValid(this.hasNotaFiscal);
          case 'updateMotorista':
            return this.sendEntrega.motoristaId != null;
          case 'updateArmazem':
            return this.sendEntrega.armazemId != null;
        }
      },
      listNegocioCulturas: function(){
        if(this.funcao === 'sendEntrega') {
          this.listNegociosCulturasBySafraCultura();
        }else if(this.funcao === 'novoNegocio'){
          this.listNegociosCulturasBySafraCulturaAndArmazem()
        }else{
          this.listNegociosCulturasAvaliablesByEntrega()
        }
      },

      listNegociosCulturasAvaliablesByEntrega(){
        let entregaId = this.$route.params.id;
        this.$q.loading.show();

        this.negocioService.listAvaliablesNegociosCulturasForEntrega(entregaId).then(negociosCulturas => {
          this.negocioCulturas = negociosCulturas;

          if(this.funcao === 'novoNegocio'){
            this.negocioCulturas = this.negocioCulturas.filter(negocioCultura => {
              return this.selectedEntrega.negocios.find(
                negocio => negocio.negocio_cultura.id === negocioCultura.id
              ) === undefined;
            })
          }
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.loading.hide();
        });
      },
      listNegociosCulturas(){
        this.$q.loading.show();
        //this.negocioService.listNegociosCulturasWithoutEmpty().then(negocios => {
        this.negocioService.listNegociosCulturas().then(negocios => {
          this.negocioCulturas = negocios;
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.loading.hide();
        });
      },
      listNegociosCulturasBySafraCultura(){
        this.$q.loading.show();
        //this.negocioService.listNegociosCulturasWithoutEmpty().then(negocios => {
        this.negocioService.listNegociosCulturasBySafraCultura(this.selectedEntrega.safra_cultura.id).then(negocios => {
          this.negocioCulturas = negocios;
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.loading.hide();
        });
      },
      listNegociosCulturasBySafraCulturaAndArmazem(){
        this.$q.loading.show();
        this.entregaService.listNegociosCulturasByEntrega(this.selectedEntrega.id, this.selectedEntrega.safra_cultura.id, this.selectedEntrega.armazem.id).then(negocios => {
          this.negocioCulturas = negocios;
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.loading.hide();
        });
      },
      selectNegocioCultura: function(negocioCultura){
        this.sendEntrega.unidadeMedidaId = negocioCultura.safra_cultura.cultura.default_unidade_pesagem_id;
        this.sendEntrega.negocioCulturaId = negocioCultura.id;
        this.listArmazensByNegocioCultura(negocioCultura.id);
        this.goToNextStep()
      },
      listArmazensByNegocioCultura: function(negocioCulturaId){
        this.$q.loading.show();
        this.negocioService.listArmazensByNegocioCultura(negocioCulturaId).then(armazens => {
          this.armazens = armazens;
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.loading.hide();
        })
      },
      listArmazensByEntrega: function(entrega){
        if(entrega.negocios.length === 0) {
          this.listArmazens();
          return;
        }

        this.$q.loading.show();
        this.armazemService.listArmazensByEntrega(entrega.id).then(armazens => {
          //TODO: Remover o armazem já selecionadooo
          this.armazens = armazens;
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.loading.hide();
        })
      },
      listArmazens(){
        this.$q.loading.show();
        this.armazemService.listArmazens().then(response => {
          this.armazens = response.data;
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.loading.hide();
        });
      },
      selectArmazem: function(armazem){
        this.sendEntrega.armazemId = armazem.id;
        this.goToNextStep()
      },
      listMotoristas: function(){
        this.$q.loading.show();
        this.motoristaService.listMotoristas().then(motoristas => {
          this.motoristas = motoristas;
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.loading.hide();
        })
      },
      selectMotorista: function(motorista){
        this.sendEntrega.motoristaId = motorista.id;
        this.goToNextStep()
      },
      newMotoristaDialog: function(){
        if(this.serverStatus.isUp){
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
            this.$q.loading.show();
            this.motoristaService.saveMotorista({nome: data}).then(motorista => {
              this.sendEntrega.motoristaId = motorista.id;
              this.listMotoristas();
              this.$q.loading.hide();
            })
          }).catch(() => {})
        }else{
          this.$root.$emit('openForbiddenAccessDialog');
        }
      },
      save:function(){
        switch (this.funcao) {
          case 'sendEntrega':
            this.saveSendEntrega();
            break;
          case 'addNota':
            this.addNota();
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
          case 'updateArmazem':
            this.updateArmazem();
            break;
        }
      },
      saveSendEntrega: function(){
        let entregaId = this.$route.params.id;
        this.$q.loading.show();
        this.entregaService.sendEntregaToArmazen(entregaId, this.sendEntrega.getValues(this.hasNotaFiscal)).then(response => {
          this.$q.notify({type: 'positive', message: 'Carga enviada com sucesso'});
          this.closeModal();
          this.$root.$emit('refreshEntregasList', 'all');
          this.$root.$emit('refreshEntregaView');
          this.$q.loading.hide();
          this.$router.back();
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          this.$q.loading.hide();
        });
      },
      addNegocioToEntrega: function(){
        let entregaId = this.$route.params.id;
        this.$q.loading.show();
        this.entregaService.addNegocioToEntrega(entregaId, this.sendEntrega.getValues(this.hasNotaFiscal)).then(response => {
          this.$q.notify({type: 'positive', message: 'Negócio adicionado com sucesso'});
          this.closeModal();
          this.$q.loading.hide();
          this.$root.$emit('refreshEntregaView');
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          this.$q.loading.hide();
        });
      },
      updateMotorista: function(){
        let entregaId = this.$route.params.id;
        let param = {
          motorista_id: this.sendEntrega.motoristaId,
          motorista_nome: null
        };
        this.$q.loading.show();
        this.entregaService.updateMotorista(entregaId, param).then(() => {
          this.$q.notify({type: 'positive', message: 'Motorista atualizado com sucesso'});
          this.closeModal();
          this.$root.$emit('refreshEntregaView');
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          this.$q.loading.hide();
        });
      },
      updateArmazem: function(){
        let entregaId = this.$route.params.id;
        let param = {
          armazem_id: this.sendEntrega.armazemId,
        };
        this.$q.loading.show();
        this.entregaService.updateArmazem(entregaId, param).then(() => {
          this.$q.notify({type: 'positive', message: 'Armazem atualizado com sucesso'});
          this.closeModal();
          this.$root.$emit('refreshEntregaView')
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          this.$q.loading.hide();
        });
      },
      addNota:function(){
        let entregaId = this.$route.params.id;

        this.$q.loading.show();
        this.entregaService.addNotaFiscalToNegocio(entregaId, this.selectedNegocio.id, this.sendEntrega.getValues()).then(() => {
          this.$q.notify({type: 'positive', message: 'Nota criada com sucesso'});
          this.closeModal();
          this.$root.$emit('refreshEntregaView')
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          this.$q.loading.hide();
        })
      },
      updateNota: function(){
        let entregaId = this.$route.params.id;

        this.$q.loading.show();
        this.entregaService.updateNotaFiscalItemOfNegocio(entregaId, this.selectedNota.id, this.sendEntrega.getValues()).then(() => {
          this.$q.notify({type: 'positive', message: 'Nota atualizada com sucesso'});
          this.closeModal();
          this.$root.$emit('refreshEntregaView');
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          this.$q.loading.hide();
        });
      },
      goToNextStep(){
        this.$refs.stepper.next();
      },
      listNotasFiscaisSeries(){
        this.notaFiscalService.listSeries().then(series => {
          this.notasFiscaisSeries = series;
        })
      },
      changeNumeroSerie(){
        this.sendEntrega.notaNumero = this.getSerieById(this.sendEntrega.serieId).ultima_nota_emitida + 1;
      },
      getSerieById(id){
        return this.notasFiscaisSeries.find(serie => serie.id === id);
      },
      parseNotasFiscaisSeries: function(notasFiscaisSeries){
        return  notasFiscaisSeries.map(serie => {
          return {
            value: serie.id,
            label: serie.nome
          }
        });
      },
      getCfopByNumero(){
        let numero = this.cfopSearchText;
        this.cfopService.getCfopByNumero(numero).then(cfop => {
          this.cfopDescricao = cfop.descricao;
          this.sendEntrega.cfopId = cfop.id;
          this.sendEntrega.is_saida = cfop.is_saida;
          this.cfopError = false;
        }).catch(error => {
          this.cfopDescricao = null;
          this.cfopError = true;
          this.sendEntrega.cfopId = null;
          this.sendEntrega.is_saida = null;
        })
      },
      getNotaFiscalItem(id){
        this.$q.loading.show();
        this.notaFiscalService.getNotaFiscalItemById(id).then(notaFiscalItem => {
          this.sendEntrega.serieId = notaFiscalItem.nota_fiscal.serie.id;
          this.sendEntrega.notaNumero = notaFiscalItem.nota_fiscal.numero;
          this.sendEntrega.emissao.value = notaFiscalItem.nota_fiscal.emissao;
          this.sendEntrega.unidadeMedidaId = notaFiscalItem.unidade_medida_id;
          this.sendEntrega.peso = notaFiscalItem.quantidade;
          this.sendEntrega.valor = notaFiscalItem.valor_unitario;
          this.sendEntrega.total = notaFiscalItem.valor_total;
          this.cfopSearchText = notaFiscalItem.cfop.numero;
          this.sendEntrega.cfopId = notaFiscalItem.cfop.id;
          this.sendEntrega.is_saida = notaFiscalItem.cfop.is_saida;

          this.getCfopByNumero();
          this.$q.loading.hide();
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

  .list-empty i{
    color: #ffb500;
    font-size: 20px;
    margin-right: 6px;
  }

</style>
