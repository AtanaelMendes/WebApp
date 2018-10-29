<template>
  <custom-page widthInner="60%" isParent >
    <toolbar slot="toolbar" title="Áreas" searchable navigation_type="menu" @search_changed="listBySearch">
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

    <q-list highlight inset-separator no-border v-if="loaded">
      <q-item v-for="farmer in 10" :key="farmer" @click.native="selectArea()">
        <q-item-side icon="account_circle"/>
        <q-item-main>
          LISTA DE AREAS
        </q-item-main>
      </q-item>
    </q-list>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  export default {
    name: "AreasList",
    components: {
      toolbar,
      customPage
    },
    data () {
      return {
        areaLoaded: false,
        filter: {
          type: 'non-trashed',
        },
      }
    },
    watch: {
      filter: {
        handler: function(val, oldval) {
          // var filter = {type: val.type, email:(val.email.length > 2 ? val.email : '')};
          // this.list(filter)
        },
        deep: true,
      }
    },
    methods: {
      selectArea: function() {
        this.areaLoaded = true
      },
      // list: function(filter) {
      //   pessoaService.listPessoas(filter).then(response => {
      //     this.pessoas = response.data;
      //     this.isEmptyList = this.pessoas.length === 0;
      //   });
      // },

      // viewPessoa: function(id) {
      //   this.$router.push({name: 'view_pessoa', params: {id:id}});
      //   this.$router.push({name: 'add_pessoa'});
      // }
    },
    mounted () {
      this.loaded = true

      // this.$root.$on('refreshPessoaList', () => {
      //   this.list(this.filter);
      // });
    },
  }
</script>
<style>
</style>
