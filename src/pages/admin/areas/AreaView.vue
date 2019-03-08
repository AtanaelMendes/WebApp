<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" navigation_type="back" @navigation_clicked="backAction">
      <template slot="action_itens" v-if="area">
        <q-btn flat round dense icon="edit" @click.native="updateArea"/>
        <q-btn flat round dense icon="more_vert" >
          <q-popover anchor="bottom left">
            <q-list link>
              <q-item @click.native="addFotoArea(area.id)" v-close-overlay>
                <q-item-main label="Atualizar Foto"/>
              </q-item>
              <q-item  @click.native="archiveArea(area.id)" v-if="!area.deleted_at" v-close-overlay>
                <q-item-main label="Arquivar area"  />
              </q-item>
              <q-item  @click.native="deleteArea(area.id)" v-close-overlay>
                <q-item-main label="Excluir area"  />
              </q-item>
              <q-item  @click.native="restoreArea(area.id)" v-if="area.deleted_at" v-close-overlay>
                <q-item-main label="Ativar area"  />
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </template>
    </toolbar>

    <div class="row q-pa-md gutter-sm space-end">

      <!--AREA-->
      <div class="col-12" v-if="area">
        <q-card class="row">

          <!--IMAGEM-->
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-5" style="max-height: 200px; overflow: hidden">
            <img src="statics/images/no-image-16-10.svg" v-if="!area.image_path" class="fit"/>
            <img :src="area.image_path" v-if="area.image_path" class="fit"/>
          </div>

          <!--INFORMACOES-->
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-7">

            <q-item>
              <q-item-main >
                <q-item-tile class="q-title">
                  {{area.nome}}
                </q-item-tile>
                <q-item-tile class="text-faded">
                  {{numeral(areaTotal).format('0,0')}} Hectares
                </q-item-tile>
              </q-item-main>
            </q-item>

            <q-item>
              <q-item-main>
                <q-item-tile class="q-subheading">
                  {{area.localizacao.endereco}},&nbsp{{area.localizacao.numero}}
                </q-item-tile>
                <q-item-tile sublabel>
                  {{area.localizacao.cidade.nome}},&nbsp{{area.localizacao.cidade.estado.nome}}
                </q-item-tile>
              </q-item-main>
            </q-item>

          </div>

        </q-card>
      </div>

      <!--TALHOES-->
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="talhao in talhoes" :key="talhao.id">
        <q-card color="white" text-color="black">

          <q-item v-if="talhao.deleted_at" class="bg-negative text-white">
            <q-item-main class="text-center">
              Talhão Inativo
            </q-item-main>
          </q-item>

          <q-card-media overlay-position="top">
            <q-card-title slot="overlay">
              {{talhao.nome}}
              <div slot="right">
                <q-btn round flat dense icon="more_vert" color="white">
                  <q-popover>
                    <q-list link>
                      <q-item v-close-overlay @click.native="addFotoTalhao(talhao.id)">
                        <q-item-main label="Atualizar Foto"/>
                      </q-item>
                      <q-item v-close-overlay @click.native="updateTalhao(talhao.id)">
                        <q-item-main label="Editar"/>
                      </q-item>
                      <q-item v-close-overlay @click.native="archiveTalhao(talhao.id)" v-if="!talhao.deleted_at">
                        <q-item-main label="Arquivar"/>
                      </q-item>
                      <q-item v-close-overlay @click.native="restoreTalhao(talhao.id)" v-if="talhao.deleted_at">
                        <q-item-main label="Ativar"/>
                      </q-item>
                      <q-item v-close-overlay @click.native="deleteTalhao(talhao.id)">
                        <q-item-main label="Excluir"/>
                      </q-item>
                    </q-list>
                  </q-popover>
                </q-btn>
              </div>
            </q-card-title>

            <img src="statics/images/no-image-16-10.svg" v-if="!talhao.image_path"/>
            <img :src="talhao.image_path" v-if="talhao.image_path"/>
          </q-card-media>

          <q-card-main>
            {{numeral(talhao.tamanho).format('0,0')}}&nbsp{{talhao.unidade.nome}}
          </q-card-main>

        </q-card>
      </div>

    </div>

    <!--PAGE STICKY BUTTOMS-->
    <q-page-sticky position="bottom-right" :offset="[35, 35]">
      <q-fab icon="add" direction="up" color="deep-orange" class="custom-fab" >
        <q-fab-action color="grey-1" text-color="grey-7" icon="add" @click="addtalhao">
          <span class="shadow-2 text-no-wrap">Novo Talhão</span>
        </q-fab-action>
      </q-fab>
    </q-page-sticky>

    <!--MODAL ADD FOTO AREA-->
    <q-modal v-model="modalAddFotoArea" maximized no-backdrop-dismiss>
      <div class="row justify-center q-pt-lg">
        <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 q-display-1 text-center"></div>
      </div>

      <div class="row justify-center content-center" style="min-height: 80vh">
        <imape-upload ref="areaImageUpload"
                      :url="areaImageUrl"
                      v-on:on_error="uploadFotoError"
                      v-on:on_upload_success="uploadFotoSuccess"
                      v-on:on_upload_error="uploadFotoError" />
      </div>

      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn @click.native="closeModalAddFotoArea" color="primary" label="Cancelar" class="q-mr-xs"/>
        <q-btn @click.native="uploadFotoArea" color="deep-orange" label="Salvar"/>
      </q-page-sticky>
    </q-modal>

    <!--MODAL ADD FOTO TALHÃO-->
    <q-modal v-model="modalAddFotoTalhao" maximized no-backdrop-dismiss>
      <div class="row justify-center q-pt-lg">
        <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 q-display-1 text-center"></div>
      </div>

      <div class="row justify-center content-center" style="min-height: 80vh">
        <imape-upload ref="talhaoImageUpload"
                      :url="talhaoImageUrl"
                      v-on:on_error="uploadFotoError"
                      v-on:on_upload_success="uploadFotoSuccess"
                      v-on:on_upload_error="uploadFotoError" />
      </div>

      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn @click.native="closeModalAddFotoTalhao" color="primary" label="Cancelar" class="q-mr-xs"/>
        <q-btn @click.native="uploadFotoTalhao" color="deep-orange" label="Salvar"/>
      </q-page-sticky>
    </q-modal>
  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import talhaoService from 'assets/js/service/area/TalhaoService'
  import imapeUpload from 'components/ImageUpload'
  import AccountRepository from "../../../assets/js/repository/AccountRepository";
  import AreaService from "../../../assets/js/service/area/AreaService";

  export default {
    name: "area-view",
    components: {
      toolbar,
      customPage,
      imapeUpload,
    },
    watch: {
      '$route' (to, from) {
        this.listTalhoes(this.$route.params.id);
        this.getAreaById(this.$route.params.id);
        this.areaId = this.$route.params.id;
      },
    },
    computed: {
      areaImageUrl: function(){
        let produtor_id = localStorage.getItem('account.produtor_id');
        return '/produtor/' + produtor_id + '/area/' + this.selectedAreaId + '/image';
      },
      talhaoImageUrl: function(){
        let area_id = this.$route.params.id;
        return '/area/' + area_id + '/talhao/' + this.selectedTalhaoId + '/image';
      },
      areaTotal: function () {
        if(this.talhoes.length > 0){
          let soma = 0;
          this.talhoes.forEach(function (talhao) {
            soma += parseFloat(talhao.tamanho)
          });
          return soma
        }
      }
    },
    data(){
      return{
        areaService: null,
        area: null,
        talhoes: [],
        areaId: this.$route.params.id,
        coluna: 'col-xs-12 col-sm-12 col-md-6 col-lg-6',
        selectedAreaId: null,
        modalAddFotoArea: false,
        selectedTalhaoId: null,
        modalAddFotoTalhao: false,
      }
    },
    methods: {
      getAreaById: function(areaId){
        this.areaService.getAreaById(areaId).then(area => {
          this.area = area
        })
      },
      uploadFotoSuccess: function(response){
        this.closeModalAddFotoArea();
        this.closeModalAddFotoTalhao();
        this.listTalhoes(this.$route.params.id);
        this.getAreaById(this.$route.params.id);
      },
      uploadFotoError: function(error){
        if(error.data){
          this.$q.notify({type: 'negative', message: error.data.image[0]})
        }else{
          this.$q.dialog({noBackdropDismiss: true, title: 'Oops!', message: error, ok: 'OK'});
        }
      },
      addFotoArea: function(id){
        this.selectedAreaId = id;
        this.modalAddFotoArea = true;
      },
      closeModalAddFotoArea: function(){
        this.modalAddFotoArea = false;
        this.$refs.areaImageUpload.clear();
      },
      uploadFotoArea: function(){
        this.$refs.areaImageUpload.uploadImage();
      },
      updateArea: function(){
        this.$router.push({name: 'edit_area', params: {id: this.areaId}});
      },
      archiveArea: function(){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja arquivar esta área?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.areaService.archiveArea(this.areaId).then(() => {
            this.$q.notify({type: 'positive', message: 'Área arquivada'});
            this.$router.push({name:'areas'})
          })
        });
      },
      restoreArea: function(){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente Ativar essa área?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.areaService.restoreArea(this.areaId).then(response => {
            this.$q.notify({type: 'positive', message: 'Área ativada'});
            this.getAreaById(this.$route.params.id);
          })
        });
      },
      deleteArea: function(){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir essa área?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.areaService.deleteArea(this.areaId).then(() => {
            this.$q.notify({type: 'positive', message: 'Área excluida'});
            this.$router.push({name:'areas'})

            this.$root.$emit('refreshAreaList')
          })
        });
      },
      listTalhoes: function(id){
        talhaoService.listTalhoes(id).then(talhoes => {
          this.talhoes = talhoes.data;
        })
      },

      addFotoTalhao: function(id){
        this.selectedTalhaoId = id;
        this.modalAddFotoTalhao = true;
      },
      closeModalAddFotoTalhao: function(){
        this.modalAddFotoTalhao = false;
        this.$refs.talhaoImageUpload.clear();
      },
      uploadFotoTalhao: function(){
        this.$refs.talhaoImageUpload.uploadImage();
      },
      addtalhao: function(){
        this.$router.push({name: 'add_talhao', params: {id: this.$route.params.id}});
      },
      updateTalhao: function(talhaoId){
        this.$router.push({name: 'edit_talhao', params: {id: this.areaId, talhaoId: talhaoId}});
      },
      archiveTalhao: function(talhaoId){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja arquivar este talhão?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          talhaoService.archiveTalhao(this.areaId, talhaoId).then(response => {
            this.$q.notify({type: 'positive', message: 'Talhão arquivado com sucesso'});
            this.listTalhoes(this.$route.params.id);
          })
        });
      },
      restoreTalhao: function(talhaoId){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja ativar este talhão?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          talhaoService.restoreTalhao(this.areaId, talhaoId).then(response => {
            this.$q.notify({type: 'positive', message: 'Talhão ativado com suceso'});
            this.listTalhoes(this.$route.params.id);
          })
        });
      },
      deleteTalhao: function(talhaoId){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir este talhão?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          talhaoService.deleteTalhao(this.areaId, talhaoId).then(response => {
            this.$q.notify({type: 'positive', message: 'Talhão excluido com sucesso'});
            this.listTalhoes(this.$route.params.id);
          })
        });
      },
      backAction: function () {
        this.$router.back()
      }
    },
    mounted(){
      new AccountRepository().getFirst().then(account => {
        this.areaService = new AreaService(account.produtor_id);
        this.getAreaById(this.$route.params.id)
      });

      this.$root.$on('refreshTalhaoList', () => {
        this.listTalhoes(this.$route.params.id);
      });
      this.listTalhoes(this.$route.params.id);
    }
  }
</script>

<style>
  .custom-fab .q-fab-actions .q-btn  span{
    position: absolute;
    background: white;
    right: 46px;
    border-radius: 6px;
    padding: 7px 10px;
  }
</style>
