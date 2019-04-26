<template>
  <q-page>
    <slot name="toolbar"></slot>

    <slot></slot>

    <div class="fab-container">
      <slot name="fab-container"></slot>
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

<style>
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
    top: 71%;
    right: 18px;
    z-index: 1000;
  }

  .q-popover .q-list-link > .q-item:hover{
    background: #f5f5f5;
  }
  .q-popover .q-item-label {
    white-space: nowrap;
  }
</style>
