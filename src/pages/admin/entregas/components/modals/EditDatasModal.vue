<template>
  <ap-modal ref="editDatasModal" title="Alterar Datas" :visible="isModalOpened" @hide="closeModal">
    <div slot="content" class="q-mx-lg q-mb-lg">
      <template v-if="entrega">

        <div class="row">
          <div class="col-12">
            <q-datetime v-model="entrega.inicio_carregamento" stack-label="Início do Carregamento"
                        type="datetime" align="center" format="DD/MM/YYYY HH:mm" modal :max="new Date()" />
          </div>
        </div>

        <div class="row" v-if="entrega.envio_armazem">
          <div class="col-12 q-mb-md">
            <q-datetime v-model="entrega.envio_armazem" stack-label="Envio para Armazém"
                        type="datetime" align="center" format="DD/MM/YYYY HH:mm" modal :max="new Date()" />
          </div>
        </div>


        <template v-if="entrega.pesagens.length > 0">
          <span class="q-body-1 text-faded">Tickets</span>
          <q-list no-border dense>
            <q-item dense style="padding: 0px" v-for="pesagem in entrega.pesagens">
              <q-item-main>
                <q-item-tile label>Número: {{pesagem.numero_ticket}}</q-item-tile>
                <q-item-tile sublabel>Emissão: {{moment(pesagem.emissao).format('DD MMM YYYY')}}</q-item-tile>
              </q-item-main>

            </q-item>
          </q-list>
        </template>
      </template>
    </div>
    <div class="text-right" slot="footer">
      <q-btn @click.native="closeModal" flat color="primary" label="Cancelar" class="q-mr-xs"/>
      <q-btn @click.native="save" flat label="Salvar" color="primary" :disable="!entrega"/>
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
    data(){
      return {
        isModalOpened: false,
        entregaService: new EntregaService(),
        entrega: null,
      }
    },
    methods: {
      openModal(id) {
        this.isModalOpened = true;

        this.$refs.editDatasModal.showInnerProgress();
        Promise.all([
          this.getEntregaDates(id)
        ]).then(()=> {
          this.$refs.editDatasModal.hideInnerProgress();
        });
      },
      closeModal() {
        this.isModalOpened = false;
      },
      async getEntregaDates(id){
        return this.entregaService.getDates(id).then(entrega => {
          this.entrega = entrega;
        })
      },
      save(){
        let params = {
          'inicio_carregamento': this.entrega.inicio_carregamento,
          'envio_armazem': this.entrega.envio_armazem
        };

        this.$refs.editDatasModal.showOuterProgress();
        this.entregaService.updateDates(this.entrega.id, params).then(()=>{
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
