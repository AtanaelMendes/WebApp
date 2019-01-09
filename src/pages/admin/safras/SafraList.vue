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
              {{safra.inicio}}/{{safra.fim}} -
              <span v-if="!safra.is_safrinha">Safra</span>
              <span v-if="safra.is_safrinha">Safrinha</span>
            </div>
            <div class="col-4" align="end">
              <q-btn class="q-mx-xs" icon="add" dense color="primary" @click="addSafraCultura(safra.id)" flat round/>
              <q-checkbox class="q-mx-xs"
                @input="favoriteSafra(safra.id, safra.is_favorite)"
                color="deep-orange"
                checked-icon="flag"
                v-model="safra.is_favorite"
                unchecked-icon="outlined_flag"
              />
              <q-btn round flat dense icon="more_vert">
                <q-popover>
                  <q-list link class="no-border">
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
          <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3" v-for="safraCultura in safra.safra_culturas" :key="safraCultura.id">

            <q-card>
              <q-card-title class="q-py-xs">
                {{safraCultura.nome}}
                <q-btn round flat dense icon="more_vert" slot="right">
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
              <q-card-separator/>

              <q-card-main class="q-pa-xs" @click.native="viewSafraCultura(safra.id, safraCultura.id)">
                <div class="row gutter-y-xs q-pa-md">

                  <div class="col-12 text-faded">
                    Total {{safraCultura.area.plantado + " " + safraCultura.view_unidade_area.plural}}
                  </div>

                  <div class="col-12">
                    <div class="row">

                      <div class="col-12 q-caption text-faded">
                        Estimativa
                      </div>

                      <div class="col-6">
                        <!--55 Sc/Ha-->
                        {{safraCultura.estimativa.valor  + " " + safraCultura.view_unidade_medida.sigla + "/" + safraCultura.view_unidade_area.sigla}}
                      </div>

                      <div class="col-6">
                        <!--27.500 Sacas-->
                        {{safraCultura.estimativa.total + " " + safraCultura.view_unidade_medida.plural}}
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
        </template>

        <!--LISTA VAZIA-->
        <div class="col-12 q-title text-center text-faded" v-else>
          <p>
            <!--<q-icon name="warning" color="warning" size="30px"/>-->
            Não há informaçôes sobre essa safra
          </p>
          <p>
            <q-btn color="deep-orange" round icon="add" @click.native="addSafraCultura(safra.id)"/>
          </p>
        </div>

      </template>
    </div>

    <!--EMPTY LIST-->
    <div class="column q-ma-xl items-center" v-if="safras.length <= 0">
      <div class="col-6">
        <img src="assets/images/sad_2.svg" class="responsive"/>
      </div>
      <div class="col-6 text-justify">
        <span>Nenhum resultado encontrado.</span>
      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-btn round color="deep-orange" size="20px" @click="addSafra" icon="add" />
    </q-page-sticky>

    <!--MODAL SAFRA CULTURA-->
    <q-modal v-model="modalSafraCultura" maximized>

      <q-stepper ref="stepper" contractable color="positive" v-model="currentStep" class="no-shadow" >

        <!--PASSO 1 ADICIONAR CULTURAS-->
        <q-step default title="Culturas" name="cultura">
          <div style="min-height: 80vh" class="row items-center gutter-sm justify-center" v-if="culturas.length > 0">
            <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2" v-for="cultura in culturas" :key="cultura.id">
              <q-card @click.native="setCultura(cultura)">
                <q-card-media overlay-position="full">
                  <!--<img src="assets/images/soja250x250.jpg"/>-->

                  <img src="assets/images/icon-no-image.svg" v-if="!cultura.image_path"/>
                  <img :src="cultura.image_path" v-if="cultura.image_path"/>

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
          <!--EMPTY LIST-->
          <div class="column q-ma-xl items-center" v-if="culturas.length <= 0">
            <div class="col-6">
              <img src="assets/images/sad_2.svg" class="responsive"/>
            </div>
            <div class="col-6 text-justify">
              <span>Nenhum talhão com espaço disponível encontrado.</span>
            </div>
          </div>
        </q-step>

        <!--PASSO 2 INFORMAR UNIDADES -->
        <q-step title="Unidades" name="unidades">
            <!--ESCOLHER UNIDADES-->
            <div style="min-height: 80vh" class="row items-center justify-center gutter-sm">
              <div class="col-xs-12 col-md-6 col-lg-3">
                <div>
                  <q-select key="qtd" v-model="safraCultura.view_unidade_medida_id" :options="parsedUnidades(unidadesMedida)" float-label="Controlar quantidades em"/>
                </div>
                <div>
                  <q-select key="area" v-model="safraCultura.view_unidade_area_id" :options="parsedUnidades(unidadesArea)" float-label="Mostrar área em"/>
                </div>
              </div>
            </div>
        </q-step>

        <!--PASSO 3 ADICIONAR AREA-->
        <q-step title="Área" name="area">
          <div style="min-height:80vh" class="row gutter-sm justify-center items-center">
            <div class="col-xs-12 col-sm-5 col-md-4 col-lg-3" v-for="area in areas" :key="area.id">
              <q-card @click.native="setArea(area)">
                <q-card-media overlay-position="full">
                  <!--<img src="assets/images/confinamento250x250.jpg"/>-->

                  <img src="assets/images/icon-no-image.svg" v-if="!area.image_path"/>
                  <img :src="area.image_path" v-if="area.image_path"/>

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

        <!--PASSO 4 ADICIONAR TALHOES-->
        <q-step title=" Selecionar Talhões" name="talhoes">
          <div style="min-height:80vh" class="row gutter-sm justify-center items-center space-end" v-if="talhoes.length > 0">
            <div class="col-xs-12 col-sm-5 col-md-4 col-lg-3" v-for="talhao in talhoes" :key="talhao.id">
              <q-card>
                <q-card-media overlay-position="full" @click.native="toggleTalhao(talhao)">

                  <img src="assets/images/icon-no-image.svg" v-if="!talhao.image_path"/>
                  <img :src="talhao.image_path" v-if="talhao.image_path"/>

                  <q-card-title slot="overlay" align="end" v-if="safraCultura.getTalhaoById(talhao.id).tamanho > 0">
                    <q-icon name="check_circle" size="30px" color="positive"/>
                  </q-card-title>
                </q-card-media>
                <q-card-title>
                  {{talhao.nome}}
                </q-card-title>
                <!--<q-card-separator/>-->
                <q-card-main class="q-px-none">
                  <q-list-header>{{getUnidadeAreaById(safraCultura.view_unidade_area_id).plural}} à serem utilizados</q-list-header>
                  <q-item dense >
                    <div class="row full-width">
                      <div class="col-9 self-center">
                        <q-slider
                          label
                          :min="0"
                          :max="talhao.tamanho"
                          v-model="safraCultura.getTalhaoById(talhao.id).tamanho"
                          :label-value="`${safraCultura.getTalhaoById(talhao.id).tamanho} ${getUnidadeAreaById(safraCultura.view_unidade_area_id).sigla}`"
                        />
                      </div>
                      <div class="col-3 q-pl-sm">
                        <q-input
                          type="number"
                          align="center"
                          v-model="safraCultura.getTalhaoById(talhao.id).tamanho"
                          @blur="checkInputMaxSize(safraCultura.getTalhaoById(talhao.id).tamanho, talhao)"
                        />
                      </div>
                    </div>
                  </q-item>

                  <q-list no-border dense class="q-py-none">
                    <q-list-header>Estimativa</q-list-header>
                    <q-item dense>
                      <div class="row gutter-x-sm">
                        <div class="col-3">
                          <q-input type="number" align="center" v-model="safraCultura.getTalhaoById(talhao.id).estimativa" />
                        </div>
                        <div class="col-9 self-center">
                          <!--label de unidade-->
                          {{getUnidadeMedidaById(safraCultura.view_unidade_medida_id).sigla}} por {{getUnidadeAreaById(safraCultura.view_unidade_area_id).nome}}
                          <!--{{unidadesMedida.filter(unidadeMedida => unidadeMedida.value === safraCultura.view_unidade_medida_id)[0].label}}-->
                        </div>
                      </div>
                    </q-item>
                  </q-list>
                </q-card-main>
              </q-card>
              <br>
              <br>
              <br>
              &nbsp
            </div>
          </div>

          <!--EMPTY LIST-->
          <div class="column q-ma-xl items-center" v-if="talhoes.length <= 0">
            <div class="col-6">
              <img src="assets/images/sad_2.svg" class="responsive"/>
            </div>
            <div class="col-6 text-justify">
              <span>Nenhum talhão com espaço disponível encontrado.</span>
            </div>
          </div>
        </q-step>

        <!--PASSO 5  RESUMO E FINALIZAR-->
        <q-step default title="Finalizar" name="finalizar">
          <div style="min-height: 80vh" class="row items-center justify-center gutter-sm">
            <div class="col-xs-12 col-md-6 col-lg-3">
            <q-list link>
              <q-list-header>{{safraCultura.culturaNome}}</q-list-header>
              <q-item>
                <q-item-main label>
                  {{selectedArea.nome}}
                </q-item-main>
              </q-item>
              <q-item-separator/>
              <q-item v-for="talhao in safraCultura.talhoes" :key="talhao.id" separator dense>
                <q-item-main>
                  <div class="row">
                    <div class="col-6">{{talhao.nome}}</div>
                    <div class="col-6">{{talhao.tamanho}},&nbsp<span class="text-faded q-caption">{{getUnidadeAreaById(safraCultura.view_unidade_area_id).plural}}</span></div>
                  </div>
                </q-item-main>
              </q-item>
            </q-list>
          </div>
          </div>
        </q-step>

      </q-stepper>

      <q-page-sticky position="bottom-right" :offset="[30, 30]">
        <q-btn @click="closeNewSafraCulturaModal()" label="Cancelar" color="primary" class="q-mr-md"/>
        <q-btn @click="goToPreviousStep" label="voltar" color="primary"  class="q-mr-xs" v-if="this.currentStep !== 'cultura'"/>
        <q-btn @click="goToNextStep" label="próximo" color="primary"  class="q-mr-xs" :disable="!isNextButtomEnabled()" v-if="currentStep !== 'finalizar'"/>
        <q-btn @click="saveSafraCultura()" label="Salvar" color="deep-orange" v-if="currentStep === 'finalizar'" class="float-right"/>
      </q-page-sticky>
    </q-modal>

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
    <q-modal v-model="modalEditSafraCultura" minimized no-backdrop-dismiss>

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
    </q-modal>

  </custom-page>
