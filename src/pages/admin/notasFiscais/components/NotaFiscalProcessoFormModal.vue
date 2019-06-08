<template>
  <q-modal no-esc-dismiss v-model="isModalOpened" @hide="close" :content-css="{minWidth: '50vw', minHeight: '80vh'}" @show="$refs.primeiroCampo.focus()">
    <q-modal-layout v-if="NotaFiscalProcesso">
      <q-toolbar slot="header">
        <q-toolbar-title>
          <template v-if="editionType === 'add'">
            Adicionar Processo
          </template>
          <template v-if="editionType === 'edit'">
            Editar Processo
          </template>
        </q-toolbar-title>
      </q-toolbar>
      <div class="layout-padding">
        <div class="row justify-center">
          <div class="col-12">
            <form v-on:submit.prevent="save"><input type="submit" hidden />
              <q-input v-model="NotaFiscalProcesso.numero" stack-label="numero" ref="primeiroCampo"/>
              <ap-select-type v-model="NotaFiscalProcesso.origem" type="ORIGEM_PROCESSO" stack-label="Origem do Processo" />
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
  import apSelectType from '../../../../components/form/ApSelectType'
  import NotaFiscalProcessoService from "../../../../assets/js/service/notaFiscal/NotaFiscalProcessoService";
  export default {
    name: "notaFiscalProcessoFormModal",
    components:{
      apSelectType,
    },
    data(){
      return {
        isModalOpened: false,
        NotaFiscalProcessoService: new NotaFiscalProcessoService(),
        NotaFiscalProcesso: {}
      }
    },

    mounted:function (){
      this.newNotaFiscalProcesso();
    },

    props: {
      notaFiscalId: Number
    },

    computed: {
      editionType: function () {
        if (this.NotaFiscalProcesso.id) {
          return 'edit'
        }
        return 'add'
      }
    },

    methods: {
      // limpa dados do formulario
      newNotaFiscalProcesso(){
        this.NotaFiscalProcesso = {
          nota_fiscal_id: this.notaFiscalId,
          numero: null,
          origem: null,
        }
      },

      add: function() {
        this.newNotaFiscalProcesso();
        this.isModalOpened = true;
      },

      edit: function(NotaFiscalProcesso) {
        this.NotaFiscalProcesso = Object.assign({}, NotaFiscalProcesso);
        this.isModalOpened = true;
      },

      delete: function(NotaFiscalProcesso) {
        this.NotaFiscalProcesso = Object.assign({}, NotaFiscalProcesso);
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir este Processo?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.deleteNotaFiscalProcesso()
        })
      },

      // fecha o modal e limpa formulario
      close: function(){
        this.isModalOpened = false;
      },

      // salvar registro
      save: function(){
        if (this.editionType === 'edit') {
          return this.updateNotaFiscalProcesso();
        }
        return this.createNotaFiscalProcesso();
      },

      // criar
      createNotaFiscalProcesso: function(){
        this.$q.loading.show();
        this.NotaFiscalProcessoService.create(this.NotaFiscalProcesso).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Processo adicionado com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // editar
      updateNotaFiscalProcesso: function(){
        this.$q.loading.show();
        this.NotaFiscalProcessoService.update(this.NotaFiscalProcesso.id, this.NotaFiscalProcesso).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Processo atualizado com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // excluir
      deleteNotaFiscalProcesso: function(){
        this.$q.loading.show();
        this.NotaFiscalProcessoService.delete(this.NotaFiscalProcesso.id).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Processo excluído com sucesso!'});
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
