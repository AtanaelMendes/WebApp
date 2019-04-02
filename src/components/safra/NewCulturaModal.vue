<template>
  <q-modal v-model="isModalOpened" class="new-cultura-modal" minimized @hide="closeModal">
    <q-modal-layout>
      <div class="q-px-lg q-pb-sm q-pt-lg q-title" slot="header">
        Nova Cultura
      </div>

      <q-carousel height="100%" no-swipe ref="stepperNovaCultura" @slide-trigger="setStepperIndex">
        <!--PASSO 1 SELECIONAR CULTURA-->
        <q-carousel-slide class="q-pa-none">
          <template v-if="culturas">
            <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
              <span class="q-subheading">Selecione uma cultura</span>
            </div>
            <div class="q-pa-lg">
              <div class="row gutter-sm">
                <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2" v-for="cultura in culturas" :key="cultura.nome">
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

                <div v-if="culturas.length === 0" class="list-empty">
                  <q-icon name="warning" />
                  <span>Nenhuma cultura disponível.</span>
                </div>
              </div>
            </div>
          </template>
        </q-carousel-slide>
        <!--PASSO 2 INFORMAR UNIDADES-->
        <q-carousel-slide class="q-pa-none">
          <template v-if="unidadesMedida && unidadesArea">
            <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
              <span class="q-subheading">Informe as unidades de medida</span>
            </div>
            <div class="q-pa-lg">
              <div class="row gutter-sm justify-center">
                <div class="col-xs-12 col-md-6 col-lg-3">
                  <div>
                    <q-select key="qtd" v-model="safraCultura.view_unidade_medida_id" :options="parsedUnidades(unidadesMedida)" float-label="Controlar quantidades em"/>
                  </div>
                  <div>
                    <q-select key="area" v-model="safraCultura.view_unidade_area_id" :options="parsedUnidades(unidadesArea)" float-label="Mostrar área em"/>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </q-carousel-slide>
      </q-carousel>

      <div class="q-pa-md" slot="footer">
        <q-btn @click="closeModal()" flat label="Cancelar" color="primary" />
        <div class="float-right ">
          <q-btn @click="goToPreviousStep" flat label="voltar" color="primary" class="q-mr-sm" v-if="currentStep === 1"/>
          <q-btn @click="goToNextStep" flat label="próximo" color="primary" v-if="currentStep === 0" :disabled="safraCultura.cultura_id === null"/>
          <q-btn @click="saveSafraCultura" flat label="Salvar" color="primary" v-if="currentStep === 1"/>
        </div>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  import SafraCultura from "../../assets/js/model/safra/SafraCultura";
  import SafraCulturaService from "../../assets/js/service/safra/SafraCulturaService";
  import UnidadeMedidaService from "../../assets/js/service/UnidadeMedidaService";
  import SafraService from "../../assets/js/service/safra/SafraService";
  import apImage from 'components/ApImage'

  export default {
    name: "NewCulturaModal",
    components: {
      apImage,
    },
    data(){
      return {
        safraCulturaService: new SafraCulturaService(),
        safraService: new SafraService(),
        unidadeMedidaService: new UnidadeMedidaService(),
        isModalOpened: false,
        currentStep: 0,
        safraId: null,
        safraCultura: new SafraCultura(),
        culturas: null,
        unidadesArea: null,
        unidadesMedida: null,
      }
    },
    methods: {
      openModal(safraId){
        this.isModalOpened = true;
        this.safraId = safraId;
        this.getCulturas(safraId);
        this.getUnidadesMedida();
        this.getUnidadesArea();
      },
      closeModal(){
        this.isModalOpened = false;
        this.resetStepper();
      },
      setStepperIndex(oldIndex, newIndex, direction){
        this.currentStep = newIndex
      },
      goToNextStep(){
        this.$refs.stepperNovaCultura.next();
      },
      goToPreviousStep(){
        this.$refs.stepperNovaCultura.previous();
      },
      resetStepper(){
        this.$refs.stepperNovaCultura.goToSlide(0);

        this.culturas = [];
        this.unidadesArea = [];
        this.unidadesMedida = [];
      },
      getCulturas(safraId) {
        this.$q.loading.show();
        this.safraService.listFreeCulturas(safraId).then(culturas => {
          this.culturas = culturas;
          this.$q.loading.hide();
        });
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
      setCultura(cultura){
        this.safraCultura.cultura_id = cultura.id;
        this.safraCultura.culturaNome = cultura.nome;
        this.safraCultura.view_unidade_medida_id = cultura.default_unidade_medida_id;
        this.safraCultura.view_unidade_area_id = cultura.default_unidade_area_id;
        this.goToNextStep();
      },
      saveSafraCultura(){
        this.$q.loading.show();
        this.safraCulturaService.saveSafraCultura(this.safraId, this.safraCultura.getValues()).then(() => {
          this.$q.notify({type: 'positive', message: 'Cultura criada com sucesso'});
          this.closeModal();
          this.$root.$emit('refreshSafrasList');
          this.$q.loading.hide();
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
  .new-cultura-modal.modal.minimized .modal-content{
    max-width: 90vw;
    max-height: 90vh;
    width: 90vw;
    height: 90vh;
    overflow: hidden;
  }

  .new-cultura-modal .q-layout-header{
    box-shadow: none;
  }

  .new-cultura-modal .q-layout-footer{
    box-shadow: none;
  }

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
