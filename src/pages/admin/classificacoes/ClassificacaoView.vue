<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Classificação" searchable navigation_type="back" @navigation_clicked="backAction">

    </toolbar>

    <div class="row q-pa-md space-end" v-if="classificacao">
      <div class="col-12 q-title">
        {{classificacao.nome}}
      </div>

      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6" v-if="!isEmptyList">
        <q-list no-border highlight inset-separator>
          <q-list-header>Culturas</q-list-header>
          <q-item v-for="cultura in culturasClassificacao" :key="cultura.nome">

            <q-item-side icon="spa"/>
            <q-item-main>
              <q-item-tile>
                {{cultura.cultura}}
              </q-item-tile>
              <q-item-tile sublabel>
                tolerância {{cultura.tolerancia}}%
              </q-item-tile>
            </q-item-main>
            <q-item-side>
              <q-btn @click.prevent.stop round flat dense icon="more_vert">
                <q-popover>
                  <q-list link>
                    <q-item v-close-overlay @click.native="editCulturaClassificacao(classificacao.id)">
                      <q-item-main label="Editar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="archiveCulturaClassificacao(classificacao.id)" v-if="!classificacao.deleted_at">
                      <q-item-main label="Arquivar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="restoreCulturaClassificacao(classificacao.id)" v-if="classificacao.deleted_at">
                      <q-item-main label="Ativar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="deleteCulturaClassificacao(classificacao.id)">
                      <q-item-main label="Excluir"/>
                    </q-item>
                  </q-list>
                </q-popover>
              </q-btn>
            </q-item-side>
          </q-item>

          <q-item/>
        </q-list>
      </div>

      <div v-if="isEmptyList" class="no-result col-12">
        <ap-no-results />
      </div>

    </div>

    <q-page-sticky position="bottom-right" :offset="[35, 35]">
      <q-btn round color="deep-orange" @click="addCulturaClassificacao" icon="add" size="20px" />
    </q-page-sticky>

    <add-cultura-classificacao-modal ref="addCulturaClassificacaoModal" key="addCulturaClassificacaoModal"/>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import apNoResults from 'components/ApNoResults'
  import ClassificacaoService from "assets/js/service/ClassificacaoService"
  import CulturaClassificacaoService from "assets/js/service/cultura/CulturaClassificacaoService";
  import addCulturaClassificacaoModal from 'components/classificacao/AddCulturaClassificacaoModal'
  export default {
    name: "classificacao-view",
    components: {
      toolbar,
      customPage,
      apNoResults,
      addCulturaClassificacaoModal,
    },
    data () {
      return {
        classificacaoService: new ClassificacaoService(),
        culturaClassificacaoService: new CulturaClassificacaoService(),
        classificacao: [],
        culturasClassificacao: [],
        isEmptyList: false,
      }
    },
    watch: {},
    computed: {},
    methods: {
      getClassificacaoById: function(classificacaoId) {
        this.$q.loading.show();
        this.classificacaoService.getClassificacaoById(classificacaoId).then(response => {
          this.$q.loading.hide();
          this.classificacao = response;
          // this.isEmptyList = this.classificacao.pessoas.length === 0;
        })
      },
      getCulturasClassificacao: function(classificacaoId){
        this.$q.loading.show();
        this.culturaClassificacaoService.getCulturasClassificacao(classificacaoId).then(response => {
          this.$q.loading.hide();
          this.culturasClassificacao = response;
        })
      },
      addCulturaClassificacao: function(){
        this.$refs.addCulturaClassificacaoModal.openModal()
      },
      editCulturaClassificacao: function(culturaClassificacaoId){},
      archiveCulturaClassificacao: function(culturaClassificacaoId){},
      restoreCulturaClassificacao: function(culturaClassificacaoId){},
      deleteCulturaClassificacao: function(culturaClassificacaoId){},
      backAction: function () {
        this.$router.back();
      },
    },
    mounted () {
      this.getClassificacaoById(this.$route.params.id);
      this.getCulturasClassificacao(this.$route.params.id);
      this.$root.$on('refreshCulturaClassificacaoView', () => {
        this.getCulturasClassificacao(this.$route.params.id);
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
