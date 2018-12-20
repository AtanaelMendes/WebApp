<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Negocios" searchable navigation_type="menu" >
    </toolbar>

    <div class="row gutter-sm space-end q-ma-lg">
      <div class="colxs-12 col-sm-6 col-md- 4 col-lg-3" v-for="contrato in 10" :key="contrato">

        <q-card>
          <q-card-title>
            Negocio{{contrato}}
            <div slot="right">
              <q-btn round flat dense icon="more_vert">
                <q-popover>
                  <q-list link class="no-border">
                    <q-item v-close-overlay @click.native="editNegocio(contrato)">
                      <q-item-main label="Editar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="archiveNegocio(contrato)">
                      <q-item-main label="Arquivar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="restoreNegocio(contrato)">
                      <q-item-main label="Ativar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="deleteNegocio(contrato)">
                      <q-item-main label="Excluir"/>
                    </q-item>
                  </q-list>
                </q-popover>
              </q-btn>
            </div>
          </q-card-title>
          <q-card-separator/>
          <q-card-main>
            Informações do contrato
          </q-card-main>
        </q-card>

      </div>
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
          <q-step default title="Negociante" name="negociante">
            <div class="row justify-center items-center gutter-sm" style="min-height: 80vh"></div>
          </q-step>

          <!--PASSO 2 INFORMAR DETALHES -->
          <q-step title="Informações" name="informacoes">
            <div class="row justify-center items-center gutter-sm" style="min-height: 80vh"></div>
          </q-step>

        </q-stepper>

        <q-page-sticky position="bottom-right" :offset="[30, 30]">
          <q-btn label="cancelar" color="primary" @click="closeModalNegocio" class="q-mr-sm"/>
          <q-btn label="próximo" color="primary" @click="goToNextStep" :disable="!isNextButtomEnabled()" v-if="currentStep"/>
          <q-btn label="salvar" color="primary" @click="saveNegocio" v-if="currentStep"/>
        </q-page-sticky>
      </q-modal>

    <!--MODAL EDIT NEGOCIO-->
    <q-modal v-model="modalEditNegocio" maximized>

      <q-stepper ref="stepperNegocio" contractable color="positive" v-model="currentStep" class="no-shadow" >

        <!--PASSO 1 ESCOLHER NEGOCIANTE-->
        <q-step default title="Negociante" name="negociante">
          <div class="row justify-center items-center gutter-sm" style="min-height: 80vh"></div>
        </q-step>

        <!--PASSO 2 INFORMAR DETALHES -->
        <q-step title="Informações" name="informacoes">
          <div class="row justify-center items-center gutter-sm" style="min-height: 80vh"></div>
        </q-step>

      </q-stepper>

      <q-page-sticky position="bottom-right" :offset="[30, 30]">
        <q-btn label="cancelar" color="primary" @click="closeModalNegocio" class="q-mr-sm"/>
        <q-btn label="próximo" color="primary" @click="goToNextStep" :disable="!isNextButtomEnabled()" v-if="currentStep"/>
        <q-btn label="salvar" color="primary" @click="updateNegocio" v-if="currentStep"/>
      </q-page-sticky>
    </q-modal>


  </custom-page>
</template>
<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import Negocio from 'assets/js/model/negocio/Negocio'
  import negocioService from 'assets/js/service/negocio/NegocioService'
  export default {
    name: "negocios",
    components: {
      toolbar,
      customPage,
      customInputText
    },
    data () {
      return {
        contratos: [],
        negocioType: null,
        negocio: new Negocio(),
        selectedNegocioId: null,
        modalNewNegocio: false,
        modalEditNegocio: false,
        currentStep: 'negociante',
      }
    },
    methods: {
      // CONTRATOS
      listNegocios: function(){
        negocioService.listNegocios().then(response => {
          this.contratos = response.data;
        });
        this.contratos.push({nome: 'contrato'});
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
      fillFormNegocio: function(negocio){},
      updateNegocio: function(){
        if (!this.negocio.isValid()) {
          return;
        }
        culturaService.updateCultura(this.selectedNegocioId, this.negocio.getValues()).then(response => {
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
        if(this.currentStep === 'tipo'){
          return true
        }
        return false
      },
      goToNextStep(){
        this.$refs.stepperNegocio.next();
      },
    },
    mounted () {
      this.listNegocios();
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
