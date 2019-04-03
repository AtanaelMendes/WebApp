<template>
  <q-modal v-model="visible" no-backdrop-dismiss no-esc-dismiss class="ap-modal"
           :content-css="{maxWidth: '80vh', maxHeight: '80vh'}" minimized @hide="hideEvent">
    <q-modal-layout>
      <div class="q-px-lg q-pb-sm q-pt-lg" slot="header">
        <div class="q-title">{{title}}</div>
        <div class="search-container" v-if="searchable" v-bind:class="{'search-container-opened':searchVisible}">
          <q-search v-model="searchValue" v-if="searchVisible"
                    @input="inputSearchEvent" @blur="closeSearch(false)" @keydown="inputSearchKeyDownEvent"
                    placeholder="Pesquisar..." style="padding-left: 16px"
                    no-icon autofocus hide-underline/>
          <q-btn flat round dense icon="search" v-if="!searchVisible" @click="openSearch" />
          <q-btn flat round dense icon="close" v-if="searchVisible" @click="closeSearch(true)" />
        </div>
      </div>

      <div class="relative-position" style="min-height: 100px">
        <slot name="content"/>
        <q-inner-loading :visible="isProgressVisible">
          <q-spinner size="60px" color="red"></q-spinner>
        </q-inner-loading>
      </div>

      <div class="q-pa-sm" slot="footer">
        <slot name="footer"/>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  export default {
    name: "ApModal",
    props: {
      title: String,
      visible: Boolean,
      searchable: Boolean,
    },
    data(){
      return {
        searchVisible: false,
        searchValue: "",
        isProgressVisible: false,
      }
    },
    methods:{
      hideEvent(){
        this.searchVisible = false;
        this.searchValue = "";
        this.$emit('hide')
      },
      inputSearchEvent(value){
        this.$emit('search-input', value);
      },
      inputSearchKeyDownEvent(event){
        if(event.key === "Escape"){
          this.closeSearch(true);
        }
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
      },
      showProgress(){
        this.isProgressVisible = true;
      },
      hideProgress(){
        this.isProgressVisible = false;
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

  .ap-modal.animate-shake{
    animation: unset;
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
