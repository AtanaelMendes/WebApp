<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Novo caminhão" navigation_type="back" @navigation_clicked="backAction">
    </toolbar>

    <div class="row q-pa-md">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
        <form @keyup.enter="addCaminhao()">

          <q-field class="q-mb-sm" :error="caminhao.nome.error" :error-label="caminhao.nome.errorMessage">
            <q-input v-model="caminhao.nome.value" float-label="Nome" @input="clearErrorMessage()"/>
          </q-field>

          <q-field class="q-mb-sm" :error="caminhao.placa.error" :error-label="caminhao.placa.errorMessage">
            <q-input upper-case	 v-model="caminhao.placa.value" float-label="Placa" @input="clearErrorMessage()"/>
          </q-field>

          <q-field class="q-mb-sm">
            <q-input v-model="caminhao.tara" float-label="Tara" type="number"/>
          </q-field>

          <q-field class="q-mb-sm">
            <q-input v-model="caminhao.pesoBruto" float-label="Peso bruto total" type="number"/>
          </q-field>

          <q-field class="q-mb-sm">
            <q-input v-model="caminhao.estimativaCarga" float-label="Estimativa da carga" type="number"/>
          </q-field>

          <q-field class="q-mb-sm" :error="caminhao.unidadeMedidaSigla.error" :error-label="caminhao.unidadeMedidaSigla.errorMessage">
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
  import CaminhaoService from "../../../assets/js/service/CaminhaoService";
  import AccountRepository from "../../../assets/js/repository/AccountRepository";
  import UnidadeMedidaService from "../../../assets/js/service/UnidadeMedidaService";
  export default {
    name: "caminhoes-add",
    components: {
      toolbar,
      customPage
    },
    data () {
      return {
        caminhaoService: null,
        unidadeMedidaService: new UnidadeMedidaService(),
        unidadeMedidaOptions: [],
        caminhao: {
          nome: {
            value: null,
            error: false,
            errorMessage: null
          },
          placa: {
            value: null,
            error: false,
            errorMessage: null
          },
          tara: null,
          pesoBruto: null,
          estimativaCarga: null,
          unidadeMedidaSigla: {
            value: null,
            error: false,
            errorMessage: null,
          },
        },
      }
    },
    methods: {
      selectUnidadeMedida: function(){
        this.unidadeMedidaService.listUnidadesMedida().then(unidades => {
          this.unidadeMedidaOptions = this.parsedUnidades(unidades)
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
          this.caminhao.nome.error = true;
          this.caminhao.nome.errorMessage = 'informe o nome do caminhão';
          return false
        }
        if( this.caminhao.nome.value != null){
          if(this.caminhao.nome.value.length < 3){
            this.caminhao.nome.error = true;
            this.caminhao.nome.errorMessage = 'nome muito curto';
            return false
          }
        }
        return true
      },
      placaIsValid: function(){
        if(this.caminhao.placa.value === null || this.caminhao.placa.value === ''){
          this.caminhao.placa.error = true;
          this.caminhao.placa.errorMessage = 'informe a placa do caminhão';
          return false
        }
        if(this.caminhao.placa.value != null){
          if(this.caminhao.placa.value.length < 7){
            this.caminhao.placa.error = true;
            this.caminhao.placa.errorMessage = 'a placa é invalida';
            return false
          }
        }
        return true
      },
      isUnidadeMedidaRequired: function(){
        if(this.caminhao.tara != null || this.caminhao.pesoBruto != null || this.caminhao.estimativaCarga != null){
          if(this.caminhao.unidadeMedidaSigla.value === null || this.caminhao.unidadeMedidaSigla.value === undefined){
            this.caminhao.unidadeMedidaSigla.error = true;
            this.caminhao.unidadeMedidaSigla.errorMessage = 'informe a unidade de medida';
            return false
          }
        }
        return true
      },
      clearErrorMessage: function(){
        this.caminhao.nome.errorMessage = null;
        this.caminhao.nome.error = false;
        this.caminhao.placa.errorMessage = null;
        this.caminhao.placa.error = false;
        this.caminhao.unidadeMedidaSigla.error = false;
        this.caminhao.unidadeMedidaSigla.errorMessage = null;
      },
      addCaminhao: function(){
        if(!this.nomeIsValid() || !this.placaIsValid() || !this.isUnidadeMedidaRequired()){
          return
        }
        let params = {
          nome: this.caminhao.nome.value,
          placa: this.caminhao.placa.value,
          tara: this.caminhao.tara,
          pbt: this.caminhao.pesoBruto,
          estimativa_carga: this.caminhao.estimativaCarga,
          unidade_medida_id: this.caminhao.unidadeMedidaSigla.value

        };
        this.caminhaoService.addCaminhao(params).then(() => {
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
      new AccountRepository().getFirst().then(account => {
        this.caminhaoService = new CaminhaoService(account.produtor_id)
      });

      this.selectUnidadeMedida();
    },
  }
</script>

<style scoped>
</style>
