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
  import AccountRepository from "../../../assets/js/repository/AccountRepository";
  import AreaService from "../../../assets/js/service/area/AreaService";
  import LocalizacaoService from "../../../assets/js/service/localizacao/LocalizacaoService";
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
        localizacaoService: new LocalizacaoService(),
        areaService: null,
        localizacaoOptions: [],
        area: new area(),
      }
    },
    methods:{
      listLocalizacao: function(){
        this.$q.loading.show();
        this.localizacaoService.listLocalizacoesByProdutor(produtorId).then(localizacoes => {
          this.localizacaoOptions = localizacoes.map(local => {
            return {
              value: local.id,
              label: local.endereco +', '+ local.numero,
              sublabel: local.bairro +', '+ local.cidade.nome +'-'+ local.cidade.estado.sigla
            };
          });
          this.$q.loading.hide();
        }).catch(error =>{
          console.log(error);
          this.$q.loading.hide();
          this.$q.notify({type: 'negative', message: 'Não foi possível carregar as informações'})
        })
      },
      saveArea: function(){
        if(!this.area.isValid()){
          return;
        }
        this.$q.loading.show();
        this.areaService.saveArea(this.area.getValues()).then(() => {
          this.$q.notify({type: 'positive', message: 'Área criada com sucesso'});
          this.$root.$emit('refreshAreaList');
          this.$router.push({name: 'areas'});
          this.$q.loading.hide();
        }).catch(error =>{
          console.log(error);
          this.$q.notify({type: 'negative', message: 'Não foi possível salvar'});
          this.$q.loading.hide();
        });
      },
      backAction: function () {
        this.$router.back()
      }
    },
    mounted(){
      new AccountRepository().getFirst().then(account => {
        this.areaService = new AreaService(account.produtor_id);
      });
      this.listLocalizacao();
    }
  }
</script>
<style>
</style>
