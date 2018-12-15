<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Cultivares" searchable navigation_type="menu" >
    </toolbar>

    <template v-if="culturas.length > 0">

      <!--HEADER CULTURA-->
      <div class="row gutter-y-sm q-pa-md bg-blue-grey-1">

        <div class="col-6 q-title self-center">
          Soja
        </div>
        <div class="col-6" align="end">
          <q-btn icon="edit" @click.native="editCultura(1)" flat round color="primary"/>
          <q-btn round flat dense icon="more_vert">
            <q-popover>
              <q-list link class="no-border">
                <q-item v-close-overlay @click.native="addFotoCultura(1)">
                  <q-item-main label="Atualizar Foto"/>
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
        <div class="col-3">
          <q-card>
            <q-card-title>
              Monsoy
              <div slot="right">
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
              </div>
            </q-card-title>
            <q-card-media>
              <img src="assets/images/no-image.png"/>
            </q-card-media>
          </q-card>
        </div>

        <!--CULTIVARES-->
        <div class="col-9">
          <div class="row gutter-y-xs" v-for="cultivar in 10">
            <div class="col-12">
              <q-list separator>
                <q-item>
                  <q-item-main>
                    <div class="row">
                      <div class="col-6">M8644 IPRO</div>
                      <div class="col-6">Ciclo Médio 90 dias</div>
                    </div>
                  </q-item-main>
                  <q-item-side>
                    <q-btn round flat dense icon="more_vert">
                      <q-popover>
                        <q-list link class="no-border">
                          <q-item v-close-overlay @click.native="editCultivar(1)">
                            <q-item-main label="Editar"/>
                          </q-item>
                          <q-item v-close-overlay @click.native="changeType(1)">
                            <q-item-main label="Alterar tipo"/>
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
    </template>


    <!--EMPTY LIST-->
    <div class="column q-ma-xl items-center" v-if="culturas.length <= 0">
      <div class="col-6">
        <img src="assets/images/sad_2.svg" class="responsive"/>
      </div>
      <div class="col-6 text-justify">
        <span>Nenhum resultado encontrado.</span>
      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[35, 35]">
      <q-fab icon="add" direction="up" color="primary" >
        <q-fab-action no-icon>
          <q-btn v-close-overlay rounded color="primary" @click="newCultura" label="cultura"/>
        </q-fab-action>
        <q-btn rounded color="primary" @click="newMarca" label="marca"/>
        <q-btn rounded color="primary" @click="newCultivar" label="cultivar"/>
      </q-fab>
    </q-page-sticky>

    <!--MODAIS-->
    <template>
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

      <!--MODAL EDIT CULTURA-->
      <q-modal v-model="modalEditCultura" maximized >
        <div class="row justify-center q-pt-lg">
          <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 q-display-1 text-center">
            MODAL EDIT CULTURA
          </div>
        </div>
        <div class="row justify-center content-center" style="min-height: 80vh"></div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn @click.native="closeModalEditCultura" color="primary" label="Cancelar" class="q-mr-xs"/>
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
          <q-btn @click.native="closeModalAddFotoCultura" color="primary" label="Cancelar" class="q-mr-xs"/>
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

      <!--MODAL EDIT MARCA-->
      <q-modal v-model="modalEditMarca" maximized >
        <div class="row justify-center q-pt-lg">
          <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 q-display-1 text-center">
            MODAL EDIT MARCA
          </div>
        </div>
        <div class="row justify-center content-center" style="min-height: 80vh"></div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn @click.native="closeModalEditMarca" color="primary" label="Cancelar" class="q-mr-xs"/>
        </q-page-sticky>
      </q-modal>

      <!--MODAL ADD FOTO MARCA-->
      <q-modal v-model="modalAddFotoMarca" maximized >
        <div class="row justify-center q-pt-lg">
          <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 q-display-1 text-center">
            MODAL ADD FOTO MARCA
          </div>
        </div>
        <div class="row justify-center content-center" style="min-height: 80vh"></div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn @click.native="closeModalAddFotoMarca" color="primary" label="Cancelar" class="q-mr-xs"/>
        </q-page-sticky>
      </q-modal>

      <!--MODAL NEW CULTIVAR-->
      <q-modal v-model="modalNewCultivar" maximized>

        <q-stepper ref="stepperNewCultivar" contractable color="positive" v-model="stepper" class="no-shadow" >

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
          <q-btn label="cancelar" color="primary" @click="closeModalAddCultivar" class="q-mr-sm"/>
          <q-btn label="próximo" color="primary" @click="goToNextStepNewCultivar" :disable="isNext" v-if="stepper != 'informacoes' "/>
          <q-btn label="salvar" color="primary" @click="saveCultivar" v-if="stepper == 'informacoes' "/>
        </q-page-sticky>
      </q-modal>

      <!--MODAL EDIT CULTIVAR-->
      <q-modal v-model="modalEditCultivar" maximized>

        <q-stepper ref="stepper" contractable color="positive" class="no-shadow" >

          <!--PASSO 1 ADICIONAR INFORMACOEA-->
          <q-step default title="Informações" name="informacoes"></q-step>

        </q-stepper>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn class="q-mr-sm" label="cancelar" color="primary" @click="closeModalEditCultivar"/>
          <q-btn label="salvar" color="primary" @click="updateCultivar"/>
        </q-page-sticky>
      </q-modal>

      <!--MODAL CHANGE TYPE CULTIVAR-->
      <q-modal v-model="modalChangeTypeCultivar" maximized>

        <q-stepper ref="stepper" contractable color="positive" class="no-shadow" >

          <!--PASSO 1 ADICIONAR INFORMACOEA-->
          <q-step default title="Tipo" name="tipo"></q-step>

        </q-stepper>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn class="q-mr-sm" label="cancelar" color="primary" @click="closeModalEditCultivar"/>
          <q-btn label="salvar" color="primary" @click="updateCultivar"/>
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
          stepper: 'cultura',
          isNext: true,
          modalNewCultura: false,
          modalEditCultura: false,
          modalAddFotoCulura: false,
          modalNewMarca: false,
          modalEditMarca: false,
          modalAddFotoMarca: false,
          modalNewCultivar: false,
          modalEditCultivar: false,
          modalChangeTypeCultivar: false,
          culturas: [],
          cultura: new Cultura(),
          selectedCultura: null,
          marca: new Marca(),
          selectedMarca: null,
          cultivar: new Cultivar(),
          selectedCultivar: null,
        }
      },
      methods: {
        // CRUD CULTURA
        listCulturas: function(){
          let fake = 'soja';
          this.culturas.push({ name: fake });
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
        editCultura: function(data){
          console.log('aqui')
          // this.selectedCultura = data;
          // this.fillFormCultura(data);
          this.modalEditCultura = true;
        },
        fillFormCultura: function(data){},
        addFotoCultura: function(id){
          this.modalAddFotoCulura = true;
        },
        closeModalAddFotoCultura: function(){
          this.modalAddFotoCulura = false;
        },
        updateCultura: function(){
          if(!this.cultura.isValid()){
            return;
          }
          safraService.updateSafra(this.selectedCultura, this.cultura.getValues()).then(response => {
            if(response.status === 200) {
              this.$q.notify({type: 'positive', message: 'Cultura atualizada com sucesso!'});
              this.listCulturas();
              this.closeModalEditCultura();
            }
          }).catch(error => {
            this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          });
        },
        closeModalEditCultura: function(){
          this.modalEditCultura = false;
          this.selectedCultura = null;
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

        // CRUD MARCA
        listMarcas: function(){
          let fake = 'soja';
          this.culturas.push({
            name: fake
          })

        },
        newMarca: function(){
          this.modalNewMarca = true;
        },
        closeModalNewMarca: function(){
          this.modalNewMarca = false;
        },
        saveMarca: function(){},
        addFotoMarca: function(){
          this.modalAddFotoMarca = true;
        },
        closeModalAddFotoMarca: function(){
          this.modalAddFotoMarca = false;
        },
        editMarca: function(data){
          this.modalEditMarca = true;
        },
        closeModalEditMarca: function(){
          this.modalEditMarca = false;
        },
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
        newCultivar: function(){
          this.modalNewCultivar = true;
        },
        closeModalAddCultivar: function(){
          this.modalNewCultivar = false;
        },
        saveCultivar: function(){},
        changeType: function(){},
        editCultivar: function(data){
          this.modalEditCultivar = true;
          this.fillFormEditCultivar(data);
        },
        fillFormEditCultivar: function(data){},
        closeModalEditCultivar: function(){
          this.modalEditCultivar = false;
          this.cultivar = new Cultivar();

        },
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

        goToNextStepNewCultivar(){
          if(this.stepper === 'tipo'){
            this.isNext = false
          }else{
            this.isNext = true
          }
          this.$refs.stepperNewCultivar.next()
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
