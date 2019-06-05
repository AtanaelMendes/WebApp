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

                <q-field icon="format_list_numbered" v-if="isSerieEditavel || isNumeroEditavel">
                  <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                    <div class="row" v-if="isSerieEditavel">
                      <div class="col-12">
                        <ap-select-nota-fiscal-serie v-model="notaFiscal.nota_fiscal_serie_id"/>
                      </div>
                    </div>
                  </transition>
                  <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                    <div class="row" v-if="isNumeroEditavel">
                      <div class="col-2 q-pr-sm">
                        <q-input v-model="notaFiscal.modelo" stack-label="Modelo" align="center" />
                      </div>
                      <div class="col-2 q-pr-sm">
                        <q-input v-model="notaFiscal.serie" stack-label="Série" type="number" step="1" min="0" max="999999999999" align="center" />
                      </div>
                      <div class="col-4">
                        <q-input v-model="notaFiscal.numero" stack-label="Número" type="number" step="1" min="0" max="999999999999" align="center" />
                      </div>
                      <div class="col-4 text-center q-pt-lg">
                        <q-toggle v-model="notaFiscal.is_saida" label="Saída" />
                      </div>
                    </div>
                  </transition>
                </q-field>

                <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                  <q-field icon="calendar_today" v-if="isNumeroEditavel" :count="44">
                    <q-input v-model="notaFiscal.chave" stack-label="Chave" align="center" :max-length="44" />
                  </q-field>
                </transition>

                <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                  <q-field icon="calendar_today" v-if="isNumeroEditavel">
                    <div class="row">
                      <div class="col-6 q-pr-sm">
                        <q-datetime v-model="notaFiscal.emissao" type="datetime" format="DD/MMM/YY HH:mm" stack-label="Emissão"  align="center" />
                      </div>
                      <div class="col-6">
                        <q-datetime v-model="notaFiscal.saida" type="datetime" format="DD/MMM/YY HH:mm" stack-label="Saída / Entrada"  align="center"/>
                      </div>
                    </div>
                  </q-field>
                </transition>


                <q-input v-model="notaFiscal.natureza_operacao_id" stack-label="natureza_operacao_id"/>
                <q-input v-model="notaFiscal.natureza" stack-label="natureza"/>
                <ap-select-type v-model="notaFiscal.presenca" type="PRESENCA" stack-label="Presença" />
                <q-input v-model="notaFiscal.ambiente" stack-label="ambiente"/>
                <q-input v-model="notaFiscal.finalidade" stack-label="finalidade"/>
                <q-input v-model="notaFiscal.is_consumidor" stack-label="is_consumidor"/>
                <q-input v-model="notaFiscal.contingencia" stack-label="contingencia"/>
                <q-input v-model="notaFiscal.contingencia_justificativa" stack-label="contingencia_justificativa"/>
                <q-input v-model="notaFiscal.pessoa_id" stack-label="pessoa_id"/>
                <q-input v-model="notaFiscal.frete" stack-label="frete"/>
                <q-input v-model="notaFiscal.informacoes_adicionais_fisco" stack-label="informacoes_adicionais_fisco"/>
                <q-input v-model="notaFiscal.informacoes_complementares" stack-label="informacoes_complementares"/>
                <q-input v-model="notaFiscal.exportacao_estado_id" stack-label="exportacao_estado_id"/>
                <q-input v-model="notaFiscal.exportacao_local_embarque" stack-label="exportacao_local_embarque"/>
                <q-input v-model="notaFiscal.exportacao_local_despacho" stack-label="exportacao_local_despacho"/>
                <q-input v-model="notaFiscal.empenho" stack-label="empenho"/>
                <q-input v-model="notaFiscal.pedido" stack-label="pedido"/>
                <q-input v-model="notaFiscal.contrato" stack-label="contrato"/>
                <q-input v-model="notaFiscal.status" stack-label="status"/>
                <q-input v-model="notaFiscal.protocolo_autorizacao" stack-label="protocolo_autorizacao"/>
                <q-input v-model="notaFiscal.total_produto" stack-label="total_produto"/>
                <q-input v-model="notaFiscal.total_frete" stack-label="total_frete"/>
                <q-input v-model="notaFiscal.total_seguro" stack-label="total_seguro"/>
                <q-input v-model="notaFiscal.total_outro" stack-label="total_outro"/>
                <q-input v-model="notaFiscal.total_desconto" stack-label="total_desconto"/>
                <q-input v-model="notaFiscal.total_icms_base_calculo" stack-label="total_icms_base_calculo"/>
                <q-input v-model="notaFiscal.total_icms" stack-label="total_icms"/>
                <q-input v-model="notaFiscal.total_icms_desonerado" stack-label="total_icms_desonerado"/>
                <q-input v-model="notaFiscal.total_icms_estado_destinatario" stack-label="total_icms_estado_destinatario"/>
                <q-input v-model="notaFiscal.total_icms_estado_remetente" stack-label="total_icms_estado_remetente"/>
                <q-input v-model="notaFiscal.total_icms_st_base_calculo" stack-label="total_icms_st_base_calculo"/>
                <q-input v-model="notaFiscal.total_icms_st" stack-label="total_icms_st"/>
                <q-input v-model="notaFiscal.total_fcp" stack-label="total_fcp"/>
                <q-input v-model="notaFiscal.total_fcp_st" stack-label="total_fcp_st"/>
                <q-input v-model="notaFiscal.total_fcp_st_retido" stack-label="total_fcp_st_retido"/>
                <q-input v-model="notaFiscal.total_fcp_estado_destinatario" stack-label="total_fcp_estado_destinatario"/>
                <q-input v-model="notaFiscal.total_ii" stack-label="total_ii"/>
                <q-input v-model="notaFiscal.total_ipi" stack-label="total_ipi"/>
                <q-input v-model="notaFiscal.total_ipi_devolucao" stack-label="total_ipi_devolucao"/>
                <q-input v-model="notaFiscal.total_pis" stack-label="total_pis"/>
                <q-input v-model="notaFiscal.total_cofins" stack-label="total_cofins"/>
                <q-input v-model="notaFiscal.total_nota_fiscal" stack-label="total_nota_fiscal"/>
                <q-input v-model="notaFiscal.total_tributos" stack-label="total_tributos"/>
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
  import apSelectType from 'components/form/ApSelectType'
  import apSelectNotaFiscalSerie from 'components/form/ApSelectNotaFiscalSerie'
  import NotaFiscalService from "../../../../assets/js/service/notaFiscal/NotaFiscalService";
  export default {

    name: "notaFiscalFormModal",

    components: {
      apSelectNotaFiscalSerie,
      apSelectType,
    },

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
      },
      isNumeroEditavel: function () {
        return this.notaFiscal.nota_fiscal_serie_id === null
      },
      isSerieEditavel: function () {
        if (this.editionType == 'add') {
          return true;
        }
        if (this.notaFiscal.numero == null) {
          return true;
        }
        return false;
      },
    },

    methods: {

      // limpa dados do formulario
      newNotaFiscal(notaFiscalItemId){
        this.notaFiscal = {
          nota_fiscal_serie_id: null,
          numero: null,
          emissao: null,
          saida: null,
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

      duplicar: function(notaFiscal) {
        this.notaFiscal = Object.assign({}, notaFiscal);
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja duplicar esta Nota Fiscal?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.duplicarNotaFiscal()
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
          this.$emit('apagada');
          this.close();
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },

      // duplicar
      duplicarNotaFiscal(id){
        this.$q.loading.show();
        this.notaFiscalService.duplicar(this.notaFiscal.id).then(response => {
          this.$q.loading.hide();
          this.$q.notify({type: 'positive', message: 'Nota Fiscal duplicada com sucesso!'});
          this.$emit('duplicada', response.data);
          this.$router.push({name: 'view_nota_fiscal', params: {id: response.data.id}});
        }).catch(error=>{
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: error.response.data.message});
        })
      },


    }
  }
</script>

<style scoped>

</style>
