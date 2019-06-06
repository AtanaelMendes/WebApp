<template>
  <q-modal no-esc-dismiss v-model="isModalOpened" @hide="close" :content-css="{minWidth: '50vw', minHeight: '80vh'}" @show="$refs.primeiroCampo.focus()">
    <q-modal-layout v-if="notaFiscalTransporteReboque">
      <q-toolbar slot="header">
        <q-toolbar-title>
          <template v-if="editionType === 'add'">
            Criar Informações de Transporte Reboque
          </template>
          <template v-if="editionType === 'edit'">
            Editar Informações de Transporte Reboque
          </template>
        </q-toolbar-title>
      </q-toolbar>
      <div class="layout-padding">
        <div class="row justify-center">
          <div class="col-12">
            <form v-on:submit.prevent="save"><input type="submit" hidden />
              <q-input v-model="notaFiscalTransporteReboque.reboque_id" float-label="reboque_id"/>
              <q-input v-model="notaFiscalTransporteReboque.placa" float-label="placa" ref="primeiroCampo"/>
              <q-input v-model="notaFiscalTransporteReboque.estado_id" float-label="estado_id"/>
              <q-input v-model="notaFiscalTransporteReboque.antt" float-label="antt"/>
            </form>
          </div>
        </div>
      </div>
      <div class="q-pa-sm text-right" slot="footer">
        <q-btn flat label="cancelar" color="negative" @click="close" class="q-mr-sm" :tabindex="-1"/>
        <q-btn flat label="Salvar"   color="primary"  @click="save"  key="edit"/>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  import NotaFiscalTransporteReboqueService from "../../../../assets/js/service/notaFiscal/NotaFiscalTransporteReboqueService";
  export default {

    name: "notaFiscalTransporteReboqueFormModal",

    data(){
      return {
        isModalOpened: false,
        notaFiscalTransporteReboqueService: new NotaFiscalTransporteReboqueService(),
        notaFiscalTransporteReboque: {}
      }
    },

    mounted:function (){
      this.newNotaFiscalTransporteReboque();
    },

    props: {
      notaFiscalTransporteReboqueId: Number
    },

    computed: {
      editionType: function () {
        if (this.notaFiscalTransporteReboque.id) {
          return 'edit'
        }
        return 'add'
      }
    },

    methods: {
      // limpa dados do formulario
      newNotaFiscalTransporteReboque(notaFiscalTransporteId){
        this.notaFiscalTransporteReboque = {
          nota_fiscal_transporte_id: notaFiscalTransporteId,
          reboque_id: null,
          placa: null,
          estado_id: null,
          antt: null,
        }
      },

      add: function(notaFiscalTransporteId) {
        this.newNotaFiscalTransporteReboque(notaFiscalTransporteId);
        this.isModalOpened = true;
      },

      edit: function(notaFiscalTransporteReboque) {
        this.notaFiscalTransporteReboque = Object.assign({}, notaFiscalTransporteReboque);
        this.isModalOpened = true;
      },

      delete: function(notaFiscalTransporteReboque) {
        this.notaFiscalTransporteReboque = Object.assign({}, notaFiscalTransporteReboque);
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir as informações Transporte Reboque?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.deleteNotaFiscalTransporteReboque()
        })
      },

      // fecha o modal e limpa formulario
      close: function(){
        this.isModalOpened = false;
      },

      // salvar registro
      save: function(){
        if (this.editionType === 'edit') {
          return this.updateNotaFiscalTransporteReboque();
        }
        return this.createNotaFiscalTransporteReboque();
      },

      // criar
      createNotaFiscalTransporteReboque: function(){
        this.$q.loading.show();
        this.notaFiscalTransporteReboqueService.create(this.notaFiscalTransporteReboque).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Informações de Transporte Reboque adicionadas com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // editar
      updateNotaFiscalTransporteReboque: function(){
        this.$q.loading.show();
        this.notaFiscalTransporteReboqueService.update(this.notaFiscalTransporteReboque.id, this.notaFiscalTransporteReboque).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Informações de Transporte Reboque atualizadas com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // excluir
      deleteNotaFiscalTransporteReboque: function(){
        this.$q.loading.show();
        this.notaFiscalTransporteReboqueService.delete(this.notaFiscalTransporteReboque.id).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Informações de Transporte Reboque excluídas com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

    }
  }
</script>

<style scoped>

</style>
