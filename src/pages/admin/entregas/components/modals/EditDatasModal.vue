<template>
  <ap-modal ref="editDatasModal" title="Alterar Datas" :visible="isModalOpened" @hide="closeModal">
    <div slot="content" class="q-mx-lg q-mb-lg">
      <template v-if="entregaDates">

        <div class="row">
          <div class="col-12">
            <q-datetime v-model="entregaDates.inicio_carregamento" stack-label="Início do Carregamento"
                        type="datetime" align="center" format="DD/MMM/YYYY HH:mm" modal
                        :min="minDate" :max="maxDate" @input="inicioCarregamentoChanged"/>
          </div>
        </div>

        <div class="row" v-if="entregaDates.envio_armazem">
          <div class="col-12 q-mb-md">
            <q-datetime v-model="entregaDates.envio_armazem" stack-label="Envio para Armazém"
                        type="datetime" align="center" format="DD/MMM/YYYY HH:mm" modal
                        :max="maxDate" @input="envioArmazemChanged"/>
          </div>
        </div>

        <template v-if="entregaDates.pesagens.length > 0">
          <template v-for="pesagem in entregaDates.pesagens">
            <span class="text-faded q-body-1">
              Ticket: {{pesagem.numero_ticket}}
            </span>
            <q-datetime v-model="pesagem.emissao" class="q-mb-md"
                        type="datetime" align="center" format="DD/MMM/YYYY HH:mm" disable />
          </template>
        </template>



      </template>
    </div>
    <div class="text-right" slot="footer">
      <q-btn @click.native="closeModal" flat color="primary" label="Cancelar" class="q-mr-xs"/>
      <q-btn @click.native="save" flat label="Salvar" color="primary" :disable="!entregaDates"/>
    </div>
  </ap-modal>
</template>

<script>
  import apModal from 'components/ApModal'
  import EntregaService from "../../../../../assets/js/service/entrega/EntregaService";

  export default {
    name: "EditDatasModal",
    components: {
      apModal
    },
    computed:{
      minDate(){
        return new Date(this.currentEntrega.safra_cultura.safra.ano_inicio, 0, 1);
      },
      maxDate(){
        let value = null;
        if(this.entregaDates.pesagens.length > 0){
          this.entregaDates.pesagens = this.entregaDates.pesagens.sort(function(pesagem1, pesagem2){
            return new Date(pesagem1.emissao) - new Date(pesagem2.emissao)
          });

          value = this.entregaDates.pesagens[0].emissao;

        }else{
          value = new Date();
        }

        return value;
      }
    },
    data(){
      return {
        isModalOpened: false,
        entregaService: new EntregaService(),
        currentEntrega: null,
        entregaDates: null,
      }
    },
    methods: {
      openModal(entrega) {
        this.isModalOpened = true;
        this.currentEntrega = entrega;

        this.$refs.editDatasModal.showInnerProgress();
        Promise.all([
          this.getEntregaDates(this.currentEntrega.id)
        ]).then(()=> {
          this.$refs.editDatasModal.hideInnerProgress();
        });
      },
      closeModal() {
        this.isModalOpened = false;
      },
      inicioCarregamentoChanged(value){
        if(value > this.entregaDates.envio_armazem){
          this.entregaDates.envio_armazem = value;
        }
      },
      envioArmazemChanged(value){
        if(value < this.entregaDates.inicio_carregamento){
          this.entregaDates.inicio_carregamento = value;
        }
      },
      async getEntregaDates(id){
        return this.entregaService.getDates(id).then(entregaDates => {
          this.entregaDates = entregaDates;
        })
      },
      save(){
        let params = {
          'inicio_carregamento': this.entregaDates.inicio_carregamento,
          'envio_armazem': this.entregaDates.envio_armazem
        };

        this.$refs.editDatasModal.showOuterProgress();
        this.entregaService.updateDates(this.currentEntrega.id, params).then(()=>{
          this.$refs.editDatasModal.hideOuterProgress();
          this.closeModal();
          this.$root.$emit('refreshEntregaView');
        }).catch(()=>{
          this.$refs.editDatasModal.hideOuterProgress();
        });
      }
    }
  }
</script>

<style scoped>

</style>
