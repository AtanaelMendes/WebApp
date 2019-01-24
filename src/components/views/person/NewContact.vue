<template>
  <AgroLayout back-path="/pessoas">
    <div slot="title">
      Novo Contato
    </div>

    <div slot="content" >
      <q-page padding class="row">

        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">

          <q-item>
            <q-item-main>
              <q-input
                type="text"
                float-label="Nome"
                v-model="form.nome"
                clearable
                @blur="$v.formUser.nome.$touch"
                :error="$v.formUser.nome.$error"
              />
            </q-item-main>
          </q-item>

          <q-item>
            <q-item-main>
              <q-input
                type="email"
                float-label="Email"
                v-model="form.email"
                clearable
                @blur="$v.formUser.email.$touch"
                :error="$v.formUser.email.$error"
              />
            </q-item-main>
          </q-item>

          <q-item>
            <q-item-main >
              <q-input
                type="number"
                float-label="Telefone"
                v-model="form.phone"
                clearable
                @blur="$v.formUser.phone.$touch"
                :error="$v.formUser.phone.$error"
              />
            </q-item-main>

            <q-item-side>
              <q-btn-toggle
                dense v-model="form.setTelefoneTipo"
                toggle-color="secondary"
                :options="[{label: 'celular', value: 1, icon: 'stay_primary_portrait'},
                           {label: 'Fixo', value: 2, icon: 'phone'}]"
              />
            </q-item-side>
          </q-item>

          <q-item>
            <q-item-main>
              <q-checkbox class="q-pr-sm" v-model="form.fiscal" label="Fiscal" />
              <q-checkbox v-model="form.cobranca" label="Cobrança" />
            </q-item-main>
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
  import { required, maxLength, requiredIf, minLength, email } from 'vuelidate/lib/validators'
  import AgroLayout from 'layouts/AgroLayout'
  export default {
    name: 'new-contact',
    components: {
      AgroLayout
    },
    data () {
      return {
        formUser: {
          fiscal: false,
          cobranca: false,
          nome: null,
          email: null,
          phone: null,
          setTelefoneTipo: 1,
        }
      }
    },
    validations: {
      formUser: {
        nome: { required, minLength: minLength(3) },
        email: { email, required: requiredIf(function () { return this.formUser.phone == undefined}) },
        phone: { minLength: minLength(10), maxLength: maxLength(11),
          required: requiredIf(function () { return this.formUser.email == undefined})
        }
      }
    },
    methods: {
      create: function () {
        this.$v.formUser.$touch()
        if ( this.$v.formUser.$error ) {
          if ( this.$v.formUser.nome.$error ){
            this.$q.notify( 'Nome Inválido' )
          }
          if ( this.$v.formUser.email.$error ){
            this.$q.notify( 'Email inválido' )
          }
          if ( this.$v.formUser.phone.$error ){
            this.$q.notify( 'Telefone inválido' )
          }
          return
        }
        if (this.formUser.fiscal == false && this.formUser.cobranca == false ){
          this.$q.notify( 'Selecione ao menos um tipo de contato' )
          return
        }
        this.$q.notify({
          type: 'positive',
          message: 'função de create'
        })
        // let vm = this
        // let params = {
        //   email: vm.formUser.email,
        //   password: vm.formUser.password,
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
