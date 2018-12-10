<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Safras" searchable navigation_type="menu" >
    </toolbar>

    <div class="row space_end">
      <div class="col-12">

        <div class="row gutter-y-lg" >
          <div class="col-12" v-for="safra in safras" :key="safra.id">

            <!--HEADER-->
            <div class="row q-title  q-pa-md bg-blue-grey-1">
              <div class="col-8 self-center">
                {{safra.inicio}}/{{safra.fim}} -
                <span v-if="!safra.is_safrinha">Safra</span>
                <span v-if="safra.is_safrinha">Safrinha</span>
              </div>
              <div class="col-4" align="end">
                <q-btn icon="add" dense color="primary" @click="addSafraCultura(safra.id)" flat round/>
                <q-checkbox
                  @input="favoriteSafra(safra.id, safra.is_favorite)"
                  color="deep-orange"
                  checked-icon="flag"
                  v-model="safra.is_favorite"
                  unchecked-icon="outlined_flag"
                />
                <q-btn round flat dense icon="more_vert">
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
            <div class="row gutter-sm q-ma-sm" v-if="safra.safra_culturas.length > 0">
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
    <q-modal v-model="modalSafraCultura" maximized>

        <q-stepper ref="stepper" contractable color="positive" v-model="currentStep" class="no-shadow" >

          <!--PASSO 1 ADICIONAR CULTURAS-->
          <q-step default title="Culturas" name="cultura">
            <div style="min-height: 80vh" class="row items-center gutter-sm justify-center">
              <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2" v-for="cultura in culturas" :key="cultura.id">
                <q-card @click.native="setCultura(cultura)">
                  <q-card-media overlay-position="full">
                    <img src="assets/soja250x250.jpg"/>
                    <q-card-title slot="overlay" align="end" v-if="cultura.id === safraCultura.cultura_id">
                      <q-icon name="check_circle" size="30px" color="positive"/>
                    </q-card-title>
                  </q-card-media>
                  <q-card-title>
                    {{cultura.nome}}
                  </q-card-title>
                </q-card>
              </div>
            </div>

          </q-step>

          <!--PASSO 2 INFORMAR UNIDADES -->
          <q-step default title="Unidades" name="unidades">
              <!--ESCOLHER UNIDADES-->
              <div style="min-height: 80vh" class="row items-center justify-center gutter-sm">
                <div class="col-xs-12 col-md-6 col-lg-3">
                  <div>
                    <q-select key="qtd" v-model="safraCultura.view_unidade_medida_id" :options="selectUnidadesMedida" float-label="Controlar quantidades em"/>
                  </div>
                  <div>
                    <q-select key="area" v-model="safraCultura.view_unidade_area_id" :options="selectUnidadesArea" float-label="Mostrar área em"/>
                  </div>
                </div>
              </div>
          </q-step>

          <!--PASSO 2 ADICIONAR AREA-->
          <q-step title="Área" name="area">
            <div style="min-height:80vh" class="row gutter-sm justify-center items-center">
              <div class="col-xs-6 col-sm-5 col-md-4 col-lg-3" v-for="area in areas" :key="area.id">
                <q-card @click.native="setArea(area)">
                  <q-card-media overlay-position="full">
                    <img src="assets/confinamento250x250.jpg"/>
                    <q-card-title slot="overlay" align="end" v-if="area.id === selectedArea.id">
                      <q-icon name="check_circle" size="30px" color="positive"/>
                    </q-card-title>
                  </q-card-media>
                  <q-card-title>
                    {{area.nome}}
                  </q-card-title>
                </q-card>
                <br>
                &nbsp
              </div>
            </div>
          </q-step>

          <!--PASSO 3 ADICIONAR TALHOES-->
          <q-step title=" Selecionar Talhões" name="talhoes">
              <div style="min-height:80vh" class="row gutter-sm justify-center items-center">
              <div class="col-xs-6 col-sm-5 col-md-4 col-lg-3" v-for="talhao in talhoes" :key="talhao.id">
                <q-card>
                  <q-card-media overlay-position="full" @click.native="toggleTalhao(talhao)">
                    <img src="assets/talhao2-250x250.jpg"/>
                    <q-card-title slot="overlay" align="end" v-if="safraCultura.getTalhaoById(talhao.id).tamanho > 0">
                      <q-icon name="check_circle" size="30px" color="positive"/>
                    </q-card-title>
                  </q-card-media>
                  <q-card-title>
                    {{talhao.nome}}
                  </q-card-title>
                  <!--<q-card-separator/>-->
                  <q-card-main class="q-px-none">
                    <q-list-header>Área à ser utilizada</q-list-header>
                    <q-item dense >
                      <div class="row gutter-x-sm">
                        <div class="col-8 self-center">
                          <q-slider v-model="safraCultura.getTalhaoById(talhao.id).tamanho"
                                    :min="0"
                                    :max="talhao.tamanho"
                                    label :label-value="`${safraCultura.getTalhaoById(talhao.id).tamanho} ha`" />

                        </div>
                        <div class="col-4">
                          <q-input @blur="checkInputMaxSize(safraCultura.getTalhaoById(talhao.id).tamanho, talhao)"
                                   v-model="safraCultura.getTalhaoById(talhao.id).tamanho" type="number"
                                   :suffix="talhao.unidade.sigla" style="!important" class="text-right" />

                        </div>
                      </div>
                    </q-item>

                    <q-list no-border dense class="q-py-none">
                      <q-list-header>Estimativa por {{ talhao.unidade.nome }}</q-list-header>
                      <q-item dense>
                        <div class="row gutter-x-sm">
                          <div class="col-3">
                            <q-input type="number" v-model="safraCultura.getTalhaoById(talhao.id).estimativa" />
                          </div>
                          <div class="col-9 self-center">
                            label de unidade
                          </div>
                        </div>
                      </q-item>
                    </q-list>
                  </q-card-main>
                </q-card>
                <br>
                <br>
                <br>
              </div>
            </div>
          </q-step>

          <!--PASSO 4  RESUMO E FINALIZAR-->
          <q-step default title="Finalizar" name="finalizar">
              <div style="min-height: 80vh" class="row items-center justify-center gutter-sm">

              <!--RESUMO-->
              <div class="col-xs-12 col-md-6 col-lg-3">
                <q-list link>
                  <q-list-header>{{safraCultura.culturaNome}}</q-list-header>
                  <q-item>
                    <q-item-main label>
                      {{selectedArea.nome}}
                    </q-item-main>
                  </q-item>
                  <q-item-separator/>
                  <q-item v-for="talhao in safraCultura.talhoes" separator dense>
                    <q-item-main>
                      <div class="row">
                        <div class="col-6">{{talhao.nome}}</div>
                        <div class="col-6">{{talhao.tamanho}},&nbsp<span class="text-faded q-caption">{{talhao.unidade.plural}}</span></div>
                      </div>
                    </q-item-main>
                  </q-item>
                </q-list>
              </div>

            </div>
          </q-step>

        </q-stepper>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn @click.native="closeNewSafraCulturaModal()" label="Cancelar" color="primary" class="q-mr-xs"/>
          <q-btn @click.native="finalStep" label="próximo" color="primary"  class="q-mr-xs" v-if="currentStep === 'talhoes' || currentStep === 'unidades'"/>
          <q-btn @click="saveSafraCultura()" label="Salvar" color="deep-orange" v-if="currentStep === 'finalizar'" class="float-right"/>
        </q-page-sticky>

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
          selectedArea: {
            id: null,
            nome: null,
          },
          areas: [],
          talhoes: [],
          culturas: [],
          selectedSafraId: null,

          // SELECT UNIDADES
          selectUnidadesArea: [],
          setUnidadeArea: [],
          selectUnidadesMedida: [],
          setUnidadeMedida: null,
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

        // UNIDADE MEDIDA
        getUnidadesMedida:function(){
          unidadeMedidaService.listUnidadesMedida().then(response => {
            this.selectUnidadesMedida = response.data.map(unidadeMed => {
              return {
                label: unidadeMed.nome,
                value: unidadeMed.id
              }
            });
          })
        },
        getUnidadesArea:function(){
          unidadeMedidaService.listUnidadesArea().then(response => {
            this.selectUnidadesArea = response.data.map(unidadeAre => {
              return {
                label: unidadeAre.nome,
                value: unidadeAre.id
              }
            });
          })
        },

        // CREATE SAFRA CULTURA
        finalStep: function(){
          this.goToNextStep();
        },
        closeNewSafraCulturaModal: function(){
          this.modalSafraCultura = false;
          this.currentStep = 'cultura';
          this.safraCultura = new SafraCultura();
          this.selectedArea = [];
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
        setCultura: function(cultura){
          this.safraCultura.cultura_id = cultura.id;
          this.safraCultura.culturaNome = cultura.nome;
          this.goToNextStep();
        },

        getAreas: function(){
          areaService.listAreas().then(response => {
            this.areas = response;
          })
        },
        setArea: function(area){
          this.selectedArea.id = area.id;
          this.selectedArea.nome = area.nome;
          this.getTalhoesByArea(area.id);
          this.goToNextStep();
        },

        getTalhoesByArea: function(area_id){
          talhaoService.listTalhoes(area_id).then(response => {
            this.talhoes = [];
            this.safraCultura.talhoes = [];
            response.data.forEach(function(talhao){
              this.talhoes.push({
                id: talhao.id,
                nome: talhao.nome,
                tamanho: parseFloat(talhao.tamanho),
                unidade: {
                  nome: talhao.unidade.nome,
                  plural: talhao.unidade.plural,
                  sigla: talhao.unidade.sigla,
                }
              });
              this.safraCultura.addTalhao(new SafraCulturaTalhao(talhao))
            },this)
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
        this.getUnidadesArea();
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

  .unidade-medida-select{
    padding-top: 8px !important;
  }
</style>
