<template>
  <q-modal v-model="isModalOpened" @hide="close" :content-css="{minWidth: '50vw', minHeight: '80vh'}">
    <q-modal-layout v-if="notaFiscalLocalizacao">
      <q-toolbar slot="header">
        <q-toolbar-title>
          <template v-if="editionType === 'add'">
            Informar Localização
          </template>
          <template v-if="editionType === 'edit'">
            Editar Localização
          </template>
        </q-toolbar-title>
      </q-toolbar>
      <div class="layout-padding">
        <div class="row justify-center">
          <div class="col-12">
            <form v-on:submit.prevent="save"><input type="submit" hidden />
              <q-input v-model="notaFiscalLocalizacao.tipo" float-label="tipo"/>
              <q-input v-model="notaFiscalLocalizacao.localizacao_id" float-label="localizacao_id"/>
              <q-input v-model="notaFiscalLocalizacao.razao_social" float-label="razao_social"/>
              <q-input v-model="notaFiscalLocalizacao.cnpj" float-label="cnpj"/>
              <q-input v-model="notaFiscalLocalizacao.cpf" float-label="cpf"/>
              <q-input v-model="notaFiscalLocalizacao.inscricao_estrangeiro" float-label="inscricao_estrangeiro"/>
              <q-input v-model="notaFiscalLocalizacao.inscricao_estadual_indicador" float-label="inscricao_estadual_indicador"/>
              <q-input v-model="notaFiscalLocalizacao.inscricao_estadual" float-label="inscricao_estadual"/>
              <q-input v-model="notaFiscalLocalizacao.inscricao_suframa" float-label="inscricao_suframa"/>
              <q-input v-model="notaFiscalLocalizacao.inscricao_municipal" float-label="inscricao_municipal"/>
              <q-input v-model="notaFiscalLocalizacao.email" float-label="email"/>
              <q-input v-model="notaFiscalLocalizacao.endereco" float-label="endereco"/>
              <q-input v-model="notaFiscalLocalizacao.numero" float-label="numero"/>
              <q-input v-model="notaFiscalLocalizacao.complemento" float-label="complemento"/>
              <q-input v-model="notaFiscalLocalizacao.bairro" float-label="bairro"/>
              <q-input v-model="notaFiscalLocalizacao.cidade_id" float-label="cidade_id"/>
              <q-input v-model="notaFiscalLocalizacao.cep" float-label="cep"/>
              <q-input v-model="notaFiscalLocalizacao.fone" float-label="fone"/>
            </form>
          </div>
        </div>
      </div>
      <div class="q-pa-sm text-right" slot="footer">
        <q-btn flat label="cancelar" color="negative" @click="close" class="q-mr-sm"/>
        <q-btn flat label="Salvar"   color="primary"  @click="save"  key="edit"/>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  import NotaFiscalLocalizacaoService from "../../../../assets/js/service/notaFiscal/NotaFiscalLocalizacaoService";
  export default {

    name: "notaFiscalLocalizacaoFormModal",

    data(){
      return {
        isModalOpened: false,
        notaFiscalLocalizacaoService: new NotaFiscalLocalizacaoService(),
        notaFiscalLocalizacao: {}
      }
    },

    mounted:function (){
      this.newNotaFiscalLocalizacao();
    },

    props: {
      notaFiscalId: Number
    },

    computed: {
      editionType: function () {
        if (this.notaFiscalLocalizacao.id) {
          return 'edit'
        }
        return 'add'
      }
    },

    methods: {
      // limpa dados do formulario
      newNotaFiscalLocalizacao(){
        this.notaFiscalLocalizacao = {
          nota_fiscal_id: this.notaFiscalId,
          tipo: null,
          localizacao_id: null,
          razao_social: null,
          cnpj: null,
          cpf: null,
          inscricao_estrangeiro: null,
          inscricao_estadual_indicador: null,
          inscricao_estadual: null,
          inscricao_suframa: null,
          inscricao_municipal: null,
          email: null,
          endereco: null,
          numero: null,
          complemento: null,
          bairro: null,
          cidade_id: null,
          cep: null,
          fone: null,
        }
      },

      add: function() {
        this.newNotaFiscalLocalizacao();
        this.isModalOpened = true;
      },

      edit: function(notaFiscalLocalizacao) {
        this.notaFiscalLocalizacao = Object.assign({}, notaFiscalLocalizacao);
        this.isModalOpened = true;
      },

      delete: function(notaFiscalLocalizacao) {
        this.notaFiscalLocalizacao = Object.assign({}, notaFiscalLocalizacao);
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir esta localização?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.deleteNotaFiscalLocalizacao()
        })
      },

      // fecha o modal e limpa formulario
      close: function(){
        this.isModalOpened = false;
      },

      // salvar registro
      save: function(){
        if (this.editionType === 'edit') {
          return this.updateNotaFiscalLocalizacao();
        }
        return this.createNotaFiscalLocalizacao();
      },

      // criar
      createNotaFiscalLocalizacao: function(){
        this.$q.loading.show();
        this.notaFiscalLocalizacaoService.create(this.notaFiscalLocalizacao).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Localização adicionada com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // editar
      updateNotaFiscalLocalizacao: function(){
        this.$q.loading.show();
        this.notaFiscalLocalizacaoService.update(this.notaFiscalLocalizacao.id, this.notaFiscalLocalizacao).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Localização atualizada com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // excluir
      deleteNotaFiscalLocalizacao: function(){
        this.$q.loading.show();
        this.notaFiscalLocalizacaoService.delete(this.notaFiscalLocalizacao.id).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Localização excluída com sucesso!'});
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
