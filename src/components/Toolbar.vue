<template>
  <div style="overflow: hidden; padding-bottom: 5px">
    <q-toolbar color="primary" class="shadow-3" >
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
    </q-toolbar>
  </div>
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
        console.log("isNavigationVisible")
        if(this.navigation_type === 'noneAndBack'){
          if(this.$q.screen.lt.md) {
            return true;
          }
          return false;
        }
        return true;
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
      openLeftDrawer() {
        this.$root.$emit("toogleLeftDrawer");
      },
      navigationClicked (){
        if(this.searchIsVisible){
          this.searchIsVisible = false;
          this.searchButtonIsVisible = true;
          this.$emit('search_changed', "");
          return
        }

        if(this.navigation_type === 'menu'){
          console.log('enviar evento pra abrir menu')
          this.openLeftDrawer();
        }

        console.log('navigation_clicked');
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
