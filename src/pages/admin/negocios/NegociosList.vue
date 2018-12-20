<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Negocios" searchable navigation_type="menu" >
    </toolbar>

    <!--LISTA DE CONTRATOS-->
    <div class="row gutter-sm space-end q-ma-lg">
      <div class="col-xs-12 col-sm-6 col-md- 4 col-lg-3" v-for="contrato in 10" :key="contrato">

        <q-card>
          <q-card-title @click.native="viewContrato(contrato)">
            Negocio{{contrato}}
            <div slot="right">
              <q-btn round flat dense icon="more_vert" @click.stop>
                <q-popover>
                  <q-list link no-boder>
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
    <div class="column q-ma-xl items-center" v-if="contratos.length <= 0">
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
            <div class="row text-center justify-center q-title">
              <div class="col-12">
                Com quem está negociando?
              </div>
              <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
                <pessoa-autocomplete label="Negociante" :model="negocio.pessoaId" :terms="terms" @input="selectedPessoa"/>
              </div>
            </div>
            <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">
              <div class="col-xs-12 col-sm-10 col-md-8 col-lg-6">

                <div class="row" v-for="grupoEconomico in 3" :key="grupoEconomico">
                  <div class="col-12">

                    <div class="row bg-blue-grey-1 q-pa-sm">
                      <div class="col-12 q-title">
                        ADM
                      </div>
                    </div>

                    <div class="row justify-center">
                      <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10">
                        <q-list no-border link separator>
                          <q-item v-for="pessoa in 5" :key="pessoa" @click.native="selectPesssoa(pessoa)">
                            <div class="row">
                              <div class="col-1">
                                <q-btn icon="done" size="8px" round dense color="positive" v-if="pessoa == negocio.pessoaId.value"/>
                              </div>
                              <div class="col-6">
                                Adm do Brasil
                              </div>
                              <div class="col-5 q-caption text-faded text-right">
                                20 Dezembro 2018
                              </div>
                              <div class="col-11 offset-1 q-caption text-faded">
                                50.721.088/0001-09 -  24813801-4
                              </div>
                              <div class="col-11 offset-1 q-caption text-faded">
                                Rua sem nome 2626, Camping Club, Sinop-MT
                              </div>
                            </div>
                          </q-item>
                        </q-list>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </q-step>

          <!--PASSO 2 INFORMAR DETALHES -->
          <q-step title="Informações" name="informacoes">
            <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">

              <div class="col-3">
                <custom-input-datetime :model="negocio.emissao" type="date" label="Data emissão"/>
                <custom-input-text :model="negocio.numeroContrato" type="number" label="Número do contrato"/>
                <custom-input-text :model="negocio.numeroPedido" type="number" label="Número do Pedido"/>
              </div>
              <div class="col-3">
                <q-input v-model="negocio.observacoes.value" type="textarea" float-label="Observações"/>
              </div>
            </div>
          </q-step>

        </q-stepper>

        <q-page-sticky position="bottom-right" :offset="[30, 30]">
          <q-btn label="cancelar" color="primary" @click="closeModalNegocio" class="q-mr-sm"/>
          <q-btn label="próximo" color="primary" @click="goToNextStep" :disable="!isNextButtomEnabled()" v-if="currentStep == 'negociante' "/>
          <q-btn label="salvar" color="primary" @click="saveNegocio" v-if="currentStep == 'informacoes' "/>
        </q-page-sticky>
      </q-modal>

    <!--MODAL EDIT NEGOCIO-->
    <q-modal v-model="modalEditNegocio" maximized>

      <q-stepper ref="stepperNegocio" contractable color="positive" v-model="currentStep" class="no-shadow" >

        <!--PASSO 1 ESCOLHER NEGOCIANTE-->
        <q-step default title="Negociante" name="negociante">
          <div class="row text-center justify-center q-title">
            <div class="col-12">
              Com quem está negociando?
            </div>
            <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
              <pessoa-autocomplete label="Negociante" :model="negocio.pessoaId" :terms="terms" @input="selectedPessoa"/>
            </div>
          </div>
          <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">
            <div class="col-xs-12 col-sm-10 col-md-8 col-lg-6">

              <div class="row" v-for="grupoEconomico in 3" :key="grupoEconomico">
                <div class="col-12">

                  <div class="row bg-blue-grey-1 q-pa-sm">
                    <div class="col-12 q-title">
                      ADM
                    </div>
                  </div>

                  <div class="row justify-center">
                    <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10">
                      <q-list no-border link separator>
                        <q-item v-for="pessoa in 5" :key="pessoa" @click.native="selectPesssoa(pessoa)">
                          <div class="row">
                            <div class="col-1">
                              <q-btn icon="done" size="8px" round dense color="positive" v-if="pessoa == negocio.pessoaId.value"/>
                            </div>
                            <div class="col-6">
                              Adm do Brasil
                            </div>
                            <div class="col-5 q-caption text-faded text-right">
                              20 Dezembro 2018
                            </div>
                            <div class="col-11 offset-1 q-caption text-faded">
                              50.721.088/0001-09 -  24813801-4
                            </div>
                            <div class="col-11 offset-1 q-caption text-faded">
                              Rua sem nome 2626, Camping Club, Sinop-MT
                            </div>
                          </div>
                        </q-item>
                      </q-list>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </q-step>

        <!--PASSO 2 INFORMAR DETALHES -->
        <q-step title="Informações" name="informacoes">
          <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">

            <div class="col-3">
              <custom-input-datetime :model="negocio.emissao" type="date" label="Data emissão"/>
              <custom-input-text :model="negocio.numeroContrato" type="number" label="Número do contrato"/>
              <custom-input-text :model="negocio.numeroPedido" type="number" label="Número do Pedido"/>
            </div>
            <div class="col-3">
              <q-input v-model="negocio.observacoes.value" type="textarea" float-label="Observações"/>
            </div>
          </div>
        </q-step>

      </q-stepper>

      <q-page-sticky position="bottom-right" :offset="[30, 30]">
        <q-btn label="cancelar" color="primary" @click="closeModalNegocio" class="q-mr-sm"/>
        <q-btn label="próximo" color="primary" @click="goToNextStep" :disable="!isNextButtomEnabled()" v-if="currentStep == 'negociante' "/>
        <q-btn label="salvar" color="primary" @click="updateNegocio" v-if="currentStep == 'informacoes' "/>
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
    name: "negocios",
    components: {
      toolbar,
      customPage,
      customInputText,
      customInputDatetime,
      pessoaAutocomplete
    },
    data () {
      return {
        contratos: [],
        terms: '',
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
      selectPesssoa: function(id){
        if(id == this.negocio.pessoaId.value){
          this.negocio.pessoaId.value = null;
        }else{
          this.negocio.pessoaId.value = id;
        }
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
      fillFormNegocio: function(negocio){
        this.negocio.pessoaId.value = negocio;
        this.negocio.emissao.value = this.moment(new Date()).format('YYYY-MM-DD');
        this.negocio.numeroPedido.value = negocio;
        this.negocio.numeroContrato.value = negocio;
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
      selectedPessoa: function(value = null){
        this.negocio.pessoaId.value = value.id;
      },
      isNextButtomEnabled: function(){
        if(this.currentStep === 'negociante' && this.negocio.pessoaId.value !== null){
          return true
        }
        return false
      },
      goToNextStep(){
        this.$refs.stepperNegocio.next();
      },
      viewContrato: function(id){
        this.$router.push({name: 'contrato_view', params: {id:id}});
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
