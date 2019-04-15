<template>
  <ap-modal ref="newTituloModal" title="Novo Título" :visible="isModalOpened" @hide="closeModal">
    <q-carousel slot="content" height="100%" no-swipe ref="stepperNovoTitulo" @slide-trigger="setStepperIndex">
      <!--PASSO 1 PAGAR OU RECEBER-->
      <q-carousel-slide class="q-pa-none">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Você vai</span>
        </div>

        <div class="q-px-lg q-py-sm" style="text-align: center">

          <q-card style="width: 110px" class="pagar-receber-card cursor-pointer" flat inline @click.native="selectPagarReceber(true)" >
            <q-card-main>
              <div class="pagar-receber-icon" v-bind:class="{'pagar-receber-icon-selected':titulo.isPagar.value === true}"><q-icon name="mdi-arrow-top-right" /></div>
              <div class="pagar-receber-nome">Pagar</div>
            </q-card-main>
          </q-card>

          <q-card style="width: 110px" class="pagar-receber-card cursor-pointer" flat inline @click.native="selectPagarReceber(false)" >
            <q-card-main>
              <div class="pagar-receber-icon" v-bind:class="{'pagar-receber-icon-selected':titulo.isPagar.value === false}"><q-icon name="mdi-arrow-bottom-left" /></div>
              <div class="pagar-receber-nome">Receber</div>
            </q-card-main>
          </q-card>

        </div>
      </q-carousel-slide>

      <!--PASSO 2 INFORMAR INDEXADOR-->
      <q-carousel-slide class="q-pa-none">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Qual é o indexador</span>
        </div>
        <div class="q-px-lg q-py-sm" style="text-align: center">
          <q-card style="width: 110px" class="indexador-card cursor-pointer" flat inline
                  @click.native="selectIndexador(indexador)" v-for="indexador in indexadores" :key="indexador.id">
            <q-card-main>
              <div class="indexador-icon" v-bind:class="{'indexador-icon-selected':isIndexadorSelected(indexador.id)}">{{indexador.sigla}}</div>
              <div class="indexador-nome">{{indexador.nome}}</div>
            </q-card-main>
          </q-card>
        </div>
      </q-carousel-slide>

      <!--PASSO 3 INFORMAR VALOR-->
      <q-carousel-slide class="q-pa-none">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Qual o valor</span>
        </div>
        <div class="q-px-lg q-py-sm">
          <div class="row justify-center">
            <div class="col-xs-12 col-sm-6">
              <custom-input-text key="valor" :prefix="titulo.indexador.sigla" type="number" :model="titulo.valor" align="right" v-if="titulo.indexador"/>
            </div>
          </div>
        </div>
      </q-carousel-slide>

      <!--PASSO 4 INFORMAR PARCELAS-->
      <q-carousel-slide class="q-pa-none">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Quantas Parcelas?</span>
        </div>
        <div class="q-px-lg q-py-sm text-center">
          <div class="counter-container">
            <q-btn icon="remove" class="counter-minus" round outline color="primary" @click="decreaseParcelaValue"/>
            <q-input type="number" class="counter-input" @blur="validParcelaValue"
                     v-model="numParcelas" hide-underline align="center"/>
            <q-btn icon="add" class="counter-plus" round outline color="primary" @click="increaseParcelaValue" />
          </div>
        </div>
      </q-carousel-slide>

      <!--PASSO 5 INFORMAR VENCIMENTOS-->
      <q-carousel-slide class="q-pa-none">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Informe o vencimento das parcelas</span>
        </div>
        <q-scroll-area style="width: auto; height: 315px;">
          <q-list no-border inset-separator>
            <q-item v-for="(parcela, index) in verifyParcelas" :key="parcela.numero">
              <q-item-side :letter="(index + 1) + 'ª'" color="primary" inverted/>
              <q-item-main>
                <div class="row" >

                  <div class="col-sm-6 col-xs-8">
                    <q-datetime v-model="parcela.vencimento.value" type="date" class="responsive-text-input"
                                :key="index" inverted color="primary"
                                align="center" modal format="DD/MM/YYYY"/>
                  </div>

                  <div class="col-sm-6 col-xs-4 self-center text-center text-faded">
                    <span class="q-body-1">{{ numeral((moment(parcela.vencimento.value) - moment(dataAtual)) / (1000 * 3600 * 24)).format('0') }} Dias</span>
                  </div>
                </div>

              </q-item-main>
              <q-item-side right style="width:100px">
                <q-input type="number" v-model="parcela.valor.value" inverted-light color="grey-1" width="100px"
                         :decimals="2" :prefix="titulo.indexador.sigla" align="right" class="responsive-text-input"/>
              </q-item-side>
            </q-item>
          </q-list>
        </q-scroll-area>
        <div class="row q-mx-md q-my-sm justify-end">
          <span class="text-faded" v-if="titulo.indexador">Total: {{titulo.indexador.sigla}}</span>&nbsp
          <span :class="errorValue">{{numeral(titulo.valor.value).format('0,0.00')}}</span>
        </div>
      </q-carousel-slide>
    </q-carousel>

    <div slot="footer">
      <q-btn @click="closeModal()" flat label="Cancelar" color="primary" />
      <div class="float-right ">
        <q-btn @click="goToPreviousStep" flat label="voltar" color="primary" class="q-mr-sm" v-if="currentStep !== 0"/>
        <q-btn @click="goToNextStep" flat label="próximo" color="primary" v-if="currentStep !== 4" :disable="isNextTituloStep()"/>
        <q-btn @click="saveAttachTitulo" flat label="Salvar" color="primary" :disable="isValid" v-if="currentStep === 4"/>
      </div>
    </div>
  </ap-modal>
