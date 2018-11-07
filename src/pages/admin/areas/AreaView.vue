<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="noneAndBack" @navigation_clicked="backAction">

      <template slot="action_itens" v-if="area">
        <q-btn flat round dense icon="edit" @click.native="editArea(area.id)"/>
        <q-btn flat round dense icon="more_vert" >
        </q-btn>
      </template>
    </toolbar>

    <div v-if="area" class="q-ma-lg">
      <div class="row">

        <div class="col-6">
          <q-list no-border>
            <q-list-header>Informações da área</q-list-header>

            <q-item>
              <q-item-main>
                {{area.nome}}
              </q-item-main>
            </q-item>

            <q-item>
              <q-item-main>
                <q-item-tile sublabel>
                  Tamanho
                </q-item-tile>
                <q-item-tile>
                  {{area.tamanho}}, {{area.unidadeMedida[0].simbolo}}
                </q-item-tile>
              </q-item-main>
            </q-item>

            <q-item>
              <q-item-main>
                <q-item-tile sublabel>
                  Endereço
                </q-item-tile>
                <q-item-tile>
                  {{area.localizacao[0].endereco}}
                </q-item-tile>
              </q-item-main>
            </q-item>

            <q-item>
              <q-item-main>
                <q-item-tile sublabel>
                  numero
                </q-item-tile>
                <q-item-tile>
                  {{area.localizacao[0].numero}}
                </q-item-tile>
              </q-item-main>
            </q-item>

            <q-item>
              <q-item-main>
                <q-item-tile sublabel>
                  Bairro
                </q-item-tile>
                <q-item-tile>
                  {{area.localizacao[0].bairro}}
                </q-item-tile>
              </q-item-main>
            </q-item>

            <q-item>
              <q-item-main>
                <q-item-tile sublabel>
                  Cidade
                </q-item-tile>
                <q-item-tile>
                  {{area.localizacao[0].cidade}}
                </q-item-tile>
              </q-item-main>
            </q-item>

            <q-item>
              <q-item-main>
                <q-item-tile sublabel>
                  CEP
                </q-item-tile>
                <q-item-tile>
                  {{area.localizacao[0].cep}}
                </q-item-tile>
              </q-item-main>
            </q-item>

            <q-item>
              <q-item-main>
                <q-item-tile sublabel>
                  Estado
                </q-item-tile>
                <q-item-tile>
                  {{area.localizacao[0].estado}}
                </q-item-tile>
              </q-item-main>
            </q-item>

          </q-list>
        </div>

        <div class="col-6">
          <q-list class="q-pa-sm" no-border>
            <q-list-header>Talhões</q-list-header>
              <q-chip class="q-ma-xs" v-for="(talhao, index) in area.talhoes" :key="index" color="primary">{{talhao.nome}}</q-chip>
          </q-list>
        </div>
      </div>
    </div>
  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import AreaService from 'assets/js/service/AreaService'
  export default {
    name: "AreaView",
    components: {
      toolbar,
      customPage,
    },
    watch: {
      '$route' (to, from) {
        this.getArea();
        this.selectedTab ='tab-info';
      }
    },
    data(){
      return{
        area: null,
        selectedTab: 'tab-info',
      }
    },
    methods: {
      editArea: function(id){
        this.$router.push({name: 'edit_area', params: {id:id}});
      },
      getArea: function(){
        AreaService.getAreaByID(this.$route.params.id).then(area => {
          this.area = area.data;
        })
      },
      backAction: function () {
        this.$router.go(-1);
      }
    },
    mounted(){
      this.getArea();
    }
  }
</script>

<style>
</style>
