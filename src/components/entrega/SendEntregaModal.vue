<template>
  <q-modal key="safraCultura" v-model="isModalOpened" maximized @hide="closeModal">

    <q-stepper key="sendCargo" ref="stepper" contractable color="positive" v-model="currentStep" class="no-shadow">

      <!--PASSO 1 ESCOLHER NEGOCIO-->
      <!--TODO ordenar por data vencimento-->
      <q-step default title="Escolher Negócico" name="negocio">
        <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">

          <div class="col-12 text-center q-title">
            Escolha o negócio
          </div>

          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="negocio in 4" :key="negocio">
            <q-card @click.native="selectNegocio(negocio)" class="cursor-pointer	">

              <q-card-title>
                Troca ADM
                <q-btn v-if="sendCarga.negocioId.value == negocio" slot="right" round size="8px" icon="done" color="positive"/>
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
                <div class="col-12 text-warning" v-if="negocio == 2">
                  2 Cargas aguardando no armazém
                </div>
              </q-card-main>

            </q-card>
          </div>
        </div>
      </q-step>

      <!--PASSO 2 ESCOLHER ARMAZEM -->
      <q-step title="Escolher Armazém" name="armazem">
        <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">

          <div class="col-12 text-center q-title">
            Escolha o Armazém
          </div>

          <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4" >
            <q-list no-border separator link>
              <q-item v-for="armazem in armazems" :key="armazem.id" @click.native="selectArmazem(armazem)">
                <q-item-side>
                  <q-btn v-if="sendCarga.armazemId.value == armazem.id" size="8px" icon="done" color="positive" round/>
                </q-item-side>
                <q-item-main>
                  <q-item-tile>
                    {{armazem.nome}}
                  </q-item-tile>
                  <q-item-tile sublabel>
                    {{armazem.localizacao}}
                  </q-item-tile>
                </q-item-main>
              </q-item>
            </q-list>
          </div>

        </div>
      </q-step>

      <!--PASSO 3 ESCOLHER MOTORISTA -->
      <q-step title="Escolher Motorista" name="motorista">
        <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">

          <div class="col-12 text-center q-title">
            Escolha o Motorista
          </div>

          <div class="col-xs-12 col-sm-6 col-md-3 col-lg-2" v-for="motorista in motoristas" :key="motorista.nome">
            <q-card @click.native="selectMotorista(motorista)" class="cursor-pointer">
              <q-card-media overlay-position="full">
                <img src="assets/images/no-image.png"/>

                <q-card-title slot="overlay" align="end" v-if="sendCarga.motoristaId.value == motorista.id">
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
      <q-step title="Informações" name="informacoes">
        <div class="row justify-center items-center gutter-sm space-end" style="min-height: 80vh">

          <div class="col-12 text-center q-title">
            Informações
          </div>

          <div class="col-xs-12 col-sm-8 col-md-6 col-lg-3">
            <div class="row gutter-xs">

              <div class="col-12">
                <q-select v-model="sendCarga.ie.value" float-label="IE" :options="parseIE()" align="right"/>
              </div>

              <div class="col-12">
                <q-select v-model="sendCarga.serie.value" float-label="Série" :options="parseSerie()" align="right"/>
              </div>

              <div class="col-12">
                <q-input type="number" v-model="sendCarga.notaNumero.value" float-label="Numero da nota" align="right"/>
              </div>

              <div class="col-6">
                <!--VIR PREECHIDO O PESO DO CAMINHAO-->
                <q-input type="number" v-model="sendCarga.peso.value" float-label="Peso" align="right"/>
              </div>

              <div class="col-6">
                <q-select v-model="sendCarga.unidadeMedidaId.value" float-label="Unidade Medida" :options="unidadesMedida" align="right"/>
              </div>

              <div class="col-6">
                <q-input type="number" v-model="sendCarga.valor.value" float-label="Valor" align="right"/>
              </div>

              <div class="col-6">
                <q-input type="number" v-model="totalCalc" float-label="Total" align="right"/>
              </div>

              <div class="col-12">
                <q-select v-model="sendCarga.cfop.value" float-label="CFOP" :options="parseCfop()" align="right"/>
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
      <q-btn label="próximo" color="primary" @click="goToNextStep" :disable="isNextStepEnabled()" v-if="currentStep != 'informacoes' "/>
      <q-btn label="salvar" color="primary" @click="saveNewCarga" :disable="isNextStepEnabled()" v-if="currentStep == 'informacoes' "/>
    </q-page-sticky>

  </q-modal>
