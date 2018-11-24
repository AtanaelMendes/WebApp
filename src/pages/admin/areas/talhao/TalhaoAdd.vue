<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction" title="Novo Talhão">
      <q-btn slot="action_itens" flat icon="done" round dense @click="saveTalhao()"/>
    </toolbar>

    <form class="q-pa-md">

      <div class="row">
        <div class="col-sm-12 col-lg-6">

          <custom-input-text type="text" label="Nome" :model="talhao.nome" maxlength="20"/>

          <custom-input-text type="number" label="Tamanho" :model="talhao.tamanho" maxlength="20"/>

          <unidade-area-select label="Unidade da Área" :model="talhao.unidadeAreaId"/>

        </div>
      </div>
    </form>
  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import unidadeAreaSelect from 'components/UnidadeAreaSelect.vue'
  import talhao from 'assets/js/model/area/Talhao'
  import talhaoService from 'assets/js/service/area/TalhaoService'
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
            this.$q.notify({type: 'positive', message: 'Area criada com sucesso'});
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
