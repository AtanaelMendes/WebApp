<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Editar caminhão" navigation_type="back" @navigation_clicked="backAction">
    </toolbar>

    <div class="row q-pa-md">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
        <form @keyup.enter="addCaminhao()">

          <q-field class="q-mb-sm" :error="caminhao.nome.errorMessage" :error-label="caminhao.nome.errorMessage">
            <q-input v-model="caminhao.nome.value" float-label="Nome" @input="clearErrorMessage()"/>
          </q-field>

          <q-field class="q-mb-sm" :error="caminhao.placa.errorMessage" :error-label="caminhao.placa.errorMessage">
            <q-input upper-case	 v-model="caminhao.placa.value" float-label="Placa" @input="clearErrorMessage()"/>
          </q-field>

          <q-field class="q-mb-sm">
            <q-input v-model="caminhao.tara" float-label="Tara" type="number"/>
          </q-field>

          <q-field class="q-mb-sm">
            <q-input v-model="caminhao.lotacao" float-label="Lotação" type="number"/>
          </q-field>

          <q-field class="q-mb-sm" :error="caminhao.unidadeMedidaSigla.errorMessage" :error-label="caminhao.unidadeMedidaSigla.errorMessage">
            <q-select v-model="caminhao.unidadeMedidaSigla.value" float-label="Unidade medida" :options="unidadeMedidaOptions" @input="clearErrorMessage()"/>
          </q-field>

        </form>
      </div>
    </div>

    <div class="row q-pa-md">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4" align="end">
        <q-btn label="Salvar" color="primary" @click.native="addCaminhao()"/>
      </div>
    </div>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import caminhaoService from 'assets/js/service/CaminhaoService'
  import unidadeMedidaService from 'assets/js/service/UnidadeMedidaService'
  export default {
    name: "caminhoes-add",
    components: {
      toolbar,
      customPage
    },
    data () {
      return {
        unidadeMedidaOptions: [],
        caminhao: {
          nome: {
            value: null,
            errorMessage: null
          },
          placa: {
            value: null,
            errorMessage: null
          },
          tara: null,
          lotacao: null,
          unidadeMedidaSigla: {
            value: null,
            errorMessage: null,
          },
        },
      }
    },
    methods: {
      selectUnidadeMedida: function(){
        unidadeMedidaService.listUnidadesMedida().then(response => {
          this.unidadeMedidaOptions = this.parsedUnidades(response.data)
        })
      },
      parsedUnidades: function(unidades){
        return unidades.map(unidade => {
          return {
            label: unidade.nome + ', ' + unidade.sigla,
            value: unidade.id
          }
        })
      },
      nomeIsValid: function(){
        if(this.caminhao.nome.value === null || this.caminhao.nome.value === ''){
          this.caminhao.nome.errorMessage = 'informe o nome do caminhão';
          return false
        }
        if( this.caminhao.nome.value != null){
          if(this.caminhao.nome.value.length < 3){
            this.caminhao.nome.errorMessage = 'nome muito curto';
            return false
          }
        }
        return true
      },
      placaIsValid: function(){
        if(this.caminhao.placa.value === null || this.caminhao.placa.value === ''){
          this.caminhao.placa.errorMessage = 'informe a placa do caminhão';
          return false
        }
        if(this.caminhao.placa.value != null){
          if(this.caminhao.placa.value.length < 7){
            this.caminhao.placa.errorMessage = 'a placa é invalida';
            return false
          }
        }
        return true
      },
      isUnidadeMedidaRequired: function(){
        if(this.caminhao.tara != null || this.caminhao.lotacao != null){
          this.caminhao.unidadeMedidaSigla.errorMessage = 'informe a unidade de medida'
          return false
        }
      },
      clearErrorMessage: function(){
        this.caminhao.nome.errorMessage = null;
        this.caminhao.placa.errorMessage = null;
        this.caminhao.unidadeMedidaSigla.errorMessage = null;
      },
      addCaminhao: function(){
        if(!this.nomeIsValid() || !this.placaIsValid() || !this.isUnidadeMedidaRequired()){
          return
        }
        caminhaoService.addCaminhao(this.caminhao).then(response => {
          this.$q.notify({type: 'positive', message: 'Caminhão adicionado com sucesso.'});
          this.backAction();
        }).catch(error =>{
          this.$q.notify({type: 'negative', message: 'Não foi possível adicionar o caminhão'})
        })
      },
      backAction: function () {
        this.$router.back();
      },
    },
    mounted () {
      this.selectUnidadeMedida();
    },
  }
</script>

<style scoped>
</style>
