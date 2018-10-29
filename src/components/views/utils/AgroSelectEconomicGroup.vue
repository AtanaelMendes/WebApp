<template>
  <q-select
    :value="value"
    :options="data"
    :float-label="label"
    @change="handleChange"
    clearable
  />
</template>

<script>
  import { QSelect } from 'quasar'
  export default {
    name: 'agro-select-economic-group',
    props: ['value', 'label'],
    components: {
      QSelect
    },
    data () {
      return {
        data: []
      }
    },
    methods: {
      handleChange (newVal) {
        this.$emit('input', newVal)
      },
      loadData: function () {
        let vm = this

        vm.$axios.get('grupo_economico' ).then(function (request) {
          vm.data = request.data.map(grupoEconomico => {
            return {
              value: grupoEconomico.id,
              label: grupoEconomico.nome
            }
          })
        }).catch(function (error) {
          console.log(error.response)
        })
      }
    },
    created () {
      this.loadData()
    }
  }
</script>

<style>
</style>
