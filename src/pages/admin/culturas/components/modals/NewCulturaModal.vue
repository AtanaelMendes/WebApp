<template>
  <ap-modal ref="newCulturaModal" title="Nova Cultura" :visible="isModalOpened" @hide="closeModal">
    <q-carousel slot="content" height="100%" no-swipe ref="stepperNovaCultura" @slide-trigger="setStepperIndex">
      <!--INFORMAÇÕES-->
      <q-carousel-slide class="q-pa-none">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Defina as informações básicas dessa cultura</span>
        </div>

        <div class="q-px-lg q-py-sm">
          <div class="row gutter-x-sm q-mt-md">

            <!--NOME-->
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <q-field :error="cultura.nome.errorMessage != null">
                <q-input v-model="cultura.nome.value" stack-label="Nome" @input="cultura.nome.errorMessage = null" />
                <div class="q-field-bottom row no-wrap" style="height: 22px">
                  <div class="q-field-error col" v-if="cultura.nome.errorMessage != null" >
                    {{cultura.nome.errorMessage}}
                  </div>
                </div>
              </q-field>
            </div>

            <!--ESTIMATIVA-->
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <q-field :error="cultura.defaultEstimativa.errorMessage != null" >
                <q-input type="number" v-model="cultura.defaultEstimativa.value" stack-label="Estimativa" @input="cultura.defaultEstimativa.errorMessage = null"/>
                <div class="q-field-bottom row no-wrap" style="height: 22px">
                  <div class="q-field-error col" v-if="cultura.defaultEstimativa.errorMessage != null" >
                    {{cultura.defaultEstimativa.errorMessage}}
                  </div>
                </div>
              </q-field>
            </div>

          </div>

          <div class="row gutter-x-sm q-mt-sm">

            <!--SELECT UNIDADE MEDIDA-->
            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">
              <q-field :error="cultura.defaultUnidadeMedidaId.errorMessage != null" >
                <q-select
                  @input="cultura.defaultUnidadeMedidaId.errorMessage = null"
                  stack-label="Unidade Medida"
                  :options="culturaService.parseUnidades(unidadeMedidas)"
                  v-model="cultura.defaultUnidadeMedidaId.value"
                />
                <div class="q-field-bottom row no-wrap" style="height: 22px">
                  <div class="q-field-error col" v-if="cultura.defaultUnidadeMedidaId.errorMessage != null" >
                    {{cultura.defaultUnidadeMedidaId.errorMessage}}
                  </div>
                </div>

              </q-field>
            </div>

            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 self-center text-center">
              Por
            </div>

            <!--SELECT UNIDADE AREA-->
            <div class="col-xs-10 col-sm-10 col-md-5 col-lg-5">
              <q-field :error="cultura.defaultUnidadeAreaId.errorMessage != null" >
                <q-select
                  @input="cultura.defaultUnidadeAreaId.errorMessage = null"
                  stack-label="Unidade área"
                  :options="culturaService.parseUnidades(unidadeAreas)"
                  v-model="cultura.defaultUnidadeAreaId.value"
                />
                <div class="q-field-bottom row no-wrap" style="height: 22px">
                  <div class="q-field-error col" v-if="cultura.defaultUnidadeAreaId.errorMessage != null" >
                    {{cultura.defaultUnidadeAreaId.errorMessage}}
                  </div>
                </div>
              </q-field>
            </div>

          </div>

          <div class="row gutter-x-sm q-mt-sm">

            <!--UNIDADE DE PRECO-->
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <q-field :error="cultura.defaultUnidadePrecoId.errorMessage != null" >
                <q-select
                  @input="cultura.defaultUnidadePrecoId.errorMessage = null"
                  stack-label="Unidade preço padrão"
                  :options="culturaService.parseUnidades(unidadeMedidas)"
                  v-model="cultura.defaultUnidadePrecoId.value"
                />
                <div class="q-field-bottom row no-wrap" style="height: 22px">
                  <div class="q-field-error col" v-if="cultura.defaultUnidadePrecoId.errorMessage != null" >
                    {{cultura.defaultUnidadePrecoId.errorMessage}}
                  </div>
                </div>
              </q-field>
            </div>

            <!--UNIDADE DE PESO-->
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <q-field :error="cultura.defaultUnidadePesagemId.errorMessage != null" >
                <q-select
                  @input="cultura.defaultUnidadePesagemId.errorMessage = null"
                  stack-label="Unidade peso padrão"
                  :options="culturaService.parseUnidades(unidadeMedidas)"
                  v-model="cultura.defaultUnidadePesagemId.value"
                />
                <div class="q-field-bottom row no-wrap" style="height: 22px">
                  <div class="q-field-error col" v-if="cultura.defaultUnidadePesagemId.errorMessage != null" >
                    {{cultura.defaultUnidadePrecoId.errorMessage}}
                  </div>
                </div>
              </q-field>
            </div>

          </div>
        </div>

      </q-carousel-slide>

      <!--CLASSIFICAÇÕES-->
      <q-carousel-slide class="q-pa-none">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Selecione as classificações que se aplicam a essa cultura</span>
        </div>

        <!--<q-btn label="Nova Classificação" color="deep-orange" class="q-mx-md q-mt-sm"/>-->

        <q-scroll-area style="width: auto; height: 315px;">
          <q-list no-border highlight v-if="classificacoes">
            <q-item tag="label" v-for="classificacao in cultura.classificacoes.value" :key="classificacao.id">
              <q-item-side>
                <q-checkbox v-model="classificacao.selected" />
              </q-item-side>

              <q-item-main>
                <q-item-tile label>{{getClassificacaoNameById(classificacao.id)}}</q-item-tile>
              </q-item-main>

              <q-item-side right>
                <q-input type="number" v-model="classificacao.tolerancia" align="right" suffix="%" inverted-light color="grey-1" :disabled="!classificacao.selected" />
              </q-item-side>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-carousel-slide>

    </q-carousel>

    <div slot="footer">
      <q-btn @click="closeModal()" flat label="Cancelar" color="primary" />
      <div class="float-right ">
        <q-btn @click="goToPreviousStep" flat label="voltar" color="primary" class="q-mr-sm" v-if="currentStep > 0"/>
        <q-btn @click="goToNextStep" flat label="próximo" color="primary" :disable="isNextStepEnabled()" v-if="currentStep === 0" />
        <q-btn @click="saveCultura" flat label="Salvar" color="primary" v-if="currentStep === 1"/>
      </div>
    </div>
  </ap-modal>
