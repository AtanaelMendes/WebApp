<template>
  <q-modal v-model="visible" no-backdrop-dismiss no-esc-dismiss class="ap-modal"
           :content-css="{maxWidth: '100vh', maxHeight: '80vh'}" minimized @hide="hideEvent">

      <q-modal-layout class="relative-position">
        <div class="q-px-lg q-pb-sm q-pt-lg" slot="header">
          <div class="q-title">{{title}}</div>
          <div class="search-container" v-if="searchable" v-bind:class="{'search-container-opened':searchVisible}">
            <q-search v-model="searchValue" v-if="searchVisible"
                      @input="inputSearchEvent" @blur="closeSearchOnBlur" @keydown="inputSearchKeyDownEvent"
                      placeholder="Pesquisar..." style="padding-left: 16px"
                      no-icon autofocus hide-underline/>
            <q-btn flat round dense icon="search" v-if="!searchVisible" @click="openSearch(null)" />
            <q-btn flat round dense icon="close" v-if="searchVisible" @click="closeSearchOnButtonClicked" />
          </div>
        </div>

        <div class="relative-position" style="min-height: 100px">
          <slot name="content"/>
          <q-inner-loading :visible="isInnerProgressVisible">
            <q-spinner size="60px"></q-spinner>
          </q-inner-loading>
        </div>

        <div class="q-pa-sm" slot="footer">
          <slot name="footer"/>
        </div>
      </q-modal-layout>

      <q-inner-loading :visible="isOuterProgressVisible" style="pointer-events: unset; z-index: 6000">
        <q-spinner size="60px" ></q-spinner>
      </q-inner-loading>

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
        isInnerProgressVisible: false,
        isOuterProgressVisible: false,
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
      closeSearchEvent(event){
        this.$emit('search-close', event);
      },
      inputSearchKeyDownEvent(){
        if(event.key === "Escape"){
          this.closeSearch();
          this.closeSearchEvent('escape');
        }
      },
      openSearch(value = null){
        if(value){
          this.searchValue = value;
        }
        this.searchVisible = true;
      },
      closeSearchOnBlur(){
        if(this.searchValue === ""){
          this.closeSearch();
          this.closeSearchEvent('blur');
        }
      },
      closeSearchOnButtonClicked(){
        this.closeSearch();
        this.closeSearchEvent('click');
      },
      closeSearch(){
        this.searchValue = "";
        this.searchVisible = false;
      },
      showInnerProgress(){
        this.isInnerProgressVisible = true;
      },
      hideInnerProgress(){
        this.isInnerProgressVisible = false;
      },
      showOuterProgress(){
        this.isOuterProgressVisible = true;
      },
      hideOuterProgress(){
        this.isOuterProgressVisible = false;
      }
    }
  }
</script>

<style>
  .ap-modal.modal.minimized .modal-content{
    margin: 0 10px;
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

  .ap-modal .q-spinner circle{
    stroke-width: 6px;
    color: #8c8c8c;
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
