<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Contratos" searchable navigation_type="menu" >
    </toolbar>

    <div class="space-end">

    </div>

    <!--EMPTY LIST-->
    <div class="column q-ma-xl items-center" >
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
        <q-fab-action color="grey-1" text-color="grey-7" @click="newfixacao" icon="add">
          <span>Fixação</span>
        </q-fab-action>
        <q-fab-action color="grey-1" text-color="grey-7" @click="produto" icon="add">
          <span>Produto</span>
        </q-fab-action>
        <q-fab-action color="grey-1" text-color="grey-7" @click="newTitulo" icon="add">
          <span>Título</span>
        </q-fab-action>
        <q-fab-action color="grey-1" text-color="grey-7" @click="safra" icon="add">
          <span>Safra</span>
        </q-fab-action>
      </q-fab>
    </q-page-sticky>

    <!--MODAIS-->
    <template>


      <!--MODAL UNDEFINED-->
      <q-modal v-model="modalUndefined" maximized no-backdrop-dismiss>
        <div class="row justify-center q-pt-lg">
          <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 q-display-1 text-center">
            MODAL ADD FOTO
          </div>
        </div>
        <div class="row justify-center content-center" style="min-height: 80vh"></div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn @click.native="closeModalAddFotoCultura" color="primary" label="Cancelar" class="q-mr-xs"/>
        </q-page-sticky>
      </q-modal>

      <!--MODAL UNDEFINED 2-->
      <q-modal v-model="modalUndefined2" maximized>

        <q-stepper ref="stepperNewCultivar" contractable color="positive" v-model="currentStep" class="no-shadow" >

          <!--PASSO 1 ESCOLHER CULTURA-->
          <q-step default title="Culturas" name="cultura">
            <div class="row justify-center items-center gutter-sm" style="min-height: 80vh"></div>
          </q-step>

          <!--PASSO 2 ESCOLHER A MARCA -->
          <q-step title="Marca" name="marca">
            <div class="row justify-center items-center gutter-sm" style="min-height: 80vh"></div>
          </q-step>

          <!--PASSO 3 ESCOLHER O TIPO CULTIVAR-->
          <q-step title="Tipo" name="tipo">
            <div class="row justify-center items-center" style="min-height: 80vh"></div>
          </q-step>

          <!--PASSO 4 ADICIONAR INFORMACOEA-->
          <q-step title="Informações" name="informacoes">
            <div class="row justify-center items-center" style="min-height: 80vh"></div>
          </q-step>

        </q-stepper>

        <q-page-sticky position="bottom-right" :offset="[30, 30]">
          <q-btn label="cancelar" color="primary" @click="closeModalAddCultivar" class="q-mr-sm"/>
          <q-btn label="próximo" color="primary" @click="goToNextStepNewCultivar" :disable="!isNextButtomEnabled()" v-if="currentStep !== 'informacoes' "/>
          <q-btn label="salvar" color="primary" @click="saveCultivar" v-if="currentStep == 'informacoes' "/>
        </q-page-sticky>
      </q-modal>

    </template>

  </custom-page>
</template>
<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import Cultura from 'assets/js/model/cultura/Cultura'
  import Marca from 'assets/js/model/cultura/Marca'
  import Cultivar from 'assets/js/model/cultura/Cultivar'
  import culturaService from 'assets/js/service/cultura/CulturaService'
  export default {
    name: "contratos",
    components: {
      toolbar,
      customPage,
      customInputText
    },
    data () {
      return {
        currentStep: 'cultura',
        modalUndefined: false,
        modalUndefined2: false,
      }
    },
    methods: {
      // CRUD CULTURA
      listCulturas: function() {
        culturaService.listCulturas().then(response => {
          this.culturas = response.data;
        })
      },
      newCultura: function(){
        this.modalNewCultura = true;
      },
      closeModalNewCultura: function(){
        this.cultura = new Cultura();
        this.modalNewCultura = false;
      },
      saveCultura: function(){
        if(!this.cultura.isValid()){
          return;
        }
        culturaService.saveCultura(this.cultura.getValues()).then(response => {
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Cultura criada com sucesso'});
            this.listCulturas();
            this.closeModalNewCultura();
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });
      },
      editCultura: function(cultura){
        this.selectedCulturaId = cultura.id;
        this.fillFormCultura(cultura);
        this.modalEditCultura = true;
      },
      fillFormCultura: function(cultura){
        this.cultura.nome.value = cultura.nome;
        this.cultura.defaultEstimativa.value = cultura.default_estimativa;
        this.cultura.defaultUnidadeMedidaId.value = cultura.default_unidade_medida_id;
        this.cultura.defaultUnidadeAreaId.value = cultura.default_unidade_area_id;
      },
      addFotoCultura: function(id){
        this.modalUndefined = true;
      },
      closeModalAddFotoCultura: function(){
        this.modalUndefined = false;
      },
      updateCultura: function() {
        if (!this.cultura.isValid()) {
          return;
        }
        culturaService.updateCultura(this.selectedCulturaId, this.cultura.getValues()).then(response => {
          if (response.status === 200) {
            this.$q.notify({type: 'positive', message: 'Cultura atualizada com sucesso!'});
            this.listCulturas();
            this.closeModalEditCultura();
          }
        })
      },
      closeModalEditCultura: function(){
        this.modalEditCultura = false;
        this.selectedCulturaId = null;
        this.cultura = new Cultura();
      },
      archiveCultura: function(id){
        culturaService.archiveCultura(id).then(response => {
          this.listCulturas()
        })
      },
      restoreCultura: function(id){
        culturaService.restoreCultura(id).then(response => {
          this.listCulturas()
        })
      },
      deleteCultura: function(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esta cultura?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          culturaService.deleteCultura(id).then(response => {
            this.listCulturas()
          })
        }).catch(()=>{});

      },

      // OUTROS
      clearErrorMessage: function(){
        this.cultivar.ciclo.errorMessage = null;
        this.cultura.defaultUnidadeMedidaId.errorMessage = null;
        this.cultura.defaultUnidadeAreaId.errorMessage = null;
      },
      choiseTypeValidation: function(value){
        if(value === true){
          //this.cultivar.isConvencional.value = true;
          this.cultivar.isRoundupReady.value = false;
          this.cultivar.isInox.value = false;
          this.cultivar.isIntacta.value = false;
        }
      },
      isNextButtomEnabled: function(){
        if(this.currentStep === 'tipo'){
          return true
        }
        return false
      },
      goToNextStepNewCultivar(){
        if(this.currentStep === 'tipo'){
          if(!this.cultivar.isConvencional.value){
            if(!this.cultivar.isRoundupReady.value && !this.cultivar.isInox.value && !this.cultivar.isIntacta.value){
              this.$q.dialog({
                noBackdropDismiss: true,
                title: 'Oops!',
                message: 'Escolha ao menos um tipo',
                ok: 'OK'
              });
              return;
            }
          }
        }
        this.$refs.stepperNewCultivar.next();
      },
    },
    mounted () {
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
    background: rgba(0, 0, 0, 0.16);
    right: 46px;
    border-radius: 6px;
    padding: 7px 10px;
  }
</style>
