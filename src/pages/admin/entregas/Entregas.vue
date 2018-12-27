<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Entregas" navigation_type="menu" >'
    </toolbar>

    <div class="row gutter-sm space-end q-ma-lg"></div>

    <!--EMPTY LIST-->
    <div class="column q-ma-xl items-center">
      <div class="col-6">
        <img src="assets/images/sad_2.svg" class="responsive"/>
      </div>
      <div class="col-6 text-justify">
        <span>Nenhum resultado encontrado.</span>
      </div>
    </div>

    <!--PAGE STICKY BUTTOMS-->
    <q-page-sticky position="bottom-right" :offset="[35, 35]">
      <q-fab icon="add" direction="up" color="deep-orange" class="custom-fab" >
        <q-fab-action color="grey-1" text-color="grey-7" icon="add" @click="attachCultura()">
          <span class="shadow-2">Cultura</span>
        </q-fab-action>
        <q-fab-action color="grey-1" text-color="grey-7" @click="attachTitulo()" icon="add">
          <span class="shadow-2">Título</span>
        </q-fab-action>
        <q-fab-action color="grey-1" text-color="grey-7" @click="attachProduto()" icon="add">
          <span class="shadow-2">Produto</span>
        </q-fab-action>
        <q-fab-action color="grey-1" text-color="grey-7" @click="attachFixacao()" icon="add">
          <span class="shadow-2">Fixação</span>
        </q-fab-action>
      </q-fab>
    </q-page-sticky>

    <!--MODAL VINCULAR TITULO -->
    <q-modal v-model="modalAttachTitulo" maximized key="titulo">

      <q-stepper key="titulo" ref="stepperTitulo" contractable color="positive" v-model="currentStepTitulo" class="no-shadow">

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
        <q-step title="Moeda" name="moeda">
          <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
            <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">

              <div class="row gutter-y-xs">
                <div class="col-12 q-title text-center">Qual a moeda?</div>
                <div class="col-12" v-for="moeda in moedas" :key="moeda.nome">
                  <q-btn class="full-width" @click.native="selectMoeda(moeda)" :color="isMoedaSelected(moeda.id)">
                    {{moeda.simbolo}}&nbsp{{moeda.nome}}
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
                  <custom-input-text key="valor" :prefix="prefixMoeda" type="number" :model="titulo.valor" align="right"/>
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
                        <q-input type="number" v-model="parcela.valor.value" :decimals="2" :prefix="prefixMoeda" align="right"/>
                      </div>
                    </div>

                  </q-item-main>
                </q-item>
                <div class="row q-mt-md justify-end">
                  <div class="col-xs-6 col-lg-4 self-center text-justify">
                    <span class="text-faded">Total: {{prefixMoeda}}</span>&nbsp
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
        <q-btn label="próximo" color="primary" @click="goToNextStep" :disable="isNextTituloStep()" v-if="currentStepTitulo != 'vencimentos'"/>
        <q-btn label="salvar" color="primary" @click="saveAttachTitulo" :disable="isValid" v-if="currentStepTitulo  == 'vencimentos' "/>
      </q-page-sticky>
    </q-modal>


  </custom-page>
