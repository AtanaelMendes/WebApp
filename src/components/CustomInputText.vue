<template>
  <q-field :error="model.errorMessage != null" class="q-mb-sm">
    <q-input
      v-mask="mask"
      autocomplete="foo"
      :readonly="readonly"
      v-model="model.value"
      :autofocus="autofocus"
      :maxlength="maxlength"
      :suffix="suffix"
      :placeholder="placeholder"
      v-on:input="clearErrorMessage()"
      :type="type" :float-label="label"
      :loading="loading"
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
      placeholder: String,
      maxlength: String,
      suffix: String,
      label: String,
      mask: String,
      autofocus: String,
      readonly: Boolean,
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
