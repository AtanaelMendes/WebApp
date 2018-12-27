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
        <q-fab-action color="grey-1" text-color="grey-7" icon="add" @click="novaCarga()">
          <span class="shadow-2">Nova Carga</span>
        </q-fab-action>
      </q-fab>
    </q-page-sticky>

    <!--MODAL NOVA CARGA -->
    <new-carga-modal ref="cargaModal"/>

  </custom-page>
</template>
<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import customInputDatetime from 'components/CustomInputDateTime.vue'
  import NewCargaModal from 'components/entrega/NewCargaModal'
  import Titulo from 'assets/js/model/negocio/Titulo'
  export default {
    name: "entregas",
    components: {
      toolbar,
      customPage,
      customInputText,
      customInputDatetime,
      NewCargaModal
    },
    data () {
      return {
        titulo: new Titulo(),
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
      novaCarga: function(){
        this.$refs.cargaModal.openModal()
      },
      closeModalNovaCarga: function(){
        this.modalNovaCarga = false;
      },
      saveNovaCarga: function(){
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
