<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Grupo econômico" searchable navigation_type="back" @navigation_clicked="backAction">

    </toolbar>

    <div class="row q-pa-md space-end" v-if="grupoEconomico">
      <div class="col-12 q-title">
        {{grupoEconomico.nome}}
      </div>

      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6" v-if="!isEmptyList">
        <q-list no-border highlight inset-separator link>
          <q-list-header>Pessoas</q-list-header>
          <q-item v-for="pessoa in grupoEconomico.pessoas" :key="pessoa.nome" @click.native="viewPessoa(pessoa.id)">

            <q-item-side icon="account_circle"/>
            <q-item-main>
              <q-item-tile>
                {{pessoa.nome}}
              </q-item-tile>
              <q-item-tile sublabel>
                {{pessoa.razao_social}}
              </q-item-tile>
            </q-item-main>
          </q-item>

        </q-list>
      </div>

      <div v-if="isEmptyList" class="no-result col-12">
        <ap-no-results />
      </div>

    </div>



  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import apNoResults from 'components/ApNoResults'
  import GrupoEconomicoService from "assets/js/service/GrupoEconomicoService"
  export default {
    name: "grupos-economicos-list",
    components: {
      apNoResults,
      toolbar,
      customPage
    },
    data () {
      return {
        grupoEconomicoService: new GrupoEconomicoService(),
        grupoEconomico: [],
        isEmptyList: false,
      }
    },
    watch: {},
    computed: {},
    methods: {
      listPessoasOfGrupoEconomico: function(id) {
        this.$q.loading.show();
        this.grupoEconomicoService.listPessoasOfGrupoEconomico(id).then(response => {
          this.$q.loading.hide();
          this.grupoEconomico = response;
          this.isEmptyList = this.grupoEconomico.pessoas.length === 0;
        }).catch(error => {
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: 'Não foi possível carregar as informações.'});
        });
      },
      viewPessoa: function(id) {
        this.$router.push({name: 'view_pessoa', params: {id:id}});
      },
      backAction: function () {
        this.$router.back();
      },
    },
    mounted () {
      this.listPessoasOfGrupoEconomico(this.$route.params.id)
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
