<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="back" @navigation_clicked="backAction" title="Editar área">
      <q-btn slot="action_itens" flat icon="done" round dense @click="updateArea()"/>
    </toolbar>

    <div class="row q-pa-md gutter-sm justify-center">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
        <form @keyup.enter="updateArea">
          <custom-input-text type="text" label="Nome" :model="area.nome" maxlength="100"/>
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
  import AccountRepository from "../../../assets/js/repository/AccountRepository";
  import AreaService from "../../../assets/js/service/area/AreaService";
  import LocalizacaoService from "../../../assets/js/service/localizacao/LocalizacaoService";
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
        produtorId: null,
        localizacaoService: null,
        areaService: null,
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
      listLocalizacoesByProdutor(produtorId){
        this.$q.loading.show();
        this.localizacaoService.listLocalizacoesByProdutor(produtorId).then(localizacoes => {
          console.table(localizacoes);
          this.localizacaoOptions = localizacoes.map(local => {
            return {
              value: local.id,
              label: local.endereco +', '+ local.numero,
              sublabel: local.bairro +', '+ local.cidade.nome +'-'+ local.cidade.estado.sigla
            }
          });
          this.$q.loading.hide();
        }).catch(error =>{
          console.log(error);
          this.$q.notify({type: 'negative', message: 'Não foi possível carregar as informações'})
          this.$q.loading.hide();
        })
      },
      getAreaById: function(areaId){
        this.$q.loading.show();
        this.areaService.getAreaById(areaId).then(area => {
          this.fillForm(area);
          this.$q.loading.hide();
        }).catch(error =>{
          console.log(error);
          this$q.notify({type: 'negative', message: 'Não foi possível carregar as informações'});
          this.$q.loading.hide();
        })
      },
      updateArea: function(){
        if(!this.area.isValid()){
          return;
        }
        this.$q.loading.show();
        this.areaService.updateArea(this.$route.params.id, this.area.getValues()).then(() => {
          this.$q.notify({type: 'positive', message: 'Area atualizada com sucesso'});
          this.$root.$emit('refreshAreaList');
          this.$q.loading.hide();
          this.$router.back();
        }).catch(error =>{
          console.log(error);
          this.$q.notify({type: 'negative', message: 'Não foi possível salvar as informações'});
          this.$q.loading.hide();
        });
      },
      backAction: function () {
        this.$router.back();
      }
    },
    mounted() {
      new AccountRepository().getFirst().then(account => {
        this.areaService = new AreaService(account.produtor_id);
        this.localizacaoService = new LocalizacaoService(account.produtor_id);
        // this.produtorId = account.produtor_id;
        this.getAreaById(this.$route.params.id);
        this.listLocalizacoesByProdutor(account.produtor_id);
      });
    }
  }
</script>
<style>
</style>