</template>
<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import customInputDatetime from 'components/CustomInputDateTime.vue'
  import Cultura from 'assets/js/model/negocio/Cultura'
  import Titulo from 'assets/js/model/negocio/Titulo'
  import Produto from 'assets/js/model/negocio/Produto'
  import Fixacao from 'assets/js/model/negocio/Fixacao'
  import negocioService from 'assets/js/service/negocio/NegocioService'
  import unidadeMedidaService from 'assets/js/service/UnidadeMedidaService'
  import safraCulturaService from 'assets/js/service/safra/SafraCulturaService'
  import culturaClassificacaoService from 'assets/js/service/cultura/CulturaClassificacaoService'
  import armazemService from 'assets/js/service/localizacao/ArmazemService'

  export default {
    name: "negocio-view",
    components: {
      toolbar,
      customPage,
      customInputText,
      customInputDatetime
    },
    data () {
      return {
        titulo: new Titulo(),
        prefixMoeda: null,
        numParcelas: null,
        verifyParcelas: [],
        isValid: false,
        errorValue: 'text-positive',
        dataAtual: this.moment().format('YYYYMMDD'),

        // OUTROS
        unidadesMedida: [],
        modalAttachTitulo: false,
        currentStepTitulo: 'pagarReceber',
      }
    },
    watch: {
    },
    computed: {
      totalBrutoUn: function () {
        if (this.fixacao.quantidade.value != 0) {
          this.fixacao.totalBruto.value = (this.fixacao.quantidade.value * this.fixacao.preco.value);
          return this.fixacao.totalBruto.value / this.fixacao.quantidade.value;
        }
        return null;
      },
    },
    methods: {

      attachTitulo: function(){
        this.modalAttachTitulo = true;
      },
      isNextTituloStep: function(){
        if(this.titulo.isPagar.value == null && this.currentStepTitulo == 'pagarReceber'){
          return true
        }
        if(this.titulo.moedaId.value == null && this.currentStepTitulo == 'moeda'){
          return true
        }
        if(this.titulo.valor.value == null && this.currentStepTitulo == 'valor'){
          return true
        }
        if((this.numParcelas == null || this.numParcelas == 0) && this.currentStepTitulo == 'parcelas'){
          return true
        }
        if(this.currentStepTitulo == 'vencimentos'){
          this.generateFormParcelas()
        }
        return false;
      },
      selectMoeda: function(moeda){
        if(this.titulo.moedaId.value == moeda.id){
          this.titulo.moedaId.value = null;
          this.prefixMoeda = null;
        }else{
          this.titulo.moedaId.value = moeda.id;
          this.prefixMoeda = moeda.simbolo;
          this.goToNextStep()
        }
      },
      generateFormParcelas: function(){
        let total = 0;
        for (var parcela = 1; parcela <= this.numParcelas; parcela++) {
          let valorParcela = 0;
          if(parcela === this.numParcelas){
            //valorParcela = this.titulo.valor.value - total;
            valorParcela = parseFloat((this.titulo.valor.value - total).toFixed(2));
          }else{
            valorParcela = Math.round((this.titulo.valor.value * 100) / this.numParcelas)/100;
          }
          total += valorParcela;

          this.verifyParcelas.push({
            numero: parcela,
            vencimento:{ value: this.moment().format('YYYY-MM-DD')} ,
            valor: { value: valorParcela }
          });
        }
      },
      validateVerifyParcelas: function(){
        let validaValorTotal = 0;
        this.verifyParcelas.forEach(function (valida) {
          validaValorTotal += parseFloat(valida.valor.value);
          if(valida.valor.value == ''){
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



      delete1: function(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esta Negocio?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          negocioService.deleteNegocio(id).then(response => {
            this.listCulturas()
          })
        }).catch(()=>{});
      },

      getUnidadesMedida:function(){
        unidadeMedidaService.listUnidadesMedida().then(response => {
          this.unidadesMedida = response.data;
        })
      },
      parsedUnidades: function(unidades){
        return unidades.map(unidade => {
          return {
            label: unidade.nome,
            value: unidade.id
          }
        })
      },
      closeModal: function(){
        this.cultura = new Cultura();
        this.titulo = new Titulo();
        this.currentStepCultura = 'safra';
        this.currentStepTitulo = 'pagarReceber';
        this.modalAttachSafraCultura = false;
        this.modalAttachTitulo = false;
        this.modalAttachProduto = false;
        this.modalAttachFixacao = false;
        this.isQuantidade = false;
        // this.currentStep = 'negociante';
      },
      getNegocioById: function(){
        negocioService.getNegocioById(this.$route.params.id).then(response => {
          this.negocio = response.data;
        });
        this.negocio = 'ijijiijiji';
      },
      goToNextStep(){
        if(this.modalAttachSafraCultura){
          //Cultura
          if(this.currentStepCultura === 'classificacao'){
            this.cultura.classificacoes = this.classificacoes;
            this.listArmazensByProdutor();
          }


        }
        if(this.currentStepFixacao == 'quantidade'){
          if(this.fixacao.quantidade.value == null || this.fixacao.unidadeMedidaQuantidadeId.value == null){
            return;
          }
        }
        if(this.currentStepFixacao == 'preco'){
          this.fixacao.totalLiquido.value = this.fixacao.quantidade.value * this.fixacao.preco.value;
        }
        this.$refs.stepperSafraCultura.next();
        this.$refs.stepperTitulo.next();
        this.$refs.stepperProduto.next();
        this.$refs.stepperFixacao.next();
      }
    },
    mounted () {
      // this.$root.$on('refreshSafraList', () => {
      //   this.listSafras();
      // });
    },
  }
  // this.$q.notify({type: 'negative', message: 'aqui'})

</script>
<style>
  .space-end{
    margin-bottom: 200px;
  }
  .custom-fab .q-fab-actions .q-btn  span{
    position: absolute;
    background: white;
    right: 46px;
    border-radius: 6px;
    padding: 7px 10px;
  }
</style>
