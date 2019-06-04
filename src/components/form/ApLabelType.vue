<template>
  <span>
    {{ label }}
  </span>
</template>
<script>

export default {
  name: "ap-label-type",
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
    }
  },
  computed: {
    label: function () {
      return this.$typeService.labelById(this.type, this.value)
    },
  },
  methods:{
  },
}
</script>
