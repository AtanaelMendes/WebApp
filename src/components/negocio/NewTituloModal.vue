<template>
  <q-modal v-model="isModalOpened" maximized key="titulo" @hide="closeModal">

    <q-stepper key="titulo" ref="stepperTitulo" contractable color="positive" v-model="currentStep" class="no-shadow">

      <!--PASSO 1 PAGAR OU RECEBER-->
      <q-step default title="Pagar/Receber" name="pagarReceber">
        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-8 col-sm-4 col-md-3 col-lg-2">

            <div class="row justify-center">
              <div class="col-12 text-center q-title q-mb-sm">
                Você vai
              </div>
              <div class="col-4" >
                <q-field>
                  <q-option-group type="radio" color="secondary" v-model="titulo.isPagar.value"
                                  :options="[{ label: 'Pagar', value: true },
                                               { label: 'Receber', value: false }
                                             ]"
                  />
                </q-field>
              </div>
            </div>

          </div>
        </div>
      </q-step>

      <!--PASSO 2 INFORMAR MOEDA -->
      <q-step title="Indexador" name="indexador">
        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">

            <div class="row gutter-y-xs">
              <div class="col-12 q-title text-center">Qual é o indexador?</div>
              <div class="col-12" v-for="indexador in indexadores" :key="indexador.nome">
                <q-btn class="full-width" @click.native="selectIndexador(indexador)" :color="isIndexadorSelected(indexador.id) ? 'positive' : ''">
                  ({{indexador.sigla}}) {{indexador.nome}}
                </q-btn>
              </div>
            </div>

          </div>
        </div>
      </q-step>

      <!--PASSO 3 INFORMAR VALOR -->
      <q-step title="Valor" name="valor">
        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-8 col-sm-4 col-md-3 col-lg-2">

            <div class="row justify-center">
              <div class="col-12 text-center q-title q-mb-sm">
                Qual o valor?
              </div>
              <div class="col-12">
                <custom-input-text key="valor" :prefix="titulo.indexador.sigla" type="number" :model="titulo.valor" align="center" v-if="titulo.indexador"/>
              </div>
            </div>

          </div>
        </div>
      </q-step>

      <!--PASSO 4 INFORMAR PARCELAS -->
      <q-step title="Parcelas" name="parcelas">
        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-8 col-sm-4 col-md-3 col-lg-2">

            <div class="row justify-center">
              <div class="col-12 text-center q-title q-mb-sm">
                Quantas Parcelas?
              </div>
              <div class="col-6" >
                <q-field>
                  <q-option-group type="radio" color="secondary" v-model="numParcelas"
                                  :options="[{ label: 'Uma', value: 1 },
                                               { label: 'Duas', value: 2},
                                               { label: 'Três', value: 3}
                                             ]"
                  />
                </q-field>
              </div>
              <div class="col-7">
                <q-input v-model="numParcelas" type="number" suffix="X" align="center"/>
              </div>
            </div>

          </div>
        </div>
      </q-step>

      <!--PASSO 5 INFORMAR VENCIMENTOS -->
      <q-step title="Vencimentos" name="vencimentos">
        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-12 col-sm-9 col-md-7 col-lg-5 text-center">
            <span class="q-title">Informe as datas</span>

            <q-list no-border separator>
              <q-item v-for="parcela in verifyParcelas" :key="parcela.numero">
                <q-item-main>
                  <div class="row justify-center q-mt-md" >

                    <div class="col-xs-4 col-lg-2 self-center">
                      <span class="text-faded">Parcela</span> {{parcela.numero}}
                    </div>

                    <div class="col-xs-8 col-lg-3">
                      <custom-input-datetime :key="parcela.numero" type="date" :model="parcela.vencimento"/>
                    </div>

                    <div class="col-xs-6 col-lg-3 self-center text-center">
                      {{ numeral((moment(parcela.vencimento.value) - moment(dataAtual)) / (1000 * 3600 * 24)).format('0') }} Dias
                    </div>

                    <div class="col-xs-6 col-lg-4">
                      <q-input type="number" v-model="parcela.valor.value" :decimals="2" :prefix="titulo.indexador.sigla" align="center" v-if="titulo.indexador"/>
                    </div>
                  </div>

                </q-item-main>
              </q-item>
              <div class="row q-mt-md justify-end">
                <div class="col-xs-6 col-lg-4 self-center text-justify">
                  <span class="text-faded" v-if="titulo.indexador">Total: {{titulo.indexador.sigla}}</span>&nbsp
                  <span :class="errorValue">{{numeral(titulo.valor.value).format('0,0.00')}}</span>
                </div>
              </div>
            </q-list>

          </div>
        </div>
      </q-step>

    </q-stepper>

    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
      <q-btn label="próximo" color="primary" @click="goToNextStep" :disable="isNextTituloStep()" v-if="currentStep != 'vencimentos'"/>
      <q-btn label="salvar" color="primary" @click="saveAttachTitulo" :disable="isValid" v-if="currentStep  == 'vencimentos' "/>
    </q-page-sticky>
  </q-modal>
