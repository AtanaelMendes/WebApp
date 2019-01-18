<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="back" @navigation_clicked="backAction" title="Editar área">
      <q-btn slot="action_itens" flat icon="done" round dense @click="updateArea()"/>
    </toolbar>

    <div class="row q-pa-md gutter-sm justify-center">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
        <form @keyup.enter="updateArea">
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
    name: "area-edit",
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
    watch: {
      '$route' (to, from) {
        this.getAreaById(this.$route.params.id)
      }
    },
    methods:{
      fillForm: function(area){
        this.area.nome.value = area.nome
        this.area.localizacao.value = area.localizacao.id
      },
      listLocalizacao: function(){
        localizacaoService.listLocalizacao().then(response => {
          this.localizacaoOptions = response;
        })
      },
      getAreaById: function(areaId){
        areaService.getAreaById(areaId).then(area => {
          this.fillForm(area)
        })
      },
      updateArea: function(){
        if(!this.area.isValid()){
          return;
        }
        areaService.updateArea(this.$route.params.id, this.area.getValues()).then(response => {
          if(response.status === 200) {
            this.$q.notify({type: 'positive', message: 'Area atualizada com sucesso'});
            this.$root.$emit('refreshAreaList');
            this.$router.go(-1);
          }
        });
      },
      backAction: function () {
        this.$router.back()
      }
    },
    mounted() {
      this.listLocalizacao();
      this.getAreaById(this.$route.params.id)
    }
  }
</script>
<style>
</style>
