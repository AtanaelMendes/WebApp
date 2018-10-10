<template>
  <AgroLayout back-path="/pessoas">

    <div slot="title">
      Editar
    </div>

    <div slot="rightBtn">
      <q-btn flat round icon="done" @click="updatePerson()" v-if="$q.platform.is.mobile"/>
    </div>

    <div slot="tabHeader">
      <q-tabs v-model="tabs" color="secondary">
        <q-tab slot="title" name="tab-perfil" icon="account_box" label="Perfil" default/>
        <q-tab slot="title" name="tab-contato" icon="contact_mail" label="Contato"/>
      </q-tabs>
    </div>

    <div slot="content">
      <div class="row" v-if="tabs=='tab-perfil'">
        <div  class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-mx-lg q-px-lg gutter-y-xs">

          <div>
            <q-input stack-label="Nome" type="text" v-model="form.nome" clearable/>
          </div>

          <div>
            <q-input stack-label="CPF" type="number" v-model="form.cpf" clearable/>
          </div>

          <div>
            <q-input stack-label="CNPJ" type="number" v-model="form.cnpj" clearable/>
          </div>

          <div>
            <q-input stack-label="Inscrição Estadual" type="number" v-model="form.ie" clearable/>
          </div>

          <div>
            <q-input stack-label="Razão Social" type="text" v-model="form.razaoSocial" clearable/>
          </div>

          <div>
            <q-input stack-label="Nome Fantasia" type="text" v-model="form.nomeFantasia" clearable/>
          </div>

          <div>
            <q-input stack-label="Grupo Econômico" type="text" v-model="form.grupoEconomico" clearable/>
          </div>

          <div align="end">
            <q-btn color="secondary" label="Salvar" @click="updatePerson()" v-if="$q.platform.is.desktop"/>
          </div>

          <!--fim tab perfil-->
        </div>
      </div>

      <div class="row" v-if="tabs == 'tab-contato'">
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="contato in 4" :key="contato">
          <q-card class="q-ma-md q-body-1">
            <q-card-title class="q-py-xs">
              Fiscal/Cobrança
            </q-card-title>
            <q-card-separator/>
            <q-card-main>
              <q-list no-border class="q-py-xs">

                <q-item class="q-py-xs q-body-1">
                  <q-item-main>
                    <q-item-tile stamp class="text-faded">
                      Nome
                    </q-item-tile>
                    <q-item-tile>
                      Ronaldinho
                    </q-item-tile>
                  </q-item-main>
                </q-item>

                <q-item class="q-py-xs q-body-1">
                  <q-item-main>
                    <q-item-tile stamp class="text-faded">
                      Email
                    </q-item-tile>
                    <q-item-tile style="overflow: hidden">
                      atanaelmendes@gmail.com
                    </q-item-tile>
                  </q-item-main>
                </q-item>

                <q-item class="q-py-xs q-body-1">
                  <q-item-main>
                    <q-item-tile stamp class="text-faded">
                      Celular
                    </q-item-tile>
                    <q-item-tile>
                      {{numeral(celular).format('00000000000').replace(/^(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2-$3-$4")}}
                    </q-item-tile>
                  </q-item-main>
                </q-item>

                <q-item class=" q-body-1">
                  <q-item-main>
                    <q-item-tile stamp class="text-faded">
                      Fixo
                    </q-item-tile>
                    <q-item-tile>
                      {{numeral(fixo).format('0000000000').replace(/^(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")}}
                    </q-item-tile>
                  </q-item-main>
                </q-item>

              </q-list>
            </q-card-main>
            <q-card-separator/>

            <q-card-actions align="end">
              <q-btn label="excluir" color="primary" flat @click="deleteContact()"/>
            </q-card-actions>
          </q-card>
        </div>

        <q-page-sticky corner="bottom-right" :offset="[25, 25]">
          <q-btn size="20px" round color="secondary" @click.native="$router.push('/pessoa/novo-contato/'+ 1 )" icon="add"/>
        </q-page-sticky>
      </div>

      <template>
        <q-modal v-model="modalAddContact">
          <list no-border>
            <q-item>
              <q-item-main>
                campos aqui
              </q-item-main>
            </q-item>
          </list>
          <q-btn color="primary" @click="modalAddContact = false" label="Close"/>
        </q-modal>
      </template>

    <!--fim slot content-->
    </div>
  </AgroLayout>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import AgroLayout from 'layouts/AgroLayout'
import { Platform } from 'quasar'

export default {
  nome: 'edit-person',
  components: {
    AgroLayout
  },
  data () {
    return {
      userId: null,
      userData: null,
      tabs: 'tab-perfil',
      modalAddContact: false,
      form: {
        nome: 'MG papelaria',
        cpf: 45866655871,
        cnpj: 15877744520384,
        ie: 666999666,
        razaoSocial: 'Migliorini & Migliorini',
        nomeFantasia: 'Mg Papelaria',
        grupoEconomico: 'MGpapelaria'
      },
      // contato
      celular: 66999763509,
      fixo: 6635325569
    }
  },
  validations: {
    form: {
      nome: { required, minLength: minLength(3) },
      email: { required, email},
    }
  },
  methods: {
    deleteContact: function(id) {
      console.log('excluiu contato')
    },
    getPerson: function() {
      let vm = this
      let params = {
        id: vm.$route.params.id
      }
      vm.$axios.get( 'account/'+ params.id ).then( response => {
        vm.userData = response.data
      }).catch( error => {
        if (error.response.status == 404){
          this.$q.dialog({
            title:'Ops',
            message: 'Não foi possível carregar as informações'
          })
        }
        vm.$router.push( '/usuario' )
        console.log('Erro Ocorrido:')
        console.log(error)
      })
    },
    updatePerson: function() {
      this.$v.form.$touch()
      if ( this.$v.form.$error ) {
        this.$q.notify( 'preencha os campos corretamente' )
        return
      }
      let vm = this
      let params = {
        email: vm.form.email,
        password: vm.form.senha,
      }
      vm.$axios.post( 'account', params ).then( response => {
        if (response.status == 201){
          vm.$q.notify({
            type: 'positive',
            message: 'Cadastro alterado com sucesso'
          })
          vm.$router.push( '/usuario' )
        }
      }).catch( error => {
        if (error.response.status == 422){
          this.$q.dialog({
            title:'Ops',
            message: 'Já existe um cadastro com esse email'
          })
        }
        console.log('Erro Ocorrido:')
        console.log(error)
      })
    }
  },
  mounted() {
    this.getPerson()
  }
}
</script>

<style>
</style>
