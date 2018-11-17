<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction" title="Nova Localização">
      <q-btn slot="action_itens" flat dense round icon="done" @click="saveLocalizacao()"/>
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
          </div>
          <!-- FIM TOGGLE FISCAL COBRANCA-->

          <form>
            <!--ENDERECO-->
            <custom-input-text class="capitalize" type="text" label="Endereço" :model="localizacao.endereco" />

            <!--NUMERO-->
            <custom-input-text class="capitalize" type="number" label="numero" :model="localizacao.numero" />

            <!--COMPLEMENTO-->
            <custom-input-text class="capitalize" type="text" label="Complemento" :model="localizacao.complemento" />

            <!--BAIRRO-->
            <custom-input-text class="capitalize" type="text" label="Bairro" :model="localizacao.bairro" />

            <!--CEP-->
            <custom-input-text class="capitalize" type="text" label="CEP" mask="######-###" :model="localizacao.cep" />

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
  import Localizacao from 'assets/js/model/localizacao/Localizacao'
  import localizacaoService from 'assets/js/service/localizacao/LocalizacaoService'
  export default {
    name: "localizacao-add",
    components: {
      toolbar,
      customPage,
      customInputText,
    },
    computed:{
      dialogTitlePreffix: function () {
        return (this.telefoneEditMode || this.emailEditMode) ? "Editar" : "Novo"
      }
    },
    data(){
      return {
        localizacao: new Localizacao(),
      }
    },
    methods:{
      saveLocalizacao: function(){
        if(this.localizacao.isValid()){
          return
        }
        localizacaoService.saveLocalizacao(this.$route.params.id, this.localizacao.getValues()).then( response => {
          this.$q.notify({type: 'positive', message: 'Localização criado com sucesso'})
          this.$router.go(-1);
        }).catch(error => {
          this.$q.notify({type: 'negative', message: error})
        })
      },
      backAction: function () {
        this.$router.go(-1);
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
