<template>
  <q-field :error="model.errorMessage != null" class="q-mb-sm">
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
      :disable="disable"
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
      disable: Boolean,
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
