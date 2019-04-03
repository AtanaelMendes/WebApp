<template>
  <q-modal v-model="visible" class="ap-modal relative-position" :content-css="{maxWidth: '80vh', minHeight: '80vh'}" :minimized="minimized" @hide="hideEvent">
    <q-modal-layout>
      <div class="q-px-lg q-pb-sm q-pt-lg" slot="header">
        <div class="q-title">{{title}}</div>
        <div class="search-container" v-bind:class="{'search-container-opened':searchVisible}">
          <q-search v-model="searchValue" v-if="searchVisible" @input="inputSearchEvent" @blur="closeSearch(false)"
                    placeholder="Pesquisar..." style="padding-left: 16px"
                    no-icon autofocus hide-underline/>
          <q-btn flat round dense icon="search" v-if="!searchVisible" @click="openSearch" />
          <q-btn flat round dense icon="close" v-if="searchVisible" @click="closeSearch(true)" />
        </div>

      </div>

      <slot name="content"/>

      <div class="q-pa-md" slot="footer">
        <slot name="footer"/>
      </div>
    </q-modal-layout>


    <q-inner-loading :visible="showProgress">
      <q-spinner size="70px" color="red"></q-spinner>
    </q-inner-loading>
  </q-modal>
</template>

<script>
  export default {
    name: "ApModal",
    props: {
      title: String,
      visible: Boolean,
      showProgress: Boolean,
      minimized: Boolean,
      type: String,
    },
    data(){
      return {
        searchVisible: false,
        searchValue: "",
      }
    },
    methods:{
      hideEvent(){
        this.searchVisible = false;
        this.searchValue = "";
        this.$emit('hide')
      },
      inputSearchEvent(value){
        console.log('search', value)
      },
      openSearch(){
        this.searchVisible = true;
      },
      closeSearch(force = false){
        if(force){
          this.searchValue = '';
          this.searchVisible = false;
        }else{
          if(this.searchValue === ""){
            this.closeSearch(true)
          }
        }
      }
    }
  }
</script>

<style>
  .ap-modal.modal.minimized .modal-content{
    margin: 0 20px;
    overflow: hidden;
  }

  .ap-modal-small.modal.minimized .modal-content{

  }

  .ap-modal-big.modal.minimized .modal-content{
    max-width: 90vw;
    max-height: 90vh;
    width: 90vw;
    height: 90vh;
  }

  .ap-modal .q-layout-header{
    box-shadow: none;
  }

  .ap-modal .q-layout-footer{
    box-shadow: none;
  }

  .search-container{
    display: inline-flex;
    position: absolute;
    right: 18px;
    top: 18px;
  }

  .search-container-opened{
    background: #eee;
    border-radius: 50px;
  }
</style>
