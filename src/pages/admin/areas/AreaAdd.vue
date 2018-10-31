<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction" title="Nova Área">
      <q-btn slot="action_itens" flat dense label="salvar" @click="saveArea()"/>

      <!--<q-tabs slot="tabs" align="justify"  class="shadow-3" color="brand" text-color="brand" underline-color="deep-orange">
        <q-tab slot="title" label="Informações" />
        <q-tab slot="title" label="Contatos"/>
        <q-tab slot="title" label="Localizações"/>
      </q-tabs>-->

    </toolbar>

    <form class="q-pa-md">

      <div class="row">
        <div class="col-6">
          <custom-input-text type="text" label="Nome" :model="area.nome" maxlength="20" style="flex-grow: 1; margin-right: 20px" />
        </div>
        <div class="col-6">
          <q-select @click.native="teste()" filter v-model="localizacao" :options="options" float-label="Localização"/>
          <!--<custom-input-text type="text" label="Localizacão" :model="area.localizacao" style="flex-grow: 1; margin-right: 20px" />-->
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <custom-input-text type="number" label="tamanho" :model="area.tamanho" style="flex-grow: 1; margin-right: 20px" />
        </div>
        <div class="col-6">
          <custom-input-text type="text" label="Unidade Medida" :model="area.unidade_medida" style="flex-grow: 1; margin-right: 20px" />
        </div>
      </div>

    </form>


  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import Area from 'assets/js/model/Area'
  import AreaService from 'assets/js/service/AreaService'
  import LocalizacaoService from 'assets/js/service/LocalizacaoService'
  export default {
    name: "AreaAdd",
    components: {
      toolbar,
      customPage,
      customInputText,
    },
    data(){
      return {
        localizacaoSearchTerms: '',
        area: new Area(),
        options: [],
        localizacao: null
      }
    },
    watch: {
      localizacao: function (val) {
        console.log('aqui')
      }
    },
    methods:{
      teste: function(){
        LocalizacaoService.options().then(response => {
          this.options = response.map(local => {
            return {
              value: local.id,
              label: local.endereco
            }
          })
        })
      },
      saveArea: function(){
        if(!this.area.isValid()){
          return;
        }

        AreaService.saveArea(this.area.getValues()).then(response => {
          console.log(this.area.getValues())
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Area criada com sucesso'});

            //  this.setFormObj(this.form);
            this.$router.push({name: 'areas'});
            this.$root.$emit('refreshAreaList')
          }
        });

      },
      backAction: function () {
        this.$router.go(-1);
      }
    }
  }
</script>
<style>
</style>
