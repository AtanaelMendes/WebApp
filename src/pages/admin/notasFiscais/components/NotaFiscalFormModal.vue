<template>
  <q-modal v-model="isModalOpened" @hide="close" :content-css="{minWidth: '50vw', minHeight: '80vh'}">
    <q-modal-layout v-if="notaFiscal">
      <q-toolbar slot="header">
        <q-toolbar-title>
          <template v-if="editionType === 'add'">
            Criar Nota Fiscal
          </template>
          <template v-if="editionType === 'edit'">
            Editar Nota Fiscal
          </template>
        </q-toolbar-title>
      </q-toolbar>
      <div class="layout-padding">
        <div class="row justify-center">
            <div class="col-12">
              <form v-on:submit.prevent="save"><input type="submit" hidden />
                <q-input v-model="notaFiscal.nota_fiscal_serie_id" float-label="nota_fiscal_serie_id"/>
                <q-input v-model="notaFiscal.numero" float-label="numero"/>
                <q-input v-model="notaFiscal.emissao" float-label="emissao"/>
                <q-input v-model="notaFiscal.is_saida" float-label="is_saida"/>
                <q-input v-model="notaFiscal.chave" float-label="chave"/>
                <q-input v-model="notaFiscal.natureza_operacao_id" float-label="natureza_operacao_id"/>
                <q-input v-model="notaFiscal.natureza" float-label="natureza"/>
                <q-input v-model="notaFiscal.presenca" float-label="presenca"/>
                <q-input v-model="notaFiscal.modelo" float-label="modelo"/>
                <q-input v-model="notaFiscal.serie" float-label="serie"/>
                <q-input v-model="notaFiscal.saida" float-label="saida"/>
                <q-input v-model="notaFiscal.tipo_emissao" float-label="tipo_emissao"/>
                <q-input v-model="notaFiscal.ambiente" float-label="ambiente"/>
                <q-input v-model="notaFiscal.finalidade" float-label="finalidade"/>
                <q-input v-model="notaFiscal.is_consumidor" float-label="is_consumidor"/>
                <q-input v-model="notaFiscal.contingencia" float-label="contingencia"/>
                <q-input v-model="notaFiscal.contingencia_justificativa" float-label="contingencia_justificativa"/>
                <q-input v-model="notaFiscal.pessoa_id" float-label="pessoa_id"/>
                <q-input v-model="notaFiscal.frete" float-label="frete"/>
                <q-input v-model="notaFiscal.informacoes_adicionais_fisco" float-label="informacoes_adicionais_fisco"/>
                <q-input v-model="notaFiscal.informacoes_complementares" float-label="informacoes_complementares"/>
                <q-input v-model="notaFiscal.exportacao_estado_id" float-label="exportacao_estado_id"/>
                <q-input v-model="notaFiscal.exportacao_local_embarque" float-label="exportacao_local_embarque"/>
                <q-input v-model="notaFiscal.exportacao_local_despacho" float-label="exportacao_local_despacho"/>
                <q-input v-model="notaFiscal.empenho" float-label="empenho"/>
                <q-input v-model="notaFiscal.pedido" float-label="pedido"/>
                <q-input v-model="notaFiscal.contrato" float-label="contrato"/>
                <q-input v-model="notaFiscal.status" float-label="status"/>
                <q-input v-model="notaFiscal.protocolo_autorizacao" float-label="protocolo_autorizacao"/>
                <q-input v-model="notaFiscal.total_produto" float-label="total_produto"/>
                <q-input v-model="notaFiscal.total_frete" float-label="total_frete"/>
                <q-input v-model="notaFiscal.total_seguro" float-label="total_seguro"/>
                <q-input v-model="notaFiscal.total_outro" float-label="total_outro"/>
                <q-input v-model="notaFiscal.total_desconto" float-label="total_desconto"/>
                <q-input v-model="notaFiscal.total_icms_base_calculo" float-label="total_icms_base_calculo"/>
                <q-input v-model="notaFiscal.total_icms" float-label="total_icms"/>
                <q-input v-model="notaFiscal.total_icms_desonerado" float-label="total_icms_desonerado"/>
                <q-input v-model="notaFiscal.total_icms_estado_destinatario" float-label="total_icms_estado_destinatario"/>
                <q-input v-model="notaFiscal.total_icms_estado_remetente" float-label="total_icms_estado_remetente"/>
                <q-input v-model="notaFiscal.total_icms_st_base_calculo" float-label="total_icms_st_base_calculo"/>
                <q-input v-model="notaFiscal.total_icms_st" float-label="total_icms_st"/>
                <q-input v-model="notaFiscal.total_fcp" float-label="total_fcp"/>
                <q-input v-model="notaFiscal.total_fcp_st" float-label="total_fcp_st"/>
                <q-input v-model="notaFiscal.total_fcp_st_retido" float-label="total_fcp_st_retido"/>
                <q-input v-model="notaFiscal.total_fcp_estado_destinatario" float-label="total_fcp_estado_destinatario"/>
                <q-input v-model="notaFiscal.total_ii" float-label="total_ii"/>
                <q-input v-model="notaFiscal.total_ipi" float-label="total_ipi"/>
                <q-input v-model="notaFiscal.total_ipi_devolucao" float-label="total_ipi_devolucao"/>
                <q-input v-model="notaFiscal.total_pis" float-label="total_pis"/>
                <q-input v-model="notaFiscal.total_cofins" float-label="total_cofins"/>
                <q-input v-model="notaFiscal.total_nota_fiscal" float-label="total_nota_fiscal"/>
                <q-input v-model="notaFiscal.total_tributos" float-label="total_tributos"/>
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
  import NotaFiscalService from "../../../../assets/js/service/notaFiscal/NotaFiscalService";
  export default {

    name: "notaFiscalFormModal",

    data(){
      return {
        isModalOpened: false,
        notaFiscalService: new NotaFiscalService(),
        notaFiscal: {}
      }
    },

    mounted:function (){
      this.newNotaFiscal();
    },

    props: {
      notaFiscalId: Number
    },

    computed: {
      editionType: function () {
        if (this.notaFiscal.id) {
          return 'edit'
        }
        return 'add'
      }
    },

    methods: {

      // limpa dados do formulario
      newNotaFiscal(notaFiscalItemId){
        console.log(notaFiscalItemId);
        this.notaFiscal = {
          nota_fiscal_serie_id: null,
          numero: null,
          emissao: new Date(),
          saida: new Date(),
          is_saida: true,
          chave: null,
          natureza_operacao_id: null,
          natureza: null,
          presenca: null,
          modelo: 55,
          serie: null,
          tipo_emissao: 1,
          ambiente: 2,
          finalidade: 1,
          is_consumidor: false,
          contingencia: null,
          contingencia_justificativa: null,
          pessoa_id: null,
          frete: 0,
          informacoes_adicionais_fisco: null,
          informacoes_complementares: null,
          exportacao_estado_id: null,
          exportacao_local_embarque: null,
          exportacao_local_despacho: null,
          empenho: null,
          pedido: null,
          contrato: null,
          status: 'Digitacao',
          protocolo_autorizacao: null,
        }
      },

      add: function(notaFiscalItemId) {
        this.newNotaFiscal(notaFiscalItemId);
        this.isModalOpened = true;
      },

      edit: function(notaFiscal) {
        this.notaFiscal = Object.assign({}, notaFiscal);
        this.isModalOpened = true;
      },

      delete: function(notaFiscal) {
        this.notaFiscal = Object.assign({}, notaFiscal);
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir a Nota Fiscal?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.deleteNotaFiscal()
        })
      },

      // fecha o modal e limpa formulario
      close: function(){
        this.isModalOpened = false;
      },

      // salvar registro
      save: function(){
        if (this.editionType === 'edit') {
          return this.updateNotaFiscal();
        }
        return this.createNotaFiscal();
      },

      // criar
      createNotaFiscal: function(){
        this.$q.loading.show();
        this.notaFiscalService.create(this.notaFiscal).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Nota Fiscal adicionada com sucesso!'});
          this.$emit('atualizada', response.data);
          this.$emit('criada', response.data.id);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // editar
      updateNotaFiscal: function(){
        this.$q.loading.show();
        this.notaFiscalService.update(this.notaFiscal.id, this.notaFiscal).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Nota Fiscal atualizada com sucesso!'});
          this.$emit('atualizada', response.data);
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // excluir
      deleteNotaFiscal: function(){
        this.$q.loading.show();
        this.notaFiscalService.delete(this.notaFiscal.id).then((response) => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Nota Fiscal excluida com sucesso!'});
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
