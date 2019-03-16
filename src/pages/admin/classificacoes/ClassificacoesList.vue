<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Caminhões" searchable navigation_type="menu" @search_changed="listBySearch">
      <template slot="action_itens">
        <q-btn flat round dense icon="tune" >
          <q-popover anchor="bottom left">
            <q-list>
              <q-list-header>Filtrar por:</q-list-header>
              <q-item dense>
                <q-item-main>
                  <q-option-group type="radio" color="primary" v-model="filter.type"
                                  :options="[
                            { label: 'Ativos', value: 'non-trashed'},
                            { label: 'Inativos', value: 'trashed' },
                            { label: 'Todos', value: '' }
                            ]"
                  />
                </q-item-main>
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </template>
    </toolbar>

    <div class="row q-pa-md gutter-sm space-end" v-if="caminhoes">

      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 " v-for="caminhao in caminhoes" :key="caminhao.id">
        <q-card class="full-height">
          <!--<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 cursor-pointer" v-for="caminhao in caminhoes" :key="caminhao.id">-->
          <!--<q-card @click.native="viewCaminhao(caminhao.id)" class="full-height">-->
          <q-card-media overlay-position="top">
            <ap-image size="400x250" :file-name="caminhao.image_file_name" />
            <q-card-title slot="overlay">
              {{caminhao.placa}}
              {{caminhao.nome}}
              <q-btn @click.prevent.stop slot="right" round flat dense icon="more_vert" color="white">
                <q-popover>
                  <q-list link>
                    <q-item v-close-overlay @click.native="addFotoCaminhao(caminhao.id)">
                      <q-item-main label="Atualizar Foto"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="updateCaminhao(caminhao.id)">
                      <q-item-main label="Editar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="archiveCaminhao(caminhao.id)" v-if="!caminhao.deleted_at">
                      <q-item-main label="Arquivar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="restoreCaminhao(caminhao.id)" v-if="caminhao.deleted_at">
                      <q-item-main label="Ativar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="deleteCaminhao(caminhao.id)">
                      <q-item-main label="Excluir"/>
                    </q-item>
                  </q-list>
                </q-popover>
              </q-btn>
            </q-card-title>
          </q-card-media>
          <q-list>
            <q-item>
              <q-item-side icon="mdi-scale" :color="pesoIconColor(caminhao.lotacao)"/>
              <q-item-main>
                <q-item-tile v-if="caminhao.lotacao">
                  {{numeral(caminhao.lotacao).format('0,0')}}
                  {{caminhao.unidade_medida_sigla}}
                </q-item-tile>
                <q-item-tile sublabel v-else>
                  Não informado
                </q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>

    <div class="row items-center" style="min-height: 80vh" v-if="caminhoes.length === 0">
      <div class=" col-12 list-empty">
        <q-icon name="warning" size="30px"/>
        <span>Nenhum caminhão encontrado</span>
      </div>
    </div>

    <!--MODAL ADD FOTO CAMINHAO-->
    <q-modal v-model="modalAddFotoCaminhao" maximized no-backdrop-dismiss>
      <div class="row justify-center q-pt-lg">
        <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 q-display-1 text-center"></div>
      </div>

      <div class="row justify-center content-center" style="min-height: 80vh">
        <imape-upload ref="caminhaoImageUpload"
                      :url="caminhaoImageUrl"
                      v-on:on_error="uploadFotoError"
                      v-on:on_upload_success="uploadFotoSuccess"
                      v-on:on_upload_error="uploadFotoError" />
      </div>

      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn @click.native="closeModalAddFotoCaminhao" color="primary" label="Cancelar" class="q-mr-xs"/>
        <q-btn @click.native="uploadFotoCaminhao" color="deep-orange" label="Salvar"/>
      </q-page-sticky>
    </q-modal>

    <q-page-sticky position="bottom-right" :offset="[35, 35]">
      <q-btn round color="deep-orange" @click="addCaminhao" icon="add" size="20px" />
    </q-page-sticky>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import apNoResults from 'components/ApNoResults'
  import apImage from 'components/ApImage'
  import imapeUpload from 'components/ImageUpload'
  import CaminhaoService from "../../../assets/js/service/CaminhaoService";
  import AccountRepository from "../../../assets/js/repository/AccountRepository";
  export default {
    name: "caminhoes-list",
    components: {
      apNoResults,
      toolbar,
      apImage,
      imapeUpload,
      customPage
    },
    data () {
      return {
        caminhaoService: null,
        caminhoes: [],
        modalAddFotoCaminhao: false,
        selectedCaminhaoId: null,
        produtorId: localStorage.getItem('account.produtor_id'),
        isEmptyList: false,
        filter: {
          type: 'non-trashed',
          nameOrPlaque: '',
        },
      }
    },
    watch: {
      filter: {
        handler: function(val, oldval) {
          var filter = {type: val.type, nameOrPlaque:(val.nameOrPlaque.length > 2 ? val.nameOrPlaque : '')};
          this.listCaminhoes(filter)
        },
        deep: true,
      }
    },
    computed: {
      caminhaoImageUrl: function(){
        return 'produtor/'+ this.produtorId +'/caminhao/' + this.selectedCaminhaoId + '/image';
      },
    },
    methods: {
      addFotoCaminhao: function(id){
        this.selectedCaminhaoId = id;
        this.modalAddFotoCaminhao = true;
      },
      closeModalAddFotoCaminhao: function(){
        this.modalAddFotoCaminhao = false;
        this.$refs.caminhaoImageUpload.clear();
      },
      uploadFotoSuccess: function(response){
        this.closeModalAddFotoCaminhao();
        this.listCaminhoes();
      },
      uploadFotoError: function(error){
        if(error.data){
          this.$q.notify({type: 'negative', message: error.data})
        }else{
          this.$q.dialog({noBackdropDismiss: true, title: 'Oops!', message: error, ok: 'OK'});
        }
      },
      uploadFotoCaminhao: function(){
        this.$refs.caminhaoImageUpload.uploadImage();
      },
      pesoIconColor: function (loatacao) {
        if (loatacao) {
          return 'primary'
        }
        return 'grey'
      },
      listBySearch: function(val){
        this.filter.nameOrPlaque = val;
      },
      listCaminhoes: function(filter) {
        this.$q.loading.show();
        this.caminhaoService.listCaminhoes(filter).then(caminhoes => {
          this.caminhoes = caminhoes;
          this.isEmptyList = this.caminhoes.length === 0;
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'Não foi possível carregar as informações.'});
          this.$q.loading.hide();
        });
      },
      viewCaminhao: function(id) {
        this.$router.push({name: 'view_caminhao', params: {id:id}});
      },
      addCaminhao: function(){
        this.$router.push({name: 'add_caminhao'});
      },
      updateCaminhao: function(id){
        this.$router.push({name: 'edit_caminhao', params: {id:id}});
      },
      archiveCaminhao: function(id){
        this.$q.loading.show();
        this.caminhaoService.archiveCaminhao(id).then(() =>{
          this.$q.notify({type: 'positive', message: 'Caminhão arquivado com sucesso.'});
          this.listCaminhoes(this.filter);
          this.$q.loading.hide();
        }).catch(error =>{
          this.$q.notify({type: 'negative', message: 'Não foi possível arquivar esse caminhão.'});
          this.$q.loading.hide();
        })
      },
      restoreCaminhao: function(id){
        this.$q.loading.show();
        this.caminhaoService.restoreCaminhao(id).then(() =>{
          this.$q.notify({type: 'positive', message: 'Caminhão ativado com sucesso.'});
          this.listCaminhoes(this.filter);
          this.$q.loading.hide();
        }).catch(error =>{
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: 'Não foi possível restaurar esse caminhão.'});
        })
      },
      deleteCaminhao: function(id){
        this.$q.loading.show();
        this.caminhaoService.deleteCaminhao(id).then(() => {
          this.$q.notify({type: 'positive', message: 'Caminhão excluido com sucesso.'});
          this.listCaminhoes(this.filter);
          this.$q.loading.hide();
        }).catch(error =>{
          this.$q.notify({type: 'negative', message: 'Não foi possível excluir esse caminhão'});
          this.$q.loading.hide();
        })
      },
    },
    mounted () {
      new AccountRepository().getFirst().then(account => {
        this.caminhaoService = new CaminhaoService(account.produtor_id)
        this.listCaminhoes(this.filter);
      });

      this.$root.$on('refreshCaminhoesList', () => {
        this.listCaminhoes(this.filter);
      });
    },
  }
</script>

<style scoped>
  .space-end{
    margin-bottom: 300px;
  }
  .list-empty{
    height: 55px;
    text-align: center;
    padding-top: 15px;
    color: #8c8c8c;
    font-weight: bold;
    font-size: 20px;
  }
  .list-empty i{
    color: #ffb500;
    font-size: 20px;
    margin-right: 6px;
  }
</style>
