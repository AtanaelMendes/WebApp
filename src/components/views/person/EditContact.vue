<template>
  <AgroLayout :back-path="'/pessoa/editar/'+ 1">
    <template slot="title">
      Editar contato
    </template>

    <div slot="content" >
      <q-page padding class="row">

        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">

          <q-item>
            <q-item-main>
              <q-input
                type="text"
                float-label="Nome"
                v-model="formContact.nome"
                clearable
                @blur="$v.formContact.nome.$touch"
                :error="$v.formContact.nome.$error"
              />
            </q-item-main>
          </q-item>

          <q-item>
            <q-item-main>
              <q-input
                type="email"
                float-label="Email"
                v-model="formContact.email"
                clearable
                @blur="$v.formContact.email.$touch"
                :error="$v.formContact.email.$error"
              />
            </q-item-main>
          </q-item>

          <q-item>
            <q-item-main >
              <q-input
                type="number"
                float-label="Telefone"
                v-model="formContact.phone"
                clearable
                @blur="$v.formContact.phone.$touch"
                :error="$v.formContact.phone.$error"
              />
            </q-item-main>

            <q-item-side>
              <q-btn-toggle
                dense v-model="formContact.phoneType"
                toggle-color="secondary"
                :options="[{label: 'celular', value: 1, icon: 'stay_primary_portrait'},
                           {label: 'Fixo', value: 2, icon: 'phone'}]"
              />
            </q-item-side>
          </q-item>

          <q-item>
            <q-item-main>
              <q-checkbox class="q-pr-sm" v-model="formContact.fiscal" label="Fiscal" />
              <q-checkbox v-model="formContact.cobranca" label="Cobrança" />
            </q-item-main>
          </q-item>

          <q-item>
            <q-item-main align="end">
              <q-btn label="salvar" color="secondary" @click="updateContact()"/>
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
  import EditContactMixin from 'components/views/mixins/EditContactMixin'

  export default {
    name: 'index-example',
    components: {
      AgroLayout
    },
    mixins: [EditContactMixin],
    validations: {
      formContact: {
        nome: { required, minLength: minLength(3) },
        email: { email, required: requiredIf(function () { return this.form.phone == undefined}) },
        phone: { minLength: minLength(10), maxLength: maxLength(11),
          required: requiredIf(function () { return this.form.email == undefined})
        }
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
