<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Classificação" searchable navigation_type="back" @navigation_clicked="backAction">

    </toolbar>

    <div class="row space-end" v-if="classificacao">
      <div class="col-12 q-headline q-pa-md">
        {{classificacao.nome}}
      </div>

      <div class="col-12" v-if="!isEmptyList">
        <q-list no-border highlight inset-separator>

          <q-item>
            <q-item-main inset class="row">
              <div class="col-6 text-bold	text-faded">Cultura</div>
              <div class="col-6 text-bold	text-faded">Tolerância</div>
            </q-item-main>
            <q-item-side/>
          </q-item>

          <q-item v-for="cultura in culturasClassificacao" :key="cultura.nome">

            <q-item-side icon="spa" color="positive"/>
            <q-item-main class="row">
              <div class="col-6">{{cultura.cultura}}</div>
              <div class="col-6">{{cultura.tolerancia}}%</div>
            </q-item-main>
            <q-item-side>
              <q-btn @click.prevent.stop round flat dense icon="more_vert">
                <q-popover>
                  <q-list link>
                    <q-item v-close-overlay @click.native="editCulturaClassificacao(cultura.id)">
                      <q-item-main label="Editar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="deleteCulturaClassificacao(cultura.id)">
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

    <edit-cultura-classificacao-modal ref="editCulturaClassificacaoModal" key="editCulturaClassificacaoModal"/>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import apNoResults from 'components/ApNoResults'
  import ClassificacaoService from "assets/js/service/ClassificacaoService"
  import CulturaClassificacaoService from "assets/js/service/cultura/CulturaClassificacaoService";
  import addCulturaClassificacaoModal from 'components/classificacao/AddCulturaClassificacaoModal'
  import editCulturaClassificacaoModal from 'components/classificacao/EditCulturaClassificacaoModal'
  export default {
    name: "classificacao-view",
    components: {
      toolbar,
      customPage,
      apNoResults,
      addCulturaClassificacaoModal,
      editCulturaClassificacaoModal,
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
      editCulturaClassificacao: function(culturaClassificacaoId){
        this.$refs.editCulturaClassificacaoModal.openModal(culturaClassificacaoId)
      },
      deleteCulturaClassificacao: function(culturaClassificacaoId){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir esta cultura classificação?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.$q.loading.show();
          this.culturaClassificacaoService.deleteCulturaClassificacao(culturaClassificacaoId).then(response => {
            this.$q.loading.hide();
            this.getCulturasClassificacao(this.$route.params.id);
            this.$q.notify({type: 'positive', message: 'Cultura classificação excluída com sucesso.'});
          }).catch(error =>{
            this.$q.loading.hide();
            this.$q.notify({type: 'negative', message: 'Não foi possível excluir essa cultura classificação'});
          })
        })
      },
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
