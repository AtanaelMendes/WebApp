<template>
  <q-modal v-model="isModalOpened" class="new-cultura-modal" minimized @hide="closeModal">
    <q-modal-layout>
      <div class="q-px-lg q-pb-sm q-pt-lg q-title" slot="header">
        Nova Cultura
      </div>

      <q-carousel height="100%" no-swipe ref="stepperNovaCultura" @slide-trigger="setStepperIndex">
        <!--PASSO 1 SELECIONAR CULTURA-->
        <q-carousel-slide class="q-pa-none">
          <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
            <span class="q-subheading">Selecione uma cultura</span>
          </div>
          <div class="q-pa-lg">
            <div class="row gutter-sm">
              <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2" v-for="cultura in culturas" :key="cultura.nome">
                <q-card @click.native="setCultura(cultura)">
                  <q-card-media overlay-position="full">
                    <img src="statics/images/no-image-16-10.svg" v-if="!cultura.image_path"/>
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
          </div>
        </q-carousel-slide>
        <!--PASSO 2 INFORMAR UNIDADES-->
        <q-carousel-slide class="q-pa-none">
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

  export default {
    name: "NewCulturaModal",
    data(){
      return {
        safraCulturaService: new SafraCulturaService(),
        unidadeMedidaService: new UnidadeMedidaService(),
        isModalOpened: false,
        currentStep: 0,
        safraId: null,
        safraCultura: new SafraCultura(),
        culturas: [],
        unidadesArea: [],
        unidadesMedida: [],
      }
    },
    methods: {
      openModal(safraId){
        this.isModalOpened = true;
        this.safraId = safraId;
        this.getCulturas();
        this.getUnidadesMedida();
        this.getUnidadesArea();
      },
      closeModal: function(){
        this.isModalOpened = false;
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
      getCulturas() {
        this.$q.loading.show();
        this.safraCulturaService.listCulturas().then(culturas => {
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
</style>
