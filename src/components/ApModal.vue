<template>
  <q-modal v-model="isModalOpened" minimized class="ap-modal" >
    <q-modal-layout>

      <div class="q-pa-md q-title text-center" v-if="title" slot="header">
        {{title}}
      </div>


      <slot name="content"></slot>

      <div class="q-pa-md" slot="footer">
        <slot name="footer"></slot>
      </div>
    </q-modal-layout>

    <!--<div class="q-pa-md q-title text-center header" v-if="title">
      {{title}}
    </div>

    <div class="content">
      <slot name="content"></slot>
    </div>

    <div class="q-pa-md footer">
      <slot name="footer"></slot>
    </div>-->
  </q-modal>
</template>

<script>
  export default {
    name: "ApModal",
    props: {
      title: String,
      isModalOpened: Boolean,
    }
  }
</script>

<style>
  .ap-modal.modal.minimized .modal-content{
    max-width: 90vw;
    max-height: 90vh;
    width: 90vw;
    height: 90vh;
    overflow: hidden;
  }
  .ap-modal .q-layout-header{
    box-shadow: none;
  }

  .ap-modal .q-layout-footer{
    box-shadow: none;
  }
</style>
