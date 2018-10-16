<template>
  <AgroLayout :back-path="'/pessoa/editar/'+ 1">
    <template slot="title">
      Editar Endereço
    </template>
    <div slot="rightBtn">
      <q-btn flat round icon="done" @click="update()" v-if="$q.platform.is.mobile"/>
    </div>


    <div slot="content">
      <q-page padding class="row">
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 gutter-y-xs">
          <div>
            <q-input v-model="form.endereco" float-label="Endereço" clearable/>
          </div>
          <div>
            <q-input v-model="form.numero" type="number" float-label="Número" clearable/>
          </div>
          <div>
            <q-input v-model="form.complemento" float-label="Complemento" clearable/>
          </div>
          <div>
            <q-input v-model="form.bairro" float-label="Bairro" clearable/>
          </div>
          <div>
            <q-select v-model="form.cidade" placeholder="Cidade" clearable :options="selectOptions"/>
          </div>
          <div>
            <q-input v-model="form.cep" type="number" float-label="CEP" clearable/>
          </div>
          <div >
            <q-checkbox class="q-pr-sm" v-model="form.fiscal" label="Fiscal" />
            <q-checkbox v-model="form.cobranca" label="Cobrança" />
          </div>
          <div align="end">
            <q-btn color="secondary" label="Salvar" @click="update()" v-if="$q.platform.is.desktop"/>
          </div>
        </div>
      </q-page>
    </div>
  </AgroLayout>
</template>

<script>
  import { required, minLength } from 'vuelidate/lib/validators'
  import AgroLayout from 'layouts/AgroLayout'

  export default {
    name: 'new-address',
    components: {
      AgroLayout
    },
    data () {
      return {
        selectOptions: [
          {
            label: 'Google',
            value: 'goog'
          },
          {
            label: 'Facebook',
            value: 'fb'
          }
        ],
        form: {
          endereco: null,
          numero: null,
          complemento: null,
          bairro: null,
          cep: null,
          cidade: null,
          cobranca: false,
          fiscal: false
        }
      }
    },
    validations: {
      form: {
        endereco: { required, minLength: minLength(5) },
        numero: { required },
        bairro: { required, minLength: minLength(5) },
        cep: { required },
        cidade: { required }
      }
    },
    methods: {
      fakeData: function() {
        this.form.endereco = 'Rua dos Flamboyants'
        this.form.numero = '701'
        this.form.bairro = 'Jardim Jacarandas'
        this.form.cep = 78555000
        this.form.fiscal = true
      },
      update: function () {
        this.$v.form.$touch()
        if ( this.$v.form.$error ) {
          if ( this.$v.form.endereco.$error ){
            this.$q.notify( 'Informe um endereço' )
          }
          if ( this.$v.form.numero.$error ){
            this.$q.notify( 'Informe o numero' )
          }
          if ( this.$v.form.bairro.$error ){
            this.$q.notify( 'Informe o bairro' )
          }
          if ( this.$v.form.cidade.$error ){
            this.$q.notify( 'Informe a cidade' )
          }
          return
        }
        if (this.form.fiscal == false && this.form.cobranca == false ){
          this.$q.notify( 'Selecione ao menos um tipo de endereco' )
          return
        }
        this.$q.notify( {
          type: 'positive',
          message: 'função de update'
        } )
      }
    },
    mounted() {
      this.fakeData()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
