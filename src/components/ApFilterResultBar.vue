<template>
  <div v-if="params" style="top:0px; position:sticky; z-index:1000" class="q-pa-xs shadow-2 bg-grey-2 ">
    <q-item dense>
      <q-item-main>
        <template v-for="param in params" >
          <div style="display: inline-flex"><span class="bold q-caption text-weight-light text-no-wrap">{{param.nome}}:&nbsp</span></div>
          <div style="display: inline-flex"><span class="q-caption text-weight-medium text-no-wrap q-mr-sm">{{param.valor}}</span></div>
        </template>
      </q-item-main>
      <q-item-side>
        <q-btn flat round dense icon="mdi-filter-remove" @click="$emit('clear_button_clicked')" />
      </q-item-side>
    </q-item>
  </div>
</template>

<script>
  export default {
    name: "ApFilterResultBar",
    data(){
      return {
        params: null,
      }
    },
    methods:{
      show(params){
        this.params = params;
      },
      hide(){
        this.params = null;
      },
    }
  }
</script>

<style scoped>

</style>
