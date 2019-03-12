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

    <div class="row q-pa-md gutter-sm" v-if="motoristas">

      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 cursor-pointer" v-for="motorista in motoristas" :key="motorista.id">
        <q-card @click.native="viewMotorista(motorista.id)" class="full-height">
          <q-card-media overlay-position="top">
            <ap-image size="400x250" :file-name="motorista.image_file_name" />
            <q-card-title slot="overlay">
              {{motorista.nome}}
              <q-btn @click.prevent.stop slot="right" round flat dense icon="more_vert" color="white">
                <q-popover>
                  <q-list link>
                    <q-item v-close-overlay @click.native="addFotoMotorista(motorista.id)">
                      <q-item-main label="Atualizar Foto"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="updateMotorista(motorista.id)">
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
    </div>

    <div class="row items-center" style="min-height: 80vh" v-if="motoristas.length === 0">
      <div class=" col-12 list-empty">
        <q-icon name="warning" size="30px"/>
        <span>Nenhum motorista encontrado</span>
      </div>
    </div>

    <!--MODAL ADD FOTO MOTORISTA-->
    <q-modal v-model="modalAddFotoMotorista" maximized no-backdrop-dismiss>
      <div class="row justify-center q-pt-lg">
        <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 q-display-1 text-center"></div>
      </div>

      <div class="row justify-center content-center" style="min-height: 80vh">
        <imape-upload ref="motoristaImageUpload"
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

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import motoristaService from 'assets/js/service/motorista/MotoristaService'
  import apNoResults from 'components/ApNoResults'
  import apImage from 'components/ApImage'
  import imapeUpload from 'components/ImageUpload'
  export default {
    name: "motoristas-list",
    components: {
      apNoResults,
      toolbar,
      apImage,
      imapeUpload,
      customPage
    },
    data () {
      return {
        motoristas: [],
        modalAddFotoMotorista: false,
        selectedMotoristaId: null,
        produtorId: localStorage.getItem('account.produtor_id'),
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
        return 'produtor/'+ this.produtorId +'/motorista/' + this.selectedMotoristaId + '/image';
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
        motoristaService.listMotoristas(filter).then(response => {
          this.motoristas = response.data;
          this.isEmptyList = this.motoristas.length === 0;
        });
      },
      viewMotorista: function(id) {
        this.$router.push({name: 'view_motorista', params: {id:id}});
      },
      addMotorista: function(){
        this.$router.push({name: 'add_motorista'});
      },
      updateMotorista: function(){
        this.$router.push({name: 'edit_Motorista'});
      },
      archiveMotorista: function(id){
        motoristaService.archiveMotorista(id).then(response =>{
          this.$q.notify({type: 'positive', message: 'Motorista arquivado com sucesso.'});
        }).catch(error =>{
          this.$q.notify({type: 'negative', message: 'Não foi possível arquivar esse Motorista.'});
        })
      },
      restoreMotorista: function(id){
        motoristaService.restoreMotorista(id).then(response =>{
          this.$q.notify({type: 'positive', message: 'Motorista ativado com sucesso.'});
        }).catch(error =>{
          this.$q.notify({type: 'negative', message: 'Não foi possível restaurar esse Motorista.'});
        })
      },
      deleteMotorista: function(id){
        motoristaService.deleteMotorista(id).then(response => {
          this.$q.notify({type: 'positive', message: 'Motorista excluido com sucesso.'});
          this.listMotoristas(this.filter);
        }).catch(error =>{
          this.$q.notify({type: 'negative', message: 'Não foi possível excluir esse Motorista'});
        })
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
