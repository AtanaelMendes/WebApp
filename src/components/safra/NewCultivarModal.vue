<template>
  <ap-modal ref="newCultivarModal" title="Novo Cultivar" :visible="isModalOpened"
            :searchable="hasSearch" @search-input="search" @search-close="closeSearch" @hide="closeModal">

    <q-carousel slot="content" height="100%" no-swipe ref="stepperNovoCultivar" @slide-trigger="setStepperIndex">
      <!--PASSO 1 ESCOLHER MARCA-->
      <q-carousel-slide class="q-pa-none">
        <template v-if="marcas">
          <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
            <span class="q-subheading text-faded">Selecione uma marca</span>
          </div>
          <div class="q-pa-lg">
            <div class="row gutter-sm">
              <div class="col-xs-6 col-sm-4 col-md-4 col-lg-4" v-for="marca in marcasFiltered" :key="marca.id">
                <q-card @click.native="setMarca(marca.id)">
                  <q-card-media overlay-position="full">
                    <ap-image size="400x250" :file-name="marca.image_file_name"/>
                    <q-card-title slot="overlay" align="end" v-if="marca.id === selectedMarcaId">
                      <q-icon name="check_circle" size="30px" color="positive"/>
                    </q-card-title>
                  </q-card-media>
                  <q-card-separator/>
                  <q-card-title>
                    {{marca.nome}}
                  </q-card-title>
                </q-card>
              </div>
            </div>
          </div>
          <div v-if="marcasFiltered.length === 0" class="list-empty">
            <q-icon name="warning" />
            <span>Nenhuma marca encontrada.</span>
          </div>
        </template>
      </q-carousel-slide>

      <!--PASSO 2 ESCOLHER TIPO-->
      <q-carousel-slide class="q-pa-none">
        <template v-if="cultivares">
          <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
            <span class="q-subheading text-faded">Selecione o cultivar</span>
          </div>
          <div class="q-pa-lg">
            <div class="row gutter-sm">
              <div class="col-xs-6 col-sm-4 col-md-4 col-lg-4" v-for="cultivar in cultivaresFiltered" :key="cultivar.id">
                <q-card @click.native="setCultivar(cultivar.id)">
                  <q-card-title class="text-center">
                    {{cultivar.nome}}
                    <div slot="right" v-if="cultivar.id === selectedCultivarId">
                      <q-btn icon="done" round color="positive" dense/>
                    </div>
                  </q-card-title>
                  <q-card-separator/>
                  <q-card-main>
                    <div class="row">
                      <div class="col-12 text-center text-faded">
                        {{cultivar.tipo}}
                      </div>
                      <div class="col-12 text-center">
                        Ciclo {{cultivar.ciclo}} {{cultivar.ciclo_dias}} dias.
                      </div>
                    </div>
                  </q-card-main>
                </q-card>
              </div>
            </div>
          </div>
          <div v-if="cultivaresFiltered.length === 0" class="list-empty">
            <q-icon name="warning" />
            <span>Nenhum cultivar encontrado.</span>
          </div>
        </template>
      </q-carousel-slide>

    </q-carousel>

    <div class="q-pa-md" slot="footer">
      <q-btn @click="closeModal()" flat label="Cancelar" color="primary" />
      <div class="float-right ">
        <q-btn @click="goToPreviousStep" flat label="voltar" color="primary" class="q-mr-sm" v-if="currentStep === 1"/>
        <q-btn @click="goToNextStep" flat label="próximo" color="primary" v-if="currentStep === 0" :disabled="selectedMarcaId === null"/>
        <q-btn @click="addCultivar" flat label="Salvar" color="primary" v-if="currentStep === 1" :disabled="selectedCultivarId === null"/>
      </div>
    </div>
  </ap-modal>
</template>

