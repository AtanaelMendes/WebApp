<template>
  <AgroLayout back-path="/">

    <template slot="title">
      Criar Permissão
    </template>

    <div slot="content" >
      <q-page padding class="row">

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <q-list>

            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <q-item>
                  <q-item-main>

                    <q-item-tile>Nova Permissão</q-item-tile>

                    <q-item-tile>
                      <q-input type="text" v-model="permissao.nome" float-label="Nome" clearable
                               @blur="$v.permissao.nome.$touch" :error="$v.permissao.nome.$error"
                      />
                    </q-item-tile>

                    <q-item-tile>
                      <q-input type="text" v-model.trim="permissao.codigo" float-label="Código" lower-case clearable
                               @blur="$v.permissao.codigo.$touch" :error="$v.permissao.codigo.$error"
                      />

                    </q-item-tile>

                    <q-item-tile>
                      <q-input type="text" v-model="permissao.descricao" float-label="Descrição" clearable :pattern="regex"/>
                    </q-item-tile>

                    <q-item-tile align="end" class="q-mt-md">
                      <q-btn @click.native="createPermission()" color="secondary" label="criar"/>
                    </q-item-tile>

                  </q-item-main>
                </q-item>
              </div>
            </div>


          </q-list>
        </div>

      </q-page>
    </div>

  </AgroLayout>
</template>

<script>
  import { required, helpers } from 'vuelidate/lib/validators'
  import AgroLayout from 'layouts/AgroLayout'
  const alpha = helpers.regex('alpha', /^[a-z_]+$/)

  export default {
    name: 'create-role',
    components: {
      AgroLayout
    },
    data () {
      return {
        regex:  /^[a-z_]+$/,
        codigo: null,
        permissao: {
          nome: null,
          codigo: null,
          descricao: null
        }
      }
    },
    validations: {
      permissao: {
        nome: { required },
        codigo: { required, alpha },
      }
    },
    methods: {
      createPermission: function () {
        this.$v.permissao.$touch()

        if ( this.$v.permissao.$error ) {
          this.$q.notify( 'preencha os campos corretamente' )
          return
        }
      }
    },
    mounted() {
    }
  }
</script>

<!--[08:47, 3/10/2018] Danilo: ^(ROLE)(_[A-Z]+)+$-->
<!--[08:47, 3/10/2018] Danilo: ^([a-z]+)(_[a-z]+)+$-->

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
