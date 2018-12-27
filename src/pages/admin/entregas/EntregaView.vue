<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Entregas" navigation_type="menu" >'
    </toolbar>

    <div class="row gutter-sm space-end q-ma-lg"></div>

    <!--EMPTY LIST-->
    <div class="column q-ma-xl items-center">
      <div class="col-6">
        <img src="assets/images/sad_2.svg" class="responsive"/>
      </div>
      <div class="col-6 text-justify">
        <span>Nenhum resultado encontrado.</span>
      </div>
    </div>

    <!--PAGE STICKY BUTTOMS-->
    <q-page-sticky position="bottom-right" :offset="[35, 35]">
      <q-fab icon="add" direction="up" color="deep-orange" class="custom-fab" >
        <q-fab-action color="grey-1" text-color="grey-7" icon="add" @click="attachCultura()">
          <span class="shadow-2">Cultura</span>
        </q-fab-action>
        <q-fab-action color="grey-1" text-color="grey-7" @click="attachTitulo()" icon="add">
          <span class="shadow-2">Título</span>
        </q-fab-action>
        <q-fab-action color="grey-1" text-color="grey-7" @click="attachProduto()" icon="add">
          <span class="shadow-2">Produto</span>
        </q-fab-action>
        <q-fab-action color="grey-1" text-color="grey-7" @click="attachFixacao()" icon="add">
          <span class="shadow-2">Fixação</span>
        </q-fab-action>
      </q-fab>
    </q-page-sticky>

  </custom-page>
</template>
<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import customInputDatetime from 'components/CustomInputDateTime.vue'
  import Cultura from 'assets/js/model/negocio/Cultura'
  import Titulo from 'assets/js/model/negocio/Titulo'
  import Produto from 'assets/js/model/negocio/Produto'
  import Fixacao from 'assets/js/model/negocio/Fixacao'
  import negocioService from 'assets/js/service/negocio/NegocioService'
  import unidadeMedidaService from 'assets/js/service/UnidadeMedidaService'
  import safraCulturaService from 'assets/js/service/safra/SafraCulturaService'
  import culturaClassificacaoService from 'assets/js/service/cultura/CulturaClassificacaoService'
  import armazemService from 'assets/js/service/localizacao/ArmazemService'
  export default {
    name: "negocio-view",
    components: {
      toolbar,
      customPage,
      customInputText,
      customInputDatetime
    },
    data () {
      return {
        titulo: new Titulo(),
        unidadesMedida: [],
      }
    },
    watch: {
    },
    computed: {
      totalBrutoUn: function () {
        if (this.fixacao.quantidade.value != 0) {
          this.fixacao.totalBruto.value = (this.fixacao.quantidade.value * this.fixacao.preco.value);
          return this.fixacao.totalBruto.value / this.fixacao.quantidade.value;
        }
        return null;
      },
    },
    methods: {
      attachTitulo: function(){
        this.modalAttachTitulo = true;
      },
      isNextTituloStep: function(){
        if(this.titulo.isPagar.value == null && this.currentStepTitulo == 'pagarReceber'){
          return true
        }
        if(this.titulo.moedaId.value == null && this.currentStepTitulo == 'moeda'){
          return true
        }
        if(this.titulo.valor.value == null && this.currentStepTitulo == 'valor'){
          return true
        }
        if((this.numParcelas == null || this.numParcelas == 0) && this.currentStepTitulo == 'parcelas'){
          return true
        }
        if(this.currentStepTitulo == 'vencimentos'){
          this.generateFormParcelas()
        }
        return false;
      },
      saveAttachTitulo: function(){
        this.titulo.parcelas = this.verifyParcelas;
        negocioService.saveAttachTitulo(this.titulo.getValues()).then(response => {
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Título vinculado com sucesso'});
            this.closeModal();
            this.$router.go(-1);
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });
      },
      delete1: function(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esta Negocio?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          negocioService.deleteNegocio(id).then(response => {
            this.listCulturas()
          })
        }).catch(()=>{});
      },
      getUnidadesMedida:function(){
        unidadeMedidaService.listUnidadesMedida().then(response => {
          this.unidadesMedida = response.data;
        })
      },
      parsedUnidades: function(unidades){
        return unidades.map(unidade => {
          return {
            label: unidade.nome,
            value: unidade.id
          }
        })
      },
    },
    mounted () {
      // this.$root.$on('refreshSafraList', () => {
      //   this.listSafras();
      // });
    },
  }
  // this.$q.notify({type: 'negative', message: 'aqui'})

</script>
<style>
  .space-end{
    margin-bottom: 200px;
  }
  .custom-fab .q-fab-actions .q-btn  span{
    position: absolute;
    background: white;
    right: 46px;
    border-radius: 6px;
    padding: 7px 10px;
  }
</style>
