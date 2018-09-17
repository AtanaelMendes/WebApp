<template>
  <AgroLayout>

    <template slot="title">
      Início
    </template>

    <div slot="content" class="layout-padding">
      <div class="row gutter-sm">

        <div class="col-3">
          <q-card class="bg-secondary">
            <q-card-title>
              Emissão de Nota
            </q-card-title>
            <q-card-main>
              uhuhuhuhu
            </q-card-main>
          </q-card>
        </div>

        <div class="col-3">
          <q-card class="bg-secondary">
            <q-card-title>
              Contratos
            </q-card-title>
            <q-card-main>
              uhuhuhuhu
            </q-card-main>
          </q-card>
        </div>
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
</style>
