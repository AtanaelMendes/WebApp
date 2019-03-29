<template>
  <q-modal v-model="isModalOpened" class="update-cultivares-tamanho-modal" minimized @hide="closeModal">
    <q-modal-layout>
      <div class="q-px-lg q-pb-sm q-pt-lg q-title" slot="header">
        Atualizar tamanho dos cultivares
      </div>

      <div class="q-mx-lg q-mb-lg">
      </div>

      <div class="q-pa-sm text-right" slot="footer">
        <q-btn @click.native="closeModal" flat color="primary" label="Cancelar" class="q-mr-xs"/>
        <q-btn @click.native="updateSafra" flat label="Atualizar" color="primary" />
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  import SafraCulturaService from "../../assets/js/service/safra/SafraCulturaService";

  export default {
    name: "UpdateCultivaresTamanhoModal",
    data(){
      return {
        isModalOpened:false,
        safraCulturaService: new SafraCulturaService(),
        currentSafraCultura: null,
      }
    },
    methods:{
      openModal(safraCulturaTalhaoId, safraCultura){
        this.isModalOpened = true;
        this.currentSafraCultura = safraCultura;
        this.listCultivares(safraCulturaTalhaoId);
      },
      closeModal(){
        this.isModalOpened = false;
      },
      listCultivares(safraCulturaTalhaoId){
        this.safraCulturaService.listSafraCulturaTalhoesCultivares(
          this.currentSafraCultura.id, safraCulturaTalhaoId
        ).then(cultivares => {
          console.log('cultivares', cultivares)
        })
      }
    }
  }
</script>

<style scoped>

</style>
