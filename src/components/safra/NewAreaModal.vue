<template>
  <q-modal v-model="isModalOpened" class="ap-modal" minimized @hide="closeModal">
    <q-modal-layout>
      <div class="q-pa-md q-title text-center" slot="header">
        Nova Área
      </div>

      <q-carousel height="100%" no-swipe ref="stepperNovaArea" @slide-trigger="setStepperIndex">
        <!--PASSO 1 ADICIONAR AREA-->
        <q-carousel-slide class="q-pa-none">
          <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
            <span class="q-subheading">Selecione uma área</span>
            <!--<q-input placeholder="Pesquisar" class=""/>-->
          </div>
          <div class="q-pa-md">
            <div class="row gutter-sm">
              <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3" v-for="area in areas" :key="area.nome">
                <q-card @click.native="setArea(area)">
                  <q-card-media overlay-position="full">
                    <img src="statics/images/no-image-16-10.svg" v-if="!area.image_path"/>
                    <img :src="area.image_path" v-if="area.image_path"/>

                    <q-card-title slot="overlay" align="end" v-if="area.id === selectedArea.id">
                      <q-icon name="check_circle" size="30px" color="positive"/>
                    </q-card-title>
                  </q-card-media>
                  <q-card-title>
                    {{area.nome}}
                  </q-card-title>
                </q-card>
              </div>
            </div>
          </div>
        </q-carousel-slide>

        <!--PASSO 2 ADICIONAR TALHOES-->
        <!--<q-carousel-slide v-bind:class="{'step-disabled':currentStep !== 1}" class="q-pa-none">-->
        <q-carousel-slide class="q-pa-none">
          <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
            <span class="q-subheading">Selecione os talhões</span>
          </div>
          <div class="q-pa-md">
            <div class="row gutter-sm" v-if="talhoes.length > 0">
              <div class="col-xs-12 col-sm-5 col-md-4 col-lg-3" v-for="talhao in talhoes" :key="talhao.id">
                <q-card>
                  <q-card-media overlay-position="full" @click.native="toggleTalhao(talhao)">

                    <img src="statics/images/no-image-16-10.svg" v-if="!talhao.image_path"/>
                    <img :src="talhao.image_path" v-if="talhao.image_path"/>

                    <q-card-title slot="overlay" align="end" v-if="getTalhaoById(talhao.id).tamanho > 0">
                      <q-icon name="check_circle" size="30px" color="positive"/>
                    </q-card-title>
                  </q-card-media>
                  <q-card-title>
                    {{talhao.nome}}
                  </q-card-title>

                  <q-card-main class="q-px-none">
                    <q-list-header>{{getUnidadeAreaById(selectedSafraCultura.view_unidade_area.id).plural}} à serem utilizados</q-list-header>
                    <q-item dense >
                      <div class="row full-width">
                        <div class="col-9 self-center">
                          <q-slider
                            label
                            :min="0"
                            :max="talhao.tamanho"
                            v-model="getTalhaoById(talhao.id).tamanho"
                            :label-value="`${getTalhaoById(talhao.id).tamanho} ${getUnidadeAreaById(selectedSafraCultura.view_unidade_area.id).sigla}`"
                          />
                        </div>
                        <div class="col-3 q-pl-sm">
                          <q-input
                            type="number"
                            align="center"
                            v-model="getTalhaoById(talhao.id).tamanho"
                            @blur="checkInputMaxSize(getTalhaoById(talhao.id).tamanho, talhao)"
                          />
                        </div>
                      </div>
                    </q-item>

                    <q-list no-border dense class="q-py-none">
                      <q-list-header>Estimativa</q-list-header>
                      <q-item dense>
                        <div class="row gutter-x-sm">
                          <div class="col-3">
                            <q-input type="number" align="center" v-model="getTalhaoById(talhao.id).estimativa" />
                          </div>
                          <div class="col-9 self-center">
                            {{getUnidadeMedidaById(selectedSafraCultura.view_unidade_medida.id).sigla}} por {{getUnidadeAreaById(selectedSafraCultura.view_unidade_area.id).nome}}
                          </div>
                        </div>
                      </q-item>
                    </q-list>
                  </q-card-main>
                </q-card>
              </div>
            </div>

            <div class="column q-ma-xl items-center" v-if="talhoes.length <= 0">
              <ap-no-results mensagem="Nenhum talhão com espaço disponível encontrado." />
            </div>
          </div>
        </q-carousel-slide>

        <!--PASSO 3  RESUMO E FINALIZAR-->
        <q-carousel-slide class="q-pa-none">
          <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
            <span class="q-subheading">Resumo</span>
          </div>
          <div class="q-pa-md">
            <div class="row gutter-sm">
              <div class="col-xs-12 col-md-6 col-lg-4">
                <q-list separator>
                  <q-list-header>{{selectedSafraCultura.cultura.nome}}</q-list-header>
                  <q-item>
                    <q-item-main label>
                      {{selectedArea.nome}}
                    </q-item-main>
                  </q-item>
                  <template v-for="talhao in selectedArea.talhoes">
                    <q-item :key="talhao.id" v-if="talhao.tamanho > 0">
                      <q-item-main>
                        <div class="row">
                          <div class="col-6">{{talhao.nome}}</div>
                          <div class="col-6">{{talhao.tamanho}},&nbsp<span class="text-faded q-caption">{{getUnidadeAreaById(selectedSafraCultura.view_unidade_area.id).plural}}</span></div>
                        </div>
                      </q-item-main>
                    </q-item>
                  </template>
                </q-list>
              </div>
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>

      <div class="q-pa-md text-right" slot="footer">
        <q-btn @click="closeModal()" label="Cancelar" color="primary" class="q-mr-md"/>
        <q-btn @click="goToPreviousStep" label="voltar" color="primary"  class="q-mr-xs" v-if="this.currentStep !== 0"/>
        <q-btn @click="goToNextStep" label="próximo" color="primary"  class="q-mr-xs" :disabled="isNextButtonDisabled" v-if="currentStep !== 2"/>
        <q-btn @click="" label="Salvar" color="deep-orange" v-if="currentStep === 2" class="float-right"/>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  import SafraCulturaTalhao from "../../assets/js/model/safra/SafraCulturaTalhao";
  import AreaService from "../../assets/js/service/area/AreaService";
  import SafraService from "../../assets/js/service/safra/SafraService";
  import apNoResults from 'components/ApNoResults'
  import UnidadeMedidaService from "../../assets/js/service/UnidadeMedidaService";

  export default {
    name: "NewAreaModal",
    components:{
      apNoResults,
    },
    data(){
      return{
        isModalOpened: false,
        areaService: new AreaService(),
        safraService: new SafraService(),
        unidadeMedidaService: new UnidadeMedidaService(),
        selectedSafraCultura: null,
        currentStep: 0,
        areas: [],
        talhoes: [],
        unidadesArea: [],
        unidadesMedida: [],
        culturaNome: "teste",
        selectedArea: {
          id: null,
          nome: '',
          talhoes: [],
        },
      }
    },
    computed:{
      isNextButtonDisabled(){
        console.log('isNextButtonDisabled')
        if(this.currentStep === 0 && this.selectedArea.id === null){
          return true;
        }

        if(this.currentStep === 1 && this.getNotEmptyTalhoes().length === 0){
          return true;
        }

        return false;
      },
    },
    methods:{
      openModal(safraCultura){
        this.isModalOpened = true;

        this.selectedSafraCultura = safraCultura;
        this.getAreas();
        this.getUnidadesMedida();
        this.getUnidadesArea();
      },
      closeModal(){
        this.isModalOpened = false;
        this.resetStepper();
      },
      resetStepper(){
        this.$refs.stepperNovaArea.goToSlide(0);

        this.areas = [];
        this.talhoes = [];
        this.unidadesArea = [];
        this.unidadesMedida =  [];

        this.selectedArea = {
          id: null,
          nome: '',
          talhoes: [],
        };
      },
      setStepperIndex(oldIndex, newIndex, direction){
        this.currentStep = newIndex
      },
      getAreas(){
        this.$q.loading.show();
        this.areaService.listAreas().then(areas => {
          this.areas = areas;
          this.$q.loading.hide();
        })
      },
      setArea(area){
        this.selectedArea.id = area.id;
        this.selectedArea.nome = area.nome;
        this.selectedArea.talhoes = [];
        this.getTalhoesBySafraAndArea(area.id);
        this.goToNextStep();
      },
      getTalhaoById(id){
        return this.selectedArea.talhoes[this.existsTalhaoById(id)]
      },
      existsTalhaoById(id){
        return this.selectedArea.talhoes.map(talhao => talhao.id).indexOf(id);
      },
      getNotEmptyTalhoes(){
        return this.selectedArea.talhoes.filter(function(talhao){
          return talhao.tamanho > 0;
        })
      },
      getTalhoesBySafraAndArea(area_id){
        this.$q.loading.show();
        this.safraService.listFreeTalhoes(
          area_id,
          this.selectedSafraCultura.safra.id,
          this.selectedSafraCultura.view_unidade_area.id,
          this.selectedSafraCultura.view_unidade_medida.id,
          this.selectedSafraCultura.cultura.id
        ).then(talhoes => {
          this.talhoes = [];
          talhoes.forEach(function(talhao){
            this.talhoes.push({
              id: talhao.id,
              nome: talhao.nome,
              tamanho: parseFloat(talhao.tamanho),
              image_path: talhao.image_path,
            });
            this.addTalhao(new SafraCulturaTalhao(talhao))
          },this);
          this.$q.loading.hide();
        })
      },
      toggleTalhao(talhao){
        let tal = this.getTalhaoById(talhao.id);
        if(tal.tamanho === 0){
          tal.tamanho = talhao.tamanho
        }else{
          tal.tamanho = 0
        }
      },
      addTalhao(safraCulturaTalhao){
        this.selectedArea.talhoes.push(safraCulturaTalhao);
      },
      getUnidadesMedida:function(){
        this.$q.loading.show();
        this.unidadeMedidaService.listUnidadesMedida().then(unidades => {
          this.unidadesMedida = unidades;
          this.$q.loading.hide();
        })
      },
      getUnidadesArea:function(){
        this.unidadeMedidaService.listUnidadesArea().then(unidades => {
          this.unidadesArea = unidades;
        })
      },
      getUnidadeMedidaById: function(id){
        return this.unidadesMedida.filter(unidade => unidade.id === id)[0];
      },
      getUnidadeAreaById: function(id){
        return this.unidadesArea.filter(unidade => unidade.id === id)[0];
      },
      goToNextStep(){
        this.$refs.stepperNovaArea.next();
      },
      goToPreviousStep(){
        this.$refs.stepperNovaArea.previous();
      },
    }
  }
</script>

<style>
  .ap-modal.modal.minimized .modal-content{
    max-width: 90vw;
    max-height: 90vh;
    width: 90vw;
    height: 90vh;
    overflow: hidden;
  }

  .ap-modal .q-layout-header{
    box-shadow: none;
  }

  .ap-modal .q-layout-footer{
    box-shadow: none;
  }
</style>
