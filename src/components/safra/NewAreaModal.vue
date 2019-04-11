<template>
  <ap-modal ref="newAreaModal" title="Nova Área" :visible="isModalOpened"
            :searchable="hasSearch" @search-input="search" @search-close="closeSearch" @hide="closeModal">

    <q-carousel slot="content" height="100%" no-swipe ref="stepperNovaArea" v-if="selectedSafraCultura" @slide-trigger="setStepperIndex">
      <!--PASSO 1 ADICIONAR AREA-->
      <q-carousel-slide class="q-pa-none">
        <template v-if="areas">
          <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
            <span class="q-subheading text-faded">Selecione uma área</span>
          </div>
          <div class="q-pa-lg">
            <div class="row gutter-sm">
              <div class="col-xs-6 col-sm-4 col-md-4 col-lg-4" v-for="area in areasFiltered" :key="area.nome">
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

          <div v-if="areasFiltered.length === 0" class="list-empty">
            <q-icon name="warning" />
            <span>Nenhuma área encontrada.</span>
          </div>
        </template>
      </q-carousel-slide>

      <!--PASSO 2 ADICIONAR TALHOES-->
      <q-carousel-slide class="q-pa-none">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Selecione os talhões</span>
        </div>
        <div class="q-pa-lg" v-if="talhoes && selectedArea.talhoes">
          <div class="row gutter-sm" v-if="talhoes.length > 0">
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" v-for="talhao in talhoes" :key="talhao.id">
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
          <span class="q-subheading text-faded">Resumo</span>
        </div>
        <div class="q-pa-lg">
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
      </q-carousel-slide>
    </q-carousel>

    <div slot="footer">
      <q-btn @click="closeModal()" flat label="Cancelar" color="primary" />
      <div class="float-right ">
        <q-btn @click="goToPreviousStep" flat label="voltar" color="primary" class="q-mr-sm" v-if="this.currentStep !== 0"/>
        <q-btn @click="goToNextStep" flat label="próximo" color="primary" :disabled="isNextButtonDisabled" v-if="currentStep !== 2"/>
        <q-btn @click="saveTalhoes" flat label="Salvar" color="primary" v-if="currentStep === 2"/>
      </div>
    </div>
  </ap-modal>
</template>

<script>
  import SafraCulturaTalhao from "../../assets/js/model/safra/SafraCulturaTalhao";
  import AreaService from "../../assets/js/service/area/AreaService";
  import apNoResults from 'components/ApNoResults';
  import apImage from 'components/ApImage';
  import apModal from 'components/ApModal'
  import UnidadeMedidaService from "../../assets/js/service/UnidadeMedidaService";
  import SafraCulturaService from "../../assets/js/service/safra/SafraCulturaService";

  export default {
    name: "NewAreaModal",
    components:{
      apNoResults,
      apImage,
      apModal
    },
    data(){
      return{
        isModalOpened: false,
        areaService: new AreaService(),
        safraCulturaService: new SafraCulturaService(),
        unidadeMedidaService: new UnidadeMedidaService(),
        selectedSafraCultura: null,
        hasSearch: true,
        currentStep: 0,
        areas: null,
        areasFiltered: null,
        talhoes: null,
        unidadesArea: null,
        unidadesMedida: null,
        selectedArea: {
          id: null,
          nome: '',
          talhoes: null,
        },
        searchValueByStep: null,
      }
    },
    computed:{
      isNextButtonDisabled(){
        if(this.currentStep === 0 && this.selectedArea.id === null){
          return true;
        }

        if(this.currentStep === 1){
          if(this.selectedArea.talhoes !== null) {
            if (this.getNotEmptyTalhoes().length === 0) {
              return true;
            }
          }
        }

        return false;
      },
    },
    methods:{
      openModal(safraCultura){
        this.isModalOpened = true;
        this.selectedSafraCultura = safraCultura;
        this.searchValueByStep = new Map();

        this.$refs.newAreaModal.showInnerProgress();
        Promise.all([
          this.getAreas(),
          this.getUnidadesMedida(),
          this.getUnidadesArea()
        ]).then(()=>{
          this.$refs.newAreaModal.hideInnerProgress();
        });
      },
      closeModal(){
        this.isModalOpened = false;
        this.resetStepper();
      },
      saveTalhoes(){
        this.$refs.newAreaModal.showOuterProgress();
        this.safraCulturaService.addTalhoes(
          this.selectedSafraCultura.safra.id,
          this.selectedSafraCultura.id,
          {'talhoes':this.getNotEmptyTalhoes()}
        ).then(()=>{
          this.$q.notify({type: 'positive', message: 'Área adicionada com sucesso'});
          this.$refs.newAreaModal.hideOuterProgress();
          this.closeModal();
          this.$root.$emit('refreshSafrasCulura');
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          this.$refs.newAreaModal.hideOuterProgress();
        })
      },
      resetStepper(){
        this.$refs.stepperNovaArea.goToSlide(0);

        this.areas = null;
        this.areasFiltered = null;
        this.talhoes = null;
        this.unidadesArea = null;
        this.unidadesMedida =  null;

        this.selectedArea = {
          id: null,
          nome: '',
          talhoes: null,
        };
      },
      setStepperIndex(oldIndex, newIndex, direction){
        this.currentStep = newIndex;
        this.hasSearch = this.currentStep === 0;
      },
      search(value){
        if(value === ""){
          this.searchValueByStep.delete(this.currentStep);
        }else{
          this.searchValueByStep.set(this.currentStep, value);
        }

        value = value.toLowerCase().replace(" ", "");
        if(value === ""){
          this.areasFiltered = this.areas;
        }else{
          this.areasFiltered = this.areas.filter(item => {
            if(item.nome.toLowerCase().match(value)){
              return true;
            }else{
              return false;
            }
          })
        }
      },
      closeSearch(event){
        if(event === 'click'){
          this.search("");
        }
      },
      async getAreas(){
        return this.safraCulturaService.listFreeAreas(
          this.selectedSafraCultura.safra.id,
          this.selectedSafraCultura.id,
        ).then(areas => {
          this.areas = areas;
          this.areasFiltered = areas;
        })
      },
      setArea(area){
        this.selectedArea.id = area.id;
        this.selectedArea.nome = area.nome;
        this.selectedArea.talhoes = null;
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
        this.$refs.newAreaModal.showInnerProgress();
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
          this.$refs.newAreaModal.hideInnerProgress();
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
        if(this.selectedArea.talhoes === null){
          this.selectedArea.talhoes = [];
        }
        this.selectedArea.talhoes.push(safraCulturaTalhao);
      },
      async getUnidadesMedida(){
        return this.unidadeMedidaService.listUnidadesMedida().then(unidades => {
          this.unidadesMedida = unidades;
        })
      },
      async getUnidadesArea(){
        return this.unidadeMedidaService.listUnidadesArea().then(unidades => {
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

        if(this.searchValueByStep.has(this.currentStep)){
          this.$refs.newAreaModal.openSearch(this.searchValueByStep.get(this.currentStep));
        }
      },
      goToPreviousStep(){
        this.$refs.stepperNovaArea.previous();

        if(this.searchValueByStep.has(this.currentStep)){
          this.$refs.newAreaModal.openSearch(this.searchValueByStep.get(this.currentStep));
        }
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
