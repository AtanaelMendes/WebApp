<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Motoristas" searchable navigation_type="menu" @search_changed="listBySearch">
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
                            { label: 'Todos', value: 'all' }
                            ]"
                  />
                </q-item-main>
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </template>
    </toolbar>

    <div class="row q-pa-md gutter-sm space-end">

      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 " v-if="motoristas" v-for="motorista in motoristas" :key="motorista.id">
      <!--<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 cursor-pointer" v-for="motorista in motoristas" :key="motorista.id">-->
        <!--<q-card @click.native="viewMotorista(motorista.id)" class="full-height">-->
        <q-card class="full-height">

          <q-item v-if="motorista.deleted_at" class="bg-negative">
            <q-item-side icon="voice_over_off" color="white"/>
            <q-item-main class="text-white">
              Inativo
            </q-item-main>
          </q-item>

          <q-card-media overlay-position="top">
            <ap-image size="400x250" :file-name="motorista.image_file_name" />
            <q-card-title slot="overlay">
              <q-item class="q-pa-none">
                <q-item-main>
                  <q-item-tile>
                    {{motorista.nome}}
                  </q-item-tile>
                </q-item-main>
              </q-item>
              <q-btn @click.prevent.stop slot="right" round flat dense icon="more_vert" color="white">
                <q-popover>
                  <q-list link>
                    <q-item v-close-overlay @click.native="addFotoMotorista(motorista.id)">
                      <q-item-main label="Atualizar Foto"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="editMotorista(motorista.id)">
                      <q-item-main label="Editar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="archiveMotorista(motorista.id)" v-if="!motorista.deleted_at">
                      <q-item-main label="Arquivar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="restoreMotorista(motorista.id)" v-if="motorista.deleted_at">
                      <q-item-main label="Ativar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="deleteMotorista(motorista.id)">
                      <q-item-main label="Excluir"/>
                    </q-item>
                  </q-list>
                </q-popover>
              </q-btn>
            </q-card-title>
          </q-card-media>
        </q-card>
      </div>

      <div v-if="isEmptyList" class="no-result col-12">
        <ap-no-results />
      </div>
    </div>



    <!--MODAL ADD FOTO MOTORISTA-->
    <q-modal v-model="modalAddFotoMotorista" maximized no-backdrop-dismiss>
      <div class="row justify-center q-pt-lg">
        <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 q-display-1 text-center"></div>
      </div>

      <div class="row justify-center content-center" style="min-height: 80vh">
        <image-upload ref="motoristaImageUpload"
                      :url="motoristaImageUrl"
                      v-on:on_error="uploadFotoError"
                      v-on:on_upload_success="uploadFotoSuccess"
                      v-on:on_upload_error="uploadFotoError" />
      </div>

      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn @click.native="closeModalAddFotoMotorista" color="primary" label="Cancelar" class="q-mr-xs"/>
        <q-btn @click.native="uploadFotoTalhao" color="deep-orange" label="Salvar"/>
      </q-page-sticky>
    </q-modal>

    <q-page-sticky position="bottom-right" :offset="[35, 35]">
      <q-btn round color="deep-orange" @click="addMotorista" icon="add" size="20px" />
    </q-page-sticky>

    <add-motorista-modal ref="addMotoristaModal"/>

    <edit-motorista-modal ref="editMotoristaModal"/>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import apNoResults from 'components/ApNoResults'
  import apImage from 'components/ApImage'
  import imageUpload from 'components/ImageUpload'
  import addMotoristaModal from 'components/motorista/AddMotoristaModal'
  import editMotoristaModal from 'components/motorista/EditMotoristaModal'
  import MotoristaService from "assets/js/service/motorista/MotoristaService";
  import agroUtils from "assets/js/AgroUtils";
  export default {
    name: "motoristas-list",
    components: {
      apNoResults,
      toolbar,
      apImage,
      imageUpload,
      addMotoristaModal,
      editMotoristaModal,
      customPage
    },
    data () {
      return {
        motoristaService: new MotoristaService(),
        motoristas: [],
        modalAddFotoMotorista: false,
        selectedMotoristaId: null,
        isEmptyList: false,
        filter: {
          type: 'non-trashed',
          name: '',
        },
      }
    },
    watch: {
      filter: {
        handler: function(val, oldval) {
          var filter = {type: val.type, name:(val.name.length > 2 ? val.name : '')};
          this.listMotoristas(filter)
        },
        deep: true,
      }
    },
    computed: {
      motoristaImageUrl: function(){
        return '/motorista/' + this.selectedMotoristaId + '/image';
      },
    },
    methods: {
      addFotoMotorista: function(id){
        this.selectedMotoristaId = id;
        this.modalAddFotoMotorista = true;
      },
      closeModalAddFotoMotorista: function(){
        this.modalAddFotoMotorista = false;
        this.$refs.motoristaImageUpload.clear();
      },
      uploadFotoError: function(error){
        if(error.data){
          this.$q.notify({type: 'negative', message: error.data})
        }else{
          this.$q.dialog({noBackdropDismiss: true, title: 'Oops!', message: error, ok: 'OK'});
        }
      },
      uploadFotoSuccess: function(response){
        this.closeModalAddFotoMotorista();
        this.listMotoristas();
      },
      uploadFotoTalhao: function(){
        this.$refs.motoristaImageUpload.uploadImage();
      },

      listBySearch: function(val){
        this.filter.name = val;
      },
      listMotoristas: function(filter) {
        this.$q.loading.show();
        this.motoristaService.listMotoristas(agroUtils.serialize(filter)).then(motoristas => {
          this.motoristas = motoristas;
          this.isEmptyList = this.motoristas.length === 0;
          this.$q.loading.hide();
        })
      },
      viewMotorista: function(id) {
        this.$router.push({name: 'view_motorista', params: {id:id}});
      },
      addMotorista: function(){
        this.$refs.addMotoristaModal.openModal();
      },
      editMotorista: function(id){
        this.$refs.editMotoristaModal.openModal(id);
      },
      archiveMotorista: function(id){
        this.$q.loading.show();
        this.motoristaService.archiveMotorista(id).then(() =>{
          this.$q.notify({type: 'positive', message: 'Motorista arquivado com sucesso.'});
          this.listMotoristas(this.filter);
          this.$q.loading.hide();
        })
      },
      restoreMotorista: function(id){
        this.$q.loading.show();
        this.motoristaService.restoreMotorista(id).then(() =>{
          this.$q.notify({type: 'positive', message: 'Motorista ativado com sucesso.'});
          this.listMotoristas(this.filter);
          this.$q.loading.hide();
        })
      },
      deleteMotorista: function(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja exluir esse motorista?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.$q.loading.show();
          this.motoristaService.deleteMotorista(id).then(() => {
            this.$q.notify({type: 'positive', message: 'Motorista excluido com sucesso.'});
            this.listMotoristas(this.filter);
            this.$q.loading.hide();
          })
        });
      },
    },
    mounted () {
      this.listMotoristas(this.filter);
      this.$root.$on('refreshMotoristasList', () => {
        this.listMotoristas(this.filter);
      });
    },
  }
</script>

<style scoped>
  .space-end{
    margin-bottom: 300px;
  }
  .no-result{
    text-align: center;
    padding-top: 150px;
  }

  .no-result img{
    width: 120px;
    height: auto;
  }

  .no-result span{
    display: block;
    margin-top: 30px;
    font-size: 25px;
    font-weight: 300;
    color: #ababab;
  }
</style>
