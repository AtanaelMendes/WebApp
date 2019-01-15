<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Negocios" searchable navigation_type="menu" >
    </toolbar>

    <!--LISTA DE CONTRATOS-->
    <div class="row gutter-sm space-end q-pa-md" v-if="negocios.length > 0">
      <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4" v-for="negocio in negocios" :key="negocio.id">

        <q-card @click.native="viewNegocio(negocio.id)" class="cursor-pointer">
          <q-card-title >
            Negocio Nº: {{negocio.numero_contrato}}
            <div slot="right">
              <q-btn @click.stop round flat dense icon="more_vert" @click.stop>
                <q-popover>
                  <q-list link no-boder>
                    <q-item v-close-overlay @click.native="editNegocio(negocio.id)">
                      <q-item-main label="Editar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="archiveNegocio(negocio.id)" v-if="!negocio.deleted_at">
                      <q-item-main label="Arquivar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="restoreNegocio(negocio.id)" v-if="negocio.deleted_at">
                      <q-item-main label="Ativar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="deleteNegocio(negocio.id)">
                      <q-item-main label="Excluir"/>
                    </q-item>
                  </q-list>
                </q-popover>
              </q-btn>
            </div>
          </q-card-title>
          <q-card-separator/>
          <q-card-main>
            Informações do negócio
          </q-card-main>
        </q-card>

      </div>
    </div>

    <!--EMPTY LIST-->
    <div class="col-12" v-if="negocios.length <= 0">
      <div class="row justify-center items-center" style="min-height: 40vh">
        <div class="col-6 text-center">
          <img src="assets/images/sad_2.svg" class="responsive"/>
          <p>Nenhum resultado encontrado.</p>
        </div>
      </div>
    </div>

    <!--PAGE STICKY BUTTOMS-->
    <q-page-sticky position="bottom-right" :offset="[35, 35]">
      <q-fab icon="add" direction="up" color="deep-orange" class="custom-fab" >
        <q-fab-action color="grey-1" text-color="grey-7" icon="add"  v-for="tipoNegocio in tipoNegocios" :key="tipoNegocio.id"
                      @click="addNegocio(tipoNegocio.id)">
          <span class="shadow-2">{{tipoNegocio.nome}}</span>
        </q-fab-action>
      </q-fab>
    </q-page-sticky>

    <negocio-modal ref="negocioModal" />

  </custom-page>
</template>
<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import negocioService from 'assets/js/service/negocio/NegocioService'
  import negocioModal from 'components/negocio/NegocioModal';

  export default {
    name: "negocios",
    components: {
      toolbar,
      customPage,
      negocioModal,
    },
    data () {
      return {
        negocios: [],
        tipoNegocios: [],
      }
    },
    methods: {
      listNegocios: function(){
        negocioService.listNegocios().then(response => {
          this.negocios = response.data;
        });
      },
      addNegocio: function(tipo_negocio_id){
        this.$refs.negocioModal.openModal(tipo_negocio_id);
      },
      editNegocio: function(negocioId){
        this.$refs.negocioModal.openModalEditMode(negocioId);
      },
      archiveNegocio: function(id){
        negocioService.archiveNegocio(id).then(response => {
          this.listNegocios()
        })
      },
      restoreNegocio: function(id){
        negocioService.restoreNegocio(id).then(response => {
          this.listNegocios()
        })
      },
      deleteNegocio: function(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esta Negocio?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          negocioService.deleteNegocio(id).then(response => {
            this.listNegocios()
          })
        }).catch(()=>{});
      },
      viewNegocio: function(id){
        this.$router.push({name: 'negocio_view', params: {id:id}});
      },
      listTipoNegocios: function(){
        negocioService.listTipoNegocios().then(response => {
          this.tipoNegocios = response.data;
        });
      },

    },
    mounted () {
      this.listTipoNegocios();
      this.listNegocios();
      this.$root.$on('refreshNegocioList', () => {
        this.listNegocios();
      });
    },
  }
</script>
<style scoped>
  .space-end{
    margin-bottom: 200px;
  }
  .custom-fab .q-fab-actions .q-btn  span{
    position: absolute;
    background: white;
    right: 46px;
    border-radius: 6px;
    padding: 7px 10px;
  }
</style>
