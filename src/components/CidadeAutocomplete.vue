<template>
  <q-field :error="model.errorMessage != null" class="q-mb-sm">

    <q-search v-model="model.value" :float-label="label">
      <q-autocomplete @search="search" @selected="selected" />
    </q-search>

    <div class="q-field-bottom row no-wrap" style="height: 22px">
      <div class="q-field-error col" v-if="model.errorMessage != null" >{{model.errorMessage}}</div>
    </div>
  </q-field>
</template>

<script>
  export default {
    name: "cidade-autocomplete",
    props: {
      model: Object,
      label: String,
    },
    data: function () {
      return {
        clearErrorMessage: function () {
          this.model.errorMessage = null
        }
      }
    },
  }
</script>

<style>
</style>
