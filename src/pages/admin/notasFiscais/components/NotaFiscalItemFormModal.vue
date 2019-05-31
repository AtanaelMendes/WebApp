<template>
  <q-modal v-model="isModalOpened" maximized @hide="closeModal">
    <q-modal-layout>
      <div class="q-pa-md q-title text-center" slot="header" v-if="editionType === 'add' ">
        Adicionar Item
      </div>
      <div class="q-pa-md q-title text-center" slot="header" v-if="editionType === 'edit' ">
        Editar Item
      </div>
      <div class="row q-pa-md">
        <div class="col-12 gutter-y-sm">

          <div class="row justify-center">
            <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
              <q-checkbox v-model="notaFiscal.isConsumidor" label="Consumidor" />
            </div>
          </div>

          <div class="row justify-center">
            <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
              <q-btn-toggle v-model="notaFiscal.isSaida" toggle-color="primary"
                            :options="[ {label: 'Saída', value: true},{label: 'Entrada', value: false}]"
              />
            </div>
          </div>

          <div class="row q-pa-md justify-center">

            <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
              <q-input v-model="notaFiscal.natureza" float-label="Natureza"/>
              <q-input v-model="notaFiscal.presenca" float-label="Presenca"/>
              <q-input v-model="notaFiscal.serie" float-label="Série"/>
              <q-input v-model="notaFiscal.numero" float-label="Número"/>
              <q-input v-model="notaFiscal.tipoEmissao" float-label="Tipo Emissão"/>
              <q-input v-model="notaFiscal.finalidade" float-label="Finalidade"/>
              <q-input v-model="notaFiscal.frete" float-label="Frete"/>
              <q-input v-model="notaFiscal.informacoesComplementares" float-label="Observações"/>
              <q-input v-model="notaFiscal.empenho" float-label="Empenho"/>
              <q-input v-model="notaFiscal.pedido" float-label="Pedido"/>
              <q-input v-model="notaFiscal.contrato" float-label="Contrato"/>
            </div>

          </div>

        </div>
      </div>
      <div class="q-pa-md text-right" slot="footer">
        <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
        <q-btn label="salvar" color="primary" @click="updateNotaFiscal()"/>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  import NotaFiscalService from "../../../../assets/js/service/NotaFiscalService";
  export default {
    name: "NotaFiscalItemForm",
    components:{
    },
    data(){
      return {
        notaFiscalService: new NotaFiscalService(),
        editionType: null,
        isModalOpened: false,
        selectedNotaFiscal: null,
        notaFiscal:{
          naturezaOperacaoId: null,
          natureza: null,
          presenca: null,
          modelo: null,
          serie: null,
          notaFiscalSerieId: null,
          numero: null,
          isSaida: null,
          tipoEmissao: null,
          ambiente: 2,
          finalidade: null,
          isConsumidor: false,
          frete: null,
          informacoesComplementares: null,
          status: null,
          empenho: null,
          pedido: null,
          contrato: null,
        }
      }
    },
    methods: {
      openModal: function(nf){
        this.isModalOpened = true;
        this.selectedNotaFiscal = nf;
        this.fillFormNotaFiscal(nf);
      },
      closeModal: function(){
        this.isModalOpened = false;
      },
      fillFormNotaFiscal(nf){
        this.notaFiscal.naturezaOperacaoId = nf.natureza_operacao_id;
        this.notaFiscal.natureza = nf.natureza;
        this.notaFiscal.presenca = nf.presenca;
        this.notaFiscal.modelo = nf.modelo;
        this.notaFiscal.serie = nf.serie;
        this.notaFiscal.notaFiscalSerieId = nf.nota_fiscal_serie_id;
        this.notaFiscal.numero = nf.numero;
        this.notaFiscal.isSaida = nf.is_saida;
        this.notaFiscal.tipoEmissao = nf.tipo_emissao;
        this.notaFiscal.ambiente = nf.ambiente;
        this.notaFiscal.finalidade = nf.finalidade;
        this.notaFiscal.isConsumidor = nf.is_consumidor;
        this.notaFiscal.frete = nf.frete;
        this.notaFiscal.informacoesComplementares = nf.informacoes_complementares;
        this.notaFiscal.status = nf.status;
        this.notaFiscal.empenho = nf.empenho;
        this.notaFiscal.pedido = nf.pedido;
        this.notaFiscal.contrato = nf.contrato;
      },
      getNotaFiscalValues(){
        let params = {
          natureza_operacao_id: this.notaFiscal.naturezaOperacaoId,
          naturaza: this.notaFiscal.natureza,
          presenca: this.notaFiscal.presenca,
          modelo: this.notaFiscal.modelo,
          serie: this.notaFiscal.serie,
          nota_fiscal_serie_id: this.notaFiscal.notaFiscalSerieId,
          numero: this.notaFiscal.numero,
          is_saida: this.notaFiscal.isSaida,
          tipo_emissao: this.notaFiscal.tipoEmissao,
          ambiente: this.notaFiscal.ambiente,
          finalidade: this.notaFiscal.finalidade,
          is_consumidor: this.notaFiscal.isConsumidor,
          frete: this.notaFiscal.frete,
          informacoes_complementares: this.notaFiscal.informacoesComplementares,
          status: this.notaFiscal.status,
          empenho: this.notaFiscal.empenho,
          pedido: this.notaFiscal.pedido,
          contrato: this.notaFiscal.contrato,
        };
        return params;
      },
      updateNotaFiscal: function(){
        this.$q.loading.show();
        this.notaFiscalService.updateNotaFiscal(this.selectedNotaFiscal.id, this.getNotaFiscalValues()).then(() => {
          this.$q.notify({type: 'positive', message: 'Nota fiscal atualizada com sucesso'});
          this.$q.loading.hide();
          this.closeModal();
          this.$root.$emit('refreshNotafiscalView');
        }).catch(error => {
          console.log('AQUI O ERRO', error.response);
          this.$q.loading.hide();
        });
      },
    }
  }
</script>

<style scoped>

</style>
