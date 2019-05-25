<template>
  <q-field :error="model.errorMessage != null" :error-label="model.errorMessage">
    <q-input
      :type="type"
      v-mask="mask"
      :align="align"
      :suffix="suffix"
      :prefix="prefix"
      :loading="loading"
      autocomplete="foo"
      :disable="disable"
      :float-label="label"
      :decimals="decimals"
      :readonly="readonly"
      v-model="model.value"
      :autofocus="autofocus"
      :maxlength="maxlength"
      :placeholder="placeholder"
      v-on:input="clearErrorMessage()"
      @blur="$emit('blur', model.value)"
    />
  </q-field>
</template>

<script>
  //Mask Directive
  //https://github.com/quasarframework/quasar/pull/2513

  export default {
    name: "CustomInputText",
    props: {
      model: Object,
      type: String,
      align: String,
      placeholder: String,
      maxlength: String,
      suffix: String,
      prefix: String,
      label: String,
      mask: String,
      autofocus: String,
      decimals: Number,
      readonly: Boolean,
      disable: Boolean,
      loading: Boolean,
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
