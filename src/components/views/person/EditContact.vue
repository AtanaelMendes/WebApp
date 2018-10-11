<template>
  <AgroLayout :back-path="'/pessoa/editar/'+ 1">
    <template slot="title">
      Editar contato
    </template>

    <div slot="content" >
      <q-page padding class="row">

        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">

          <q-item>
            <q-item-main align="center">
              <q-btn-toggle v-model="form.fiscalCobranca" toggle-color="secondary"
                            :options="[
                            {label: 'Fiscal', value: 1},
                            {label: 'Cobrança', value: 2}]"
              />
            </q-item-main>
          </q-item>

          <q-item>
            <q-item-main>
              <q-input type="text" float-label="Nome" v-model="form.nome" clearable/>
            </q-item-main>
          </q-item>

          <q-item>
            <q-item-main>
              <q-input type="email" float-label="Email" v-model="form.email" clearable/>
            </q-item-main>
          </q-item>

          <q-item>
            <q-item-main>
              <q-input type="number" float-label="Telefone" v-model="form.phone" clearable/>
            </q-item-main>

            <q-item-side>
              <q-btn-toggle dense v-model="form.phoneType" toggle-color="secondary"
                            :options="[
                            {label: 'celular', value: 1, icon: 'stay_primary_portrait'},
                            {label: 'Fixo', value: 2, icon: 'phone'}]"
              />
            </q-item-side>
          </q-item>

          <q-item>
            <q-item-main align="end">
              <q-btn label="salvar" color="secondary" @click="create()"/>
            </q-item-main>
          </q-item>

        </div>

      </q-page>
    </div>
  </AgroLayout>
</template>

<script>

  import AgroLayout from 'layouts/AgroLayout'

  export default {
    name: 'index-example',
    components: {
      AgroLayout
    },
    data () {
      return {
        form: {
          nome: null,
          email:null,
          phone: null,
          phoneType: 1,
          fiscalCobranca: 1,
        }
      }
    },
    methods: {
      create: function () {
        console.log('criou')
      }
    },
    mounted() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
