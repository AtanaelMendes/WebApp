<template>
  <q-modal no-esc-dismiss v-model="isModalOpened" @hide="close" :content-css="{minWidth: '50vw', minHeight: '80vh'}" @show="$refs.primeiroCampo.focus()">
    <q-modal-layout v-if="notaFiscalRefenciada">
      <q-toolbar slot="header">
        <q-toolbar-title>
          <template v-if="editionType === 'add'">
            Informar Nota Fiscal Referênciada
          </template>
          <template v-if="editionType === 'edit'">
            Editar Nota Fiscal Referênciada
          </template>
        </q-toolbar-title>
      </q-toolbar>
      <div class="layout-padding">
        <div class="row justify-center">
          <div class="col-12">
            <form v-on:submit.prevent="save"><input type="submit" hidden />
              <ap-select-type v-model="notaFiscalRefenciada.tipo" type="NOTA_FISCAL_REFERENCIADA_TIPO" stack-label="Tipo" />
              <q-input v-model="notaFiscalRefenciada.chave" float-label="chave" ref="primeiroCampo"/>
              <q-input v-model="notaFiscalRefenciada.estado_id" float-label="estado_id"/>
              <q-datetime v-model="notaFiscalRefenciada.emissao" type="datetime" format="DD/MMM/YY HH:mm" stack-label="Emissão"  align="center" />
              <q-input v-model="notaFiscalRefenciada.cnpj" float-label="cnpj" align="right"/>
              <q-input v-model="notaFiscalRefenciada.cpf" float-label="cpf" align="right"/>
              <q-input v-model="notaFiscalRefenciada.inscricao_estadual" float-label="inscricao_estadual" align="right" />
              <ap-select-type v-model="notaFiscalRefenciada.modelo" type="NOTA_FISCAL_REFERENCIADA_TIPO" stack-label="Modelo" />
              <q-input v-model="notaFiscalRefenciada.serie" float-label="serie"/>
              <q-input v-model="notaFiscalRefenciada.numero" float-label="numero" align="right" type="number"/>
              <q-input v-model="notaFiscalRefenciada.coo" float-label="coo"/>
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
  import NotaFiscalReferenciadaService from "../../../../assets/js/service/notaFiscal/NotaFiscalReferenciadaService";
  export default {
    name: "notaFiscalReferenciadaFormModal",
    components:{
      apSelectType,
    },
    data(){
      return {
        isModalOpened: false,
        notaFiscalReferenciadaService: new NotaFiscalReferenciadaService(),
        notaFiscalRefenciada: {}
      }
    },

    mounted:function (){
      this.newNotaFiscalReferenciada();
    },

    props: {
      notaFiscalId: Number
    },

    computed: {
      editionType: function () {
        if (this.notaFiscalRefenciada.id) {
          return 'edit'
        }
        return 'add'
      }
    },

    methods: {
      // limpa dados do formulario
      newNotaFiscalReferenciada(){
        this.notaFiscalRefenciada = {
          nota_fiscal_id: this.notaFiscalId,
          tipo: null,
          chave: null,
          estado_id: null,
          emissao: null,
          cnpj: null,
          cpf: null,
          inscricao_estadual: null,
          modelo: null,
          serie: null,
          numero: null,
          coo: null,
        }
      },

      add: function() {
        this.newNotaFiscalReferenciada();
        this.isModalOpened = true;
      },

      edit: function(notaFiscalRefenciada) {
        this.notaFiscalRefenciada = Object.assign({}, notaFiscalRefenciada);
        this.isModalOpened = true;
      },

      delete: function(notaFiscalRefenciada) {
        this.notaFiscalRefenciada = Object.assign({}, notaFiscalRefenciada);
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir esta Nota Fiscal Referênciada?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.deleteNotaFiscalReferenciada()
        })
      },

      // fecha o modal e limpa formulario
      close: function(){
        this.isModalOpened = false;
      },

      // salvar registro
      save: function(){
        if (this.editionType === 'edit') {
          return this.updateNotaFiscalReferenciada();
        }
        return this.createNotaFiscalReferenciada();
      },

      // criar
      createNotaFiscalReferenciada: function(){
        this.$q.loading.show();
        this.notaFiscalReferenciadaService.create(this.notaFiscalRefenciada).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Nota Fiscal Referênciada salva com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // editar
      updateNotaFiscalReferenciada: function(){
        this.$q.loading.show();
        this.notaFiscalReferenciadaService.update(this.notaFiscalRefenciada.id, this.notaFiscalRefenciada).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Nota Fiscal Referênciada atualizada com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // excluir
      deleteNotaFiscalReferenciada: function(){
        this.$q.loading.show();
        this.notaFiscalReferenciadaService.delete(this.notaFiscalRefenciada.id).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Nota Fiscal Referênciada excluída com sucesso!'});
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
