<template>
  <div>
    <template v-if="validSize" >
      <img :src="fullUrl" class="responsive" v-if="fileName"/>
      <img src="statics/images/no-image-16-10.svg" class="responsive" v-else/>
    </template>
    <template v-else>
      <h3>Propriedade Size da imagem incorreta</h3>
    </template>
  </div>
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
      validator: function (value) {
        return [
          '800x500',
          '500x500',
          '400x250',
          '250x250',
          '200x125',
          '125x125'
        ].indexOf(value) !== -1
      }
    }
  },
  computed: {
    fullUrl: function () {
      return AgroUtils.image.makeUrl(this.fileName, this.size)
    },
    validSize: function () {
      return [
        '800x500',
        '500x500',
        '400x250',
        '250x250',
        '200x125',
        '125x125'
      ].indexOf(this.size) !== -1
    }
  }
}
</script>
