<template>
  <q-modal v-model="isModalOpened" class="new-area-modal" minimized @hide="closeModal">
    <q-modal-layout>
      <div class="q-px-lg q-pb-sm q-pt-lg q-title" slot="header">
        Nova Área
      </div>

      <q-carousel height="100%" no-swipe ref="stepperNovaArea" v-if="selectedSafraCultura" @slide-trigger="setStepperIndex">
        <!--PASSO 1 ADICIONAR AREA-->
        <q-carousel-slide class="q-pa-none">
          <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
            <span class="q-subheading">Selecione uma área</span>
            <!--<q-input placeholder="Pesquisar" class=""/>-->
          </div>
          <div class="q-pa-lg">
            <div class="row gutter-sm">
              <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3" v-for="area in areas" :key="area.nome">
                <q-card @click.native="setArea(area)">
                  <q-card-media overlay-position="full">
                    <ap-image size="400x250" :file-name="area.image_file_name" />

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
        <q-carousel-slide class="q-pa-none">
          <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
            <span class="q-subheading">Selecione os talhões</span>
          </div>
          <div class="q-pa-lg">
            <div class="row gutter-sm" v-if="talhoes.length > 0">
              <div class="col-xs-12 col-sm-5 col-md-4 col-lg-3" v-for="talhao in talhoes" :key="talhao.id">
                <q-card>
                  <q-card-media overlay-position="full" @click.native="toggleTalhao(talhao)">
                    <ap-image size="400x250" :file-name="talhao.image_file_name" />

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
          <div class="q-pa-lg">
            <div class="row gutter-sm justify-center">
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

      <div class="q-pa-md" slot="footer">
        <q-btn @click="closeModal()" flat label="Cancelar" color="primary" />
        <div class="float-right ">
          <q-btn @click="goToPreviousStep" flat label="voltar" color="primary" class="q-mr-sm" v-if="this.currentStep !== 0"/>
          <q-btn @click="goToNextStep" flat label="próximo" color="primary" :disabled="isNextButtonDisabled" v-if="currentStep !== 2"/>
          <q-btn @click="saveTalhoes" flat label="Salvar" color="primary" v-if="currentStep === 2"/>
        </div>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  import SafraCulturaTalhao from "../../assets/js/model/safra/SafraCulturaTalhao";
  import AreaService from "../../assets/js/service/area/AreaService";
  import apNoResults from 'components/ApNoResults';
  import apImage from 'components/ApImage';
  import UnidadeMedidaService from "../../assets/js/service/UnidadeMedidaService";
  import SafraCulturaService from "../../assets/js/service/safra/SafraCulturaService";

  export default {
    name: "NewAreaModal",
    components:{
      apNoResults,
      apImage,
    },
    data(){
      return{
        isModalOpened: false,
        areaService: new AreaService(),
        safraCulturaService: new SafraCulturaService(),
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
      saveTalhoes(){
        this.safraCulturaService.addTalhoes(
          this.selectedSafraCultura.safra.id,
          this.selectedSafraCultura.id,
          {'talhoes':this.getNotEmptyTalhoes()}
        ).then(()=>{
          this.$q.notify({type: 'positive', message: 'Área adicionada com sucesso'});
          this.closeModal();
          this.$root.$emit('refreshAreasTab');
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          this.$q.loading.hide();
        })
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
        this.safraCulturaService.listFreeAreas(
          this.selectedSafraCultura.safra.id,
          this.selectedSafraCultura.id,
        ).then(areas => {
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
        this.safraCulturaService.listFreeTalhoes(
          this.selectedSafraCultura.safra.id,
          this.selectedSafraCultura.id,
          area_id
        ).then(talhoes => {
          this.talhoes = [];
          talhoes.forEach(function(talhao){
            this.talhoes.push({
              id: talhao.id,
              nome: talhao.nome,
              tamanho: parseFloat(talhao.tamanho),
              image_file_name: talhao.image_file_name,
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
      getUnidadesMedida(){
        this.$q.loading.show();
        this.unidadeMedidaService.listUnidadesMedida().then(unidades => {
          this.unidadesMedida = unidades;
          this.$q.loading.hide();
        })
      },
      getUnidadesArea(){
        this.unidadeMedidaService.listUnidadesArea().then(unidades => {
          this.unidadesArea = unidades;
        })
      },
      getUnidadeMedidaById(id){
        return this.unidadesMedida.filter(unidade => unidade.id === id)[0];
      },
      getUnidadeAreaById(id){
        return this.unidadesArea.filter(unidade => unidade.id === id)[0];
      },
      checkInputMaxSize: function(value, talhao){
        if(value > talhao.tamanho){
          this.getTalhaoById(talhao.id).tamanho = talhao.tamanho
        }
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
  .new-area-modal.modal.minimized .modal-content{
    max-width: 90vw;
    max-height: 90vh;
    width: 90vw;
    height: 90vh;
    overflow: hidden;
  }

  .new-area-modal .q-layout-header{
    box-shadow: none;
  }

  .new-area-modal .q-layout-footer{
    box-shadow: none;
  }
</style>
