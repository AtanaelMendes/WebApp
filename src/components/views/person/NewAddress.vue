<template>
  <AgroLayout :back-path="'/pessoa/editar/'+ 1">
    <template slot="title">
      Novo Endereço
    </template>
    <div slot="rightBtn">
      <q-btn flat round icon="done" @click="createAddress()" v-if="$q.platform.is.mobile"/>
    </div>


    <div slot="content">
      <q-page padding class="row">
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
          <form class="gutter-y-xs" @keyup.enter="createAddress()">
            <div>
              <q-input
                v-model="formUser.endereco"
                float-label="Endereço"
                clearable
                @blur="$v.formUser.endereco.$touch"
                :error="$v.formUser.endereco.$error"
              />
            </div>
            <div>
              <q-input
                v-model="formUser.numero"
                type="number"
                float-label="Número"
                clearable
                @blur="$v.formUser.numero.$touch"
                :error="$v.formUser.numero.$error"
              />
            </div>
            <div>
              <q-input v-model="formUser.complemento" float-label="Complemento" clearable/>
            </div>
            <div>
              <q-input
                v-model="formUser.bairro"
                float-label="Bairro"
                clearable
                @blur="$v.formUser.bairro.$touch"
                :error="$v.formUser.bairro.$error"
              />
            </div>
            <div>
              <q-select
                v-model="formUser.cidade"
                placeholder="Cidade"
                clearable
                :options="selectOptions"
                @blur="$v.formUser.cidade.$touch"
                :error="$v.formUser.cidade.$error"
              />
            </div>
            <div>
              <q-input v-model="formUser.cep" type="number" float-label="CEP" clearable/>
            </div>
            <div>
              <q-checkbox class="q-pr-sm" v-model="formUser.fiscal" label="Fiscal" />
              <q-checkbox v-model="formUser.cobranca" label="Cobrança" />
            </div>
            <div align="end">
              <q-btn color="secondary" label="Salvar" @click="createAddress()" v-if="$q.platform.is.desktop"/>
            </div>
          </form>
        </div>
      </q-page>
    </div>
  </AgroLayout>
</template>

<script>
  import NewAddressMixin from 'components/views/mixins/NewAddressMixin'
  import { required, minLength } from 'vuelidate/lib/validators'
  import AgroLayout from 'layouts/AgroLayout'
  export default {
    name: 'new-address',
    components: {
      AgroLayout
    },
    mixins: [NewAddressMixin],
    validations: {
      formAddress: {
        endereco: { required, minLength: minLength(5) },
        numero: { required },
        bairro: { required, minLength: minLength(5) },
        cidade: { required }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
