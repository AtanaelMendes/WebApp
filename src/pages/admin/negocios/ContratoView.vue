<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Detalhes do Negocio" navigation_type="menu" >
    </toolbar>

    <!--CONTRATO VIEW-->
    <div class="row gutter-sm space-end q-ma-lg">

      <!--NEGOCIO-->
      <template>
        <div :class="direita">
          <div class="row gutter-xs">
            <div class="col-12">
              VENDA oQueVaiAqui? / oQueVaiAqui? - 20 dezembro 2018
            </div>
            <div class="col-12 text-faded q-caption">
              Contrato de venda com ADM do Brasil Ltda emitido em 20 dezembro de 2018.
              Número do pedido 21695498 Número do contrato 65496665846
            </div>
            <div class="col-12">
              Observações
              <p class="text-faded q-caption">so caso houver observaçoes o conteudo irá aqui</p>
            </div>
          </div>
        </div>

        <div :class="esquerda">
          <div class="row gutter-xs">
            <div class="col-12 bg-blue-grey-1">
              <div class="row">
                <div class="col-6 self-center">ADM</div>
                <div class="col-6 self-center" align="end">
                  <q-btn icon="more_vert" flat dense round></q-btn>
                </div>
              </div>
            </div>
            <div class="col-12 text-faded q-caption">
              ADM do brasil Ltda, Rod BR 163 KM 855 - Camping club, Sinop-MT
            </div>
          </div>
        </div>
      </template>

      <!--NEGOCIO CULTURAS-->
      <template>
        <div :class="direita">
          <div class="row gutter-xs">
            <div class="col-12">SOJA 2018/2019</div>
            <div class="col-12 text-faded q-caption">
              Entrega
              <q-progress :percentage="progressModel + 10" height="6px" color="blue" animate stripe/>
            </div>
            <div class="col-12 text-faded q-caption">
              Fixações
              <q-progress :percentage="progressModel - 10" height="6px" color="blue" animate stripe/>
            </div>
            <div class="col-12 text-faded q-caption">
              Financeiro
              <q-progress :percentage="progressModel + 20" height="6px" color="blue" animate stripe/>
            </div>
            <div class="col-12">
              Observações
              <p class="text-faded q-caption">so caso houver observaçoes o conteudo irá aqui</p>
            </div>
          </div>
        </div>

        <div :class="esquerda">
          <div class="row gutter-xs">
            <div class="col-12 bg-blue-grey-1">
              <div class="row">
                <div class="col-6 self-center">Detalhes</div>
                <div class="col-6 self-center" align="end">
                  <q-btn icon="more_vert" flat dense round></q-btn>
                </div>
              </div>
            </div>
            <div class="col-12">
              <span class="text-faded">Entregue</span> 3.500 <span class="text-faded">de</span> 5.000 SC/60
              <span class="text-faded">entre</span> 5 jan 2018 <span class="text-faded">e</span> 31 jan 2019.
              <span class="text-faded">Armazens</span> ADM Sinop, Bunge Sinop.
              <span class="text-faded">Tolerância de classificação</span> umidade 14%, impureza 1%, avariados 8%,
              verde 8%, quebrados 30%, mofados 6%, ardidos 4% e queimados 1%.
            </div>
          </div>

        </div>
      </template>

      <!--NEGOCIO FIXAÇOES-->
      <template>
        <div :class="direita">
          <div class="row">

            <div class="col-12 q-pb-xs">FINACEIRO</div>
            <div class="col-12 q-pb-xs">
              Recebido R$ 100.000,00
            </div>
            <div class="col-12 q-caption text-faded">
              R$ 20.000,00 em 15 fev 2019 na conta 22610-0
            </div>
            <div class="col-12 q-caption text-faded q-pb-xs">
              R$ 50.000,00 em (USD 12.88593 a taxa de 3,8802) em 01 fev na conta 22610-0
            </div>

            <div class="col-12 q-pb-xs">
              Para receber R$ 126.000,00
            </div>
            <div class="col-12 q-caption text-faded">
              R$ 30.000,00 em 01 mar 2019
            </div>
            <div class="col-12 q-caption text-faded">
              R$ 96.000,00 em 15 mar 2019
            </div>

          </div>
        </div>

        <div :class="esquerda">
          <div class="row gutter-xs">

            <div class="col-12 bg-blue-grey-1">
              <div class="row">
                <div class="col-6 self-center">3000 SC60 EM 25 Jan 2018</div>
                <div class="col-6 self-center" align="end">
                  <q-btn icon="more_vert" flat dense round></q-btn>
                </div>
              </div>
            </div>

            <div class="col-12">
              <div class="row">
                <div class="col-4 q-pb-xs"></div>
                <div class="col-4 q-pb-xs text-faded">SC60</div>
                <div class="col-4 q-pb-xs text-faded">Total</div>

                <div class="col-4 text-faded"> Bruto </div>
                <div class="col-4 text-faded">R$ 68,00</div>
                <div class="col-4 text-faded">R$ 205.500,00</div>

                <div class="col-4 text-faded"> Impostos </div>
                <div class="col-4 text-faded">R$ 2,61</div>
                <div class="col-4 text-faded">R$ 7.816,50</div>

                <div class="col-4 text-faded"> Acréscimos </div>
                <div class="col-4 text-faded">R$ 0,50</div>
                <div class="col-4 text-faded">R$ 1.500,00</div>

                <div class="col-4 text-faded"> Descontos </div>
                <div class="col-4 text-faded">R$ 0,75</div>
                <div class="col-4 text-faded">R$ 2.250,00</div>

                <div class="col-4"> Líquido </div>
                <div class="col-4">R$ 65,64</div>
                <div class="col-4">R$ 196.933,50</div>

              </div>
            </div>

          </div>
        </div>
      </template>

      <div class="row">
        <div class="col-8"></div>
        <div class="col-4"></div>
      </div>

      <div class="row">
        <div class="col-8"></div>
        <div class="col-4"></div>
      </div>

    </div>

    <!--EMPTY LIST-->
    <div class="column q-ma-xl items-center" v-if="negocio">
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
        <q-fab-action color="grey-1" text-color="grey-7" icon="add" @click="newNegocio('balcao')">
          <span>Balcão</span>
        </q-fab-action>
        <q-fab-action color="grey-1" text-color="grey-7" @click="newNegocio('compra')" icon="add">
          <span>Compra</span>
        </q-fab-action>
        <q-fab-action color="grey-1" text-color="grey-7" @click="newNegocio('venda')" icon="add">
          <span>Venda</span>
        </q-fab-action>
        <q-fab-action color="grey-1" text-color="grey-7" @click="newNegocio('troca')" icon="add">
          <span>Troca</span>
        </q-fab-action>
      </q-fab>
    </q-page-sticky>

    <!--MODAL NOVO NEGOCIO-->
    <q-modal v-model="modalNewNegocio" maximized>

      <q-stepper ref="stepperNegocio" contractable color="positive" v-model="currentStep" class="no-shadow" >

        <!--PASSO 1 ESCOLHER NEGOCIANTE-->
        <q-step default title="Negociante" name="negociante"></q-step>

        <!--PASSO 2 INFORMAR DETALHES -->
        <q-step title="Informações" name="informacoes"></q-step>

      </q-stepper>

      <q-page-sticky position="bottom-right" :offset="[30, 30]">
        <q-btn label="cancelar" color="primary" @click="closeModalNegocio" class="q-mr-sm"/>
        <q-btn label="próximo" color="primary" @click="goToNextStep" :disable="!isNextButtomEnabled()" v-if="currentStep"/>
        <q-btn label="salvar" color="primary" @click="saveNegocio" v-if="currentStep"/>
      </q-page-sticky>
    </q-modal>

  </custom-page>
