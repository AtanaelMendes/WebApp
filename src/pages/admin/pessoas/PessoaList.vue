<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Pessoas" searchable navigation_type="menu" @search_changed="listBySearch">
      <template slot="action_itens">
        <q-btn flat round dense icon="tune" >
          <q-popover anchor="bottom left">
            <q-list>
              <q-list-header>Filtrar por:</q-list-header>
              <q-item dense>
                <q-item-main>
                  <q-option-group type="radio" color="primary"v-model="filter.type"
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

    <div class="space-end row">
      <div class="col-12">
        <q-list separator link highlight no-border  v-if="!isEmptyList">

          <q-item sparse multiline @click.native="viewPessoa(pessoa.id)" v-for="(pessoa, key) in pessoas" :key="key">
            <q-item-main >
              <q-item-tile>
                {{pessoa.nome}}
                <q-chip v-if="pessoa.deleted_at" small square color="red">
                  INATIVO
                </q-chip>
              </q-item-tile>
            </q-item-main>

            <q-item-side right>
              <q-item-tile stamp>{{ moment(pessoa.created_at).format('DD MMMM YYYY') }}</q-item-tile>
              <q-item-tile v-if="pessoa.deleted_at" stamp>{{ moment(pessoa.deleted_at).format('DD MMMM YYYY') }}</q-item-tile>
            </q-item-side>
          </q-item>
        </q-list>

        <div v-if="isEmptyList" class="no-result">
          <sem-resultados />
        </div>

      </div>
    </div>

    <div slot="fab-container">
      <q-btn round color="deep-orange" @click="addPessoa" icon="add" size="20px" />
    </div>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import pessoaService from 'assets/js/service/PessoaService'
  import semResultados from 'components/SemResultados'

  export default {
    name: "PessoasList",
    components: {
      semResultados,
      toolbar,
      customPage
    },
    data () {
      return {
        pessoas: [],
        isEmptyList: false,
        filter: {
          type: 'non-trashed',
          email: '',
        },
      }
    },
    watch: {
      filter: {
        handler: function(val, oldval) {
          var filter = {type: val.type, email:(val.email.length > 2 ? val.email : '')};
          this.list(filter)
        },
        deep: true,
      }
    },
    methods: {
      listBySearch: function(val){
        this.filter.email = val;
      },
      list: function(filter) {
        pessoaService.listPessoas(filter).then(response => {
          this.pessoas = response.data;
          this.isEmptyList = this.pessoas.length === 0;
        });
      },
      viewPessoa: function(id) {
        this.$router.push({name: 'view_pessoa', params: {id:id}});
      },
      addPessoa: function(){
        this.$router.push({name: 'add_pessoa'});
      },
    },
    mounted () {
      this.list(this.filter);

      this.$root.$on('refreshPessoaList', () => {
        this.list(this.filter);
      });
    },
  }
</script>

<style scoped>
  .space-end{
    margin-bottom: 150px;
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
