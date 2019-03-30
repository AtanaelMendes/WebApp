<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Grupos econômicos" searchable navigation_type="menu" @search_changed="listBySearch">
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

    <div class="row space-end " v-if="gruposEconomicos">
      <div class="col-12">

        <q-list no-border sparse inset-separator highlight link>
          <q-item v-for="grupoEconomico in gruposEconomicos" :key="grupoEconomico.nome" @click.native="viewGrupoEconomico(grupoEconomico.id)">

            <q-item-side icon="group_work" color="primary"/>
            <q-item-main>

              <q-item-tile>
                {{grupoEconomico.nome}}
              </q-item-tile>

            </q-item-main>

            <q-item-side>
              <q-btn @click.prevent.stop round flat dense icon="more_vert">
                <q-popover>
                  <q-list link>
                    <q-item v-close-overlay @click.native="editGrupoEconomico(grupoEconomico.id)">
                      <q-item-main label="Editar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="archiveGrupoEconomico(grupoEconomico.id)" v-if="!grupoEconomico.deleted_at">
                      <q-item-main label="Arquivar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="restoreGrupoEconomico(grupoEconomico.id)" v-if="grupoEconomico.deleted_at">
                      <q-item-main label="Ativar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="deleteGrupoEconomico(grupoEconomico.id)">
                      <q-item-main label="Excluir"/>
                    </q-item>
                  </q-list>
                </q-popover>
              </q-btn>
            </q-item-side>
          </q-item>
        </q-list>

      </div>

      <div v-if="isEmptyList" class="no-result col-12">
        <ap-no-results />
      </div>
    </div>



    <q-page-sticky position="bottom-right" :offset="[35, 35]">
      <q-btn round color="deep-orange" @click="addGrupoEconomico" icon="add" size="20px" />
    </q-page-sticky>

    <add-grupo-economico-modal ref="addGrupoEconomicoModal"/>

    <edit-grupo-economico-modal ref="editGrupoEconomicoModal"/>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import apNoResults from 'components/ApNoResults'
  import addGrupoEconomicoModal from 'components/grupoEconomico/AddGrupoEconomicoModal'
  import editGrupoEconomicoModal from 'components/grupoEconomico/EditGrupoEconomicoModal'
  import GrupoEconomicoService from "assets/js/service/GrupoEconomicoService"
  export default {
    name: "grupos-economicos-list",
    components: {
      apNoResults,
      toolbar,
      addGrupoEconomicoModal,
      editGrupoEconomicoModal,
      customPage
    },
    data () {
      return {
        grupoEconomicoService: new GrupoEconomicoService(),
        gruposEconomicos: [],
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
          this.listGruposEconomicos(filter)
        },
        deep: true,
      }
    },
    computed: {

    },
    methods: {
      listBySearch: function(val){
        this.filter.nameOrPlaque = val;
      },
      listGruposEconomicos: function(filter) {
        this.$q.loading.show();
        this.grupoEconomicoService.listGruposEconomicos(filter).then(response => {
          this.$q.loading.hide();
          this.gruposEconomicos = response;
          this.isEmptyList = this.gruposEconomicos.length === 0;
        }).catch(error => {
          this.$q.loading.hide();
          console.log(error);
          this.$q.notify({type: 'negative', message: 'Não foi possível carregar as informações.'});
        });
      },
      viewGrupoEconomico: function(id) {
        this.$router.push({name: 'view_grupo_economico', params: {id:id}});
      },
      addGrupoEconomico: function(){
        this.$refs.addGrupoEconomicoModal.openModal()
      },
      editGrupoEconomico: function(id){
        this.$refs.editGrupoEconomicoModal.openModal(id);
      },
      archiveGrupoEconomico: function(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja arquivar o armazém?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.$q.loading.show();
          this.grupoEconomicoService.archiveGrupoEconomico(id).then(() =>{
            this.$q.notify({type: 'positive', message: 'Armazém arquivado com sucesso.'});
            this.listGruposEconomicos(this.filter);
            this.$q.loading.hide();
          }).catch(error =>{
            console.log(error);
            this.$q.notify({type: 'negative', message: 'Não foi possível arquivar esse armazém.'});
            this.$q.loading.hide();
          })
        });

      },
      restoreGrupoEconomico: function(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja resturar esse armazém?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.$q.loading.show();
          this.grupoEconomicoService.restoreGrupoEconomico(id).then(response =>{
            this.$q.notify({type: 'positive', message: 'Armazém ativado com sucesso.'});
            this.listGruposEconomicos(this.filter);
            this.$q.loading.hide();
          }).catch(error =>{
            console.log(error);
            this.$q.loading.hide();
            this.$q.notify({type: 'negative', message: 'Não foi possível restaurar esse armazém.'});
          })
        });

      },
      deleteGrupoEconomico: function(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir este armazém?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.$q.loading.show();
          this.grupoEconomicoService.deleteGrupoEconomico(id).then(() => {
            this.$q.notify({type: 'positive', message: 'Armazém excluido com sucesso.'});
            this.listGruposEconomicos(this.filter);
            this.$q.loading.hide();
          }).catch(error =>{
            console.log(error);
            this.$q.notify({type: 'negative', message: 'Não foi possível excluir esse armazém'});
            this.$q.loading.hide();
          })
        });
      },
    },
    mounted () {
      this.listGruposEconomicos(this.filter);
      this.$root.$on('refreshGruposEconomicosList', () => {
        this.listGruposEconomicos(this.filter);
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
