<template>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  created() {
    let token = localStorage.getItem('auth.token');

    if (token == null) {
      this.$router.push('/login')
    } else {
      this.$router.push('/admin')
    }
  }
}
</script>