</template>
<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  // SAFRA
  import safraService from 'assets/js/service/safra/SafraService'
  import safra from 'assets/js/model/safra/Safra'
  // SAFRA CULTURA
  import SafraCultura from 'assets/js/model/safra/SafraCultura'
  import SafraCulturaTalhao from 'assets/js/model/safra/SafraCulturaTalhao'
  import safraCulturaService from 'assets/js/service/safra/SafraCulturaService'
  // outros
  import talhaoService from 'assets/js/service/area/TalhaoService'
  import areaService from 'assets/js/service/area/AreaService'
  import unidadeMedidaService from 'assets/js/service/UnidadeMedidaService'
    export default {
      name: "safra-list",
      components: {
        toolbar,
        customPage,
      },
      data () {
        return {
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
          culturas: [],
          selectedSafraCulturaId: null,

          // UNIDADES
          unidadesArea: [],
          setUnidadeArea: [],
          unidadesMedida: [],
          setUnidadeMedida: null,
        }
      },
      methods: {
        // SAFRA CRUD
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
          safraService.saveSafra(this.safra.getValues()).then(response => {
            if(response.status === 201) {
              this.$q.notify({type: 'positive', message: 'Safra criada com sucesso'});
              this.listSafras();
              this.closeSafraModal();
              this.safra.inicio.value = this.getCurrentYear();
              this.safra.fim.value = this.getCurrentYear();
              this.selectedAnoFim = this.safra.fim.value.toString();
            }
          }).catch(error => {
            this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
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
          safraService.updateSafra(this.selectedSafra, this.safra.getValues()).then(response => {
            if(response.status === 200) {
              this.$q.notify({type: 'positive', message: 'Safra atualizada com sucesso!'});
              this.listSafras();
              this.closeSafraModal();
              this.safra.inicio.value = this.getCurrentYear();
              this.safra.fim.value = this.getCurrentYear();
              this.selectedAnoFim = this.safra.fim.value.toString();
            }
          }).catch(error => {
            this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
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
          safraService.archiveSafra(id).then(response => {
            this.$q.notify({type: 'positive', message: 'Safra arquivda com sucesso!'});
            this.listSafras()
          })
        },
        restoreSafra: function(id){
          safraService.restoreSafra(id).then(response => {
            this.listSafras()
          })
        },
        deleteSafra: function(id){
          this.$q.dialog({
            title: 'Atenção',
            message: 'Realmente deseja apagar essa safra?',
            ok: 'Sim', cancel: 'Não',
            color: 'primary'
          }).then(data => {
            safraService.deleteSafra(id).then(response => {
              this.listSafras()
            }).catch(error => {
              if(error.response.status){
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
        addSafraCultura: function(id){
          this.selectedSafraId = id;
          this.modalSafraCultura = true;
          this.listCulturas();
          this.getAreas();
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
          safraCulturaService.updateSafraCultura(this.selectedSafraId, this.selectedSafraCulturaId, this.formEditSafraCultura).then(response => {
            if(response.status === 200) {
              this.$q.notify({type: 'positive', message: 'Safra cultura atualizada com sucesso!'});
              this.listSafras();
              this.closeNewSafraCulturaModal();
            }
          }).catch(error => {
            this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
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

        // PASSO 1 CULTURA
        listCulturas() {
          safraCulturaService.listCulturas().then(response => {
            this.culturas = response;
          });
        },
        setCultura: function(cultura){
          this.safraCultura.cultura_id = cultura.id;
          this.safraCultura.culturaNome = cultura.nome;
          this.safraCultura.view_unidade_medida_id = cultura.default_unidade_medida_id;
          this.safraCultura.view_unidade_area_id = cultura.default_unidade_area_id;
          this.goToNextStep();
        },

        // PASSO 2 UNIDADE MEDIDA
        getUnidadesMedida:function(){
          unidadeMedidaService.listUnidadesMedida().then(response => {
            this.unidadesMedida = response.data;
          })
        },
        getUnidadesArea:function(){
          unidadeMedidaService.listUnidadesArea().then(response => {
            this.unidadesArea = response.data;
          })
        },
        getUnidadeMedidaById: function(id){
          return this.unidadesMedida.filter(unidade => unidade.id === id)[0];
        },
        getUnidadeAreaById: function(id){
          return this.unidadesArea.filter(unidade => unidade.id === id)[0];
        },
        parsedUnidades: function(unidades){
          return unidades.map(unidade => {
              return {
                label: unidade.nome,
                value: unidade.id
              }
          })
        },

        // PASSO 3 AREA
        getAreas: function(){
          areaService.listAreas().then(response => {
            this.areas = response;
          })
        },
        setArea: function(area){
          this.selectedArea.id = area.id;
          this.selectedArea.nome = area.nome;
          this.getTalhoesBySafraAndArea(area.id);
          this.goToNextStep();
        },

        // PASSO 4 TALHOES
        getTalhoesBySafraAndArea: function(area_id){
          safraService.listFreeTalhoes(area_id, this.selectedSafraId, this.safraCultura.view_unidade_area_id, this.safraCultura.view_unidade_medida_id, this.safraCultura.cultura_id).then(response => {
            this.talhoes = [];
            this.safraCultura.talhoes = [];
            response.data.forEach(function(talhao){
              this.talhoes.push({
                id: talhao.id,
                nome: talhao.nome,
                tamanho: parseFloat(talhao.tamanho),
                image_path: talhao.image_path,
                /*unidade: {
                  nome: talhao.unidade.nome,
                  plural: talhao.unidade.plural,
                  sigla: talhao.unidade.sigla,
                }*/
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
        goToNextStep(){
          this.$refs.stepper.next()
        },
        goToPreviousStep(){
          this.$refs.stepper.previous()
        },

        // SAFRA CULTURA VIEW CRUD
        saveSafraCultura: function(){
          safraCulturaService.saveSafraCultura(this.selectedSafraId, this.safraCultura.getValues()).then(response => {
            this.$q.notify({type: 'positive', message: 'Cultura criada com sucesso'});
            this.closeNewSafraCulturaModal();
            this.listSafras()
          }).catch(error => { });
        },
        viewSafraCultura: function (safra_id, id) {
          this.$router.push({name: 'view_safra_cultura', params: {safra_id:safra_id, id:id}});
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
          this.$q.dialog({
            title: 'Atenção',
            message: 'Realmente deseja apagar esse talhão?',
            ok: 'Sim', cancel: 'Não',
            color: 'primary'
          }).then(data => {
            safraCulturaService.deleteSafraCultura(safra_id, id).then(response => {
              this.listSafras()
            })
          }).catch(()=>{});

        },
      },
      mounted () {
        this.listSafras();
        this.makeYearsList(this.getCurrentYear());
        this.safra.inicio.value = this.getCurrentYear();
        this.safra.fim.value = this.getCurrentYear();
        this.selectedAnoFim = this.safra.fim.value.toString();
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
</style>
