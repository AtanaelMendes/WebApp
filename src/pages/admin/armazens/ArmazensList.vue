<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Armazéns" searchable navigation_type="menu" @search_changed="listBySearch">
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

    <div class="row space-end" >
      <div class="col-12" v-if="armazens">

        <q-list no-border inset-separator highlight>
          <q-item v-for="armazem in armazens" :key="armazem.nome">

            <q-item-side icon="location_city"/>
            <q-item-main>

              <q-item-tile>
                {{armazem.nome}}
              </q-item-tile>

              <q-item-tile sublabel>
                {{armazem.endereco}}
              </q-item-tile>
            </q-item-main>

            <q-item-side>
              <q-btn @click.prevent.stop round flat dense icon="more_vert">
                <q-popover>
                  <q-list link>
                    <q-item v-close-overlay @click.native="editArmazem(armazem.id)">
                      <q-item-main label="Editar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="archiveArmazem(armazem.id)" v-if="!armazem.deleted_at">
                      <q-item-main label="Arquivar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="restoreArmazem(armazem.id)" v-if="armazem.deleted_at">
                      <q-item-main label="Ativar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="deleteArmazem(armazem.id)">
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
      <q-btn round color="deep-orange" @click="addArmazem" icon="add" size="20px" />
    </q-page-sticky>

    <add-armazem-modal ref="addArmazemModal"/>
    <edit-armazem-modal ref="editArmazemModal"/>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import apNoResults from 'components/ApNoResults'
  import addArmazemModal from 'components/armazem/AddArmazemModal'
  import editArmazemModal from 'components/armazem/EditArmazemModal'
  import ArmazemService from "assets/js/service/armazem/ArmazemService";
  export default {
    name: "armazens-list",
    components: {
      apNoResults,
      toolbar,
      addArmazemModal,
      editArmazemModal,
      customPage
    },
    data () {
      return {
        armazemService: new ArmazemService(),
        armazens: [],
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
          this.listArmazens(filter)
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
      listArmazens: function(filter) {
        this.$q.loading.show();
        this.armazemService.listArmazens(filter).then(armazens => {
          this.armazens = armazens;
          this.isEmptyList = this.armazens.length === 0;
          this.$q.loading.hide();
        }).catch(error => {
          console.log(error);
          this.$q.notify({type: 'negative', message: 'Não foi possível carregar as informações.'});
          this.$q.loading.hide();
        });
      },
      viewArmazem: function(id) {
        this.$router.push({name: 'view_armazem', params: {id:id}});
      },
      addArmazem: function(){
        this.$refs.addArmazemModal.openModal()
      },
      editArmazem: function(id){
        this.$refs.editArmazemModal.openModal(id);
      },
      archiveArmazem: function(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja arquivar o armazém?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.$q.loading.show();
          this.armazemService.archiveArmazem(id).then(() =>{
            this.$q.notify({type: 'positive', message: 'Armazém arquivado com sucesso.'});
            this.listArmazens(this.filter);
            this.$q.loading.hide();
          }).catch(error =>{
            console.log(error);
            this.$q.notify({type: 'negative', message: 'Não foi possível arquivar esse armazém.'});
            this.$q.loading.hide();
          })
        });

      },
      restoreArmazem: function(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja resturar esse armazém?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.$q.loading.show();
          this.armazemService.restoreArmazem(id).then(response =>{
            this.$q.notify({type: 'positive', message: 'Armazém ativado com sucesso.'});
            this.listArmazens(this.filter);
            this.$q.loading.hide();
          }).catch(error =>{
            console.log(error);
            this.$q.loading.hide();
            this.$q.notify({type: 'negative', message: 'Não foi possível restaurar esse armazém.'});
          })
        });

      },
      deleteArmazem: function(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir este armazém?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.$q.loading.show();
          this.armazemService.deleteArmazem(id).then(() => {
            this.$q.notify({type: 'positive', message: 'Armazém excluido com sucesso.'});
            this.listArmazens(this.filter);
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
      this.listArmazens(this.filter);
      this.$root.$on('refreshArmazensList', () => {
        this.listArmazens(this.filter);
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
