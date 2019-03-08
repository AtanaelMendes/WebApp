<template>
  <q-scroll-area style="width: 100%; height: 100%;" :thumb-style="{
        right: '4px',
        borderRadius: '5px',
        background: '#dfdfdf',
        width: '8px',
        opacity: 1}">


    <div v-if="area" class="q-pa-md row gutter-sm">

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
    <div class="no-result" v-else>
      <ap-no-results />
    </div>

  </q-scroll-area>
</template>

<script>
  import apNoResults from 'components/ApNoResults'
  import AccountRepository from "../../../../assets/js/repository/AccountRepository";
  import AreaService from "../../../../assets/js/service/area/AreaService";

  export default {
    name: "area-info",
    components: {
      apNoResults
    },
    data(){
      return{
        areaService: null,
        area: null,
        coluna: 'col-xs-12 col-sm-12 col-md-6 col-lg-6',
      }
    },
    watch: {
      '$route' (to, from) {
        this.getAreaById(this.$route.params.id)
      }
    },
    methods: {
      getAreaById: function(areaId){
        this.areaService.getAreaById(areaId).then(area => {
          this.area = area
        })
      },
      editArea: function(id){
        this.$router.push({name: 'edit_area', params: {id:id}});
      },
    },
    mounted() {
      new AccountRepository().getFirst().then(account => {
        this.areaService = new AreaService(account.produtor_id);
        this.getAreaById(this.$route.params.id)
      });
    }
  }
</script>
<style>
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
