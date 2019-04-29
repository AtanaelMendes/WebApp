<template>
  <ap-modal ref="changeColheitaStatusModal" class="colheita-status-modal" title="Colheita Finalizada" :visible="isModalOpened" @hide="closeModal">

    <div slot="content" >
      <q-list dense no-border>
        <template v-for="safraCulturaTalhaoGrouped in safraCulturaTalhoesGrouped">
          <q-list-header :key="safraCulturaTalhaoGrouped.id">
            {{safraCulturaTalhaoGrouped.nome}}
          </q-list-header>
          <q-item link tag="label" v-for="safraCulturaTalhao in safraCulturaTalhaoGrouped.talhoes" :key="safraCulturaTalhaoGrouped.id + '' + safraCulturaTalhao.id">
            <q-item-side>
              <ap-image style="width: 70px" size="200x125" :file-name="safraCulturaTalhao.image_file_name"/>
            </q-item-side>

            <q-item-main :label="safraCulturaTalhao.nome" />

            <q-item-side right>
              <q-toggle v-model="safraCulturaTalhao.finalizado" />
            </q-item-side>

          </q-item>
        </template>
      </q-list>
    </div>


    <div slot="footer" class="text-right">
      <q-btn @click.native="closeModal" flat color="primary" label="Cancelar" class="q-mr-xs"/>
      <q-btn @click.native="save" flat label="Salvar" color="primary" />
    </div>
  </ap-modal>
</template>

<script>
  import apModal from 'components/ApModal'
  import SafraCulturaTalhaoService from "../../../../../assets/js/service/safra/SafraCulturaTalhaoService";
  import apImage from 'components/ApImage'
  export default {
    name: "ChangeColheitaStatusModal",
    components: {
      apModal,
      apImage,
    },
    data(){
      return {
        isModalOpened: false,
        safraCulturaTalhaoService: new SafraCulturaTalhaoService(),
        safraCulturaId: null,
        safraCulturaTalhoesGrouped: null,
      }
    },
    methods: {
      openModal(safraCulturaId){
        this.isModalOpened = true;
        this.safraCulturaId = safraCulturaId;
        this.listSafraCulturaTalhoes();
      },
      closeModal(){
        this.isModalOpened = false;
        this.safraCulturaTalhoesGrouped = null;
      },
      listSafraCulturaTalhoes(){
        this.$refs.changeColheitaStatusModal.showInnerProgress();
        this.safraCulturaTalhaoService.listSafraCulturaTalhoesStatus(this.safraCulturaId).then(safraCulturaTalhoesGrouped => {
          this.safraCulturaTalhoesGrouped = safraCulturaTalhoesGrouped;
          this.$refs.changeColheitaStatusModal.hideInnerProgress();
        }).catch(()=>{
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          this.$refs.changeColheitaStatusModal.hideInnerProgress();
        })
      },
      getTalhoeStatus(){
        let talhoes = [];

        for(let group of this.safraCulturaTalhoesGrouped){
          for(let talhao of group.talhoes){
            talhoes.push({
              id: talhao.id,
              finalizado: talhao.finalizado
            })
          }
        }

        return talhoes;
      },
      save(){
        this.$refs.changeColheitaStatusModal.showOuterProgress();
        this.safraCulturaTalhaoService.updateSafraCulturaTalhoesStatus(
          this.safraCulturaId,
          {'talhoes': this.getTalhoeStatus()}
        ).then(()=>{
          this.$q.notify({type: 'positive', message: 'Status atualizados com sucesso'});
          this.$refs.changeColheitaStatusModal.hideOuterProgress();
          this.closeModal();
          this.$root.$emit('refreshSafrasCulura', true);
        }).catch(()=>{
          this.closeModal();
          this.$refs.changeColheitaStatusModal.hideOuterProgress();
        })
      }
    }
  }
</script>

<style>
  .colheita-status-modal .q-modal-layout{
    width: 400px;
  }

  @media(max-width: 425px){
    .colheita-status-modal .q-modal-layout{
      width: 100%;
    }
  }
</style>
