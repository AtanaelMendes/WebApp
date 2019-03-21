<template>
  <q-modal key="addArmazem" v-model="isModalOpened" maximized @hide="closeModal">

    <div class="row justify-center items-center q-px-md" style="min-height: 80vh">

      <div class="col-12 text-center q-display-1">
        Novo Armazém
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" @keyup.enter="addArmazem()">

        <q-field class="q-mb-sm" :error="armazem.nome.error" :error-label="armazem.nome.errorMessage">
          <q-input v-model="armazem.nome.value" float-label="Nome" @input="clearErrorMessage()"/>
        </q-field>

        <q-field class="q-mb-sm" :error="armazem.localizacaoId.error" :error-label="armazem.localizacaoId.errorMessage">
          <q-select :options="localizacaoOptions" float-label="Localização" v-model="armazem.localizacaoId.value" @input="clearErrorMessage()"/>
        </q-field>

      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
      <q-btn label="salvar" color="primary" @click="addArmazem"/>
    </q-page-sticky>

  </q-modal>
</template>
<script>
  import localizacaoSelect from 'components/LocalizacaoSelect.vue'
  import ArmazemService from "assets/js/service/armazem/ArmazemService";
  import LocalizacaoService from "assets/js/service/localizacao/LocalizacaoService";
  export default {
    name: "add-armazem-modal",
    components:{
      localizacaoSelect,
    },
    data () {
      return {
        isModalOpened: false,
        armazemService: new ArmazemService(),
        localizacaoService: new LocalizacaoService(),
        localizacaoOptions: [],
        armazem: {
          nome: {
            value: null,
            error: false,
            errorMessage: null
          },
          localizacaoId: {
            value: null,
            error: false,
            errorMessage: null
          }
        },
      }
    },
    methods: {
      openModal: function(){
        this.isModalOpened = true;
        this.listLocalizacao();
      },
      closeModal: function(){
        this.isModalOpened = false;
      },
      clearFields: function(){
        this.armazem.nome.value = null;
        this.armazem.nome.error = false;
        this.armazem.nome.errorMessage = null;
        this.armazem.localizacaoId.value = null;
        this.armazem.localizacaoId.error = false;
        this.armazem.localizacaoId.errorMessage = null;
      },
      listLocalizacao: function(){
        this.$q.loading.show();
        this.localizacaoService.listLocalizacoes().then(response => {
          this.localizacaoOptions = response.map(local => {
            return {
              value: local.id,
              label: local.endereco +', '+ local.numero,
              sublabel: local.bairro +', '+ local.cidade.nome +'-'+ local.cidade.estado.sigla
            };
          });
          this.$q.loading.hide();
        })
      },
      formIsValid: function(){
        if(this.armazem.nome.value === null || this.armazem.nome.value === ''){
          this.armazem.nome.error = true;
          this.armazem.nome.errorMessage = 'informe o nome do armazém';
          return false
        }
        if( this.armazem.nome.value != null){
          if(this.armazem.nome.value.length < 3){
            this.armazem.nome.error = true;
            this.armazem.nome.errorMessage = 'nome muito curto min 3 caracteres';
            return false
          }
        }
        if(this.armazem.localizacaoId.value === null || this.armazem.localizacaoId.value === ''){
          this.armazem.localizacaoId.error = true;
          this.armazem.localizacaoId.errorMessage = 'informe a localização';
          return false
        }
        return true
      },
      clearErrorMessage: function(){
        this.armazem.nome.errorMessage = null;
        this.armazem.nome.error = false;
        this.armazem.localizacaoId.errorMessage = null;
        this.armazem.localizacaoId.error = false;
      },
      addArmazem: function(){
        if( !this.formIsValid() ){
          return
        }
        let params = {
          nome: this.armazem.nome.value,
          localizacao_id: this.armazem.localizacaoId.value,
        };
        this.$q.loading.show();
        this.armazemService.addArmazem(params).then(() => {
          this.$q.notify({type: 'positive', message: 'Armazém adicionado com sucesso.'});
          this.$q.loading.hide();
          this.$root.$emit('refreshArmazensList');
          this.clearFields();
          this.closeModal();
        }).catch(error =>{
          console.log(error);
          this.$q.loading.show();
          this.$q.notify({type: 'negative', message: 'Não foi possível adicionar o armazém'})
        })
      },
    },
  }
</script>
<style scoped>
</style>
