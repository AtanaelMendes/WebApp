<template>
  <ap-modal ref="createNotaFiscalModal" title="Nova Nota Fiscal" :visible="isModalOpened" @hide="closeModal">

    <div slot="content" class="q-mx-lg q-mb-lg" >
      <div class="q-my-md" align="center">
        <q-btn-toggle
          v-model="safra.safrinha.value"
          toggle-color="primary"
          :options="[ {label: 'Safra', value: false}, {label: 'Safrinha', value: true},]"
        />
      </div>

      <div style="display: flex; justify-content: space-between">
        <!--ANO INICIO;-->
        <div class="row column justify-between">
          <span class="q-caption q-mb-sm">Início</span>
          <q-select class="q-my-none" v-model="safra.inicio.value" :options="yearsList" filter @input="setAnoInicio"/>
        </div>
        <!--ANO FIM-->
        <div class="row column">
          <span class="q-caption q-mb-sm">Fim</span>
          <q-btn-toggle
            @input="setAnoFim"
            class="custom-toggle"
            toggle-color="primary"
            v-model="selectedAnoFim"
            :options="[{label: safra.inicio.value, value: safra.inicio.value},
                     {label: parseInt(safra.inicio.value) + 1, value: (parseInt(safra.inicio.value) + 1).toString()}]"/>
        </div>
      </div>
    </div>

    <div class="text-right" slot="footer">
      <q-btn @click.native="closeModal" flat color="primary" label="Cancelar" class="q-mr-xs"/>
      <q-btn @click.native="saveNotaFiscal" flat label="Salvar" color="primary"/>
    </div>
  </ap-modal>
</template>

<script>
  import apModal from 'components/ApModal'
  import NotaFiscalService from "../../../../assets/js/service/NotaFiscalService";

  export default {
    name: "CreateNotaFiscal",
    components: {
      apModal
    },
    data(){
      return {
        notaFiscalService: new NotaFiscalService(),
        isModalOpened: false,
        novaNotaFiscal:{

        }
      }
    },
    methods: {
      openModal(){
        this.isModalOpened = true;
      },
      closeModal(){
        this.isModalOpened = false;
      },
      saveNotaFiscal(){
        this.$q.loading.show();
        this.safraService.saveSafra(this.safra.getValues()).then(() => {
          this.$q.notify({type: 'positive', message: 'Nota fiscal criada com sucesso'});
          this.$q.loading.hide();
          this.closeModal();
          this.$root.$emit('refreshNotasFiscaisList');
        }).catch(error => {
          this.$q.loading.hide();
        });
      },
    }
  }
</script>

<style scoped>
</style>
