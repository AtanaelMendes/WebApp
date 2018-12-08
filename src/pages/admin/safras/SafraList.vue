<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Listagem de Safras" searchable navigation_type="menu" >
    </toolbar>

    <div class="row q-pa-md space_end">
      <div class="col-12">

        <div class="row gutter-y-lg" >
          <div class="col-12" v-for="safra in safras" :key="safra.id">

            <div class="row q-title q-pa-md q-mb-md bg-blue-grey-1">
              <div class="col-9 self-center">
                <span v-if="!safra.is_safrinha">Safra</span>
                <span v-if="safra.is_safrinha">Safrinha</span>
                {{safra.inicio}} - {{safra.fim}}
              </div>
              <div class="col-3" align="end">
                <q-checkbox
                  @input="favoriteSafra(safra.id, safra.is_favorite)"
                  color="deep-orange"
                  checked-icon="flag"
                  v-model="safra.is_favorite"
                  unchecked-icon="outlined_flag"
                />
                <q-btn icon="add" color="primary" @click="addSafraCultura(safra.id)" flat round/>
              </div>
            </div>

            <!--LISTA DE SAFRA CULTURAS-->
            <div class="row gutter-sm" v-if="safra.safra_culturas.length > 0">
              <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3" v-for="safraCultura in safra.safra_culturas" :key="item">
                <q-card @click.native="viewSafraCultura(safra)">
                  <q-card-title class="q-py-xs">
                    Soja
                  </q-card-title>
                  <q-card-separator/>

                  <q-card-main class="q-pa-xs">
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

                      <div class="col-12">
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

                      <div class="col-12">
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
    <q-modal v-model="modalSafraCultura" :content-css="{maxWidth: '80vw', maxHeight: '80vh', minWidth: '80vh', width: '80vw', height: '80vh'}">
      <q-modal-layout >
        <q-toolbar slot="header" class="bg-white">
          <!--<q-btn color="primary" @click="cancelAddSafraCultura" icon="close" round flat dense/>-->
          <q-stepper ref="stepper" contractable color="positive" v-model="currentStep" class="no-shadow">
            <q-step default title="Culturas" name="cultura"></q-step>
            <q-step title="Área" name="area"></q-step>
            <q-step title=" Selecionar Talhões" name="talhoes"></q-step>
          </q-stepper>
        </q-toolbar>
        <swipe ref="mySwiper" :continuous="false" :auto="0" :showIndicators="false" :disabled="true">
          <swipe-item >
            <div class="row gutter-sm">
              <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2" v-for="cultura in culturas" :key="cultura.id">
                <q-card @click.native="selectedCultura(cultura.id)">
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
          </swipe-item>

          <swipe-item >
            <div class="row gutter-sm space_end">
              <div class="col-xs-6 col-sm-6 col-md-4 col-lg-3" v-for="area in areas" :key="area.id">
                <q-card @click.native="selectedArea(area.id)">
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
          </swipe-item>
        </swipe>
        <!--<q-stepper ref="stepper" contractable color="positive" v-model="currentStep" class="no-shadow">-->

          <!--PASSO 1 ADICIONAR CULTURAS-->
          <!--<q-step default title="Culturas" name="cultura">-->
            <!--<div class="row gutter-sm">-->
              <!--<div class="col-xs-6 col-sm-4 col-md-3 col-lg-2" v-for="cultura in culturas" :key="cultura.id">-->
                <!--<q-card @click.native="selectedCultura(cultura.id)">-->
                  <!--<q-card-media overlay-position="full">-->
                    <!--<img src="assets/soja250x250.jpg"/>-->
                    <!--<q-card-title slot="overlay" align="end" v-if="cultura.id === safraCultura.cultura_id">-->
                      <!--<q-icon name="check_circle" size="30px" color="positive"/>-->
                    <!--</q-card-title>-->
                  <!--</q-card-media>-->
                  <!--<q-card-title class="q-py-xs">-->
                    <!--{{cultura.nome}}-->
                  <!--</q-card-title>-->
                <!--</q-card>-->
              <!--</div>-->
            <!--</div>-->
          <!--</q-step>-->

          <!--PASSO 2 ADICIONAR AREA-->
          <!--<q-step title="Área" name="area">-->
            <!--<div class="row gutter-sm space_end">-->
              <!--<div class="col-xs-6 col-sm-6 col-md-4 col-lg-3" v-for="area in areas" :key="area.id">-->
                <!--<q-card @click.native="selectedArea(area.id)">-->
                  <!--<q-card-media overlay-position="full">-->
                    <!--<img src="assets/confinamento250x250.jpg"/>-->
                    <!--<q-card-title slot="overlay" align="end" v-if="area.id === selectedAreaId">-->
                      <!--<q-icon name="check_circle" size="30px" color="positive"/>-->
                    <!--</q-card-title>-->
                  <!--</q-card-media>-->
                  <!--<q-card-title class="q-py-xs">-->
                    <!--{{area.nome}}-->
                  <!--</q-card-title>-->
                <!--</q-card>-->
              <!--</div>-->
            <!--</div>-->
          <!--</q-step>-->

          <!--PASSO 3 ADICIONAR TALHOES-->
          <!--<q-step title=" Selecionar Talhões" name="talhoes">-->
            <!--<div class="row gutter-sm">-->
              <!--<div class="col-xs-6 col-sm-6 col-md-4 col-lg-3" v-for="talhao in talhoes" :key="talhao.id">-->
                <!--<q-card>-->
                  <!--<q-card-media overlay-position="full" @click.native="toggleTalhao(talhao)">-->
                    <!--<img src="assets/talhao2-250x250.jpg"/>-->
                    <!--<q-card-title slot="overlay" align="end" v-if="safraCultura.getTalhaoById(talhao.id).tamanho > 0">-->
                      <!--<q-icon name="check_circle" size="30px" color="positive"/>-->
                    <!--</q-card-title>-->
                  <!--</q-card-media>-->
                  <!--<q-card-title class="q-py-xs">-->
                    <!--{{talhao.nome}}-->
                  <!--</q-card-title>-->
                  <!--<q-card-separator/>-->
                  <!--<q-card-main>-->
                    <!--<div v-if="safraCultura.existsTalhaoById(talhao.id) >= 0">-->
                      <!--<div>-->
                        <!--<q-input-->

                          <!--@blur="checkInputMaxSize(safraCultura.getTalhaoById(talhao.id).tamanho, talhao)"-->
                          <!--type="number"-->
                          <!--hide-underline-->
                          <!--:suffix="talhao.unidade"-->
                          <!--v-model="safraCultura.getTalhaoById(talhao.id).tamanho"-->
                        <!--/>-->
                      <!--</div>-->
                      <!--<q-slider-->
                        <!--snap-->
                        <!--label-->
                        <!--:min="0"-->
                        <!--:step="2"-->
                        <!--v-model="safraCultura.getTalhaoById(talhao.id).tamanho"-->
                        <!--:max="talhao.tamanho"-->
                      <!--/>-->
                    <!--</div>-->
                  <!--</q-card-main>-->
                <!--</q-card>-->
              <!--</div>-->
            <!--</div>-->
          <!--</q-step>-->

        <!--</q-stepper>-->

        <div align="end" slot="footer" class="q-pa-sm" v-if="currentStep === 'talhoes'">
          <q-btn @click.native="selectedTalhao()" label="Próximo" color="primary"/>
        </div>
      </q-modal-layout>


    </q-modal>
  </custom-page>
