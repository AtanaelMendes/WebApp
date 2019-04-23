<template>
  <ap-modal ref="editCulturaModal" title="Editar Cultura" :visible="isModalOpened" @hide="closeModal">
    <div slot="content" class="q-mx-lg q-mb-lg" v-if="cultura">
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

    <div slot="footer" class="text-right">
      <q-btn @click.native="closeModal" color="primary" flat label="Cancelar" class="q-mr-xs"/>
      <q-btn @click.native="updateCultura" label="Atualizar" flat color="primary"/>
    </div>
  </ap-modal>
</template>

<script>
  import apModal from 'components/ApModal'
  import CulturaService from "../../../../../assets/js/service/cultura/CulturaService";
  import UnidadeMedidaService from "../../../../../assets/js/service/UnidadeMedidaService";
  import Cultura from 'assets/js/model/cultura/Cultura'

  export default {
    name: "EditCulturaModal",
    components: {
      apModal
    },
    data() {
      return {
        isModalOpened: false,
        currentStep: 0,
        culturaService: new CulturaService(),
        unidadeMedidaService: new UnidadeMedidaService(),
        unidadeMedidas: [],
        unidadeAreas: [],
        cultura: new Cultura(),
        currentCulturaId: null,
      }
    },
    methods: {
      openModal(culturaId) {
        this.isModalOpened = true;
        this.currentCulturaId = culturaId;
        this.cultura = new Cultura();

        this.$refs.editCulturaModal.showInnerProgress();
        Promise.all([
          this.getCulturaById(culturaId),
          this.listUnidadesMedidas(),
          this.listUnidadesAreas()
        ]).then(() => {
          this.$refs.editCulturaModal.hideInnerProgress();
        })
      },
      closeModal() {
        this.isModalOpened = false;
      },
      updateCultura: function() {
        if (!this.cultura.isValid(0)) {
          return;
        }

        this.$refs.editCulturaModal.showOuterProgress();
        this.culturaService.updateCultura(this.currentCulturaId, this.cultura.getValues(false)).then(response => {
          if (response.status === 200) {
            this.$q.notify({type: 'positive', message: 'Cultura atualizada com sucesso!'});
            this.$refs.editCulturaModal.hideOuterProgress();
            this.closeModal();
            this.$root.$emit('refreshCultura');
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          this.$refs.editCulturaModal.hideOuterProgress();
        });
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
      async getCulturaById(culturaId){
        return this.culturaService.getCultura(culturaId).then(cultura => {
          //this.cultura = cultura;
          this.fillFormCultura(cultura)
        })
      },
      fillFormCultura(cultura){
        this.cultura.nome.value = cultura.nome;
        this.cultura.defaultEstimativa.value = cultura.default_estimativa;
        this.cultura.defaultUnidadeMedidaId.value = cultura.default_unidade_medida_id;
        this.cultura.defaultUnidadeAreaId.value = cultura.default_unidade_area_id;
        this.cultura.defaultUnidadePrecoId.value = cultura.default_unidade_preco_id;
        this.cultura.defaultUnidadePesagemId.value = cultura.default_unidade_pesagem_id;
      },
    }
  }
</script>

<style scoped>

</style>
