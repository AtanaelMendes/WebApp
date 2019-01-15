<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="/statics/images/vin-diesel.gif"
        style="max-height:50vh; max-width:100vw"
      >
    </p>
    <p class="text-faded">Desculpe, nada aqui...<strong>(404)</strong></p>
    <q-btn
      color="secondary"
      style="width:200px;"
      @click="$router.push('/')"
    >Voltar</q-btn>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
