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
  import TalhaoService from "../../../../assets/js/service/area/TalhaoService";

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
        talhaoService: new TalhaoService(),
        unidadeAreaOptions: [],
        talhao: new talhao(),
      }
    },
    methods:{
      saveTalhao: function(){
        if(!this.talhao.isValid()){
          return;
        }
        this.$q.loading.show();
        this.talhaoService.saveTalhao(this.$route.params.id, this.talhao.getValues()).then(()=> {
          this.$q.notify({type: 'positive', message: 'Talhão criado com sucesso'});
          this.$router.back();
          this.$root.$emit('refreshAreaList');
          this.$q.loading.hide();
        }).catch(error =>{
          console.log(error);
          this.$q.notify({type: 'negative', message: 'Não foi possivel salvar'});
          this.$q.loading.hide();
        });
      },
      listUnidadesArea: function(){
        this.$q.loading.show();
        this.talhaoService.listUnidadesArea().then(response => {
          this.unidadeAreaOptions = response;
          this.$q.loading.hide();
        }).catch(error =>{
          console.log(error);
          this.$q.notify({type: 'negative', message: 'Não foi possivel carragar as unidade de área'});
          this.$q.loading.hide();
        })
      },
      backAction: function () {
        this.$router.back()
      }
    },
    mounted(){
      this.listUnidadesArea();
    }
  }
</script>
<style>
</style>
