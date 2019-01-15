<template>
  <div class="row">
    <div class="col-12 text-center">
      <img src="/statics/images/farmer.svg" class="responsive q-mt-xl"/>
      <p class="q-mt-md text-grey">{{mensagem}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "sem-resultados",
  props: {
    mensagem: {
      type: String,
      default: 'Nenhum resultado encontrado.'
    }
  }
}
</script>
