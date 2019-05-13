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

    <div class="space-end row">
      <div class="col-12">
        <q-list separator link no-border  sparse v-if="!isEmptyList">

          <q-item @click.native="viewPessoa(pessoa.id)" v-for="(pessoa, key) in pessoas" :key="key">
            <q-item-main>
              <q-item-tile>
                {{pessoa.nome}}
                <q-chip v-if="pessoa.deleted_at" dense color="negative" pointing="left">
                  Inativo
                </q-chip>
              </q-item-tile>
              <q-item-tile sublabel v-if="pessoa.cpf">
                {{formatCPF(pessoa.cpf)}}
              </q-item-tile>
              <q-item-tile sublabel v-if="pessoa.cnpj">
                {{formatCNPJ(pessoa.cnpj)}}
              </q-item-tile>
            </q-item-main>

            <q-item-side right>
              <q-item-tile stamp>{{ moment(pessoa.created_at).format('DD MMMM YYYY') }}</q-item-tile>
              <q-item-tile v-if="pessoa.deleted_at" stamp>{{ moment(pessoa.deleted_at).format('DD MMMM YYYY') }}</q-item-tile>
            </q-item-side>
          </q-item>
        </q-list>

        <div v-if="isEmptyList" class="no-result">
          <ap-no-results />
        </div>

      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[35, 35]">
      <q-btn round color="deep-orange" @click="addPessoa" icon="add" size="20px" />
    </q-page-sticky>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import apNoResults from 'components/ApNoResults'
  import PessoaService from "../../../assets/js/service/PessoaService";

  export default {
    name: "PessoasList",
    components: {
      apNoResults,
      toolbar,
      customPage
    },
    data () {
      return {
        pessoaService: new PessoaService(),
        pessoas: [],
        isEmptyList: false,
        filter: {
          type: 'non-trashed',
          search: '',
        },
      }
    },
    watch: {
      filter: {
        handler: function(val, oldval) {
          var filter = {type: val.type, search:(val.search.length > 2 ? val.search : '')};
          this.list(filter)
        },
        deep: true,
      }
    },
    methods: {
      listBySearch: function(val){
        // let regex = /[^a-z0-9]/gi;
        // this.filter.search = val.replace(regex, '');
        this.filter.search = val;
      },
      formatCPF(cpf){
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      },
      formatCNPJ(cnpj){
        return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
      },
      list: function(filter) {
        this.$q.loading.show();
        this.pessoaService.listPessoas(filter).then(pessoas => {
          this.pessoas = pessoas;
          this.isEmptyList = this.pessoas.length === 0;
          this.$q.loading.hide();
        }).catch(error =>{
          this.$q.notify({type: 'negative', message: 'Não foi possível carrgar as informações'})
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
