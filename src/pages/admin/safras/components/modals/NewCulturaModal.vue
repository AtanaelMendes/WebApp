<template>
  <ap-modal ref="newCulturaModal" title="Nova Cultura" :visible="isModalOpened"
            :searchable="hasSearch" @search-input="search" @search-close="closeSearch" @hide="closeModal">
    <q-carousel slot="content" height="100%" no-swipe ref="stepperNovaCultura" @slide-trigger="setStepperIndex">
      <!--PASSO 1 SELECIONAR CULTURA-->
      <q-carousel-slide class="q-pa-none">
        <template v-if="culturasFiltered">
          <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
            <span class="q-subheading text-faded">Selecione uma cultura</span>
          </div>

          <template v-if="$q.screen.gt.xs">
            <div class="q-px-lg q-py-sm">
              <div class="row gutter-sm">
                <div class="col-xs-6 col-sm-4 col-md-4 col-lg-4" v-for="cultura in culturasFiltered" :key="cultura.nome">
                  <q-card @click.native="setCultura(cultura)">
                    <q-card-media overlay-position="full">
                      <ap-image size="400x250" :file-name="cultura.image_file_name"/>

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
            </div>

          </template>

          <q-list no-border separator style="width: 100%" link v-if="$q.screen.lt.sm">
            <q-item v-for="cultura in culturasFiltered" :key="cultura.nome" @click.native="setCultura(cultura)">
              <q-item-side>
                <q-item-tile style="width:70px">
                  <ap-image size="200x125" :file-name="cultura.image_file_name" />
                </q-item-tile>
              </q-item-side>
              <q-item-main>
                <q-item-tile label>
                  {{cultura.nome}}
                </q-item-tile>
              </q-item-main>
              <q-item-side right>
                <q-icon name="check_circle" size="30px" color="positive" v-if="cultura.id === safraCultura.cultura_id"/>
              </q-item-side>
            </q-item>
          </q-list>

          <div v-if="culturasFiltered.length === 0" class="list-empty">
            <q-icon name="warning" />
            <span>Nenhuma cultura encontrada.</span>
          </div>
        </template>

      </q-carousel-slide>
      <!--PASSO 2 INFORMAR UNIDADES-->
      <q-carousel-slide class="q-pa-none">
        <template v-if="unidadesMedida && unidadesArea">
          <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
            <span class="q-subheading text-faded">Informe as unidades de medida</span>
          </div>
          <div class="q-pa-lg">
            <div class="row justify-center">
              <div class="">
                <div>
                  <q-select key="pesagem" v-model="safraCultura.unidade_medida_pesagem_id" :options="parsedUnidades(unidadesMedida)" float-label="Unidade de pesagem"/>
                </div>
                <div>
                  <q-select key="preco" v-model="safraCultura.unidade_medida_preco_id" :options="parsedUnidades(unidadesMedida)" float-label="Unidade de preço"/>
                </div>
                <div>
                  <q-select key="area" v-model="safraCultura.unidade_medida_area_id" :options="parsedUnidades(unidadesArea)" float-label="Unidade de área"/>
                </div>
              </div>
            </div>
          </div>
        </template>
      </q-carousel-slide>
    </q-carousel>

    <div slot="footer">
      <q-btn @click="closeModal()" flat label="Cancelar" color="primary" />
      <div class="float-right ">
        <q-btn @click="goToPreviousStep" flat label="voltar" color="primary" class="q-mr-sm" v-if="currentStep === 1"/>
        <q-btn @click="goToNextStep" flat label="próximo" color="primary" v-if="currentStep === 0" :disabled="safraCultura.cultura_id === null"/>
        <q-btn @click="saveSafraCultura" flat label="Salvar" color="primary" v-if="currentStep === 1"/>
      </div>
    </div>
  </ap-modal>
</template>

