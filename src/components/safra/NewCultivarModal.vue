<template>
  <q-modal v-model="isModalOpened" class="new-cultivar-modal" minimized @hide="closeModal">
    <q-modal-layout>
      <div class="q-px-lg q-pb-sm q-pt-lg q-title" slot="header">
        Novo Cultivar
      </div>
      <q-carousel height="100%" no-swipe ref="stepperNovoCultivar" @slide-trigger="setStepperIndex">
        <!--PASSO 1 ESCOLHER MARCA-->
        <q-carousel-slide class="q-pa-none">
          <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
            <span class="q-subheading">Selecione uma marca</span>
          </div>
          <div class="q-pa-lg">
            <div class="row gutter-sm">
              <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2" v-for="marca in marcas" :key="marca.id">
                <q-card @click.native="setMarca(marca.id)">
                  <q-card-media overlay-position="full">
                    <img src="statics/images/no-image-16-10.svg" v-if="!marca.image_path"/>
                    <img :src="marca.image_path" v-if="marca.image_path"/>
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

              <div v-if="marcas.length === 0" class="list-empty">
                <q-icon name="warning" />
                <span>Nenhuma marca cadastrada ainda. Crie uma para poder continuar.</span>
              </div>
            </div>
          </div>
        </q-carousel-slide>

        <!--PASSO 2 ESCOLHER TIPO-->
        <q-carousel-slide class="q-pa-none">
          <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
            <span class="q-subheading">Selecione o cultivar</span>
          </div>
          <div class="q-pa-lg">
            <div class="row gutter-sm">
              <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2" v-for="cultivar in cultivares" :key="cultivar.id">
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

              <div v-if="cultivares.length === 0" class="list-empty">
                <q-icon name="warning" />
                <span>Nenhum cultivar encontrado para essa marca ou cultura.</span>
              </div>
            </div>
          </div>
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
    </q-modal-layout>
  </q-modal>
</template>

<script>
  import SafraCulturaService from "../../assets/js/service/safra/SafraCulturaService";

  export default {
    name: "NewCultivarModal",
    data(){
      return{
        isModalOpened: false,
        currentStep: 0,
        safraCulturaService: new SafraCulturaService(),
        marcas: [],
        cultivares: [],
        currentSafraCultura: null,
        currentTalhao: null,
        selectedMarcaId: null,
        selectedCultivarId: null,
      }
    },
    methods: {
      openModal(talhao, safraCultura) {
        this.isModalOpened = true;
        this.currentTalhao = talhao;
        this.currentSafraCultura = safraCultura;
        this.listMarcas()
      },
      closeModal() {
        this.isModalOpened = false;
        this.resetStepper();
      },
      setStepperIndex(oldIndex, newIndex, direction){
        this.currentStep = newIndex
      },
      goToNextStep(){
        this.$refs.stepperNovoCultivar.next();
      },
      goToPreviousStep(){
        this.$refs.stepperNovoCultivar.previous();
      },
      resetStepper(){
        this.$refs.stepperNovoCultivar.goToSlide(0);

        this.marcas = [];
        this.cultivares = [];
        this.selectedMarcaId = null;
        this.selectedCultivarId =  null;
      },
      listMarcas(){
        this.safraCulturaService.listMarcas().then(marcas => {
          this.marcas = marcas;
        })
      },
      listCultivarByMarca(marcaId){
        this.safraCulturaService.listCultivaresByMarca(this.currentSafraCultura.cultura.id, marcaId).then(cultivares => {
          this.cultivares = cultivares;
        })
      },
      setMarca(id){
        this.selectedMarcaId = id;
        this.listCultivarByMarca(id);
        this.goToNextStep();
      },
      setCultivar(id){
        this.selectedCultivarId = id;
      },
      addCultivar(){
        this.safraCulturaService.saveCultivarToSafraCulturaTalhao(
          this.currentSafraCultura.id, this.currentTalhao.safra_cultura_talhao_id, this.selectedCultivarId
        ).then(cultivar => {
          this.$q.notify({type: 'positive', message: 'Cultivar adicionado com sucesso'});
          this.closeModal();
          this.$root.$emit('refreshSafrasCulura');
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          this.$q.loading.hide();
        })
      },
    },
  }
</script>

<style>
  .new-cultivar-modal.modal.minimized .modal-content{
    max-width: 90vw;
    max-height: 90vh;
    width: 90vw;
    height: 90vh;
    overflow: hidden;
  }

  .new-cultivar-modal .q-layout-header{
    box-shadow: none;
  }

  .new-cultivar-modal .q-layout-footer{
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
