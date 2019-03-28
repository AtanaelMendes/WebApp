<template>
  <q-modal v-model="isModalOpened" class="edit-cultura-modal" minimized @hide="closeModal" :content-css="{minWidth: '300px'}">
    <q-modal-layout>
      <div class="q-px-lg q-pb-sm q-pt-lg q-title" slot="header">
        Editar Cultura
      </div>

      <div class="q-mx-lg q-mb-lg">
        <div class="row">
          <div class="col-12" v-if="safraCultura">
            <q-select key="qtd" v-model="safraCultura.view_unidade_medida.id" :options="parsedUnidades(unidadesMedida)" float-label="Controlar quantidades em"/>
            <q-select key="area" v-model="safraCultura.view_unidade_area.id" :options="parsedUnidades(unidadesArea)" float-label="Mostrar área em"/>
          </div>
        </div>
      </div>

      <div class="q-pa-sm text-right" slot="footer">
        <q-btn @click.native="closeModal" color="primary" flat label="Cancelar" class="q-mr-xs"/>
        <q-btn @click.native="updateSafraCultura" label="Atualizar" flat color="primary"/>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  import UnidadeMedidaService from "../../assets/js/service/UnidadeMedidaService";
  import SafraCulturaService from "../../assets/js/service/safra/SafraCulturaService";

  export default {
    name: "EditCulturaModal",
    data(){
      return {
        isModalOpened: false,
        safraCulturaService: new SafraCulturaService(),
        unidadeMedidaService: new UnidadeMedidaService(),
        safraCultura: null,
        unidadesMedida: [],
        unidadesArea: [],
      }
    },
    methods: {
      openModal(safraCultura){
        this.isModalOpened = true;
        this.safraCultura = JSON.parse(JSON.stringify(safraCultura));
        this.getUnidadesMedida();
        this.getUnidadesArea();
      },
      closeModal(){
        this.isModalOpened = false;
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
      updateSafraCultura(){
        this.$q.loading.show();
        this.safraCulturaService.updateSafraCultura(
          this.safraCultura.safra.id,
          this.safraCultura.id,
          {
            view_unidade_medida_id:this.safraCultura.view_unidade_medida.id,
            view_unidade_area_id: this.safraCultura.view_unidade_area.id
          }
        ).then(() => {
          this.$q.notify({type: 'positive', message: 'Cultura atualizada com sucesso!'});
          this.closeModal();
          this.$root.$emit('refreshSafrasCulura');
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          this.$q.loading.hide();
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

<style>
  .edit-cultura-modal .q-layout-header{
    box-shadow: none;
  }

  .edit-cultura-modal .q-layout-footer{
    box-shadow: none;
  }

</style>
