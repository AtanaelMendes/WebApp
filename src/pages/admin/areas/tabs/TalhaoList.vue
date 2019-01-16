<template>
  <q-scroll-area style="width: 100%; height: 100%;" :thumb-style="{
        right: '4px',
        borderRadius: '5px',
        background: '#dfdfdf',
        width: '8px',
        opacity: 1}">

    <div v-if="!isEmptyList" class="row q-ma-sm gutter-xs space-end">
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
    <div v-if="isEmptyList" class="no-result">
      <ap-no-results />
    </div>

  </q-scroll-area>
</template>

<script>
  import talhaoService from 'assets/js/service/area/TalhaoService'
  import apNoResults from 'components/ApNoResults'

  export default {
    name: "dashboard",
    components: {
      apNoResults
    },
    data(){
      return{
        isEmptyList: false,
        talhoes: [],
      }
    },
    watch: {
      '$route' (to, from) {
        this.listTalhoes(this.$route.params.id)
      }
    },
    methods: {
      updateTalhao: function(talhaoId){
        let areaId = this.$route.params.id
        this.$router.push({name: 'edit_talhao', params: {id:areaId, talhaoId: talhaoId}});
      },
      deleteTalhao: function(){},
      addtalhao: function(id){
        this.$router.push({name: 'add_talhao', params: {id:id}});
      },
      listTalhoes: function(id){
        talhaoService.listTalhoes(id).then(talhoes => {
          this.talhoes = talhoes.data;
          this.isEmptyList = this.talhoes.length === 0;
        })
      },
    },
    mounted() {
      this.listTalhoes(this.$route.params.id)
    }
  }
</script>
<style>
  .space-end{
    margin-bottom: 150px;
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
