<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="noneAndBack" @navigation_clicked="backAction">
      <template slot="action_itens" v-if="area">
        <q-btn flat round dense icon="edit" @click.native="editArea(area.id)"/>
        <q-btn flat round dense icon="more_vert" >
        </q-btn>
      </template>

      <q-tabs slot="tabs" align="justify"  class="shadow-3" color="brand" text-color="brand" underline-color="deep-orange">
        <q-tab slot="title" label="Informações" />
        <q-tab slot="title" label="Contatos"/>
        <q-tab slot="title" label="Localizações"/>
      </q-tabs>
    </toolbar>

    <q-scroll-area style="width: 100%; height: 100vh;" :thumb-style="{
        right: '4px',
        borderRadius: '5px',
        background: '#dfdfdf',
        width: '8px',
        opacity: 1}">

      <div v-if="area" class="row q-ma-lg" style="margin-bottom: 100px">
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
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

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <q-list-header>Talhões</q-list-header>
          <q-list class="q-pa-sm">
            <q-chip class="q-ma-xs" v-for="(talhao, index) in area.talhoes" :key="index" color="primary">{{talhao.nome}}</q-chip>
          </q-list>
        </div>
      </div>
    </q-scroll-area>


  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import areaService from 'assets/js/service/area/AreaService'
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
        areaService.getAreaById(this.$route.params.id).then(area => {
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
