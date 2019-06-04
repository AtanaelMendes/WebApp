<template>
  <q-select
    filter
    v-model="selected"
    :options="options"
    @input="handleInput"
  />
</template>
<script>

export default {
  name: "ap-select-type",
  props: {
    type: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: null
    },
  },
  data () {
    return {
      selected: this.value,
    }
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
