<template>
  <custom-page isChild style="background: #fdfdfd">
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction">
      <template slot="action_itens" v-if="area">
        <q-btn flat round dense icon="edit" @click.native="updateArea"/>
        <q-btn flat round dense icon="more_vert" >
          <q-popover anchor="bottom left">
            <q-list link>
              <q-item dense @click.native="archiveArea(area.id)" v-if="!area.deleted_at">
                <q-item-main label="Arquivar area"  />
              </q-item>
              <q-item dense @click.native="deleteArea(area.id)">
                <q-item-main label="Excluir area"  />
              </q-item>
              <q-item dense @click.native="restoreArea(area.id)" v-if="area.deleted_at">
                <q-item-main label="Ativar area"  />
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
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
                    <q-list link>
                      <q-item v-close-overlay @click.native="updateTalhao(talhao.id)">
                        <q-item-main label="Editar"/>
                      </q-item>
                      <q-item v-close-overlay @click.native="archiveTalhao(talhao.id)" v-if="!talhao.deleted_at">
                        <q-item-main label="Arquivar"/>
                      </q-item>
                      <q-item v-close-overlay @click.native="restoreTalhao(talhao.id)" v-if="talhao.deleted_at">
                        <q-item-main label="Ativar"/>
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
        this.listTalhoes(this.$route.params.id);
        this.getAreaById(this.$route.params.id);
        this.areaId = this.$route.params.id;
      },
    },
    data(){
      return{
        area: null,
        talhoes: [],
        areaId: this.$route.params.id,
        coluna: 'col-xs-12 col-sm-12 col-md-6 col-lg-6',
      }
    },
    methods: {
      getAreaById: function(areaId){
        areaService.getAreaById(areaId).then(area => {
          this.area = area
        })
      },
      updateArea: function(){
        this.$router.push({name: 'edit_area', params: {id: this.areaId}});
      },
      archiveArea: function(){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja arquivar esta área?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          areaService.archiveArea(this.areaId).then(response => {
            this.$q.notify({type: 'positive', message: 'Área arquivada'})
            this.$router.push({name:'areas'})
          })
        });
      },
      restoreArea: function(){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente Ativar essa área?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          areaService.restoreArea(this.areaId).then(response => {
            this.$q.notify({type: 'positive', message: 'Área ativada'})
            this.getAreaById(this.$route.params.id);
          })
        });
      },
      deleteArea: function(){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir essa área?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          areaService.deleteArea(this.areaId).then(response => {
            this.$q.notify({type: 'positive', message: 'Área excluida'})
            this.$router.push({name:'areas'})

            this.$root.$emit('refreshAreaList')
          })
        });
      },
      listTalhoes: function(id){
        talhaoService.listTalhoes(id).then(talhoes => {
          this.talhoes = talhoes.data;
        })
      },
      addtalhao: function(id){
        this.$router.push({name: 'add_talhao', params: {id:id}});
      },
      updateTalhao: function(talhaoId){
        this.$router.push({name: 'edit_talhao', params: {id: this.areaId, talhaoId: talhaoId}});
      },
      archiveTalhao: function(talhaoId){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja arquivar este talhão?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          talhaoService.archiveTalhao(this.areaId, talhaoId).then(response => {
            this.$q.notify({type: 'positive', message: 'Talhão arquivado com sucesso'})
            this.getAreaById(this.$route.params.id);
          })
        });
      },
      restoreTalhao: function(talhaoId){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja ativar este talhão?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          talhaoService.restoreTalhao(this.areaId, talhaoId).then(response => {
            this.$q.notify({type: 'positive', message: 'Talhão ativado com suceso'})
            this.getAreaById(this.$route.params.id);
          })
        });
      },
      deleteTalhao: function(talhaoId){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir este talhão?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          talhaoService.deleteTalhao(this.areaId, talhaoId).then(response => {
            this.$q.notify({type: 'positive', message: 'Talhão excluido com sucesso'})
            this.getAreaById(this.$route.params.id);
          })
        });
      },
      backAction: function (talhaoId) {
        // this.$router.go(-1);
        this.$router.push({name:'areas'})
      }
    },
    mounted(){
      this.listTalhoes(this.$route.params.id);
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
