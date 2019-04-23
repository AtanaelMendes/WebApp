<template>
  <custom-page widthInner="60%" isParent v-if="cultura">
    <toolbar slot="toolbar" :title="cultura.nome" navigation_type="back" @navigation_clicked="backAction">
      <template slot="action_itens">
        <q-btn flat round dense icon="more_vert" >
          <q-popover anchor="bottom left">
            <q-list link>
              <q-item v-close-overlay @click.native="editCultura(cultura.id)">
                <q-item-main label="Editar"/>
              </q-item>
              <q-item v-close-overlay @click.native="archiveCultura(cultura.id)" v-if="!cultura.deleted_at">
                <q-item-main label="Arquivar"/>
              </q-item>
              <q-item v-close-overlay @click.native="restoreCultura(cultura.id)" v-if="cultura.deleted_at">
                <q-item-main label="Ativar"/>
              </q-item>
              <q-item v-close-overlay @click.native="deleteCultura(cultura.id)">
                <q-item-main label="Excluir"/>
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </template>
    </toolbar>

    <edit-cultura-modal ref="editCulturaModal" />
  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import CulturaService from "../../../assets/js/service/cultura/CulturaService";
  import editCulturaModal from './components/modals/EditCulturaModal';

  export default {
    name: "CulturaView",
    components: {
      toolbar,
      customPage,
      editCulturaModal
    },
    data () {
      return {
        culturaService: new CulturaService(),
        cultura: null,
      }
    },
    methods:{
      getCulturaById(){
        this.culturaService.getCultura(this.$route.params.id).then(cultura => {
          this.cultura = cultura;
        })
      },
      editCultura(id) {
        this.$refs.editCulturaModal.openModal(id);
      },
      archiveCultura(id){
        this.culturaService.archiveCultura(id).then(() => {
          this.listCulturas()
        })
      },
      restoreCultura(id){
        this.culturaService.restoreCultura(id).then(() => {
          this.listCulturas()
        })
      },
      deleteCultura(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esta cultura?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.culturaService.deleteCultura(id).then(() => {
            this.backAction()
          })
        });

      },
      backAction() {
        this.$router.back();
      },
    },
    mounted () {
      this.$root.$on('refreshCultura', this.getCulturaById);
      this.getCulturaById();
    },
    destroyed() {
      this.$root.$off('refreshCultura', this.getCulturaById);
    }
  }
</script>

<style scoped>

</style>
