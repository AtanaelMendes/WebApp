<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction" title="Editar localizacao">
      <q-btn slot="action_itens" flat dense icon="done" round @click="updateLocalizacao()"/>
    </toolbar>

    <q-scroll-area style="height: 200vh" :thumb-style="{
        right: '4px',
        borderRadius: '5px',
        background: '#dfdfdf',
        width: '8px',
        opacity: 1}">

      <div class="row q-pa-md gutter-md">
        <div class="col-xs-12 col-md-6 col-lg-6">

          <!--TOGGLE FISCAL COBRANCA-->
          <div class="row">
            <div class="col-6">
              <q-toggle color="deep-orange" label="Fiscal"  v-model="localizacao.isFiscal.value"/>
            </div>
            <div class="col-6">
              <q-toggle color="deep-orange" label="Cobrança"  v-model="localizacao.isCobranca.value"/>
            </div>
            <div class="q-field-bottom row no-wrap">
              <div class="q-field-error text-negative" v-if="typeError" >
                {{typeError}}
              </div>
            </div>
          </div>
          <!-- FIM TOGGLE FISCAL COBRANCA-->

          <form>
            <!--CEP-->
            <custom-input-text type="text" label="CEP" mask="#####-###"
                               :model="localizacao.cep" @blur="getLocationByCEP" :loading="isLoadingAddress"/>

            <!--CIDADE-->
            <cidade-autocomplete label="Cidade" @input="selected" :model="localizacao.cidadeId" :terms="cidadeTerms"/>

            <!--ENDERECO-->
            <custom-input-text type="text" label="Endereço" :model="localizacao.endereco" />

            <!--NUMERO-->
            <custom-input-text type="number" label="numero" :model="localizacao.numero" />

            <!--COMPLEMENTO-->
            <custom-input-text type="text" label="Complemento" :model="localizacao.complemento" />

            <!--BAIRRO-->
            <custom-input-text type="text" label="Bairro" :model="localizacao.bairro" />

          </form>

        </div>
      </div>

    </q-scroll-area>
  </custom-page>
</template>
<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import cidadeAutocomplete from 'components/CidadeAutocomplete.vue'
  import Localizacao from 'assets/js/model/localizacao/Localizacao'
  import localizacaoService from 'assets/js/service/localizacao/LocalizacaoService'
  export default {
    name: "localizacao-update",
    components: {
      toolbar,
      customPage,
      cidadeAutocomplete,
      customInputText,
    },
    data(){
      return {
        cidadeTerms: null,
        isLoadingAddress: false,
        typeError: null,
        localizacao: new Localizacao(),
      }
    },
    watch: {
      localizacao:{
        handler: function (val) {
          console.log(this.localizacao.cidadeId)
        },
        deep: true
      }
    },
    methods:{
      selected: function(value = null){
        this.localizacao.cidadeId.value = value.id;
      },
      fillForm: function(data){
        this.cidadeTerms = data.cidade.nome

        this.localizacao.cidadeId.value = data.cidade_id
        this.localizacao.isCobranca.value = data.is_cobranca
        this.localizacao.isFiscal.value = data.is_fiscal
        this.localizacao.endereco.value = data.endereco
        this.localizacao.numero.value = data.numero
        this.localizacao.complemento.value = data.complemento
        this.localizacao.bairro.value = data.bairro
        this.localizacao.cep.value = data.cep
      },
      getLocalizacao: function(){
        let pessoaId = this.$route.params.id
        let localizacaoId = this.$route.params.localizacaoId
        localizacaoService.getLocalizacao(pessoaId, localizacaoId).then(response => {
          this.fillForm(response.data)
        });
      },
      updateLocalizacao: function(){
        let pessoaId = this.$route.params.id
        let localizacaoId = this.$route.params.localizacaoId
        if(this.localizacao.isFiscal.value == false && this.localizacao.isCobranca.value == false){
          this.typeError = 'Escolha ao menos um tipo de endereço'
          return
        }else{
          this.typeError = null
        }
        if(!this.localizacao.isValid()){
          return
        }
        localizacaoService.updateLocalizacao(pessoaId, localizacaoId, this.localizacao.getValues()).then( response => {
          this.$q.notify({type: 'positive', message: 'Localizacão atualizada com sucesso'})
          this.$router.go(-1);
        }).catch(error => {
          this.$q.notify({type: 'negative', message: error})
        })
      },
      getLocationByCEP: function(cep){
        this.isLoadingAddress = true;
        localizacaoService.getAddressByCEP(cep).then(address => {
          this.localizacao.endereco.value = address.endereco;
          this.localizacao.bairro.value = address.bairro;
          this.localizacao.cidadeId.value = address.cidade.id;
          this.cidadeTerms = address.cidade.nome;

          this.isLoadingAddress = false;
        }).catch(() => {
          this.isLoadingAddress = false;
        })
      },
      backAction: function () {
        this.$router.go(-1);
      }
    },
    mounted(){
      this.getLocalizacao()
    }
  }
</script>

<style>
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
