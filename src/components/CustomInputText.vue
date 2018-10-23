<template>
  <q-field :error="model.errorMessage != null" class="q-mb-sm">
    <q-input v-model="model.value" v-on:input="clearErrorMessage()" :type="type" :float-label="label" :placeholder="placeholder"/>
    <div class="q-field-bottom row no-wrap" style="height: 22px">
      <div class="q-field-error col" v-if="model.errorMessage != null" >{{model.errorMessage}}</div>
    </div>
  </q-field>
</template>

<script>
  export default {
    name: "CustomInputText",
    props: {
      model: Object,
      type: String,
      placeholder: String,
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

<style scoped>

</style>
