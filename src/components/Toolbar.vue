<template>
  <div style="overflow: hidden; padding-bottom: 5px">
    <q-toolbar color="primary" class="shadow-3" >
      <q-btn flat round dense :icon="navigation_icon" v-if="navigation_type != ''" v-on:click="navigationClicked" />
      <q-toolbar-title>{{title}}</q-toolbar-title>
      <!--<q-btn flat round dense icon="more_vert" />-->
      <slot name="action_itens"></slot>
    </q-toolbar>
  </div>
</template>

<script>
  export default {
    name: "Toolbar",
    props: ['title', 'navigation_type'],
    computed: {
      navigation_icon: function () {
        switch (this.navigation_type) {
          case 'menu':
            return 'menu';
          case 'back':
            return 'arrow_back';
          case 'close':
            return 'close';
        }
      }
    },
    methods: {
      navigationClicked (){
        this.$emit('navigation_clicked', this.navigation_type);
      }
    },
    data: function () {
      return {}
    }
  }
</script>
