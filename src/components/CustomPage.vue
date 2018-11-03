<template>
  <q-page style="display: flex">
    <div style="flex-grow: 1; position: relative" v-if="!hideMainPage">

      <slot name="toolbar"></slot>

      <q-scroll-area v-if="!noScroll" style="width: 100%; height: 100%; z-index: 2" :class="{'shadow-4': isParent}" :thumb-style="{
        right: '4px',
        borderRadius: '5px',
        background: '#dfdfdf',
        width: '8px',
        opacity: 1}">

        <div :class="getContainerClasses" >
          <slot></slot>
        </div>

      </q-scroll-area>

      <div v-if="noScroll" :class="getContainerClasses" class="child" >
        <slot></slot>
      </div>

      <div class="fab-container">
        <slot name="fab-container"></slot>
      </div>
    </div>

    <router-view :style="{width: childWidth}"  v-bind:class="{'child-full-width' : hideMainPage}" />
  </q-page>
</template>

<script>
    export default {
      name: "CustomPage",
      props: {
        hasMargin: Boolean,
        widthInner: String,
        isChild: Boolean,
        isParent: Boolean,
        noScroll: {
          type: Boolean,
          default: false
        }
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
        },
        childWidth: function () {
          return this.widthInner
        }
      },
      mounted(){
        this.$root.$on('childMounted', this.childMounted);

        this.$root.$on('childUnmounted', this.childUnmounted);

        if(this.$q.screen.lt.md) {
          if (this.isChild) {
            this.$root.$emit("childMounted")
          }
        }
      },
      destroyed() {
        if(this.isChild){
          this.$root.$emit("childUnmounted")
        }
      },
      methods: {
        childMounted: function() {
          if(this.isParent) {
            this.hideMainPage = true;
          }

        },
        childUnmounted: function () {
          if(this.isParent) {
            this.hideMainPage = false;
          }
        }
      },
    }
</script>

<style scoped>
  .father{
    box-shadow: 0 3px 5px -1px rgba(0,0,0,0.2), 0 5px 8px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.12);
  }
  .child{
    height: 100%;;
  }

  .child-full-width{
    width: 100% !important;
  }

  .fab-container{
    position: absolute;
    bottom: 18px;
    right: 18px;
    z-index: 1000;
  }
</style>
