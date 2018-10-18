<template>
  <AgroLayout back-path="/pessoas">

    <div slot="title">
      Nova Pessoa
    </div>

    <div slot="rightBtn">
      <q-btn flat round icon="done" @click="create()" v-if="$q.platform.is.mobile"/>
    </div>

    <div slot="content" >

      <!--tab perfil-->
      <q-page padding class="row">
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">

          <form @keyup.enter="create()" class="q-mx-lg q-px-lg gutter-y-xs">
            <div>
              <q-btn-toggle
                v-model="docType"
                toggle-color="secondary"
                :options="[{label: 'Física', value: 1},
                           {label: 'Jurídica', value: 2}]"
              />
            </div>

            <div>
              <q-item class="q-pa-none">
                <q-item-main>
                  <q-select v-model="select" placeholder="Grupo Econômico" clearable :options="selectOptions"/>
                  <!--<agro-autocomplete-economic-group placeholder="Grupo Econômico" v-model="data.codgrupoeconomico" :init="data.codgrupoeconomico"/>-->
                </q-item-main>
                <q-item-side>
                  <q-btn color="secondary" dense square icon="add" @click.native="modalCreateGE = true"/>
                </q-item-side>
              </q-item>
            </div>

            <div>
              <q-input
                v-model="form.nome"
                float-label="Nome" type="text"
                @blur="$v.form.nome.$touch"
                :error="$v.form.nome.$error"
                clearable
              />
            </div>

            <div v-if="docType == 1">
              <q-input
                v-model="form.cpf"
                float-label="CPF"
                type="number"
                @blur="$v.form.cpf.$touch"
                :error="$v.form.cpf.$error"
                clearable
              />
            </div>

            <div v-if="docType == 2" >
              <q-input
                v-model="form.cnpj"
                float-label="CNPJ"
                type="number"
                @blur="$v.form.cnpj.$touch"
                :error="$v.form.cnpj.$error"
                clearable
              />
            </div>

            <div>
              <q-input v-model="form.ie" float-label="Inscrição Estadual" type="number" clearable/>
            </div>

            <div>
              <q-input v-model="form.im" float-label="Inscrição Municipal" type="number" clearable/>
            </div>

            <div v-if="docType == 2">
              <q-input v-model="form.razaoSocial" float-label="Razão Social" type="text" clearable/>
            </div>

            <div v-if="docType == 2">
              <q-input v-model="form.nomeFantasia" float-label="Nome Fantasia" type="text" clearable/>
            </div>

            <div align="end">
              <q-btn color="secondary" label="Cadastrar" @click="create()" v-if="$q.platform.is.desktop"/>
            </div>

          </form>
        </div>
        <!--fim tab perfil-->
      </q-page>

      <!--modal de create GE-->
      <q-modal v-model="modalCreateGE" minimized>
        <q-card>
          <q-card-main>
            <q-input float-label="Grupo Econômico" v-model="novoGrupoEconomico"/>
          </q-card-main>
          <q-card-actions align="end">
            <q-btn flat color="secondary" @click="modalCreateGE = false"  label="Cancelar"/>
            <q-btn color="secondary" @click="createEconomicGroup()"  label="Criar"/>
          </q-card-actions>
        </q-card>
      </q-modal>

    </div>
  </AgroLayout>
</template>

<script>
import { required, maxLength, requiredIf, minLength } from 'vuelidate/lib/validators'
import AgroLayout from 'layouts/AgroLayout'
import { Platform } from 'quasar'
import agroAutocompleteEconomicGroup from 'components/views/utils/agroAutocompleteEconomicGroup'
export default {
  name: 'nova-pessoa',
  components: {
    AgroLayout,
    agroAutocompleteEconomicGroup
  },
  data () {
    return {
      docType: 1,
      select: null,
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
      modalCreateGE: false,
      novoGrupoEconomico: null,
      tabs: 'tab-perfil',
      form: {
        nome: null,
        cpf: null,
        cnpj: null,
        razaoSocial: null,
        nomeFantasia: null,
        grupoEconomico: null,
        ie: null,
        im: null
      }
    }
  },
  validations: {
    form: {
      nome: { required, minLength: minLength(3) },
      grupoEconomico: { required },
      cpf: { minLength: minLength(11), maxLength: maxLength(11), required: requiredIf(function () { return this.docType == 1 }) },
      cnpj: { minLength: minLength(14), maxLength: maxLength(14), required: requiredIf(function () { return this.docType == 2 }) },
    }
  },
  methods: {
    createEconomicGroup: function(){
      this.$q.notify({
        type: 'positive',
        message: 'Funcao de Create GE'
      })
    },
    create: function () {
      this.$v.form.$touch()
      if ( this.$v.form.$error ) {
        if( this.$v.form.nome.$error ){
          this.$q.notify( 'Nome inválido' )
        }
        if( this.$v.form.cpf.$error ){
          this.$q.notify( 'CPF inválido' )
        }
        if( this.$v.form.cnpj.$error ){
          this.$q.notify( 'CNPJ inválido' )
        }
        if( this.$v.form.grupoEconomico.$error ){
          this.$q.notify( 'Selecione ao menos um grupo econômico' )
        }
        return
      }
      this.$q.notify({
        type: 'positive',
        message: 'Passou'
      })

      // let vm = this
      // let params = {
      //   email: vm.form.email,
      //   password: vm.form.password,
      // }
      // vm.$axios.post( 'account-pessoa', params ).then( response => {
      //   if (response.status == 201){
      //     vm.$q.notify({
      //       type: 'positive',
      //       message: 'Cadastro criado com sucesso'
      //     })
      //     vm.$router.push( '/pessoas' )
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
