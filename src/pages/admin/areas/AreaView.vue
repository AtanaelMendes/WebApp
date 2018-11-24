<template>
  <custom-page isChild noScroll style="background: #fdfdfd">
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction">
      <!--<template slot="action_itens" v-if="area">-->
        <!--<q-btn flat round dense icon="edit" @click.native="editArea(area.id)"/>-->
        <!--<q-btn flat round dense icon="more_vert" >-->
        <!--</q-btn>-->
      <!--</template>-->

      <q-tabs slot="tabs" v-model="selectedTab" align="justify"  class="shadow-3" color="brand" text-color="brand" underline-color="deep-orange">
        <q-tab slot="title" name="tab-talhoes" label="Talhões"/>
        <q-tab slot="title" name="tab-info" label="Informações"/>
      </q-tabs>
    </toolbar>

    <swipe ref="mySwiper" class="my-swipe" :continuous="false" :auto="0" :showIndicators="false" :disabled="true">

      <swipe-item>
        <dashboard></dashboard>
      </swipe-item>

      <swipe-item>
        <area-info></area-info>
      </swipe-item>

    </swipe>
    <transition
      appear
      slot="fab-container"
      enter-active-class="animated zoomIn faster"
      leave-active-class="animated zoomOut faster">
      <q-btn
        icon="add"
        size="20px"
        key="talhao"
        @click="addtalhao"
        round color="deep-orange"
        v-if="selectedTab == 'tab-talhoes' "
      />
      <q-btn
        icon="edit"
        size="20px"
        key="info"
        @click="editArea"
        round color="deep-orange"
        v-if="selectedTab == 'tab-info' "
      />
    </transition>
  </custom-page>
</template>

<script>
  require('vue-swipe/dist/vue-swipe.css');
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import dashboard from 'pages/admin/areas/tabs/TalhaoList'
  import areaInfo from 'pages/admin/areas/tabs/AreaInfo'
  import { Swipe, SwipeItem } from 'vue-swipe';
  export default {
    name: "area-view",
    components: {
      areaInfo,
      dashboard,
      toolbar,
      customPage,
      Swipe,
      SwipeItem
    },
    watch: {
      '$route' (to, from) {
        this.selectedTab ='tab-talhoes';
      },
      selectedTab: function (value) {
        let index;
        switch (value) {
          case 'tab-talhoes':
            index = 0;
            break;
          case 'tab-info':
            index = 1;
            break;
        }
        this.$refs.mySwiper.goto(index)
      }
    },
    data(){
      return{
        selectedTab: 'tab-talhoes',
      }
    },
    methods: {
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

    }
  }
</script>

<style>
  .my-swipe {
    height: 100%;
  }
</style>
