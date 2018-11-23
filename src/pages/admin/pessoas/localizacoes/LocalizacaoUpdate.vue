<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction" title="Editar localizacao">
      <q-btn slot="action_itens" flat dense icon="done" @click="updateLocalizacao()"/>
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
            <!--CIDADE-->
            <q-field :error="localizacao.cidadeId.errorMessage != null" class="q-mt-sm">
              <cidade-autocomplete label="Cidade" :value="cidadeTerms"/>
              <div class="q-field-bottom row no-wrap" >
                <div class="q-field-error" v-if="localizacao.cidadeId.errorMessage != null" >
                  {{localizacao.cidadeId.errorMessage}}
                </div>
              </div>
            </q-field>

            <!--ENDERECO-->
            <custom-input-text class="capitalize" type="text" label="Endereço" :model="localizacao.endereco" />

            <!--NUMERO-->
            <custom-input-text class="capitalize" type="number" label="numero" :model="localizacao.numero" />

            <!--COMPLEMENTO-->
            <custom-input-text class="capitalize" type="text" label="Complemento" :model="localizacao.complemento" />

            <!--BAIRRO-->
            <custom-input-text class="capitalize" type="text" label="Bairro" :model="localizacao.bairro" />

            <!--CEP-->
            <custom-input-text class="capitalize" type="text" label="CEP" mask="#####-###" :model="localizacao.cep" />

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
    name: "ContatoAdd",
    components: {
      toolbar,
      customPage,
      cidadeAutocomplete,
      customInputText,
    },
    data(){
      return {
        cidadeTerms: {
          id: null,
          label: null,
          sublabel: null
        },
        typeError: null,
        localizacao: new Localizacao(),
      }
    },
    watch: {
      cidadeTerms: function (val, old) {
        console.log(val)
        this.setCidade(val)
      }
    },
    methods:{
      fillForm: function(data){
        this.cidadeTerms.id = data.cidade.cidade_id
        this.cidadeTerms.label = data.cidade.nome
        this.cidadeTerms.sublabel = data.cidade.estado.nome
        this.localizacao.isCobranca.value = data.is_cobranca
        this.localizacao.isFiscal.value = data.is_fiscal
        this.localizacao.endereco.value = data.endereco
        this.localizacao.numero.value = data.numero
        this.localizacao.complemento.value = data.complemento
        this.localizacao.bairro.value = data.bairro
        this.localizacao.cep.value = data.cep
        console.log(data)

      },
      getLocalizacao: function(){
        let pessoaId = this.$route.params.id
        let localizacaoId = this.$route.params.localizacaoId
        localizacaoService.getLocalizacao(pessoaId, localizacaoId).then(response => {
          this.fillForm(response.data)
        });
      },
      updateLocalizacao: function(){
        if(this.localizacao.isFiscal.value == false && this.localizacao.isCobranca.value == false){
          this.typeError = 'Escolha ao menos um tipo de endereço'
          return
        }else{
          this.typeError = null
        }
        if(!this.localizacao.isValid()){
          return
        }
        localizacaoService.updateLocalizacao(this.$route.params.id, this.localizacao.getValues()).then( response => {
          this.$q.notify({type: 'positive', message: 'Contato criado com sucesso'})
          this.$router.go(-1);
        }).catch(error => {
          this.$q.notify({type: 'negative', message: error})
        })
      },
      setCidade (item) {
        if(item == null){
          this.localizacao.cidadeId.value = null;
        }else{
          this.localizacao.cidadeId.value = item.id;
          this.localizacao.cidadeId.errorMessage = null;
        }

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
  .space-end{
    margin-bottom: 150px;
  }

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
