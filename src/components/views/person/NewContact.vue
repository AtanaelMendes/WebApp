<template>
  <AgroLayout back-path="/pessoas">
    <div slot="title">
      Novo Contato
    </div>

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
            <q-item-main v-if="form.phoneType == 1">
              <q-input type="number" float-label="Celular" v-model="form.cellPhone" clearable/>
            </q-item-main>

            <q-item-main v-if="form.phoneType == 2">
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
    name: 'new-contact',
    components: {
      AgroLayout
    },
    data () {
      return {
        form: {
          nome: null,
          email:null,
          phone: null,
          cellPhone: null,
          phoneType: 1,
          fiscalCobranca: 1,
        }
      }
    },
    methods: {
      create: function () {
        this.$v.form.$touch()
        if ( this.$v.form.$error ) {
          if( this.$v.form.nome.$error ){
            this.$q.notify( 'Nome Inválido' )
          }
          if( this.$v.form.email.$error ){
            this.$q.notify( 'Email inválido' )
          }
          if( this.$v.form.phone.$error ){
            this.$q.notify( 'Telefone inválido' )
          }
          if( this.$v.form.cellPhone.$error ){
            this.$q.notify( 'Celular inválido' )
          }
          return
        }
        // let vm = this
        // let params = {
        //   email: vm.form.email,
        //   password: vm.form.password,
        // }
        // vm.$axios.post( 'account', params ).then( response => {
        //   if (response.status == 201){
        //     vm.$q.notify({
        //       type: 'positive',
        //       message: 'Cadastro criado com sucesso'
        //     })
        //     vm.$router.push( '/usuario' )
        //   }
        // }).catch( error => {
        //   if (error.response.status == 422){
        //     this.$q.dialog({
        //       title:'Ops',
        //       message: 'Já existe um cadastro com esse email'
        //     })
        //   }
        //   console.log('Erro Ocorrido:')
        //   console.log(error)
        // })
      }
    },
    mounted() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
