<template>
  <div style="height:100%">

    <slot name="toolbar"></slot>

    <q-scroll-area  style="width: 100%; height: 100%; min-height: 300px;" :thumb-style="{
      right: '4px',
      borderRadius: '5px',
      background: '#dfdfdf',
      width: '8px',
      opacity: 1}">

      <div>
        <slot></slot>
      </div>

    </q-scroll-area>

    <div class="ap-sticky-area">
      <slot name="fab-container"></slot>
    </div>

  </div>
</template>

<script>
  import { scroll } from 'quasar'
  export default {
    name: "CustomPage2"
  }
</script>

<style scoped>
  .ap-page-container-toolbar{
    height: 64px;
    background-color: #f5f5f5 !important;
    color: #777777 !important;
  }

  .ap-page-container-toolbar .q-toolbar-title{
    font-weight: 400;
  }
</style>
