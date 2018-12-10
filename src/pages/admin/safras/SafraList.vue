<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Safras" searchable navigation_type="menu" >
    </toolbar>

    <div class="row q-pa-md space_end">
      <div class="col-12">

        <div class="row gutter-y-lg" >
          <div class="col-12" v-for="safra in safras" :key="safra.id">

            <div class="row q-title q-pa-md q-mb-md bg-blue-grey-1">
              <div class="col-9 self-center">
                {{safra.inicio}}/{{safra.fim}} -
                <span v-if="!safra.is_safrinha">Safra</span>
                <span v-if="safra.is_safrinha">Safrinha</span>
              </div>
              <div class="col-3" align="end">
                <q-btn icon="add" color="primary" @click="addSafraCultura(safra.id)" flat round/>
                <q-checkbox
                  @input="favoriteSafra(safra.id, safra.is_favorite)"
                  color="deep-orange"
                  checked-icon="flag"
                  v-model="safra.is_favorite"
                  unchecked-icon="outlined_flag"
                />
                <q-btn round flat dense icon="more_vert" slot="right" style="margin-right: -15px;">
                  <q-popover>
                    <q-list link class="no-border">
                      <q-item v-close-overlay>
                        <q-item-main @click.native="updateSafra(safra.id)" label="Editar"/>
                      </q-item>
                      <q-item v-close-overlay>
                        <q-item-main @click.native="archiveSafra(safra.id)" label="Arquivar"/>
                      </q-item>
                      <q-item v-close-overlay>
                        <q-item-main @click.native="deleteSafra(safra.id)" label="Excluir"/>
                      </q-item>
                    </q-list>
                  </q-popover>
                </q-btn>
              </div>
            </div>

            <!--LISTA DE SAFRA CULTURAS-->
            <div class="row gutter-sm" v-if="safra.safra_culturas.length > 0">
              <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3" v-for="safraCultura in safra.safra_culturas" :key="safraCultura.id">
                <q-card>
                  <q-card-title class="q-py-xs">
                    {{safraCultura.nome}}
                    <q-btn round flat dense icon="more_vert" slot="right" style="margin-right: -15px;">
                      <q-popover>
                        <q-list link class="no-border">
                          <q-item v-close-overlay>
                            <q-item-main @click.native="updateSafraCultura(safra.id, safraCultura.id)" label="Editar"/>
                          </q-item>
                          <q-item v-close-overlay>
                            <q-item-main @click.native="archiveSafraCultura(safra.id, safraCultura.id)" label="Arquivar"/>
                          </q-item>
                          <q-item v-close-overlay>
                            <q-item-main @click.native="deleteSafraCultura(safra.id, safraCultura.id)" label="Excluir"/>
                          </q-item>
                        </q-list>
                      </q-popover>
                    </q-btn>
                  </q-card-title>
                  <q-card-separator/>

                  <q-card-main class="q-pa-xs" @click.native="viewSafraCultura(safra.id, safraCultura.id)">
                    <div class="row gutter-y-xs q-pa-md">

                      <div class="col-12 text-faded">
                        Total 500 hectares
                      </div>

                      <div class="col-12">
                        <div class="row">

                          <div class="col-12 q-caption text-faded">
                            Estimativa
                          </div>

                          <div class="col-6">
                            55 Sc/Ha
                          </div>

                          <div class="col-6">
                            27.500 Sacas
                          </div>

                        </div>
                      </div>

                      <div class="col-12" style="display: none">
                        <div class="row">

                          <div class="col-6 q-caption text-faded">
                            Negociado 100%
                          </div>

                          <div class="col-6 self-center">
                            <q-progress color="deep-orange" :percentage="progressBuffer"/>
                          </div>

                          <div class="col-6">
                            55 Sc/Ha
                          </div>

                          <div class="col-6">
                            27.500 Sacas
                          </div>

                        </div>
                      </div>

                      <div class="col-12" style="display: none">
                        <div class="row">

                          <div class="col-12 q-mb-xs">
                            <div class="row" v-if="safra > 1 ">
                              <div class="col-6 text-faded">
                                Colhido 100%
                              </div>
                              <div class="col-6 self-center">
                                <q-progress color="deep-orange" :percentage="progressBuffer"/>
                              </div>
                            </div>

                            <div class="row" v-if="safra == 1">
                              <div class="col-6 text-faded">
                                Colhido 55%
                              </div>
                              <div class="col-6 self-center">
                                <q-progress color="deep-orange" :percentage="progressBuffer"/>
                              </div>
                            </div>

                          </div>

                          <div class="col-6">
                            32 Sc/Ha
                          </div>

                          <div class="col-6">
                            16.000 Sacas
                          </div>

                        </div>
                      </div>

                    </div>
                  </q-card-main>
                </q-card>
              </div>
            </div>

            <!--LISTA VAZIA-->
            <div class="row q-mt-xl" v-else>
              <div class="col-12 q-title text-center text-faded">
                <q-icon name="warning" color="warning" size="30px"/> Não há informaçôes sobre essa safra
              </div>
            </div>

          </div>
        </div>

        <q-page-sticky position="bottom-right" :offset="[30, 30]">
          <q-btn round color="primary" size="20px" @click="addSafra" icon="add" />
        </q-page-sticky>
      </div>
    </div>

    <!--MODAL SAFRA CULTURA-->
    <q-modal v-model="modalSafraCultura"  content-css="minWidth: '50vw'">
      <q-modal-layout >

        <q-stepper ref="stepper" contractable color="positive" v-model="currentStep" class="no-shadow" >


          <!--PASSO 1 ADICIONAR CULTURAS-->
          <q-step default title="Culturas" name="cultura">
            <div  class="row gutter-sm ">
              <div class="col-xs-12 col-sm-4 col-md-3 col-lg-2" v-for="cultura in culturas" :key="cultura.id">
                <q-card @click.native="setCultura(cultura.id)">
                  <q-card-media overlay-position="full">
                    <img src="assets/soja250x250.jpg"/>
                    <q-card-title slot="overlay" align="end" v-if="cultura.id === safraCultura.cultura_id">
                      <q-icon name="check_circle" size="30px" color="positive"/>
                    </q-card-title>
                  </q-card-media>
                  <q-card-title class="q-py-xs">
                    {{cultura.nome}}
                  </q-card-title>
                </q-card>
              </div>
            </div>
          </q-step>

          <!--PASSO 2 ADICIONAR AREA-->
          <q-step title="Área" name="area">
            <div class="row gutter-sm space_end">
              <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="area in areas" :key="area.id">
                <q-card @click.native="setArea(area.id)">
                  <q-card-media overlay-position="full">
                    <img src="assets/confinamento250x250.jpg"/>
                    <q-card-title slot="overlay" align="end" v-if="area.id === selectedAreaId">
                      <q-icon name="check_circle" size="30px" color="positive"/>
                    </q-card-title>
                  </q-card-media>
                  <q-card-title class="q-py-xs">
                    {{area.nome}}
                  </q-card-title>
                </q-card>
              </div>
            </div>
          </q-step>

          <!--PASSO 3 ADICIONAR TALHOES-->
          <q-step title=" Selecionar Talhões" name="talhoes">
            <div class="row gutter-sm">
              <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="talhao in talhoes" :key="talhao.id">
                <q-card>
                  <q-card-media overlay-position="full" @click.native="toggleTalhao(talhao)">
                    <img src="assets/talhao2-250x250.jpg"/>
                    <q-card-title slot="overlay" align="end" v-if="safraCultura.getTalhaoById(talhao.id).tamanho > 0">
                      <q-icon name="check_circle" size="30px" color="positive"/>
                    </q-card-title>
                  </q-card-media>
                  <q-card-title class="q-py-xs">
                    {{talhao.nome}}
                  </q-card-title>
                  <q-card-separator/>
                  <q-card-main class="q-px-none">

                    <q-list no-border dense class="q-py-none">
                      <q-list-header>Estimativa</q-list-header>
                      <q-item dense>
                        <q-item-main>
                          <q-input v-model="safraCultura.getTalhaoById(talhao.id).estimativa" :suffix="'/'+talhao.unidade.nome" />
                        </q-item-main>
                        <q-item-side >
                          <q-select float-label="Und. de Medida" v-model="safraCultura.getTalhaoById(talhao.id).estimativa_unidade_medida_id"
                                    :options="unidadesMedida"  class="unidade-medida-select"/>
                        </q-item-side>
                      </q-item>
                      <q-list-header>Tamanho</q-list-header>
                      <q-item dense >
                        <q-item-main>
                          <q-slider v-model="safraCultura.getTalhaoById(talhao.id).tamanho"
                                    :min="0"
                                    :max="talhao.tamanho"
                                    label :label-value="`${safraCultura.getTalhaoById(talhao.id).tamanho} ha`" />
                        </q-item-main>

                        <q-item-side>
                          <q-input @blur="checkInputMaxSize(safraCultura.getTalhaoById(talhao.id).tamanho, talhao)"
                                   v-model="safraCultura.getTalhaoById(talhao.id).tamanho"
                                   :suffix="talhao.unidade.sigla" style="width: 50px; padding-bottom: 0 !important" />
                        </q-item-side>
                      </q-item>
                    </q-list>
                  </q-card-main>
                </q-card>
              </div>
            </div>
          </q-step>

        </q-stepper>

        <div  slot="footer" class="q-pa-sm" >
          <q-btn @click.native="closeNewSafraCulturaModal()" label="Cancelar" color="primary" flat/>
          <q-btn @click="saveSafraCultura()" label="Salvar" color="deep-orange" v-if="currentStep === 'talhoes'" class="float-right"/>
        </div>
      </q-modal-layout>


    </q-modal>
  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import safraService from 'assets/js/service/safra/SafraService'
  // SAFRA CULTURA IMPORTS
  import SafraCultura from 'assets/js/model/safra/SafraCultura'
  import SafraCulturaTalhao from 'assets/js/model/safra/SafraCulturaTalhao'
  import areaService from 'assets/js/service/area/AreaService'
  import talhaoService from 'assets/js/service/area/TalhaoService'
  import safraCulturaService from 'assets/js/service/safra/SafraCulturaService'
  import unidadeMedidaService from 'assets/js/service/UnidadeMedidaService'
    export default {
      name: "safra-list",
      components: {
        toolbar,
        customPage,
      },
      data () {
        return {
          // SAFRA LIST
          isFavorite: false,
          safras: [],
          progressBuffer: 75,

          // SAFRA CULTURA
          modalSafraCultura: false,
          currentStep: 'cultura',
          safraCultura: new SafraCultura(),
          selectedAreaId: null,
          areas: [],
          talhoes: [],
          culturas: [],
          unidadesMedida: [],
          selectedSafraId: null,
        }
      },
      methods: {
        favoriteSafra: function(id, pin){
          safraService.favoriteSafra(id, pin).then(response => {
            this.listSafras()
          })
        },
        listSafras: function(){
          safraService.listSafras().then(response => {
            this.safras = response.data;
          })
        },
        viewSafraCultura: function (safra_id, id) {
          this.$router.push({name: 'view_safra_cultura', params: {safra_id:safra_id, id:id}});
        },
        addSafra: function () {
          // this.$router.push({name: 'cultura_safra', params: {id:id}});
          this.$router.push({name: 'add_safra'});
        },

        // CREATE SAFRA CULTURA
        closeNewSafraCulturaModal: function(){
          this.modalSafraCultura = false;
          this.currentStep = 'cultura';
          this.safraCultura = new SafraCultura();
          this.selectedAreaId = null;
          this.areas = [];
          this.talhoes = [];
          this.culturas = [];
          this.selectedSafraId = null;
        },
        addSafraCultura: function(id){
          this.selectedSafraId = id;
          this.modalSafraCultura = true;
          this.listCulturas();
          this.getAreas();
        },
        checkInputMaxSize: function(value, talhao){
          if(value > talhao.tamanho){
            this.safraCultura.getTalhaoById(talhao.id).tamanho = talhao.tamanho
          }
        },
        listCulturas() {
          safraCulturaService.listCulturas().then(response => {
            this.culturas = response;
          });
        },
        setCultura: function(id){
          this.safraCultura.cultura_id = id;
          this.goToNextStep();
        },
        getAreas: function(){
          areaService.listAreas().then(response => {
            this.areas = response;
          })
        },
        setArea: function(id){
          this.selectedAreaId = id;
          this.getTalhoesByArea(id);
          this.goToNextStep();
        },
        getTalhoesByArea: function(area_id){
          talhaoService.listTalhoes(area_id).then(response => {
            this.talhoes = [];
            response.data.forEach(function(talhao){
              this.talhoes.push({
                id: talhao.id,
                nome: talhao.nome,
                tamanho: parseFloat(talhao.tamanho),
                unidade: {
                  'nome': talhao.unidade.nome,
                  'sigla': talhao.unidade.sigla,
                }
              });
              this.safraCultura.addTalhao(new SafraCulturaTalhao(talhao))
            },this)
          })
        },
        getUnidadesMedida:function(){
          unidadeMedidaService.listUnidadesMedida().then(response => {
            this.unidadesMedida = response.data.map(unidade => {
              return {
                label: unidade.nome +  (unidade.sigla ?  ' (' + unidade.sigla + ')' : ''),
                value: unidade.id
              }
            })
          })
        },
        toggleTalhao:function(talhao){
          let tal = this.safraCultura.getTalhaoById(talhao.id);
          if(tal.tamanho === 0){
            tal.tamanho = talhao.tamanho
          }else{
            tal.tamanho = 0
          }
        },
        saveSafraCultura: function(){
          console.log(this.safraCultura.getValues())
          safraCulturaService.saveSafraCultura(this.selectedSafraId, this.safraCultura.getValues()).then(response => {
            this.$q.notify({type: 'positive', message: 'Cultura criada com sucesso'});
            this.closeNewSafraCulturaModal();
            this.listSafras()
          }).catch(error => {

          });

        },
        archiveSafraCultura: function(safra_id, id){
          safraCulturaService.archiveSafraCultura(safra_id, id).then(response => {
            this.listSafras()
          })
        },
        restoreSafraCultura: function(safra_id, id){
          safraCulturaService.restoreSafraCultura(safra_id, id).then(response => {
            this.listSafras()
          })
        },
        deleteSafraCultura: function(safra_id, id){
          safraCulturaService.deleteSafraCultura(safra_id, id).then(response => {
            this.listSafras()
          })
        },
        goToNextStep(){
          this.$refs.stepper.next()
        },
      },
      mounted () {
        this.listSafras()
        this.getUnidadesMedida();
        // this.$root.$on('refreshSafraList', () => {
        //   this.listSafras();
        // });
      },
    }
</script>
<style>
  .space_end{
    margin-bottom: 150px;
  }

  .unidade-medida-select{
    padding-top: 8px !important;
  }
</style>
