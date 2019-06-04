<template>
  <ap-modal ref="editCulturaModal" title="Editar Cultura" :visible="isModalOpened" @hide="closeModal">

    <div slot="content" class="q-mx-lg q-mb-lg" v-if="safraCultura && unidadesMedida && unidadesArea">
        <q-select key="pesagem" v-model="safraCultura.unidade_medida_pesagem.id" :options="parsedUnidades(unidadesMedida)" float-label="Unidade de pesagem"/>

        <q-select key="preco" v-model="safraCultura.unidade_medida_preco.id" :options="parsedUnidades(unidadesMedida)" float-label="Unidade de preço"/>

        <q-select key="area" v-model="safraCultura.unidade_medida_area.id" :options="parsedUnidades(unidadesArea)" float-label="Unidade de área"/>

    </div>

    <div slot="footer" class="text-right">
      <q-btn @click.native="closeModal" color="primary" flat label="Cancelar" class="q-mr-xs"/>
      <q-btn @click.native="updateSafraCultura" label="Atualizar" flat color="primary"/>
    </div>
  </ap-modal>
</template>

<script>
  import UnidadeMedidaService from "../../../../../assets/js/service/UnidadeMedidaService";
  import SafraCulturaService from "../../../../../assets/js/service/safra/SafraCulturaService";
  import apModal from 'components/ApModal'

  export default {
    name: "EditCulturaModal",
    components:{
      apModal
    },
    data(){
      return {
        isModalOpened: false,
        safraCulturaService: new SafraCulturaService(),
        unidadeMedidaService: new UnidadeMedidaService(),
        safraCultura: null,
        unidadesMedida: null,
        unidadesArea: null,
      }
    },
    methods: {
      openModal(safraCultura){
        this.isModalOpened = true;
        this.safraCultura = JSON.parse(JSON.stringify(safraCultura));

        this.$refs.editCulturaModal.showInnerProgress();
        Promise.all([
          this.getUnidadesMedida(),
          this.getUnidadesArea()
        ]).then(()=>{
          this.$refs.editCulturaModal.hideInnerProgress();
        });
      },
      closeModal(){
        this.isModalOpened = false;
        this.unidadesArea = null;
        this.unidadesMedida = null;
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
      updateSafraCultura(){
        this.$refs.editCulturaModal.showOuterProgress();
        this.safraCulturaService.updateSafraCultura(
          this.safraCultura.safra.id,
          this.safraCultura.id,
          {
            unidade_medida_pesagem_id:this.safraCultura.unidade_medida_pesagem.id,
            unidade_medida_preco_id:this.safraCultura.unidade_medida_preco.id,
            unidade_medida_area_id: this.safraCultura.unidade_medida_area.id
          }
        ).then(() => {
          this.$q.notify({type: 'positive', message: 'Cultura atualizada com sucesso!'});
          this.$refs.editCulturaModal.hideOuterProgress();
          this.closeModal();
          this.$root.$emit('refreshSafrasCulura', true);
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          this.$refs.editCulturaModal.hideOuterProgress();
        });
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
