<template>
  <q-page style="display: flex">
    <div class="father" v-if="!hideMainPage">

      <slot name="toolbar"></slot>

      <q-scroll-area style="width: 100%; height: 100%;" :thumb-style="{
        right: '4px',
        borderRadius: '5px',
        background: 'red',
        width: '10px',
        opacity: 1}">

        <div class="q-pa-sm">
          <slot name="content"></slot>
        </div>

      </q-scroll-area>
    </div>

    <router-view style="flex-grow: 1.5" />
  </q-page>
</template>

<script>
    export default {
      name: "CustomPage",
      data: function () {
        return {
          hideMainPage: false,
        }
      },
      created(){
        if(this.$q.screen.lt.md) {
          this.hideMainPage = !this.isChildPath(this.$route.path);
        }
      },
      methods: {
        isChildPath(path) {
          var arr = path.substr(1).path.split("/");
          return arr.length > 1
        }
      },
      beforeRouteUpdate (to, from, next) {
        console.log("beforeRouteEnter")
        if(this.$q.screen.lt.md){
          this.hideMainPage = !this.isChildPath(to.path);
        }
        next();
      }
    }
</script>

<style scoped>
  .father{
    flex-grow: 1;
    box-shadow: 0 3px 5px -1px rgba(0,0,0,0.2), 0 5px 8px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.12);
  }
</style>