</template>
<script>
  import entregaService from 'assets/js/service/entrega/EntregaService'
  import armazemService from 'assets/js/service/localizacao/ArmazemService'
  import unidadeMedidaService from 'assets/js/service/UnidadeMedidaService'
  import SendEntrega from 'assets/js/model/entrega/SendEntrega'
  import customInputText from 'components/CustomInputText.vue'
  import customInputDateTime from 'components/CustomInputDateTime.vue'
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
        negocios: [],
        armazems: [
          {
            id: 1,
            nome: 'ADM',
            localizacao: 'Rua sem nome 425, Bairro Industrial Sinop/MT'
          },
          {
            id: 2,
            nome: 'Bunge',
            localizacao: 'Rua sem nome 425, Bairro Industrial Sinop/MT'
          },
          {
            id: 3,
            nome: 'Silo mais',
            localizacao: 'Rua sem nome 425, Bairro Industrial Sinop/MT'
          },
        ],
        motoristas: [
          {
            id: 1,
            nome: 'Tiburcio dos Santos'
          },
          {
            id: 2,
            nome: 'Jucelino cu de Cheque'
          },
          {
            id: 3,
            nome: 'Oscar Nié Maié'
          },
        ],
        unidadesMedida: [],

        optionsIe:[
          {
            id: 1,
            ie: '14.853.697-4'
          },
          {
            id: 2,
            ie: '16.685.345-6'
          },
          {
            id: 3,
            ie: '58.684.567-7'
          },
        ],
        optionsSerie:[
          {
            id: 1,
          },
          {
            id: 2,
          },
          {
            id: 3,
          },
        ],
        optionsCfop:[
          {
            id: 1,
            numero: '8855',
            descricao: 'Aqui vai a descricao'
          },
          {
            id: 2,
            numero: '74584',
            descricao: 'Aqui vai a descricao'
          },
          {
            id: 3,
            numero: '9684',
            descricao: 'Aqui vai a descricao'
          },
        ],
      }
    },
    computed: {
      totalCalc: function () {
        if (this.sendCarga.valor.value) {
          let result  = this.sendCarga.valor.value  * this.sendCarga.peso.value;
          this.sendCarga.total.value = result;
          console.log(this.sendCarga.total.value);
          return result;
        }
        return null;
      }
    },
    methods: {
      openModal: function(){
        this.isModalOpened = true;
      },
      closeModal: function(){
        this.isModalOpened = false;
      },
      isNextStepEnabled: function(){
        if(this.sendCarga.negocioId.value == null && this.currentStep == 'negocio'){
          return true
        }
        if(this.sendCarga.motoristaId.value == null && this.currentStep == 'motorista'){
          return true
        }
        if(this.sendCarga.armazemId.value == null && this.currentStep == 'armazem'){
          return true
        }
        if(!this.sendCarga.isValid()){
          return true
        }
        return false;
      },
      listNegocio: function(){},
      selectNegocio: function(negocio){
        if(this.sendCarga.negocioId.value == negocio){
          this.sendCarga.negocioId.value = null;
        }else{
          this.sendCarga.negocioId.value = negocio;
          this.goToNextStep()
        }
      },
      listArmazem: function(){},
      selectArmazem: function(armazem){
        if(this.sendCarga.armazemId.value == armazem.id){
          this.sendCarga.armazemId.value = null;
        }else{
          this.sendCarga.armazemId.value = armazem.id;
          this.goToNextStep()
        }
      },
      listMotorista: function(){
        areaService.listAreas().then(response => {
          this.areas = response;
        })
      },
      selectMotorista: function(motorista){
        if(this.sendCarga.motoristaId.value == motorista.id){
          this.sendCarga.motoristaId.value = null;
        }else{
          this.sendCarga.motoristaId.value = motorista.id;
          this.goToNextStep()
        }
      },
      saveNewCarga: function(){
        cargaService.saveNewCarga(this.sendCarga.getValues()).then(response => {
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Carga enviada com sucesso'});
            this.closeModal();
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

      parseIE: function(){
        let parsedIe = this.optionsIe.map(data => {
          return {
            value: data.id,
            label: data.ie
          }
        });
        return parsedIe
      },
      parseSerie: function(){
        let parsedSerie = this.optionsSerie.map(data => {
          return {
            value: data.id,
            label: String(data.id)
          }
        });
        return parsedSerie
      },
      parseCfop: function(){
        let parsedCfop = this.optionsCfop.map(data => {
          return {
            value: data.numero,
            label: data.numero,
            sublabel: data.descricao
          }
        });
        return parsedCfop
      },
    },
    mounted () {
      this.listNegocio();
      this.getUnidadesMedida();
      // this.$root.$on('refreshSafraList', () => {
      //   this.listSafras();
      // });
    },
  }
</script>
<style>
  .space-end{
    margin-bottom: 150px;
  }
</style>
