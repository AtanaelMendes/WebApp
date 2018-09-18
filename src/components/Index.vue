<template>
  <AgroLayout drawer class="bg-green-1">

    <template slot="title" class="fundo">
      Início
    </template>

    <div slot="drawer">
      <q-list link no-border>
        <q-list-header>Menu</q-list-header>

        <q-item>
          <q-item-main>
            Emissão de Notas
          </q-item-main>
        </q-item>

        <q-item>
          <q-item-main>
            Contratos
          </q-item-main>
        </q-item>

        <q-item>
          <q-item-main>
          </q-item-main>
        </q-item>

        <q-item>
          <q-item-main>
          </q-item-main>
        </q-item>

      </q-list>
    </div>

    <div slot="content" class="layout-padding">
      <div class="row gutter-sm justify-center">


      </div>
    </div>

  </AgroLayout>
</template>

<script>
import AgroLayout from '../layouts/AgroLayout'

export default {
  name: 'index',
  components: {
    AgroLayout
  },

  data () {
    return {
      left: false
    }
  },
  methods: {
  },
  mounted () {
  }

}
</script>

<style>
.img-responsive{
  height: auto;
  width: auto;
}
</style>
