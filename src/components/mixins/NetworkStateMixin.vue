<template>
    
</template>

<script>
  export default {
    name: "NetworkStateMixin",
    data () {
      return {
        isOnline: false,
        isOffline: false
      }
    },
    mounted () {
      console.log('NetworkStateMixin.mounted')
      if (typeof window !== undefined) {
        navigator.onLine ? this.isOnline = true : this.isOffline = true;

        const onlineHandler = () => {
          this.$emit('online');
          this.isOnline = true;
          this.isOffline = false;
        };

        const offlineHandler = () => {
          this.$emit('offline');
          this.isOffline = true;
          this.isOnline = false;
        };

        window.addEventListener('online',  onlineHandler);
        window.addEventListener('offline',  offlineHandler);

        this.$once('hook:beforeDestroy', () => {
          window.removeEventListener('online', onlineHandler);
          window.removeEventListener('offline', offlineHandler);
        })
      }
    }
  }
</script>

<style scoped>

</style>
