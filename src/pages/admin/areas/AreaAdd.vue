<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="back" @navigation_clicked="backAction" title="Nova Área">
      <q-btn slot="action_itens" flat icon="done" dense round @click="saveArea()"/>
    </toolbar>

    <div class="row q-pa-md gutter-sm justify-center">
      <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
        <form @keyup.enter="saveArea()">
          <custom-input-text type="text" label="Nome" :model="area.nome" maxlength="20"/>
          <localizacao-select label="Localização" :model="area.localizacao" :options="localizacaoOptions"/>
        </form>
      </div>
    </div>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import localizacaoSelect from 'components/LocalizacaoSelect.vue'
  import area from 'assets/js/model/area/Area'
  import areaService from 'assets/js/service/area/AreaService'
  import localizacaoService from 'assets/js/service/localizacao/LocalizacaoService'
  export default {
    name: "area-add",
    components: {
      toolbar,
      customPage,
      customInputText,
      localizacaoSelect,
    },
    data(){
      return {
        localizacaoOptions: [],
        area: new area(),
      }
    },
    methods:{
      listLocalizacao: function(){
        localizacaoService.listLocalizacao().then(response => {
          this.localizacaoOptions = response;
        })
      },
      saveArea: function(){
        if(!this.area.isValid()){
          return;
        }
        areaService.saveArea(this.area.getValues()).then(response => {
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Área criada com sucesso'});
            this.$root.$emit('refreshAreaList')
            this.$router.push({name: 'areas'});
          }
        });
      },
      backAction: function () {
        this.$router.back()
      }
    },
    mounted(){
      this.listLocalizacao();
    }
  }
</script>
<style>
</style>
