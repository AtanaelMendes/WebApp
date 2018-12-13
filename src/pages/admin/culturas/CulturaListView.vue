<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Cultivares" searchable navigation_type="menu" >
    </toolbar>

    <!--HEADER CULTURA-->
    <div class="row gutter-y-sm q-pa-md bg-blue-grey-1">

      <div class="col-6 q-title self-center">
        Soja
      </div>
      <div class="col-6" align="end">
        <q-btn icon="edit" flat round color="primary"/>
        <q-btn round flat dense icon="more_vert">
          <q-popover>
            <q-list link class="no-border">
              <q-item v-close-overlay @click.native="addFotoCultura(1)">
                <q-item-main label="Atualizar Foto"/>
              </q-item>
              <q-item v-close-overlay @click.native="editCultura(1)">
                <q-item-main label="Editar"/>
              </q-item>
              <q-item v-close-overlay @click.native="archiveCultura(1)">
                <q-item-main label="Arquivar"/>
              </q-item>
              <q-item v-close-overlay @click.native="restoreCultura(1)">
                <q-item-main label="Ativar"/>
              </q-item>
              <q-item v-close-overlay @click.native="deleteCultura(1)">
                <q-item-main label="Excluir"/>
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </div>
    </div>

    <div class="row q-ma-md gutter-xs space-end">

      <!--MARCA-->
      <div class="col-2">
        <q-card>
          <q-card-main class="q-px-sm">
            <q-item class="q-pa-none">
              <q-item-main>Monsoy</q-item-main>
              <q-item-side>
                <q-btn round flat dense icon="more_vert">
                  <q-popover>
                    <q-list link class="no-border">
                      <q-item v-close-overlay @click.native="addFotoMarca(1)">
                        <q-item-main label="Atualizar Foto"/>
                      </q-item>
                      <q-item v-close-overlay @click.native="editMarca(1)">
                        <q-item-main label="Editar"/>
                      </q-item>
                      <q-item v-close-overlay @click.native="archiveMarca(1)">
                        <q-item-main label="Arquivar"/>
                      </q-item>
                      <q-item v-close-overlay @click.native="restoreMarca(1)">
                        <q-item-main label="Ativar"/>
                      </q-item>
                      <q-item v-close-overlay @click.native="deleteMarca(1)">
                        <q-item-main label="Excluir"/>
                      </q-item>
                    </q-list>
                  </q-popover>
                </q-btn>
              </q-item-side>
            </q-item>
          </q-card-main>
          <q-card-media>
            <img src="assets/images/no-image.png"/>
          </q-card-media>
        </q-card>
      </div>

      <!--CULTIVARES-->
      <div class="col-10">
        <div class="row gutter-y-xs" v-for="cultivar in 10">
          <div class="col-12">
            <q-list separator>
              <q-item>
                <q-item-main>M8644 IPRO</q-item-main>
                <q-item-side>

                  <q-btn round flat dense icon="more_vert">
                    <q-popover>
                      <q-list link class="no-border">
                        <q-item v-close-overlay @click.native="changeType(1)">
                          <q-item-main label="Atualizar Foto"/>
                        </q-item>
                        <q-item v-close-overlay @click.native="editCultivar(1)">
                          <q-item-main label="Editar"/>
                        </q-item>
                        <q-item v-close-overlay @click.native="archiveCultivar(1)">
                          <q-item-main label="Arquivar"/>
                        </q-item>
                        <q-item v-close-overlay @click.native="restoreCultivar(1)">
                          <q-item-main label="Ativar"/>
                        </q-item>
                        <q-item v-close-overlay @click.native="deleteCultivar(1)">
                          <q-item-main label="Excluir"/>
                        </q-item>
                      </q-list>
                    </q-popover>
                  </q-btn>
                </q-item-side>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>

    </div>

    <!--EMPTY LIST-->
    <!--<div class="column q-ma-xl items-center" v-if="culturas.length <= 0">-->
      <!--<div class="col-6">-->
        <!--<img src="assets/images/sad_2.svg" class="responsive"/>-->
      <!--</div>-->
      <!--<div class="col-6 text-justify">-->
        <!--<span>Nenhum resultado encontrado.</span>-->
      <!--</div>-->
    <!--</div>-->

    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-fab icon="add" direction="up" color="primary" >
        <q-btn rounded color="primary" @click="newCultura" label="cultura"/>
        <q-btn rounded color="primary" @click="newMarca" label="marca"/>
        <q-btn rounded color="primary" @click="newCultivar" label="cultivar"/>
      </q-fab>
    </q-page-sticky>

    <!--MODAIS-->
    <template>
      <!--MODAL ADD CULTIVAR-->
      <q-modal v-model="modalAddCultivar" maximized>

        <q-stepper ref="stepper" contractable color="positive" v-model="currentStep" class="no-shadow" >

          <!--PASSO 1 ESCOLHER CULTURA-->
          <q-step default title="Culturas" name="cultura"></q-step>

          <!--PASSO 2 ESCOLHER A MARCA -->
          <q-step title="Marca" name="marca"></q-step>

          <!--PASSO 3 ESCOLHER O TIPO CULTIVAR-->
          <q-step title="Tipo" name="tipo"></q-step>

          <!--PASSO 4 ADICIONAR INFORMACOEA-->
          <q-step title="Informações" name="informacoes"></q-step>

        </q-stepper>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn label="cancelar" color="primary" @click="closeModalAddCultivar"/>
        </q-page-sticky>
      </q-modal>

      <!--MODAL NEW CULTURA-->
      <q-modal v-model="modalNewCultura" maximized >
        <div class="row justify-center q-pt-lg">
          <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 q-display-1 text-center">
            MODAL NEW CULTURA
          </div>
        </div>
        <div class="row justify-center content-center" style="min-height: 80vh"></div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn @click.native="closeModalNewCultura" color="primary" label="Cancelar" class="q-mr-xs"/>
        </q-page-sticky>
      </q-modal>

      <!--MODAL NEW MARCA-->
      <q-modal v-model="modalNewMarca" maximized >
        <div class="row justify-center q-pt-lg">
          <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 q-display-1 text-center">
            MODAL NEW MARCA
          </div>
        </div>
        <div class="row justify-center content-center" style="min-height: 80vh"></div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn @click.native="closeModalNewMarca" color="primary" label="Cancelar" class="q-mr-xs"/>
        </q-page-sticky>
      </q-modal>

      <!--MODAL ADD FOTO CULTURA-->
      <q-modal v-model="modalAddFotoCulura" maximized >
        <div class="row justify-center q-pt-lg">
          <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 q-display-1 text-center">
            MODAL ADD FOTO
          </div>
        </div>
        <div class="row justify-center content-center" style="min-height: 80vh"></div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn @click.native="closeModalNewMarca" color="primary" label="Cancelar" class="q-mr-xs"/>
        </q-page-sticky>
      </q-modal>
    </template>

  </custom-page>
