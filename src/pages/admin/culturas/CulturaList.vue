<template>
  <custom-page isParent>
    <toolbar slot="toolbar" title="Culturas" searchable navigation_type="menu" >
    </toolbar>

    <div class="row gutter-sm space-end q-pa-md" v-if="culturas">
      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-3" v-for="cultura in culturas" :key="cultura.id">
        <q-card class="cursor-pointer" @click.native="viewCultura(cultura.id)">
          <q-card-media overlay-position="top">

            <ap-image size="400x250" :file-name="cultura.image_file_name"/>

            <q-card-title slot="overlay">
              {{cultura.nome}}
              <q-btn @click.stop round flat dense icon="more_vert" slot="right" color="white">
                <q-popover>
                  <q-list link class="no-border">
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

            </q-card-title>
          </q-card-media>

          <!--<q-card-main class="fullheight">-->
            <!--<safra-quantidades-->
              <!--:safra-cultura-id="safraCultura.id"-->
              <!--:quantidades="safraCultura.totals"-->
              <!--:unidade-area="safraCultura.view_unidade_area"-->
              <!--:unidade-medida="safraCultura.view_unidade_medida"/>-->
          <!--</q-card-main>-->
        </q-card>
      </div>

      <!--EMPTY LIST-->
      <div class="col-12" v-if="culturas.length <= 0">
        <ap-no-results />
      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[35, 35]">
      <q-btn round color="deep-orange" size="20px" @click="openNewCulturaModal" icon="add" />
    </q-page-sticky>

    <new-cultura-modal ref="newCulturaModal" />
  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import apImage from 'components/ApImage'
  import CulturaService from "../../../assets/js/service/cultura/CulturaService";
  import newCulturaModal from './components/modals/NewCulturaModal';

  export default {
    name: "CulturaList",
    components: {
      toolbar,
      customPage,
      apImage,
      newCulturaModal
    },
    data(){
      return{
        culturaService: new CulturaService(),
        culturas: null,
      }
    },
    methods: {
      listCulturas() {
        this.culturaService.listCulturas().then(culturas => {
          this.culturas = culturas;
        })
      },
      openNewCulturaModal(){
        this.$refs.newCulturaModal.openModal();
      },
      viewCultura(id){
        this.$router.push({name: 'view_cultura', params: {id:id}});
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
            this.listCulturas()
          })
        });

      },
    },
    mounted () {
      this.listCulturas();
    }
  }
</script>

<style scoped>

</style>
