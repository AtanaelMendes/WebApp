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

    <div class="row space-end" v-if="classificacoes">

      <div class="col-12">
        <q-list highlight no-border separator>

          <q-item v-for="classificacao in classificacoes" :key="classificacao.id">
            <q-item-main>
              <q-item-tile>
                {{classificacao.nome}}
              </q-item-tile>
            </q-item-main>

            <q-item-side>
              <q-btn @click.prevent.stop round flat dense icon="more_vert">
                <q-popover>
                  <q-list link>
                    <q-item v-close-overlay @click.native="updateClassificacao(classificacao.id)">
                      <q-item-main label="Editar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="archiveClassificacao(classificacao.id)" v-if="!classificacao.deleted_at">
                      <q-item-main label="Arquivar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="restoreClassificacao(classificacao.id)" v-if="classificacao.deleted_at">
                      <q-item-main label="Ativar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="deleteClassificacao(classificacao.id)">
                      <q-item-main label="Excluir"/>
                    </q-item>
                  </q-list>
                </q-popover>
              </q-btn>
            </q-item-side>
          </q-item>

        </q-list>
      </div>
    </div>

    <div v-if="isEmptyList" class="no-result">
      <ap-no-results />
    </div>

    <q-page-sticky position="bottom-right" :offset="[35, 35]">
      <q-btn round color="deep-orange" @click="addClassificacao" icon="add" size="20px" />
    </q-page-sticky>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import apNoResults from 'components/ApNoResults'
  import ClassificacaoService from "../../../assets/js/service/ClassificacaoService";
  import AccountRepository from "../../../assets/js/repository/AccountRepository";
  export default {
    name: "classificacoes-list",
    components: {
      apNoResults,
      toolbar,
      customPage
    },
    data () {
      return {
        classificacaoService: null,
        classificacoes: [],
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
          this.listClassificacoes(filter)
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
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja arquivar esta classificação?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.$q.loading.show();
          this.classificacaoService.archiveClassificacao(id).then(() =>{
            this.$q.notify({type: 'positive', message: 'Classificação arquivado com sucesso.'});
            this.listClassificacoes(this.filter);
            this.$q.loading.hide();
          }).catch(error =>{
            this.$q.notify({type: 'negative', message: 'Não foi possível arquivar esse classificação.'});
            this.$q.loading.hide();
          })
        })

      },
      restoreClassificacao: function(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja restaurar esta classificação?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.$q.loading.show();
          this.classificacaoService.restoreClassificacao(id).then(() =>{
            this.$q.notify({type: 'positive', message: 'Classificação ativada com sucesso.'});
            this.listClassificacoes(this.filter);
            this.$q.loading.hide();
          }).catch(error =>{
            this.$q.loading.hide();
            this.$q.notify({type: 'negative', message: 'Não foi possível restaurar essa classificação.'});
          })
        })
      },
      deleteClassificacao: function(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir esta classificação?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.$q.loading.show();
          this.classificacaoService.deleteClassificacao(id).then(() => {
            this.$q.notify({type: 'positive', message: 'Classificação excluida com sucesso.'});
            this.listClassificacoes(this.filter);
            this.$q.loading.hide();
          }).catch(error =>{
            this.$q.notify({type: 'negative', message: 'Não foi possível excluir essa classificação'});
            this.$q.loading.hide();
          })
        })
      },
    },
    mounted () {
      new AccountRepository().getFirst().then(account => {
        this.classificacaoService = new ClassificacaoService();
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
