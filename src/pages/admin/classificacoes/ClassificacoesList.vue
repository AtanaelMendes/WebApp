<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Classificações" searchable navigation_type="menu" @search_changed="listBySearch">
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

    <div class="row q-pa-md gutter-sm space-end" v-if="classificacoes">

      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 " v-for="classificacao in classificacoes" :key="classificacao.id"></div>
    </div>

    <div class="row items-center" style="min-height: 80vh" v-if="classificacoes.length === 0">
      <div class=" col-12 list-empty">
        <q-icon name="warning" size="30px"/>
        <span>Nenhuma classificação encontrada</span>
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
    name: "classificacoes-list",
    components: {
      apNoResults,
      toolbar,
      apImage,
      imapeUpload,
      customPage
    },
    data () {
      return {
        classificacaoService: null,
        classificacoes: [],
        selectedCaminhaoId: null,
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
          this.listCaminhoes(filter)
        },
        deep: true,
      }
    },
    computed: {
    },
    methods: {
      listBySearch: function(val){
        this.filter.name = val;
      },
      listClassificacoes: function(filter) {
        this.$q.loading.show();
        this.classificacaoService.listClassificacoes(filter).then(classificacoes => {
          this.classificacoes = classificacoes;
          this.isEmptyList = this.classificacoes.length === 0;
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'Não foi possível carregar as informações.'});
          this.$q.loading.hide();
        });
      },
      viewClassificacao: function(id) {
        this.$router.push({name: 'view_classificacao', params: {id:id}});
      },
      addClassificacao: function(){
        this.$router.push({name: 'add_classificacao'});
      },
      updateClassificacao: function(id){
        this.$router.push({name: 'edit_classificacao', params: {id:id}});
      },
      archiveClassificacao: function(id){
        this.$q.loading.show();
        this.classificacaoService.archiveClassificacao(id).then(() =>{
          this.$q.notify({type: 'positive', message: 'Classificação arquivado com sucesso.'});
          this.listClassificacoes(this.filter);
          this.$q.loading.hide();
        }).catch(error =>{
          this.$q.notify({type: 'negative', message: 'Não foi possível arquivar esse classificação.'});
          this.$q.loading.hide();
        })
      },
      restoreClassificacao: function(id){
        this.$q.loading.show();
        this.classificacaoService.restoreClassificacao(id).then(() =>{
          this.$q.notify({type: 'positive', message: 'Classificação ativada com sucesso.'});
          this.listClassificacoes(this.filter);
          this.$q.loading.hide();
        }).catch(error =>{
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: 'Não foi possível restaurar essa classificação.'});
        })
      },
      deleteClassificacao: function(id){
        this.$q.loading.show();
        this.classificacaoService.deleteClassificacao(id).then(() => {
          this.$q.notify({type: 'positive', message: 'Classificação excluida com sucesso.'});
          this.listClassificacoes(this.filter);
          this.$q.loading.hide();
        }).catch(error =>{
          this.$q.notify({type: 'negative', message: 'Não foi possível excluir essa classificação'});
          this.$q.loading.hide();
        })
      },
    },
    mounted () {
      new AccountRepository().getFirst().then(account => {
        this.classificacaoService = new ClassificacaoService(account.produtor_id);
        this.listClassificacoes(this.filter);
      });

      this.$root.$on('refreshClassificacoesList', () => {
        this.listClassificacoes(this.filter);
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