<script>
  import SafraCultura from "../../../../../assets/js/model/safra/SafraCultura";
  import SafraCulturaService from "../../../../../assets/js/service/safra/SafraCulturaService";
  import UnidadeMedidaService from "../../../../../assets/js/service/UnidadeMedidaService";
  import SafraService from "../../../../../assets/js/service/safra/SafraService";
  import apImage from 'components/ApImage'
  import apModal from 'components/ApModal'

  export default {
    name: "NewCulturaModal",
    components: {
      apImage,
      apModal
    },
    data(){
      return {
        safraCulturaService: new SafraCulturaService(),
        safraService: new SafraService(),
        unidadeMedidaService: new UnidadeMedidaService(),
        isModalOpened: false,
        hasSearch: true,
        currentStep: 0,
        safraId: null,
        safraCultura: new SafraCultura(),
        culturas: null,
        culturasFiltered: null,
        unidadesArea: null,
        unidadesMedida: null,
        searchValueByStep: null,
      }
    },
    methods: {
      openModal(safraId){
        this.isModalOpened = true;
        this.safraId = safraId;
        this.searchValueByStep = new Map();

        this.$refs.newCulturaModal.showInnerProgress();
        Promise.all([
          this.getCulturas(safraId),
          this.getUnidadesMedida(),
          this.getUnidadesArea()
        ]).then(()=>{
          this.$refs.newCulturaModal.hideInnerProgress();
        });
      },
      closeModal(){
        this.isModalOpened = false;
        this.resetModal();
      },
      setStepperIndex(oldIndex, newIndex, direction){
        this.currentStep = newIndex;
        this.hasSearch = this.currentStep === 0;
      },
      goToNextStep(){
        this.$refs.newCulturaModal.closeSearch(true);
        this.$refs.stepperNovaCultura.next();

        if(this.searchValueByStep.has(this.currentStep)){
          this.$refs.newCulturaModal.openSearch(this.searchValueByStep.get(this.currentStep));
        }
      },
      goToPreviousStep(){
        this.$refs.newCulturaModal.closeSearch(true);
        this.$refs.stepperNovaCultura.previous();

        if(this.searchValueByStep.has(this.currentStep)){
          this.$refs.newCulturaModal.openSearch(this.searchValueByStep.get(this.currentStep));
        }
      },
      resetModal(){
        this.$refs.stepperNovaCultura.goToSlide(0);

        this.culturas = null;
        this.culturasFiltered = null;
        this.unidadesArea = null;
        this.unidadesMedida = null;
      },
      async getCulturas(safraId) {
        return this.safraService.listFreeCulturas(safraId).then(culturas => {
          this.culturas = culturas;
          this.culturasFiltered = culturas;
        });
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
      search(value){
        if(value === ""){
          this.searchValueByStep.delete(this.currentStep);
        }else{
          this.searchValueByStep.set(this.currentStep, value);
        }

        value = value.toLowerCase().replace(" ", "");
        if(value === ""){
          this.culturasFiltered = this.culturas;
        }else{
          this.culturasFiltered = this.culturas.filter(item => {
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
      setCultura(cultura){
        this.safraCultura.cultura_id = cultura.id;
        this.safraCultura.culturaNome = cultura.nome;
        this.safraCultura.unidade_medida_pesagem_id = cultura.unidade_medida_pesagem_id;
        this.safraCultura.unidade_medida_preco_id = cultura.unidade_medida_preco_id;
        this.safraCultura.unidade_medida_area_id = cultura.unidade_medida_area_id;
        this.goToNextStep();
      },
      saveSafraCultura(){
        this.$refs.newCulturaModal.showOuterProgress();
        this.safraCulturaService.saveSafraCultura(this.safraId, this.safraCultura.getValues()).then(() => {
          this.$q.notify({type: 'positive', message: 'Cultura criada com sucesso'});
          this.$refs.newCulturaModal.hideOuterProgress();
          this.closeModal();
          this.$root.$emit('refreshSafrasList');
        })
      },
      parsedUnidades(unidades){
        return unidades.map(unidade => {
          return {
            label: unidade.nome,
            value: unidade.id
          }
        })
      },
    }
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
