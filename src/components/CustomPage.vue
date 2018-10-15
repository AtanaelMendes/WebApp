<template>
  <q-page style="display: flex">
    <div style="flex-grow: 1;" v-if="!hideMainPage">

      <slot name="toolbar"></slot>

      <q-scroll-area style="width: 100%; height: 100%;" class="child" :thumb-style="{
        right: '4px',
        borderRadius: '5px',
        background: '#dfdfdf',
        width: '8px',
        opacity: 1}">

        <div :class="getContainerClasses" >
          <slot></slot>
        </div>

      </q-scroll-area>
    </div>

    <router-view style="flex-grow: 1.5" />
  </q-page>
</template>

<script>
    export default {
      name: "CustomPage",
      props: {
        hasMargin: Boolean
      },
      data: function () {
        return {
          hideMainPage: false,
        }
      },
      computed: {
        getContainerClasses: function () {
          return {
            //'child': this.isChildPath(this.$route.path),
            'q-pa-sm': this.hasMargin
          }
        }
      },
      created(){
        if(this.$q.screen.lt.md) {
          this.hideMainPage = !this.isChildPath(this.$route.path);
        }
      },
      methods: {
        isChildPath(path) {
          if(path.charAt(0) === '/'){
            path = path.substr(1);
          }
          if(path.charAt(path.length - 1) === '/'){
            path = path.substr(0, path.length - 1);
          }
          var arr = path.split("/");
          return arr.length > 2
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
    box-shadow: 0 3px 5px -1px rgba(0,0,0,0.2), 0 5px 8px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.12);
  }
  .child{
    border-right: 1px solid #dddddd;
  }
</style>