</template>

<script>
  import apModal from 'components/ApModal'
  import Cultura from 'assets/js/model/cultura/Cultura'
  import CulturaService from "../../../../../assets/js/service/cultura/CulturaService";
  import UnidadeMedidaService from "../../../../../assets/js/service/UnidadeMedidaService";
  import ClassificacaoService from "../../../../../assets/js/service/ClassificacaoService";

  export default {
    name: "NewCulturaModal",
    components: {
      apModal
    },
    data(){
      return {
        isModalOpened: false,
        currentStep: 0,
        culturaService: new CulturaService(),
        unidadeMedidaService: new UnidadeMedidaService(),
        classificacaoService: new ClassificacaoService(),
        cultura: new Cultura(),
        unidadeMedidas: [],
        unidadeAreas: [],
        classificacoes: null,
      }
    },
    methods: {
      openModal() {
        this.isModalOpened = true;
        this.cultura = new Cultura();

        this.$refs.newCulturaModal.showInnerProgress();
        Promise.all([
          this.listUnidadesMedidas(),
          this.listUnidadesAreas(),
          this.listClassificacoes()
        ]).then(()=>{
          this.$refs.newCulturaModal.hideInnerProgress();
        })
      },
      closeModal() {
        this.isModalOpened = false;
        this.resetModal();
      },
      resetModal(){
        this.$refs.stepperNovaCultura.goToSlide(0);
      },
      setStepperIndex(oldIndex, newIndex, direction){
        this.currentStep = newIndex;
      },
      goToNextStep(){
        if(this.currentStep === 0 && !this.cultura.isValid(this.currentStep)){
          return;
        }
        this.$refs.stepperNovaCultura.next();
      },
      goToPreviousStep(){
        this.$refs.stepperNovaCultura.previous();
      },
      async listUnidadesMedidas(){
        return this.unidadeMedidaService.listUnidadesMedida().then(unidades => {
          this.unidadeMedidas = unidades;
        });
      },
      async listUnidadesAreas(){
        return this.unidadeMedidaService.listUnidadesArea().then(unidades => {
          this.unidadeAreas = unidades;
        });
      },
      async listClassificacoes(){
        return this.classificacaoService.listClassificacoes().then(classificacoes => {
          this.classificacoes = classificacoes;
          this.cultura.classificacoes.value = this.makeClassificacoesFormList(classificacoes)
        })
      },
      makeClassificacoesFormList(classificacoes){
        return classificacoes.map(classificacao => {
          return {
            id: classificacao.id,
            selected: false,
            tolerancia: null,
          }
        })
      },
      getClassificacaoNameById(id){
        return this.classificacoes.find(classificacao => classificacao.id === id).nome;
      },
      isNextStepEnabled(){
        return false;
      },
      saveCultura(){
        if(!this.cultura.isValid(this.currentStep)){
          if(this.cultura.classificacoes.errorMessage){
            this.$q.dialog({title: 'Atenção', message: this.cultura.classificacoes.errorMessage, color: 'primary'})
            return;
          }
        }

        this.$refs.newCulturaModal.showOuterProgress();
        this.culturaService.saveCultura(this.cultura.getValues()).then(() => {
          this.$q.notify({type: 'positive', message: 'Cultura criada com sucesso'});
          this.$refs.newCulturaModal.hideOuterProgress();
          this.closeModal();
          this.$root.$emit('refreshCulturas')
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          this.$refs.newCulturaModal.hideOuterProgress();
        });

      }
    }
  }
</script>

<style scoped>

</style>