</template>
<script>
    import toolbar from 'components/Toolbar.vue'
    import customPage from 'components/CustomPage.vue'
    import Cultura from 'assets/js/model/safra/SafraCulturaTalhao'
    import Marca from 'assets/js/model/safra/SafraCulturaTalhao'
    import Cultivar from 'assets/js/model/safra/SafraCulturaTalhao'
    import culturaService from 'assets/js/service/cultura/CulturaService'
    export default {
      name: "cultura-list-view",
      components: {
        toolbar,
        customPage,
      },
      data () {
        return {
          currentStep: 'cultura',
          modalNewCultura: false,
          modalEditCultura: false,
          modalAddFotoCulura: false,
          modalNewMarca: false,
          modalEditMarca: false,
          modalAddFotoMarca: false,
          modalAddCultivar: false,
          modalEditCultivar: false,
          culturas: [],
          cultura: new Cultura(),
          marca: new Marca(),
          cultivar: new Cultivar(),
        }
      },
      methods: {
        closeModalNewCultura: function(){
          this.modalNewCultura = false;
        },
        closeModalAddCultivar: function(){
          this.modalAddCultivar = false;
        },
        closeModalNewMarca: function(){
          this.modalNewMarca = false;
        },

        // CRUD CULTURA
        listCulturas: function(){
          let fake = 'soja';
          this.culturas.push({
            name: fake
          })

        },
        newCultura: function(){
          this.modalNewCultura = true;
        },
        saveCultura: function(){},
        editCultura: function(){},
        addFotoCultura: function(){},
        editCultura: function(){},
        updateCultura: function(){},
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

        // CRUD MARCA
        listMarcas: function(){
          let fake = 'soja';
          this.culturas.push({
            name: fake
          })

        },
        saveMarca: function(){},
        addFotoMarca: function(){
          this.modalAddFotoMarca = true;
        },
        editMarca: function(){},
        updateMarca: function(){},
        archiveMarca: function(id){
          culturaService.archiveCultura(id).then(response => {
            this.listCulturas()
          })
        },
        restoreMarca: function(id){
          culturaService.restoreCultura(id).then(response => {
            this.listCulturas()
          })
        },
        deleteMarca: function(id){
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

        // CRUD CULTIVAR
        listCultivar: function(){
          let fake = 'soja';
          this.culturas.push({
            name: fake
          })

        },
        saveCultivar: function(){},
        changeType: function(){},
        editCultivar: function(){},
        updateCultivar: function(){},
        archiveCultivar: function(id){
          culturaService.archiveCultura(id).then(response => {
            this.listCulturas()
          })
        },
        restoreCultivar: function(id){
          culturaService.restoreCultura(id).then(response => {
            this.listCulturas()
          })
        },
        deleteCultivar: function(id){
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

        goToNextStep(){
          this.$refs.stepper.next()
        },
      },
      mounted () {
        this.listCulturas();
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
