<template>
  <img v-lazy="imgObj" class="responsive"/>
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
      imgObj: {
        src: this.getUrl(),
        error: 'statics/images/no-image-16-10.svg',
        loading: 'statics/images/ajax-loading-gif.gif'
      },
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
    validSize: function () {
      if (this.availableSizes.indexOf(this.size) == -1) {
        console.error(this.size + ' não é um tamanho válido, corrija para um destes:', this.availableSizes)
        return false
      }
      return true
    }
  },
  methods:{
    getUrl(){
      let url;
      if (!this.validSize || !this.fileName) {
        url = 'statics/images/no-image-16-10.svg'
      }
      url = AgroUtils.image.makeUrl(this.fileName, this.size)

      return url;
    },
    imageLoadError({ el, src }){
      console.log(el, src)
    }
  },
  mounted() {
    this.$Lazyload.$on('error', this.imageLoadError);
  },
  destroyed() {
    this.$Lazyload.$off('error', this.imageLoadError);
  }
}
</script>
