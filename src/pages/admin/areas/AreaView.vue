<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="noneAndBack" @navigation_clicked="backAction">
      <template slot="action_itens" v-if="area">
        <q-btn flat round dense icon="edit" @click.native="editArea(area.id)"/>
        <q-btn flat round dense icon="more_vert" >
        </q-btn>
      </template>

    </toolbar>

    <div v-if="!isEmptyList" class="q-ma-lg space-end">
      <div class="row">
        <div class="col-12">
          Quase lá
        </div>
      </div>
    </div>
    <div v-if="isEmptyList" class="no-result">
      <img src="~/assets/sad_2.svg"/>
      <span>Nenhum resultado encontrado.</span>
    </div>

    <q-btn slot="fab-container" round color="primary" @click="addArea()" icon="add" size="20px" />
  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import talhaoService from 'assets/js/service/area/TalhaoService'
  export default {
    name: "area-view",
    components: {
      toolbar,
      customPage,
    },
    watch: {
      '$route' (to, from) {
        this.listTalhao();
      }
    },
    data(){
      return{
        talhoes: [],
        isEmptyList: null,
      }
    },
    methods: {
      editArea: function(id){
        this.$router.push({name: 'edit_area', params: {id:id}});
      },
      listTalhao: function(){
        talhaoService.listTalhao(this.$route.params.id).then(area => {
          this.area = area.data;
          this.isEmptyList = this.areas.length === 0;
        })
      },
      backAction: function () {
        this.$router.go(-1);
      }
    },
    mounted(){
      this.listTalhao();
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
