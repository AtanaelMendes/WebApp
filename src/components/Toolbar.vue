<template>

  <q-toolbar slot="toolbar" class="ap-page-container-toolbar">
    <!--<q-toolbar-title>
      Teste
    </q-toolbar-title>
    <q-btn flat round dense icon="search"/>
    <q-btn flat round dense icon="more_vert"/>-->
    <q-btn flat round dense :icon="navigation_icon" v-if="isNavigationVisible" v-on:click="navigationClicked" />
    <q-toolbar-title>
      <span v-if="!searchIsVisible">{{title}}</span>
      <q-search v-if="searchIsVisible" v-model="searchValue"
                placeholder="Pesquisar..."
                inverted class="no-shadow q-pa-none"
                style="font-size: 18px; font-weight: 500;" color="grey-4"
                no-icon hide-underline autofocus />
    </q-toolbar-title>

    <q-btn flat round dense icon="search" v-if="searchable && searchButtonIsVisible" @click="showSearchInput"  />
    <slot name="action_itens"></slot>
  </q-toolbar>

    <!--<q-toolbar color="primary"  >
      <q-btn flat round dense :icon="navigation_icon" v-if="isNavigationVisible" v-on:click="navigationClicked" />
      <q-toolbar-title>
        <span v-if="!searchIsVisible">{{title}}</span>
        <q-search v-if="searchIsVisible" v-model="searchValue"
                  placeholder="Pesquisar..."
                  inverted class="no-shadow q-pa-none"
                  style="font-size: 18px; font-weight: 500;"
                  no-icon hide-underline autofocus dark/>
      </q-toolbar-title>

      <q-btn flat round dense icon="search" v-if="searchable && searchButtonIsVisible" @click="showSearchInput"  />
      <slot name="action_itens"></slot>

    </q-toolbar>-->
</template>

<script>
  export default {
    name: "Toolbar",
    props: {
      title: String,
      navigation_type: String,
      searchable: Boolean
    },
    data: function () {
      return {
        searchValue: null,
        searchIsVisible: false,
        searchButtonIsVisible: this.searchable,
      }
    },
    computed: {
      navigation_icon: function () {
        if(this.searchIsVisible){
          return 'close'
        }

        switch (this.navigation_type) {
          case 'menu':
            return 'menu';
          case 'back':
            return 'arrow_back';
          case 'close':
            return 'close';
          case 'closeAndBack':
            if(this.$q.screen.lt.md) {
              return 'arrow_back';
            }
            return 'close';
          case 'noneAndBack':
            if(this.$q.screen.lt.md) {
              return 'arrow_back';
            }
            return;
        }
      },
      isNavigationVisible: function () {
        if(!this.navigation_type && !this.searchIsVisible){
          return false;
        }
        if(this.navigation_type === 'noneAndBack'){
          if(this.$q.screen.lt.md) {
            return true;
          }
          return false;
        }
        return true;

        //return this.searchIsVisible;
      }
    },
    watch: {
      searchValue: {
        handler: function(val, oldval) {
          this.$emit('search_changed', val);
        },
      }
    },
    methods: {
      navigationClicked (){
        if(this.searchIsVisible){
          this.searchIsVisible = false;
          this.searchButtonIsVisible = true;
          this.$emit('search_changed', "");
          return
        }

        /*if(this.navigation_type === 'menu'){
          this.openLeftDrawer();
        }*/

        this.$emit('navigation_clicked', this.navigation_type);
      },
      showSearchInput(){
        this.searchValue = null;
        this.searchIsVisible = true;
        this.searchButtonIsVisible = false;
      },
    }
  }
</script>
<style scoped>
  .q-toolbar-title{
    font-weight: 400;
  }

  .q-toolbar-title .q-search.bg-primary{
    background: #e2e2e2 !important;
  }

  .q-toolbar-title .q-search.bg-primary input{
    margin-left: 10px;
    color: black;
  }
</style>
