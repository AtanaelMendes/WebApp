<template>
  <q-field :error="model.errorMessage != null" class="q-mb-sm">
    <q-select
      :options="options"
      :float-label="label"
      v-model="model.value"
      v-on:input="clearErrorMessage()"
    />
    <div class="q-field-bottom row no-wrap" style="height: 22px">
      <div class="q-field-error col" v-if="model.errorMessage != null" >{{model.errorMessage}}</div>
    </div>
  </q-field>
</template>
<script>
  import { filter } from 'quasar'
  export default {
    name: "produtor-select",
    props: {
      label: String,
      model: Object,
      options: Array
    },
    data: function () {
      return {
        clearErrorMessage: function () {
          this.model.errorMessage = null
        }
      }
    }
  }
</script>