</template>

<script>
  import Titulo from 'assets/js/model/negocio/Titulo'
  import customInputText from 'components/CustomInputText.vue'
  import customInputDatetime from 'components/CustomInputDateTime.vue'
  import negocioService from 'assets/js/service/negocio/NegocioService'
  import indexadorService from 'assets/js/service/IndexadorService'

  export default {
    name: "NewTituloModal",
    components:{
      customInputText,
      customInputDatetime
    },
    watch: {
      verifyParcelas: {
        handler: function (val, oldVal) {
          this.validateVerifyParcelas()
        },
        deep: true
      },
      currentStep: function (val) {
        if(val == 'vencimentos'){
          this.generateFormParcelas()
        }
        if(val != 'vencimentos'){
          this.verifyParcelas = [];
        }
      }
    },
    data(){
      return {
        isModalOpened: false,
        currentStep: 'pagarReceber',
        titulo: new Titulo(),
        //prefixMoeda: null,
        numParcelas: null,
        verifyParcelas: [],
        isValid: false,
        errorValue: 'text-positive',
        dataAtual: this.moment().format('YYYYMMDD'),
        indexadores: [],
        // moedas:[
        //   {
        //     id: 1,
        //     nome: 'Real',
        //     plural: 'Reais',
        //     simbolo: 'R$'
        //   },
        //   {
        //     id: 2,
        //     nome: 'Dollar',
        //     plural: 'Dollars',
        //     simbolo: '$'
        //   }
        // ],
      }
    },
    methods: {
      openModal: function(){
        this.isModalOpened = true;
        this.titulo = new Titulo();
        this.listIndexadores();
      },
      closeModal: function(){
        this.isModalOpened = false;
        this.currentStep = 'pagarReceber';
        this.$emit('modal-closed')
      },
      goToNextStep(){
        if(this.currentStep === 'classificacao'){
          //this.cultura.classificacoes = this.classificacoes;
          this.listArmazensByProdutor();
        }
        this.$refs.stepperTitulo.next();
      },
      selectIndexador: function(indexador){
        if(this.titulo.indexador != null){
          this.titulo.indexador = null;
        }else{
          this.titulo.indexador = indexador;
          this.goToNextStep()
        }
      },
      isIndexadorSelected: function(id){
        if(this.titulo.indexador === null){
          return false;
        }
        if(this.titulo.indexador.id === id){
          return true;
        }
      },
      generateFormParcelas: function(){
        let total = 0;
        for (var parcela = 1; parcela <= this.numParcelas; parcela++) {
          let valorParcela = 0;
          if(parcela === this.numParcelas){
            valorParcela = parseFloat((this.titulo.valor.value - total).toFixed(2));
          }else{
            valorParcela = Math.round((this.titulo.valor.value * 100) / this.numParcelas)/100;
          }
          total += valorParcela;

          this.verifyParcelas.push({
            numero: parcela,
            vencimento:{ value: this.moment().add(parcela * 30, 'days').format('YYYY-MM-DD')} ,
            valor: { value: valorParcela }
          });
        }
      },
      validateVerifyParcelas: function(){
        let validaValorTotal = 0;
        this.verifyParcelas.forEach(function (valida) {
          validaValorTotal += parseFloat(valida.valor.value);
          if(valida.valor.value === ''){
            this.errorValue = 'text-negative'
            this.isValid = true;
          }
          if(valida.vencimento.value == null){
            this.isValid = true;
          }
        }, this);
        if(validaValorTotal > this.titulo.valor.value || validaValorTotal < this.titulo.valor.value){
          this.errorValue = 'text-negative';
          this.isValid = true;
        }else{
          this.isValid = false;
          this.errorValue = 'text-positive'
        }
      },
      isNextTituloStep: function(){
        if(this.titulo.isPagar.value == null && this.currentStep === 'pagarReceber'){
          return true
        }
        if(this.titulo.indexador === null && this.currentStep === 'indexador'){
          return true
        }
        if(this.titulo.valor.value == null && this.currentStep === 'valor'){
          return true
        }
        if((this.numParcelas == null || this.numParcelas === 0) && this.currentStep === 'parcelas'){
          return true
        }
        if(this.currentStep === 'vencimentos'){
          this.generateFormParcelas()
        }
        return false;
      },
      saveAttachTitulo: function(){
        this.titulo.parcelas = this.verifyParcelas;
        negocioService.saveAttachTitulo(this.titulo.getValues()).then(response => {
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Título vinculado com sucesso'});
            this.closeModal();
            this.$router.go(-1);
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });
      },
      listIndexadores: function(){
        indexadorService.listIndexadores().then(response => {
          this.indexadores = response.data;
        })
      }
    }
  }
</script>

<style scoped>

</style>
