<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="back" @navigation_clicked="backAction" title="Editar Talhão">
      <q-btn slot="action_itens" flat icon="done" round dense @click="updatetalhao()"/>
    </toolbar>

    <div class="row q-pa-md gutter-sm justify-center">

      <div class="col-12 text-center q-title">
        {{talhaoData.nome}}, {{talhaoData.area.nome}}
      </div>

      <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
        <form @keyup.enter="updatetalhao()">
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
        talhaoData: null,
        areaId: this.$route.params.id,
        talhaoId: this.$route.params.talhaoId
      }
    },
    methods:{
      fillForm: function(data){
        this.talhao.areaId.value = data.area.id;
        this.talhao.nome.value = data.nome
        this.talhao.tamanho.value = data.tamanho
        this.talhao.unidadeAreaId.value = data.unidade.id
      },
      getTalhaoById: function(){
        talhaoService.getTalhaoById(this.areaId, this.talhaoId).then(data => {
          this.fillForm(data);
          this.talhaoData = data
        })
      },
      updatetalhao: function(){
        if(!this.talhao.isValid()){
          return;
        }
        talhaoService.updateTalhao(this.areaId, this.talhaoId, this.talhao.getValues()).then(response => {
          if(response.status === 200) {
            this.$q.notify({type: 'positive', message: 'Talhão atualizado com sucesso'});
            this.$root.$emit('refreshTalhaoList');
            this.$router.go(-1);
            // this.$router.push({name: 'areas'});
          }
        });
      },
      listUnidadesArea: function(){
        talhaoService.listUnidadesArea().then(response => {
          this.unidadeAreaOptions = response;
        })
      },
      backAction: function () {
        this.$router.back()
      }

    },
    mounted(){
      this.listUnidadesArea();
      this.getTalhaoById()
    }
  }
</script>
<style>
</style>
