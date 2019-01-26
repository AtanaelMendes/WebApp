<template>
  <img :src="url" class="responsive"/>
</template>
<script>
import AgroUtils from 'assets/js/AgroUtils'

export default {
  name: "ap-image",
  props: {
    fileName: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: '400x250',
    }
  },
  data () {
    return {
      availableSizes: [
        '800x500',
        '500x500',
        '400x250',
        '250x250',
        '200x125',
        '125x125'
      ],
    }
  },
  computed: {
    url: function () {
      if (!this.validSize || !this.fileName) {
        return 'statics/images/no-image-16-10.svg'
      }
      return AgroUtils.image.makeUrl(this.fileName, this.size)
    },
    validSize: function () {
      if (this.availableSizes.indexOf(this.size) == -1) {
        console.error(this.size + ' não é um tamanho válido, corrija para um destes:', this.availableSizes)
        return false
      }
      return true
    }
  }
}
</script>
