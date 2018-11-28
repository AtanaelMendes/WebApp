<template>
  <custom-page isChild style="background: #fdfdfd">
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction">
      <template slot="action_itens" v-if="area">
        <q-btn flat round dense icon="edit" @click.native="editArea(area.id)"/>
      </template>
    </toolbar>

    <div class="row space-end">
      <div class="col-12">

        <!--INFORMACOES-->
        <div v-if="area" class="row gutter-sm q-mb-lg">

          <div class="col-12">
            <q-item>
              <q-item-side>
                <q-icon name="place" size="40px"/>
              </q-item-side>
              <q-item-main>
                <q-item-tile class="q-title">{{area.nome}}</q-item-tile>
              </q-item-main>
            </q-item>
          </div>

          <div :class="coluna">
            <q-item>
              <q-item-main inset>
                <q-item-tile class="q-subheading">
                  {{area.localizacao.endereco}},&nbsp{{area.localizacao.numero}}
                </q-item-tile>
                <q-item-tile sublabel>
                  {{area.localizacao.cidade.nome}},&nbsp{{area.localizacao.cidade.estado.nome}}
                </q-item-tile>
              </q-item-main>
            </q-item>
          </div>

        </div>
        <!--FIM INFORMACOES-->

        <!--TALHOES-->
        <div class="row q-px-md gutter-sm">
          <div class="col-12">
            <q-item class="custom-header">
              <q-item-main class="q-title">
                Talhões
              </q-item-main>
              <q-item-side>
                <q-btn round size="md" icon="add" @click="addtalhao" color="deep-orange"/>
              </q-item-side>
            </q-item>
          </div>
          <div class="col-6" v-for="talhao in talhoes" :key="talhao.id">
            <q-card color="white" text-color="black">
              <q-card-title>
                {{talhao.nome}}
                <q-btn round flat dense icon="more_vert" slot="right" style="margin-right: -15px;">
                  <q-popover>
                    <q-list link  style="min-width: 120px">
                      <q-item v-close-overlay @click.native="updateTalhao(talhao.id)">
                        <q-item-main label="Editar"/>
                      </q-item>
                      <q-item v-close-overlay @click.native="deleteTalhao(talhao.id)">
                        <q-item-main label="Apagar"/>
                      </q-item>
                    </q-list>
                  </q-popover>
                </q-btn>
              </q-card-title>
              <q-card-separator/>
              <q-card-main>
                <div class="row">
                  <div>{{talhao.tamanho}},&nbsp{{talhao.unidade.nome}}</div>
                </div>
              </q-card-main>
            </q-card>
          </div>
        </div>
        <!--FIM TALHOES-->
      </div>
    </div>
  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import talhaoService from 'assets/js/service/area/TalhaoService'
  import areaService from 'assets/js/service/area/AreaService'
  export default {
    name: "area-view",
    components: {
      toolbar,
      customPage,
    },
    watch: {
      '$route' (to, from) {
        this.listTalhao(this.$route.params.id);
        this.getAreaById(this.$route.params.id);
      },
    },
    data(){
      return{
        area: null,
        talhoes: [],
        coluna: 'col-xs-12 col-sm-12 col-md-6 col-lg-6',
      }
    },
    methods: {
      getAreaById: function(areaId){
        areaService.getAreaById(areaId).then(area => {
          this.area = area
        })
      },
      editArea: function(id){
        this.$router.push({name: 'edit_area', params: {id:id}});
      },
      updateTalhao: function(talhaoId){
        let areaId = this.$route.params.id
        this.$router.push({name: 'edit_talhao', params: {id:areaId, talhaoId: talhaoId}});
      },
      deleteTalhao: function(){},
      addtalhao: function(id){
        this.$router.push({name: 'add_talhao', params: {id:id}});
      },
      listTalhao: function(id){
        talhaoService.listTalhao(id).then(talhoes => {
          this.talhoes = talhoes.data;
          this.isEmptyList = this.talhoes.length === 0;
        })
      },
      editArea: function(){
        this.$router.push({name:'edit_area'});
      },
      addtalhao: function(){
        this.$router.push({name:'add_talhao'});
        // this.$router.push({name: 'view_area', params: {id:id}});
      },
      backAction: function () {
        // this.$router.go(-1);
        this.$router.push({name:'areas'})
      }
    },
    mounted(){
      this.listTalhao(this.$route.params.id);
      this.getAreaById(this.$route.params.id);
    }
  }
</script>

<style>
  .space-end{
    margin-bottom: 150px;
  }
  .custom-header{
    border-top: 1px solid #c5c5c5;
  }
  .no-result{
    text-align: center;
    padding-top: 150px;
  }

  .no-result img{
    width: 120px;
    height: auto;
  }

  .no-result span{
    display: block;
    margin-top: 30px;
    font-size: 25px;
    font-weight: 300;
    color: #ababab;
  }
</style>
