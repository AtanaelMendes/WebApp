<template>
  <q-modal v-model="isModalOpened" maximized @hide="closeModal">

    <q-stepper ref="stepper" contractable color="positive" v-model="currentStep" class="no-shadow" >

      <!--PASSO 1 ADICIONAR CULTURAS-->
      <q-step default title="Culturas" name="cultura">
        <div style="min-height: 80vh" class="row items-center gutter-sm justify-center" v-if="culturas.length > 0">
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

    </q-stepper>

    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-btn @click="closeModal()" label="Cancelar" color="primary" class="q-mr-md"/>
      <q-btn @click="goToPreviousStep" label="voltar" color="primary"  class="q-mr-xs" v-if="this.currentStep !== 'cultura'"/>
      <q-btn @click="goToNextStep" label="próximo" color="primary"  class="q-mr-xs" :disabled="safraCultura.cultura_id === null" v-if="currentStep === 'cultura'"/>
      <q-btn @click="saveSafraCultura()" label="Salvar" color="deep-orange" v-if="currentStep === 'unidades'" class="float-right"/>
    </q-page-sticky>
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
        safraId: null,
        currentStep: 'cultura',
        safraCultura: new SafraCultura(),
        culturas: [],
        unidadesArea: [],
        unidadesMedida: [],
      }
    },
    methods: {
      openModal(safraId){
        this.isModalOpened = true;
        this.safraId = safraId
        this.getCulturas();
        this.getUnidadesMedida();
        this.getUnidadesArea();
      },
      closeModal: function(){
        this.isModalOpened = false;
      },
      goToNextStep(){
        this.$refs.stepper.next();
      },
      goToPreviousStep(){
        this.$refs.stepper.previous();
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

<style scoped>

</style>
