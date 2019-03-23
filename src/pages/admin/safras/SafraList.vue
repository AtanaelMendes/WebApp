<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Safras" searchable navigation_type="menu" >
    </toolbar>

    <div class="row q-pa-md gutter-sm space-end" v-if="safras.length > 0">
      <template v-for="safra in safras">
        <!--HEADER-->
        <div class="col-12" :key="safra.id">
          <div class="row q-title q-pa-md bg-blue-grey-1">
            <div class="col-8 self-center">
              <span v-if="!safra.is_safrinha">Safra</span>
              <span v-if="safra.is_safrinha">Safrinha</span>
              {{safra.inicio}}/{{safra.fim}}
            </div>
            <div class="col-4" align="end">
              <q-checkbox class="q-mx-xs"
                @input="favoriteSafra(safra.id, safra.is_favorite)"
                color="deep-orange"
                checked-icon="flag"
                v-model="safra.is_favorite"
                unchecked-icon="outlined_flag"
              />
              <q-btn round flat dense icon="more_vert" color="grey-7">
                <q-popover>
                  <q-list link class="no-border">
                    <q-item v-close-overlay @click.native="addSafraCultura(safra.id)">
                      <q-item-main label="Adicionar Cultura"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="editSafra(safra)">
                      <q-item-main label="Editar"/>
                    </q-item>
                    <q-item v-close-overlay v-if="!safra.deleted_at" @click.native="archiveSafra(safra.id)" >
                      <q-item-main label="Arquivar"/>
                    </q-item>
                    <q-item v-close-overlay v-if="safra.deleted_at" @click.native="restoreSafra(safra.id)">
                      <q-item-main label="Ativar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="deleteSafra(safra.id)">
                      <q-item-main label="Excluir"/>
                    </q-item>
                  </q-list>
                </q-popover>
              </q-btn>
            </div>
          </div>
        </div>

        <!--LISTA DE SAFRA CULTURAS-->
        <template v-if="safra.safra_culturas.length > 0">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6" v-for="safraCultura in safra.safra_culturas" :key="safra.id + '_' +safraCultura.id">
            <q-card class="cursor-pointer" @click.native="viewSafraCultura(safra.id, safraCultura.id)">
              <q-card-media overlay-position="top" style="max-height: 40vh">
                <ap-image size="800x500" :file-name="safraCultura.image_file_name"/>
                <q-card-title slot="overlay">
                  {{safraCultura.nome}} {{safra.inicio}}/{{safra.fim}}
                  <span slot="subtitle">
                    {{safraCultura.tamanho}} {{safraCultura.view_unidade_area.plural}}
                  </span>
                  <q-btn @click.stop round flat dense icon="more_vert" slot="right" color="white">
                    <q-popover>
                      <q-list link class="no-border">
                        <q-item v-close-overlay v-if="!safraCultura.deleted_at" @click.native="editSafraCultura(safra.id, safraCultura)">
                          <q-item-main label="Editar"/>
                        </q-item>
                        <q-item v-close-overlay v-if="!safraCultura.deleted_at" @click.native="archiveSafraCultura(safra.id, safraCultura.id)">
                          <q-item-main label="Arquivar"/>
                        </q-item>
                        <q-item v-close-overlay v-if="safraCultura.deleted_at" @click.native="restoreSafraCultura(safra.id, safraCultura.id)">
                          <q-item-main label="Ativar"/>
                        </q-item>
                        <q-item v-close-overlay @click.native="deleteSafraCultura(safra.id, safraCultura.id)">
                          <q-item-main label="Excluir"/>
                        </q-item>
                      </q-list>
                    </q-popover>
                  </q-btn>
                </q-card-title>
              </q-card-media>
            </q-card>

          </div>
        </template>

        <!--LISTA VAZIA-->
        <div class="col-12 q-title text-center text-faded" v-else>
          <p class="cursor-pointer" @click="addSafraCultura(safra.id)">
            Clique aqui para adicionar uma cultura neste período de safra!
          </p>
        </div>

      </template>
    </div>

    <!--EMPTY LIST-->
    <div class="col-12" v-if="safras.length <= 0">
      <ap-no-results />
    </div>

    <q-page-sticky position="bottom-right" :offset="[35, 35]">
      <q-btn round color="deep-orange" size="20px" @click="addSafra" icon="add" />
    </q-page-sticky>

    <!--MODAL SAFRA CULTURA-->
    <new-cultura-modal ref="newCulturaModal" />

    <!--MODAL NEW SAFRA-->
    <q-modal v-model="modalNewSafra" maximized >
      <div class="row justify-center q-pt-lg">
        <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 q-display-1 text-center">
          Nova Safra
        </div>
      </div>
      <div class="row justify-center content-center" style="min-height: 80vh">

        <div class="col-12 q-mb-sm" align="center">
          <q-btn-toggle
            v-model="safra.safrinha.value"
            toggle-color="primary"
            :options="[ {label: 'Safra', value: false}, {label: 'Safrinha', value: true},]"
          />
        </div>

        <!--ANO INICIO-->
        <div class="col-xs-3 col-sm-2 col-md-1 col-lg-1">
          <q-field :error="safra.inicio.errorMessage != null" class="q-mb-sm">
            <q-select float-label="Inicio" v-model="safra.inicio.value" :options="yearsList" filter @input="setAnoInicio"/>
            <div class="q-field-bottom row no-wrap">
              <div class="q-field-error col" v-if="safra.inicio.errorMessage != null" >{{safra.inicio.errorMessage}}</div>
            </div>
          </q-field>
        </div>

        <!--ANO FIM-->
        <div class="col-xs-4 col-sm-6 col-md-3 col-lg-1">
          <q-item >
            <q-item-main>
              <q-item-tile sublabel class="q-caption">Fim</q-item-tile>
              <q-item-tile sublabel>
                <q-btn-toggle
                  @input="setAnoFim"
                  class="custom-toggle"
                  toggle-color="primary"
                  v-model="selectedAnoFim"
                  :options="[{label: safra.inicio.value, value: safra.inicio.value},
                               {label: parseInt(safra.inicio.value) + 1, value: (parseInt(safra.inicio.value) + 1).toString()}
                              ]"
                />
              </q-item-tile>
            </q-item-main>
          </q-item>
        </div>

      </div>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn @click.native="closeSafraModal" color="primary" label="Cancelar" class="q-mr-xs"/>
        <q-btn @click.native="saveSafra" label="Salvar" color="primary"/>
      </q-page-sticky>
    </q-modal>

    <!--MODAL EDIT SAFRA-->
    <q-modal v-model="modalEditSafra" maximized >
      <div class="row justify-center q-pt-lg">
        <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 q-display-1 text-center">
          Editar Safra
        </div>
      </div>
      <div class="row justify-center content-center" style="min-height: 80vh">

        <!--BOTAO SAFRINHA-->
        <div class="col-12 q-mb-sm" align="center">
          <q-btn-toggle
            v-model="safra.safrinha.value"
            toggle-color="primary"
            :options="[ {label: 'Safra', value: false}, {label: 'Safrinha', value: true},]"
          />
        </div>

        <!--ANO INICIO-->
        <div class="col-xs-3 col-sm-2 col-md-1 col-lg-1">
          <q-field :error="safra.inicio.errorMessage != null" class="q-mb-sm">
            <q-select float-label="Inicio" v-model="safra.inicio.value" :options="yearsList" filter @input="setAnoInicio"/>
            <div class="q-field-bottom row no-wrap">
              <div class="q-field-error col" v-if="safra.inicio.errorMessage != null" >{{safra.inicio.errorMessage}}</div>
            </div>
          </q-field>
        </div>

        <!--ANO FIM-->
        <div class="col-xs-4 col-sm-6 col-md-3 col-lg-1">
          <q-item >
            <q-item-main>
              <q-item-tile sublabel class="q-caption">Fim</q-item-tile>
              <q-item-tile sublabel>
                <q-btn-toggle
                  @input="setAnoFim"
                  class="custom-toggle"
                  toggle-color="primary"
                  v-model="selectedAnoFim"
                  :options="[{label: safra.inicio.value, value: safra.inicio.value},
                             {label: parseInt(safra.inicio.value) + 1, value: (parseInt(safra.inicio.value) + 1).toString()}
                              ]"
                />
              </q-item-tile>
            </q-item-main>
          </q-item>
        </div>

      </div>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn @click.native="closeSafraModal" color="primary" label="Cancelar" class="q-mr-xs"/>
        <q-btn @click.native="updateSafra" label="Salvar" color="primary"/>
      </q-page-sticky>
    </q-modal>

    <!--MODAL EDIT SAFRA CULTURA-->
    <!--<q-modal v-model="modalEditSafraCultura" minimized no-backdrop-dismiss>

      <div class="row justify-center q-ma-lg">
        <div class="col-12">
          <q-select key="qtd" v-model="formEditSafraCultura.view_unidade_medida_id" :options="parsedUnidades(unidadesMedida)" float-label="Controlar quantidades em"/>
          <q-select key="area" v-model="formEditSafraCultura.view_unidade_area_id" :options="parsedUnidades(unidadesArea)" float-label="Mostrar área em"/>
        </div>
      </div>

      <div class="row q-ma-sm">
        <div class="col-12" align="end">
          <q-btn label="cancelar" color="primary" @click.native="closeNewSafraCulturaModal" class="q-mr-xs"/>
          <q-btn label="salvar" color="primary" @click.native="updateSafraCultura"/>
        </div>
      </div>
    </q-modal>-->

  </custom-page>
