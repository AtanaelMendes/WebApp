<template>
  <div>
    <q-select
    filter
    v-model="select"
    :options="options"
    @input="handleInput"
    />
    Label: '{{ label }}'
    <button @click="teste" value='teste'></button>
  </div>
</template>
<script>

import TypeService from 'assets/js/service/utils/TypeService.js'

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
      typeService: new TypeService(),
      select: this.value,
    }
  },
  computed: {
    label: function () {
      return this.typeService.labelById(this.type, this.value)
    },
    options: function () {
      return this.typeService.optionsByType(this.type)
    }
  },
  methods:{
    handleInput(value) {
      this.$emit('input', value)
    },
    teste() {

    }
  },
  mounted() {
  },
  destroyed() {
  }
}
</script>