</template>

<script>
  require('vue-swipe/dist/vue-swipe.css');
  import { Swipe, SwipeItem } from 'vue-swipe';
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import safraService from 'assets/js/service/safra/SafraService'
  // SAFRA CULTURA IMPORTS
  import SafraCultura from 'assets/js/model/safra/SafraCultura'
  import SafraCulturaTalhao from 'assets/js/model/safra/SafraCulturaTalhao'
  import areaService from 'assets/js/service/area/AreaService'
  import talhaoService from 'assets/js/service/area/TalhaoService'
  import safraCulturaService from 'assets/js/service/safra/SafraCulturaService'
    export default {
      name: "safra-list",
      components: {
        toolbar,
        customPage,
        Swipe,
        SwipeItem
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
          selectedTalhaoId: null,
          areas: [],
          talhoes: [],
          culturas: [],
          selectedAreaId: null
        }
      },
      // watch: {
      //   isFavorite: function (val) {
      //     console.log(val)
      //   }
      // },
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
        viewSafraCultura: function (id) {
          this.$router.push({name: 'view_safra_cultura', params: {id:id}});
        },
        addSafra: function () {
          // this.$router.push({name: 'cultura_safra', params: {id:id}});
          this.$router.push({name: 'add_safra'});
        },

        // CREATE SAFRA CULTURA
        cancelAddSafraCultura: function(){
          this.modalSafraCultura = false;
          this.currentStep = 'cultura';
          this.safraCultura = new SafraCultura();
          this.selectedAreaId = null;
          this.selectedTalhaoId = null;
          this.areas = [];
          this.talhoes = [];
          this.culturas = [];
          this.selectedAreaId = null;
        },
        addSafraCultura: function(id){
          this.selectedAreaId = id;
          this.modalSafraCultura = true;
          this.listCulturas();
          this.getAreas();
          // this.$router.push({name: 'add_safra_cultura', params: {id:id}});
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
        selectedCultura: function(id){
          this.safraCultura.cultura_id = id;
          this.goToNextStep();
        },
        getAreas: function(){
          areaService.listAreas().then(response => {
            this.areas = response;
          })
        },
        selectedArea: function(id){
          this.selectedAreaId = id;
          this.getTalhoesByArea(id)
          this.goToNextStep();
        },
        getTalhoesByArea: function(area_id){
          talhaoService.listTalhoes(area_id).then(response => {
            //this.talhoes = response.data;
            //this.selectedTalhoes = this.talhoes.map(function (talhao) { return talhao.id });
            //this.safraCultura.talhoes =
            this.talhoes = [];
            response.data.forEach(function(talhao){
              this.talhoes.push({
                id: talhao.id,
                nome: talhao.nome,
                tamanho: parseFloat(talhao.tamanho),
                unidade: talhao.unidade.nome
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
        selectedTalhao: function(){
          this.goToNextStep();
        },
        saveSafraCultura: function(){},
        goToNextStep(){
          this.$refs.stepper.next()
          this.$refs.mySwiper.goto(index)
        },
      },
      mounted () {
        this.listSafras()
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
</style>
