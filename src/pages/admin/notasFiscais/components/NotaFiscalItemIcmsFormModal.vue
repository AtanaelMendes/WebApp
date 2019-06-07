<template>
  <q-modal no-esc-dismiss v-model="isModalOpened" @hide="close" :content-css="{minWidth: '50vw', minHeight: '80vh'}" @show="$refs.primeiroCampo.focus()">
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
              <ap-select-type v-model="notaFiscalItemIcms.origem" type="ORIGEM_ICMS" stack-label="ICMS Origem" />
              <q-input v-model="notaFiscalItemIcms.cst" stack-label="cst" ref="primeiroCampo"/>
              <q-input v-model="notaFiscalItemIcms.csosn" stack-label="csosn"/>
              <q-input v-model="notaFiscalItemIcms.base_calculo" stack-label="base_calculo" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.percentual" stack-label="percentual" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.valor" stack-label="valor" align="right" type="number"/>
              <ap-select-type v-model="notaFiscalItemIcms.base_calculo_modalidade" type="BASE_CALCULO_MODALIDADE" stack-label="Base Cálculo Modalidade"/>
              <q-input v-model="notaFiscalItemIcms.base_calculo_percentual_reducao" stack-label="base_calculo_percentual_reducao" align="right" type="number"/>
              <ap-select-type v-model="notaFiscalItemIcms.st_base_calculo_modalidade" type="ST_BASE_CALCULO_MODALIDADE" stack-label="ST Base Cálculo Modalidade"/>
              <q-input v-model="notaFiscalItemIcms.st_percentual_margem" stack-label="st_percentual_margem" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.st_base_calculo_percentual_reducao" stack-label="st_base_calculo_percentual_reducao" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.st_base_calculo" stack-label="st_base_calculo" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.st_percentual" stack-label="st_percentual"align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.st_valor" stack-label="st_valor" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.fcp_percentual" stack-label="fcp_percentual" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.fcp_valor" stack-label="fcp_valor" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.fcp_base_calculo" stack-label="fcp_base_calculo" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.fcp_st_base_calculo" stack-label="fcp_st_base_calculo" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.fcp_st_percentual" stack-label="fcp_st_percentual" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.fcp_st_valor" stack-label="fcp_st_valor"align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.desoneracao_valor" stack-label="desoneracao_valor" align="right" type="number"/>
              <ap-select-type v-model="notaFiscalItemIcms.desoneracao_motivo" type="DESONERACAO_MOTIVO" stack-label="Desoneração Motivo"/>
              <q-input v-model="notaFiscalItemIcms.desoneracao_motivo" stack-label="desoneracao_motivo" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.op_base_calculo_percentual" stack-label="op_base_calculo_percentual" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.op_valor" stack-label="op_valor" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.diferimento_percentual" stack-label="diferimento_percentual" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.diferimento_valor" stack-label="diferimento_valor" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.st_retido_base_calculo" stack-label="st_retido_base_calculo" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.st_retido_valor" stack-label="st_retido_valor" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.consumidor_percentual" stack-label="consumidor_percentual" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.fcp_st_retido_base_calculo" stack-label="fcp_st_retido_base_calculo" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.fcp_st_retido_percentual" stack-label="fcp_st_retido_percentual" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.fcp_st_retido_valor" stack-label="fcp_st_retido_valor" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.efetivo_base_calculo_percentual_reducao" stack-label="efetivo_base_calculo_percentual_reducao" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.efetivo_base_calculo" stack-label="efetivo_base_calculo" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.efetivo_percentual" stack-label="efetivo_percentual" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.efetivo_valor" stack-label="efetivo_valor" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.substituto_valor" stack-label="substituto_valor" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.st_estado_id" stack-label="st_estado_id" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.destino_st_base_calculo" stack-label="destino_st_base_calculo" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.destino_st_valor" stack-label="destino_st_valor" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.simples_credito_percentual" stack-label="simples_credito_percentual" align="right" type="number"/>
              <q-input v-model="notaFiscalItemIcms.simples_credito_valor" stack-label="simples_credito_valor" align="right" type="number"/>
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
  import NotaFiscalItemIcmsService from "../../../../assets/js/service/notaFiscal/NotaFiscalItemIcmsService";
  export default {
    name: "notaFiscalItemIcmsFormModal",
    components:{
      apSelectType
    },
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