<script>
  import SafraCulturaService from "../../assets/js/service/safra/SafraCulturaService";
  import apModal from 'components/ApModal'
  import apImage from 'components/ApImage'
  import SafraCulturaTalhaoService from "../../assets/js/service/safra/SafraCulturaTalhaoService";

  export default {
    name: "NewCultivarModal",
    components: {
      apModal,
      apImage
    },
    data(){
      return{
        isModalOpened: false,
        currentStep: 0,
        hasSearch: true,
        safraCulturaService: new SafraCulturaService(),
        safraCulturaTalhaoService: new SafraCulturaTalhaoService(),
        marcas: null,
        marcasFiltered: null,
        cultivares: null,
        cultivaresFiltered: null,
        currentSafraCultura: null,
        currentTalhao: null,
        selectedMarcaId: null,
        selectedCultivarId: null,
        searchValueByStep: null,
      }
    },
    methods: {
      openModal(talhao, safraCultura) {
        this.isModalOpened = true;
        this.currentTalhao = talhao;
        this.currentSafraCultura = safraCultura;
        this.searchValueByStep = new Map();
        this.listMarcas()
      },
      closeModal() {
        this.isModalOpened = false;
        this.resetStepper();
      },
      setStepperIndex(oldIndex, newIndex, direction){
        this.currentStep = newIndex
      },
      search(value){
        if(value === ""){
          this.searchValueByStep.delete(this.currentStep);
        }else{
          this.searchValueByStep.set(this.currentStep, value);
        }
        switch (this.currentStep) {
          case 0:
            this.filterMarcas(value);
            break;
          case 1:
            this.filterCultivares(value);
            break;
        }
      },
      filterMarcas(value){
        value = value.toLowerCase().replace(" ", "");
        if(value === ""){
          this.marcasFiltered = this.marcas;
        }else{
         this.marcasFiltered = this.marcas.filter(item => {
            if(item.nome.toLowerCase().match(value)){
              return true;
            }else{
              return false;
            }
          })
        }
      },
      filterCultivares(value){
        value = value.toLowerCase().replace(" ", "");
        if(value === ""){
          this.cultivaresFiltered = this.cultivares;
        }else{
          this.cultivaresFiltered = this.cultivares.filter(item => {
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
      goToNextStep(){
        this.$refs.newCultivarModal.closeSearch(true);
        this.$refs.stepperNovoCultivar.next();

        if(this.searchValueByStep.has(this.currentStep)){
          this.$refs.newCultivarModal.openSearch(this.searchValueByStep.get(this.currentStep));
        }
      },
      goToPreviousStep(){
        this.$refs.newCultivarModal.closeSearch(true);
        this.$refs.stepperNovoCultivar.previous();

        if(this.searchValueByStep.has(this.currentStep)){
          this.$refs.newCultivarModal.openSearch(this.searchValueByStep.get(this.currentStep));
        }
      },
      resetStepper(){
        this.$refs.stepperNovoCultivar.goToSlide(0);

        this.marcas = null;
        this.marcasFiltered = null;
        this.cultivares = null;
        this.cultivaresFiltered = null;
        this.selectedMarcaId = null;
        this.selectedCultivarId =  null;
      },
      listMarcas(){
        this.$refs.newCultivarModal.showInnerProgress();
        this.safraCulturaService.listMarcas().then(marcas => {
          this.marcas = marcas;
          this.marcasFiltered = marcas;
          this.$refs.newCultivarModal.hideInnerProgress();
        })
      },
      listCultivarByMarca(marcaId){
        this.$refs.newCultivarModal.showInnerProgress();
        this.cultivares = null;
        this.cultivaresFiltered = null;
        this.safraCulturaService.listCultivaresByMarca(this.currentSafraCultura.cultura.id, marcaId).then(cultivares => {
          this.cultivares = cultivares;
          this.cultivaresFiltered = cultivares;
          this.$refs.newCultivarModal.hideInnerProgress();
        })
      },
      setMarca(id){
        this.selectedMarcaId = id;
        this.searchValueByStep.delete(1);
        this.listCultivarByMarca(id);
        this.goToNextStep();
      },
      setCultivar(id){
        this.selectedCultivarId = id;
      },
      addCultivar(){
        this.$refs.newCultivarModal.showOuterProgress();
        this.safraCulturaTalhaoService.saveCultivarToSafraCulturaTalhao(
          this.currentSafraCultura.id, this.currentTalhao.safra_cultura_talhao_id, this.selectedCultivarId
        ).then(cultivar => {
          this.$q.notify({type: 'positive', message: 'Cultivar adicionado com sucesso'});
          this.$refs.newCultivarModal.hideOuterProgress();
          this.closeModal();
          this.$root.$emit('refreshSafrasCulura');
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          this.$refs.newCultivarModal.hideOuterProgress();
        })
      },
    },
  }
</script>

<style>
  .list-empty{
    height: 55px;
    text-align: center;
    padding-top: 15px;

    width: 100%;
  }
  .list-empty span{
    color: #8c8c8c;
    font-weight: 300;
    font-size: 15px;
  }
  .list-empty i{
    color: #ffb500;
    font-size: 20px;
    margin-right: 6px;
  }

</style>