</template>

<script>
  import Titulo from 'assets/js/model/negocio/Titulo'
  import customInputText from 'components/CustomInputText.vue'
  import customInputDatetime from 'components/CustomInputDateTime.vue'
  import NegocioService from "../../../../../assets/js/service/negocio/NegocioService";
  import IndexadorService from "../../../../../assets/js/service/IndexadorService";
  import apModal from 'components/ApModal'

  export default {
    name: "NewTituloModal",
    components:{
      customInputText,
      customInputDatetime,
      apModal
    },
    watch: {
      verifyParcelas: {
        handler: function (val, oldVal) {
          this.validateVerifyParcelas()
        },
        deep: true
      },
      currentStep: function (val) {
        if(val === 4){
          this.generateFormParcelas()
        }else{
          this.verifyParcelas = [];
        }
      }
    },
    data(){
      return {
        indexadorService: new IndexadorService(),
        negocioService: new NegocioService(),
        isModalOpened: false,
        currentStep: 0,
        negocio: null,
        titulo: new Titulo(),
        numParcelas: 1,
        verifyParcelas: [],
        isValid: false,
        errorValue: 'text-positive',
        dataAtual: this.moment().format('YYYYMMDD'),
        indexadores: null,
      }
    },
    methods: {
      openModal(negocio){
        this.isModalOpened = true;
        this.titulo = new Titulo();
        this.negocio = negocio;
        this.titulo.pessoaId = negocio.pessoa.id;
        this.listIndexadores();
      },
      closeModal(){
        this.isModalOpened = false;
        this.resetModal();
        this.$emit('modal-closed')
      },
      resetModal(){
        this.$refs.stepperNovoTitulo.goToSlide(0);
        this.numParcelas = 1;
      },
      setStepperIndex(oldIndex, newIndex, direction){
        this.currentStep = newIndex;
      },
      goToNextStep(){
        this.$refs.stepperNovoTitulo.next();
      },
      goToPreviousStep(){
        this.$refs.stepperNovoTitulo.previous();
      },
      selectPagarReceber(value){
        this.titulo.isPagar.value = value;
        this.goToNextStep();
      },
      selectIndexador(indexador){
        if(this.titulo.indexador != null){
          this.titulo.indexador = null;
        }else{
          this.titulo.indexador = indexador;
          this.goToNextStep()
        }
      },
      isIndexadorSelected(id){
        if(this.titulo.indexador === null){
          return false;
        }
        if(this.titulo.indexador.id === id){
          return true;
        }
      },
      generateFormParcelas(){
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
            //numero: parcela,
            vencimento:{ value: this.moment().add(parcela * 30, 'days').format('YYYY-MM-DD')} ,
            valor: { value: valorParcela }
          });
        }
      },
      increaseParcelaValue(){
        this.numParcelas++;
      },
      decreaseParcelaValue(){
        if(this.numParcelas === 1){
          return;
        }
        this.numParcelas--;
      },
      validParcelaValue(){
        if(this.numParcelas < 1){
          this.numParcelas = 1;
        }
      },
      validateVerifyParcelas(){
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
      isNextTituloStep(){
        if(this.titulo.isPagar.value == null && this.currentStep === 0){
          return true
        }
        if(this.titulo.indexador === null && this.currentStep === 1){
          return true
        }
        if(this.titulo.valor.value == null && this.currentStep === 2){
          return true
        }
        if((this.numParcelas == null || this.numParcelas === 0) && this.currentStep === 3){
          return true
        }
        if(this.currentStep === 4){
          this.generateFormParcelas()
        }
        return false;
      },
      saveAttachTitulo(){
        this.$refs.newTituloModal.showOuterProgress();
        this.titulo.parcelas = this.verifyParcelas;
        this.negocioService.saveAttachTitulo(this.negocio.id, this.titulo.getValues()).then(response => {
          this.$q.notify({type: 'positive', message: 'Título vinculado com sucesso'});
          this.$refs.newTituloModal.hideOuterProgress();
          this.closeModal();
          this.$root.$emit('refreshNegocio')
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response});
          this.$refs.newTituloModal.hideOuterProgress();
        });
      },
      listIndexadores(){
        this.$refs.newTituloModal.showInnerProgress();
        this.indexadorService.listIndexadores().then(indexadores => {
          this.indexadores = indexadores;
          this.$refs.newTituloModal.hideInnerProgress();
        })
      }
    }
  }
</script>

<style scoped>
  .pagar-receber-card,
  .indexador-card{
    text-align: center;
    margin: 8px;
  }
  .pagar-receber-icon,
  .indexador-icon{
    background: #f3f1f1;
    display: inline-block;
    width: 60px;
    height: 60px;
    font-weight: 400;
    font-size: 16px;
    line-height: 60px;
    border-radius: 60px;
  }
  .pagar-receber-icon{
    font-size: 30px;
  }
  .pagar-receber-icon-selected,
  .indexador-icon-selected{
    background: #005f5f;
    color: white;
  }
  .pagar-receber-nome,
  .indexador-nome{
    margin-top: 12px;
    font-size: 16px;
    color: #454545;
  }

  .counter-container{
    align-items: center;
    display: inline-flex;
    margin-top: 20px;
  }
  .counter-container .counter-input{
    width: 100px;
    height: 100px;
    border-radius: 50px;
    padding: 10px;
    margin: 0 12px;
    background: #fafafa;
    border: 1px solid #005f5f;
  }

  .counter-container .counter-input input{
    font-size: 30px;
    height: auto;
    color: #005f5f;
    font-weight: 500;
  }
</style>
