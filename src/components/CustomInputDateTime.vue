<template>
  <q-field :error="model.errorMessage != null" class="q-mb-sm">
    <q-input
      :type="type"
      align="center"
      :stack-label="label"
      v-model="model.value"
      v-on:input="clearErrorMessage()"
      @blur="$emit('blur', model.value)"
    />
    <div class="q-field-bottom row no-wrap" style="height: 22px">
      <div class="q-field-error col" v-if="model.errorMessage != null" >{{model.errorMessage}}</div>
    </div>
  </q-field>
</template>

<script>
  //Mask Directive
  //https://github.com/quasarframework/quasar/pull/2513

  export default {
    name: "custom-input-datetime",
    props: {
      model: Object,
      type: String,
      label: String,
    },
    model:{
      event: 'blur',
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
