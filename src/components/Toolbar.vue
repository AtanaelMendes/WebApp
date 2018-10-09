<template>
  <div style="overflow: hidden; padding-bottom: 5px">
    <q-toolbar color="primary" class="shadow-3" >
      <q-btn flat round dense icon="menu" v-if="type == 'menu'" />
      <q-btn flat round dense icon="arrow-back" v-if="type == 'back'" />
      <q-btn flat round dense icon="close" v-if="type == 'close'" />
      <q-toolbar-title>{{title}}</q-toolbar-title>
      <q-btn flat round dense icon="more_vert" />
    </q-toolbar>
  </div>
</template>

<script>
  export default {
    name: "Toolbar",
    props: ['title', 'type'],
    methods: {
      menuClicked (){
        console.log("menuClicked")
        this.$emit('menu_clicked', null);
      }
    },
    data: function () {
      return {}
    }
  }
</script>
