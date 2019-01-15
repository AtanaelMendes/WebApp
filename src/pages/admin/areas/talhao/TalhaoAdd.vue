<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="back" @navigation_clicked="backAction" title="Novo Talhão">
      <q-btn slot="action_itens" flat icon="done" round dense @click="saveTalhao()"/>
    </toolbar>

    <div class="row q-pa-md gutter-sm justify-center">
      <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
        <form @keyup.enter="saveTalhao()">
          <custom-input-text type="text" label="Nome" :model="talhao.nome" maxlength="20"/>
          <custom-input-text type="number" label="Tamanho" :model="talhao.tamanho" maxlength="20"/>
          <unidade-area-select label="Unidade da Área" :model="talhao.unidadeAreaId" :options="unidadeAreaOptions" />
        </form>
      </div>
    </div>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import unidadeAreaSelect from 'components/UnidadeAreaSelect.vue'
  import talhao from 'assets/js/model/area/Talhao'
  import talhaoService from 'assets/js/service/area/TalhaoService'
  import unidadeMedidaService from 'assets/js/service/UnidadeMedidaService'

  export default {
    name: "talhao-add",
    components: {
      toolbar,
      customPage,
      customInputText,
      unidadeAreaSelect,
    },
    data(){
      return {
        unidadeAreaOptions: [],
        talhao: new talhao(),
      }
    },
    methods:{
      saveTalhao: function(){
        if(!this.talhao.isValid()){
          return;
        }
        talhaoService.saveTalhao(this.$route.params.id, this.talhao.getValues()).then(response => {
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Talhão criado com sucesso'});
            // this.$router.push({name: 'areas'});
            this.$router.go(-1);
            this.$root.$emit('refreshAreaList');
          }
        });
      },
      listUnidadesArea: function(){
        talhaoService.listUnidadesArea().then(response => {
          this.unidadeAreaOptions = response;
        })
      },
      backAction: function () {
        this.$router.go(-1);
      }
    },
    mounted(){
      this.listUnidadesArea();
    }
  }
</script>
<style>
</style>
