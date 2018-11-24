<template>
  <q-scroll-area style="width: 100%; height: 100%;" :thumb-style="{
        right: '4px',
        borderRadius: '5px',
        background: '#dfdfdf',
        width: '8px',
        opacity: 1}">

    <div class="row gutter-xs">
      <div class="col-12">
        <div class="no-result">
          <img src="~/assets/sad_2.svg"/>
          <span>Nenhum resultado encontrado.</span>
        </div>
      </div>
    </div>

  </q-scroll-area>
</template>

<script>
  import areaService from 'assets/js/service/area/AreaService'
  export default {
    name: "area-info",
    data(){
      return{
        area: [],
      }
    },
    watch: {
      '$route' (to, from) {
        this.getAreaById(this.$route.params.id)
      }
    },
    methods: {
      getAreaById: function(routeAreaId){
        areaService.getAreaById(routeAreaId).then(area => {
          this.area = area.data;
        })
      },
      editArea: function(id){
        this.$router.push({name: 'edit_area', params: {id:id}});
      },
    },
    mounted() {
      this.getAreaById(this.$route.params.id)
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
