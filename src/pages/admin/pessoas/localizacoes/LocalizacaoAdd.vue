<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction" title="Nova Localização">
      <q-btn slot="action_itens" flat dense round icon="done" @click="saveLocalizacao()"/>
    </toolbar>

    <q-scroll-area style="height: 150vh" :thumb-style="{
        right: '4px',
        borderRadius: '5px',
        background: '#dfdfdf',
        width: '8px',
        opacity: 1}">

      <div class="row q-pa-md gutter-md">
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">

          <!--TOGGLE FISCAL COBRANCA-->
          <div class="row q-mb-md">
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
                               :model="localizacao.cep" @blur="getLocationByCEP" :loading="isLoadingAddress" />

            <!--CIDADE-->
            <cidade-autocomplete label="Cidade" :model="localizacao.cidadeId" :terms="cidadeTerms" @input="selected"/>

            <!--ENDERECO-->
            <custom-input-text class="capitalize" type="text" label="Endereço" :model="localizacao.endereco" />

            <!--NUMERO-->
            <custom-input-text class="capitalize" label="numero" :model="localizacao.numero" />

            <!--COMPLEMENTO-->
            <custom-input-text class="capitalize" type="text" label="Complemento" :model="localizacao.complemento" />

            <!--BAIRRO-->
            <custom-input-text class="capitalize" type="text" label="Bairro" :model="localizacao.bairro" />

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
  import LocalizacaoService from "../../../../assets/js/service/localizacao/LocalizacaoService";

  export default {
    name: "localizacao-add",
    components: {
      toolbar,
      customPage,
      cidadeAutocomplete,
      customInputText
    },
    data(){
      return {
        localizacaoService: new LocalizacaoService(),
        typeError: null,
        localizacao: new Localizacao(),
        isLoadingAddress: false,
        cidadeTerms: '',
      }
    },
    methods:{
      selected: function(value = null){
        this.localizacao.cidadeId.value = value.id;
      },
      saveLocalizacao: function(){
        if(this.localizacao.isFiscal.value == false && this.localizacao.isCobranca.value == false){
          this.typeError = 'Escolha ao menos um tipo de endereço';
          return
        }else{
          this.typeError = null;
        }
        if(!this.localizacao.isValid()){
          return
        }
        this.$q.loading.show();
        this.localizacaoService.saveLocalizacao(this.$route.params.id, this.localizacao.getValues()).then( response => {
          this.$q.notify({type: 'positive', message: 'Localização criada com sucesso'});
          this.$router.back();
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.notify({type: 'negative', message: error.request.response});
          this.$q.loading.hide();
        })
      },
      getLocationByCEP: function(cep){
        this.isLoadingAddress = true;
        this.$q.loading.show();
        this.localizacaoService.getAddressByCEP(cep).then(address => {
          this.localizacao.endereco.value = address.endereco;
          this.localizacao.bairro.value = address.bairro;
          this.localizacao.cidadeId.value = address.cidade.id;
          this.cidadeTerms = address.cidade.nome;
          this.isLoadingAddress = false;
          this.$q.loading.hide();
        }).catch(() => {
          this.isLoadingAddress = false;
          this.$q.loading.hide();
        })
      },
      backAction: function () {
        this.$router.back();
      }
    }
  }
</script>

<style>
  .custom-footer{
    padding: 6px;
    border-top: 1px solid #cccccc;
  }

  .list-empty{
    height: 55px;
    text-align: center;
    padding-top: 15px;
  }

  .list-empty span{
    color: #8c8c8c;
    font-weight: 300;
    font-size: 15px;
  }

  .list-empty i{
    color: #ffb500;
    font-size: 20px;
    margin-right: 6px;
  }

</style>