</template>
<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import customInputDatetime from 'components/CustomInputDateTime.vue'
  import Negocio from 'assets/js/model/negocio/Negocio'
  import negocioService from 'assets/js/service/negocio/NegocioService'
  import pessoaAutocomplete from 'components/PessoaAutocomplete.vue'
  export default {
    name: "negocio-view",
    components: {
      toolbar,
      customPage,
      customInputText,
      customInputDatetime,
      pessoaAutocomplete
    },
    data () {
      return {
        direita: 'col-xs-12 col-sm-12 col-md-7 col-lg-7',
        esquerda: 'col-xs-12 col-sm-12 col-md-5 col-lg-5',
        negocio: null,
        progressModel: 50,
        modalNewNegocio: false,
        modalEditNegocio: false,
        currentStep: 'negociante',
      }
    },
    methods: {
      getNegocioById: function(){
        negocioService.getNegocioById().then(response => {
          this.negocio = response.data;
        });
        this.negocio = 'ijijiijiji';
      },


      newNegocio: function(type){
        this.negocioType = type;
        this.modalNewNegocio = true;
      },

      saveNegocio: function(){
        if(!this.negocio.isValid()){
          return;
        }
        negocioService.saveNegocio(this.negocio.getValues()).then(response => {
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Negócio criado com sucesso'});
            this.listNegocios();
            this.closeModalNegocio();
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });
      },
      editNegocio: function(negocio){
        this.selectedNegocioId = negocio;
        this.modalEditNegocio = true;
        this.fillFormNegocio(negocio)
      },
      fillFormNegocio: function(data){

      },
      updateNegocio: function(){
        if (!this.negocio.isValid()) {
          return;
        }
        negocioService.updateNegocio(this.selectedNegocioId, this.negocio.getValues()).then(response => {
          if (response.status === 200) {
            this.$q.notify({type: 'positive', message: 'Negócio atualizado com sucesso!'});
            this.listNegocios();
            this.closeModalNegocio();
          }
        })
      },
      closeModalNegocio: function(){
        this.negocio = new Negocio();
        this.modalNewNegocio = false;
        this.modalEditNegocio = false;
        this.currentStep = 'negociante';
      },
      archiveNegocio: function(id){
        negocioService.archiveNegocio(id).then(response => {
          this.listNegocios()
        })
      },
      restoreNegocio: function(id){
        negocioService.restoreNegocio(id).then(response => {
          this.listNegocios()
        })
      },
      deleteNegocio: function(id){
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
      isNextButtomEnabled: function(){
        if(this.currentStep){
          return true
        }
        return false
      },
      goToNextStep(){
        this.$refs.stepperNegocio.next();
      },
    },
    mounted () {
      this.getNegocioById();
      // this.$root.$on('refreshSafraList', () => {
      //   this.listSafras();
      // });
    },
  }
</script>
<style>
  .space-end{
    margin-bottom: 200px;
  }
  .custom-fab .q-fab-actions .q-btn  span{
    position: absolute;
    color: white;
    background: rgba(0, 0, 0, 0.3);
    right: 46px;
    border-radius: 6px;
    padding: 7px 10px;
  }
</style>
