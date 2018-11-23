<template>
  <q-scroll-area style="width: 100%; height: 100%;" :thumb-style="{
        right: '4px',
        borderRadius: '5px',
        background: '#dfdfdf',
        width: '8px',
        opacity: 1}">

    <div class="row q-ma-sm gutter-xs space-end">
      <div class="col-12">

        <q-card>
          <q-card-title>Talhão fundo 1</q-card-title>
          <q-card-separator/>

          <q-card-main>
            <div class="row">
              <div class="col-4">
                <span class="text-faded">Safra:</span>&nbsp<span class="q-body-1">2019</span>
              </div>
              <div class="col-4">
                <span class="q-body-2">Soja</span>
              </div>
              <div class="col-4">
                <div class="row">
                  <span class="q-subtitle text-faded">Início:</span>&nbsp<span class="q-body-1">10 Novembro 2018</span>
                </div>
                <div class="row">
                  <span class="q-subtitle text-faded">colheita:</span>&nbsp<span class="q-body-1">15 Janeiro 2019</span>
                </div>
              </div>
            </div>

            <div class="row">
              <div>
                <span class="text-faded">Estimativa:</span>&nbsp<span class="q-body-1">50 sacos, Hectare</span>
              </div>
            </div>
          </q-card-main>
        </q-card>

      </div>
    </div>

    <!--<div v-if="!isEmptyList" class="q-ma-lg space-end">-->
      <!--<div class="row">-->
        <!--<div class="col-12">-->
          <!--Quase lá-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div v-if="isEmptyList" class="no-result">-->
      <!--<img src="~/assets/sad_2.svg"/>-->
      <!--<span>Nenhum resultado encontrado.</span>-->
    <!--</div>-->

  </q-scroll-area>
</template>

<script>
  import talhaoService from 'assets/js/service/area/TalhaoService'
  export default {
    name: "dashboard",
    data(){
      return{
        isEmptyList: false,
        talhoes: [],
      }
    },
    watch: {
      '$route' (to, from) {
        this.listTalhao(this.$route.params.id)
      }
    },
    methods: {
      addtalhao: function(id){
        this.$router.push({name: 'add_talhao', params: {id:id}});
      },
      listTalhao: function(id){
        talhaoService.listTalhao(id).then(talhoes => {
          this.talhoes = talhoes;
        })
      },
    },
    mounted() {
      this.listTalhao(this.$route.params.id)
    }
  }
</script>
<style>
  .title-color{
    color: #005f5f;
  }
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
