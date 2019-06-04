<template>
  <q-modal v-model="isModalOpened" @hide="close" :content-css="{minWidth: '50vw', minHeight: '80vh'}">
    <q-modal-layout v-if="notaFiscalItemIcms">
      <q-toolbar slot="header">
        <q-toolbar-title>
          <template v-if="editionType === 'add'">
            Criar Informações de ICMS do Item
          </template>
          <template v-if="editionType === 'edit'">
            Editar Informações de ICMS do Item
          </template>
        </q-toolbar-title>
      </q-toolbar>
      <div class="layout-padding">
        <div class="row justify-center">
          <div class="col-12">
            <form v-on:submit.prevent="save"><input type="submit" hidden />
              <q-input v-model="notaFiscalItemIcms.origem" float-label="origem"/>
              <q-input v-model="notaFiscalItemIcms.cst" float-label="cst"/>
              <q-input v-model="notaFiscalItemIcms.csosn" float-label="csosn"/>
              <q-input v-model="notaFiscalItemIcms.base_calculo" float-label="base_calculo"/>
              <q-input v-model="notaFiscalItemIcms.percentual" float-label="percentual"/>
              <q-input v-model="notaFiscalItemIcms.valor" float-label="valor"/>
              <q-input v-model="notaFiscalItemIcms.base_calculo_modalidade" float-label="base_calculo_modalidade"/>
              <q-input v-model="notaFiscalItemIcms.base_calculo_percentual_reducao" float-label="base_calculo_percentual_reducao"/>
              <q-input v-model="notaFiscalItemIcms.st_base_calculo_modalidade" float-label="st_base_calculo_modalidade"/>
              <q-input v-model="notaFiscalItemIcms.st_percentual_margem" float-label="st_percentual_margem"/>
              <q-input v-model="notaFiscalItemIcms.st_base_calculo_percentual_reducao" float-label="st_base_calculo_percentual_reducao"/>
              <q-input v-model="notaFiscalItemIcms.st_base_calculo" float-label="st_base_calculo"/>
              <q-input v-model="notaFiscalItemIcms.st_percentual" float-label="st_percentual"/>
              <q-input v-model="notaFiscalItemIcms.st_valor" float-label="st_valor"/>
              <q-input v-model="notaFiscalItemIcms.fcp_percentual" float-label="fcp_percentual"/>
              <q-input v-model="notaFiscalItemIcms.fcp_valor" float-label="fcp_valor"/>
              <q-input v-model="notaFiscalItemIcms.fcp_base_calculo" float-label="fcp_base_calculo"/>
              <q-input v-model="notaFiscalItemIcms.fcp_st_base_calculo" float-label="fcp_st_base_calculo"/>
              <q-input v-model="notaFiscalItemIcms.fcp_st_percentual" float-label="fcp_st_percentual"/>
              <q-input v-model="notaFiscalItemIcms.fcp_st_valor" float-label="fcp_st_valor"/>
              <q-input v-model="notaFiscalItemIcms.desoneracao_valor" float-label="desoneracao_valor"/>
              <q-input v-model="notaFiscalItemIcms.desoneracao_motivo" float-label="desoneracao_motivo"/>
              <q-input v-model="notaFiscalItemIcms.op_base_calculo_percentual" float-label="op_base_calculo_percentual"/>
              <q-input v-model="notaFiscalItemIcms.op_valor" float-label="op_valor"/>
              <q-input v-model="notaFiscalItemIcms.diferimento_percentual" float-label="diferimento_percentual"/>
              <q-input v-model="notaFiscalItemIcms.diferimento_valor" float-label="diferimento_valor"/>
              <q-input v-model="notaFiscalItemIcms.st_retido_base_calculo" float-label="st_retido_base_calculo"/>
              <q-input v-model="notaFiscalItemIcms.st_retido_valor" float-label="st_retido_valor"/>
              <q-input v-model="notaFiscalItemIcms.consumidor_percentual" float-label="consumidor_percentual"/>
              <q-input v-model="notaFiscalItemIcms.fcp_st_retido_base_calculo" float-label="fcp_st_retido_base_calculo"/>
              <q-input v-model="notaFiscalItemIcms.fcp_st_retido_percentual" float-label="fcp_st_retido_percentual"/>
              <q-input v-model="notaFiscalItemIcms.fcp_st_retido_valor" float-label="fcp_st_retido_valor"/>
              <q-input v-model="notaFiscalItemIcms.efetivo_base_calculo_percentual_reducao" float-label="efetivo_base_calculo_percentual_reducao"/>
              <q-input v-model="notaFiscalItemIcms.efetivo_base_calculo" float-label="efetivo_base_calculo"/>
              <q-input v-model="notaFiscalItemIcms.efetivo_percentual" float-label="efetivo_percentual"/>
              <q-input v-model="notaFiscalItemIcms.efetivo_valor" float-label="efetivo_valor"/>
              <q-input v-model="notaFiscalItemIcms.substituto_valor" float-label="substituto_valor"/>
              <q-input v-model="notaFiscalItemIcms.st_estado_id" float-label="st_estado_id"/>
              <q-input v-model="notaFiscalItemIcms.destino_st_base_calculo" float-label="destino_st_base_calculo"/>
              <q-input v-model="notaFiscalItemIcms.destino_st_valor" float-label="destino_st_valor"/>
              <q-input v-model="notaFiscalItemIcms.simples_credito_percentual" float-label="simples_credito_percentual"/>
              <q-input v-model="notaFiscalItemIcms.simples_credito_valor" float-label="simples_credito_valor"/>
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
  import NotaFiscalItemIcmsService from "../../../../assets/js/service/notaFiscal/NotaFiscalItemIcmsService";
  export default {

    name: "notaFiscalItemIcmsFormModal",

    data(){
      return {
        isModalOpened: false,
        notaFiscalItemIcmsService: new NotaFiscalItemIcmsService(),
        notaFiscalItemIcms: {}
      }
    },

    mounted:function (){
      this.newNotaFiscalItemIcms();
    },

    props: {
      notaFiscalItemIcmsId: Number
    },

    computed: {
      editionType: function () {
        if (this.notaFiscalItemIcms.id) {
          return 'edit'
        }
        return 'add'
      }
    },

    methods: {
      // limpa dados do formulario
      newNotaFiscalItemIcms(notaFiscalItemId){
        this.notaFiscalItemIcms = {
          nota_fiscal_item_id: notaFiscalItemId,
          origem: null,
          cst: null,
          csosn: null,
          base_calculo: null,
          percentual: null,
          valor: null,
          base_calculo_modalidade: null,
          base_calculo_percentual_reducao: null,
          st_base_calculo_modalidade: null,
          st_percentual_margem: null,
          st_base_calculo_percentual_reducao: null,
          st_base_calculo: null,
          st_percentual: null,
          st_valor: null,
          fcp_percentual: null,
          fcp_valor: null,
          fcp_base_calculo: null,
          fcp_st_base_calculo: null,
          fcp_st_percentual: null,
          fcp_st_valor: null,
          desoneracao_valor: null,
          desoneracao_motivo: null,
          op_base_calculo_percentual: null,
          op_valor: null,
          diferimento_percentual: null,
          diferimento_valor: null,
          st_retido_base_calculo: null,
          st_retido_valor: null,
          consumidor_percentual: null,
          fcp_st_retido_base_calculo: null,
          fcp_st_retido_percentual: null,
          fcp_st_retido_valor: null,
          efetivo_base_calculo_percentual_reducao: null,
          efetivo_base_calculo: null,
          efetivo_percentual: null,
          efetivo_valor: null,
          substituto_valor: null,
          st_estado_id: null,
          destino_st_base_calculo: null,
          destino_st_valor: null,
          simples_credito_percentual: null,
          simples_credito_valor: null,
        }
      },

      add: function(notaFiscalItemId) {
        this.newNotaFiscalItemIcms(notaFiscalItemId);
        this.isModalOpened = true;
      },

      edit: function(notaFiscalItemIcms) {
        this.notaFiscalItemIcms = Object.assign({}, notaFiscalItemIcms);
        this.isModalOpened = true;
      },

      delete: function(notaFiscalItemIcms) {
        this.notaFiscalItemIcms = Object.assign({}, notaFiscalItemIcms);
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir as informações de IPI deste item?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.deleteNotaFiscalItemIcms()
        })
      },

      // fecha o modal e limpa formulario
      close: function(){
        this.isModalOpened = false;
      },

      // salvar registro
      save: function(){
        if (this.editionType === 'edit') {
          return this.updateNotaFiscalItemIcms();
        }
        return this.createNotaFiscalItemIcms();
      },

      // criar
      createNotaFiscalItemIcms: function(){
        this.$q.loading.show();
        this.notaFiscalItemIcmsService.create(this.notaFiscalItemIcms).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Informações de ICMS do item adicionadas com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // editar
      updateNotaFiscalItemIcms: function(){
        this.$q.loading.show();
        this.notaFiscalItemIcmsService.update(this.notaFiscalItemIcms.id, this.notaFiscalItemIcms).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Informações de ICMS do item atualizadas com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // excluir
      deleteNotaFiscalItemIcms: function(){
        this.$q.loading.show();
        this.notaFiscalItemIcmsService.delete(this.notaFiscalItemIcms.id).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Informações de ICMS do item excluídas com sucesso!'});
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