</template>
<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import apNoResults from 'components/ApNoResults'
  import apImage from 'components/ApImage'
  import newCulturaModal from 'components/safra/NewCulturaModal'
  // SAFRA
  import safra from 'assets/js/model/safra/Safra'
  // SAFRA CULTURA
  import SafraCultura from 'assets/js/model/safra/SafraCultura'
  import SafraCulturaTalhao from 'assets/js/model/safra/SafraCulturaTalhao'
  // outros
  import UnidadeMedidaService from "../../../assets/js/service/UnidadeMedidaService";
  import AreaService from "../../../assets/js/service/area/AreaService";
  import SafraCulturaService from "../../../assets/js/service/safra/SafraCulturaService";
  import SafraService from "../../../assets/js/service/safra/SafraService";


    export default {
      name: "safra-list",
      components: {
        apNoResults,
        toolbar,
        customPage,
        apImage,
        newCulturaModal,
      },
      data () {
        return {
          safraService: new SafraService(),
          safraCulturaService: new SafraCulturaService(),
          areaService: new AreaService(),
          unidadeMedidaService: new UnidadeMedidaService(),
          // SAFRA
          isFavorite: false,
          safras: [],
          modalNewSafra: false,
          modalEditSafra: false,
          modalEditSafraCultura: false,
          safra: new safra(),
          selectedAnoFim: null,
          selectedSafra: null,
          selectedSafraId: null,
          yearsList: [],
          progressBuffer: 75,

          // SAFRA CULTURA
          modalSafraCultura: false,
          currentStep: 'cultura',
          safraCultura: new SafraCultura(),
          selectedArea: {
            id: null,
            nome: null,
          },
          formEditSafraCultura: {
            view_unidade_medida_id: null,
            view_unidade_area_id: null,
          },
          areas: [],
          talhoes: [],
          //culturas: [],
          selectedSafraCulturaId: null,

          // UNIDADES
          //unidadesArea: [],
          setUnidadeArea: [],
          //unidadesMedida: [],
          setUnidadeMedida: null,
        }
      },
      methods: {
        // SAFRA CRUD
        favoriteSafra: function(id, pin){
          this.$q.loading.show();
          this.safraService.favoriteSafra(id, pin).then(() => {
            this.listSafras();
            this.$q.loading.hide();
          })
        },
        listSafras: function(){
          this.$q.loading.show();
          this.safraService.listSafras().then(safras => {
            this.safras = safras;
            this.$q.loading.hide();
          })
        },
        closeSafraModal: function(){
          this.modalNewSafra = false;
          this.modalEditSafra = false;
          this.safra.inicio.value = this.getCurrentYear();
          this.safra.fim.value = this.getCurrentYear();
          this.selectedAnoFim = this.safra.fim.value.toString();
        },
        addSafra: function () {
          this.modalNewSafra = true;
        },
        getCurrentYear: function(){
          return new Date().getFullYear().toString();
        },
        makeYearsList: function(referenceYear){
          this.yearsList = [];
          var listSize = 8;
          var startYear = referenceYear - (listSize / 2);
          for(var i = startYear; i < (startYear + listSize); i++){
            this.yearsList.push({'label': i.toString(), 'value': i.toString()});
          }
        },
        saveSafra: function(){
          if(!this.safra.isValid()){
            return;
          }
          this.$q.loading.show();
          this.safraService.saveSafra(this.safra.getValues()).then(() => {
            this.$q.notify({type: 'positive', message: 'Safra criada com sucesso'});
            this.listSafras();
            this.closeSafraModal();
            this.safra.inicio.value = this.getCurrentYear();
            this.safra.fim.value = this.getCurrentYear();
            this.selectedAnoFim = this.safra.fim.value.toString();
            this.$q.loading.hide();
          }).catch(error => {
            this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
            this.$q.loading.hide();
          });
        },
        editSafra: function(safra){
          this.selectedSafra = safra.id;
          this.fillSafraForm(safra);
          this.modalEditSafra = true;
        },
        fillSafraForm: function(data){
          this.makeYearsList(this.getCurrentYear());
          this.safra.inicio.value = data.inicio.toString();
          this.safra.fim.value = data.fim.toString();
          this.selectedAnoFim = data.fim.toString();
          this.safra.safrinha.value = data.is_safrinha;
        },
        updateSafra: function(){
          if(!this.safra.isValid()){
            return;
          }
          this.$q.loading.show();
          this.safraService.updateSafra(this.selectedSafra, this.safra.getValues()).then(() => {
            this.$q.notify({type: 'positive', message: 'Safra atualizada com sucesso!'});
            this.listSafras();
            this.closeSafraModal();
            this.safra.inicio.value = this.getCurrentYear();
            this.safra.fim.value = this.getCurrentYear();
            this.selectedAnoFim = this.safra.fim.value.toString();
            this.$q.loading.hide();
          }).catch(error => {
            this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
            this.$q.loading.hide();
          });
        },
        setAnoInicio: function(value){
          this.safra.fim.value = value.toString();
          this.selectedAnoFim = value.toString();
        },
        setAnoFim: function(value){
          this.safra.fim.value = value.toString();
        },
        archiveSafra: function(id){
          this.$q.loading.show();
          this.safraService.archiveSafra(id).then(() => {
            this.$q.notify({type: 'positive', message: 'Safra arquivda com sucesso!'});
            this.listSafras();
            this.$q.loading.hide();
          })
        },
        restoreSafra: function(id){
          this.$q.loading.show();
          this.safraService.restoreSafra(id).then(() => {
            this.listSafras();
            this.$q.loading.hide();
          })
        },
        deleteSafra: function(id){
          this.$q.dialog({
            title: 'Atenção',
            message: 'Realmente deseja apagar essa safra?',
            ok: 'Sim', cancel: 'Não',
            color: 'primary'
          }).then(data => {
            this.$q.loading.show();
            this.safraService.deleteSafra(id).then(() => {
              this.listSafras();
              this.$q.loading.hide();
            }).catch(error => {
              if(error.response.status){
                this.$q.loading.hide();
                this.$q.dialog({
                  title: 'Atenção',
                  message: 'Esta safra possui talhões dentro! Apague-os primeiro.',
                  color: 'primary'
                })
              }
            })
          }).catch(()=>{});
        },

        // CREATE SAFRA CULTURA
        addSafraCultura: function(safraId){
          this.$refs.newCulturaModal.openModal(safraId)
        },
        editSafraCultura: function(safraId, safraCultura){
          this.selectedSafraId = safraId;
          this.selectedSafraCulturaId = safraCultura.id;
          this.modalEditSafraCultura = true;
          this.fillFormEditSafraCultura(safraCultura);
        },
        fillFormEditSafraCultura: function(safraCultura){
          this.formEditSafraCultura.view_unidade_area_id = safraCultura.view_unidade_area.id;
          this.formEditSafraCultura.view_unidade_medida_id = safraCultura.view_unidade_medida.id;
        },
        updateSafraCultura: function(){
          this.$q.loading.show();
          this.safraCulturaService.updateSafraCultura(this.selectedSafraId, this.selectedSafraCulturaId, this.formEditSafraCultura).then(() => {
            this.$q.notify({type: 'positive', message: 'Safra cultura atualizada com sucesso!'});
            this.listSafras();
            this.closeNewSafraCulturaModal();
            this.$q.loading.hide();
          }).catch(error => {
            this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
            this.$q.loading.hide();
          });
        },
        closeNewSafraCulturaModal: function(){
          this.modalEditSafraCultura = false;
          this.modalSafraCultura = false;
          this.currentStep = 'cultura';
          this.safraCultura = new SafraCultura();
          this.selectedArea = [];
          this.areas = [];
          this.talhoes = [];
          this.culturas = [];
          this.selectedSafraId = null;
        },
        checkInputMaxSize: function(value, talhao){
          if(value > talhao.tamanho){
            this.safraCultura.getTalhaoById(talhao.id).tamanho = talhao.tamanho
          }
        },
        isNextButtomEnabled: function(){
          if(this.currentStep === 'talhoes' && this.talhoes.length > 0){
            return true
          }
          if(this.currentStep === 'unidades'){
            return true
          }
          return false
        },

        viewSafraCultura: function (safra_id, id) {
          this.$router.push({name: 'view_safra_cultura', params: {safra_id:safra_id, id:id}});
        },
        archiveSafraCultura: function(safra_id, id){
          this.$q.loading.show();
          this.safraCulturaService.archiveSafraCultura(safra_id, id).then(() => {
            this.listSafras();
            this.$q.loading.hide();
          })
        },
        restoreSafraCultura: function(safra_id, id){
          this.$q.loading.show();
          this.safraCulturaService.restoreSafraCultura(safra_id, id).then(() => {
            this.listSafras();
            this.$q.loading.hide();
          })
        },
        deleteSafraCultura: function(safra_id, id){
          this.$q.dialog({
            title: 'Atenção',
            message: 'Realmente deseja apagar esse talhão?',
            ok: 'Sim', cancel: 'Não',
            color: 'primary'
          }).then(data => {
            this.$q.loading.show();
            this.safraCulturaService.deleteSafraCultura(safra_id, id).then(() => {
              this.listSafras();
              this.$q.loading.hide();
            })
          })
        },
      },
      mounted () {
        this.$root.$on('refreshSafrasList', this.listSafras);

        this.listSafras();
        this.safra.inicio.value = this.getCurrentYear();
        this.safra.fim.value = this.getCurrentYear();
        this.selectedAnoFim = this.safra.fim.value.toString();

        this.makeYearsList(this.getCurrentYear());
        //this.getUnidadesMedida();
        //this.getUnidadesArea();
        // this.$root.$on('refreshSafraList', () => {
        //   this.listSafras();
        // });
      },
      destroyed() {
        this.$root.$off('refreshSafrasList', this.listSafras);
      }
    }
</script>
<style>
</style>
