<template>
  <q-select

    :value="value"
    @input="handleInput"
    :options="options"

    :float-label="floatLabel"
    :stack-label="stackLabel"
    :filter="filter"
    :clearable="clearable"

    :multiple="multiple"
    :toggle="toggle"
    :chips="chips"

  />
</template>
<script>

export default {
  name: "ap-select-nota-fiscal-serie",
  props: {
    type: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      default: null
    },
    floatLabel: {
      type: String,
      default: null
    },
    stackLabel: {
      type: String,
      default: 'Tipo'
    },
    filter: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    toggle: {
      type: Boolean,
      default: true
    },
    chips: {
      type: Boolean,
      default: true
    },
  },
  computed: {
    options: function () {
      return this.$typeService.optionsByType(this.type, this.value)
    }
  },
  methods:{
    handleInput(value) {
      this.$emit('input', value)
    },
  },
}
</script>
