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
        <q-tab slot="title" name="tab-contato" icon="contact_mail" label="Contatos"/>
        <q-tab slot="title" name="tab-endereco" icon="place" label="Endereços"/>
      </q-tabs>
    </div>

    <div slot="content">
      <q-page padding class="row" v-if="tabs == 'tab-perfil'">
        <div  class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
          <form @keyup.enter="create()" class="q-mx-lg q-px-lg gutter-y-xs">

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

            <div>
              <q-item class="q-pa-none">
                <q-item-main v-if="docType == 1">
                  <q-input
                    v-model="form.cpf"
                    float-label="CPF"
                    type="number"
                    @blur="$v.form.cpf.$touch"
                    :error="$v.form.cpf.$error"
                    clearable
                  />
                </q-item-main>
                <q-item-main v-if="docType == 2">
                  <q-input
                    v-model="form.cnpj"
                    float-label="CNPJ"
                    type="number"
                    @blur="$v.form.cnpj.$touch"
                    :error="$v.form.cnpj.$error"
                    clearable
                  />
                </q-item-main>
                <q-item-side>
                  <q-btn-toggle
                    dense
                    v-model="docType"
                    toggle-color="secondary"
                    :options="[{label: 'Física', value: 1},
                               {label: 'Jurídica', value: 2}]"
                  />
                </q-item-side>
              </q-item>
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
              <q-btn color="secondary" label="Salvar" @click="updatePerson()" v-if="$q.platform.is.desktop"/>
            </div>

          </form>

          <!--fim tab perfil-->
        </div>
      </q-page>

      <!--tab contato-->
      <q-page class="row q-pa-md" v-if="tabs == 'tab-contato'">
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
                      <!--{{numeral(celular).format('00000000000').replace(/^(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2-$3-$4")}}-->
                      (66) 9-9976-3509
                    </q-item-tile>
                  </q-item-main>
                </q-item>

                <q-item class=" q-body-1">
                  <q-item-main>
                    <q-item-tile stamp class="text-faded">
                      Fixo
                    </q-item-tile>
                    <q-item-tile>
                      <!--{{numeral(fixo).format('0000000000').replace(/^(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")}}-->
                      (66) 3532-5569
                    </q-item-tile>
                  </q-item-main>
                </q-item>

              </q-list>
            </q-card-main>
            <q-card-separator/>

            <q-card-actions align="end">
              <q-btn label="excluir" color="primary" flat @click="deleteContact()"/>
              <q-btn label="editar" color="primary" flat @click="$router.push('/pessoa/editar-contato')"/>
            </q-card-actions>
          </q-card>
        </div>

        <q-page-sticky corner="bottom-right" :offset="[25, 25]">
          <q-btn size="20px" round color="secondary" @click.native="$router.push('/pessoa/novo-contato/'+ 1 )" icon="add"/>
        </q-page-sticky>

        <!--fim tab contato-->
      </q-page>

      <!--tab endereco-->
      <q-page padding class="row" v-if="tabs == 'tab-endereco'">

        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="endereco in 4" :key="endereco">
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
                      Endereço
                    </q-item-tile>
                    <q-item-tile>
                      Avenida dos Flamboyants
                    </q-item-tile>
                  </q-item-main>
                </q-item>

                <q-item class="q-py-xs q-body-1">
                  <q-item-main>
                    <q-item-tile stamp class="text-faded">
                      Número
                    </q-item-tile>
                    <q-item-tile>
                      701
                    </q-item-tile>
                  </q-item-main>
                </q-item>

                <q-item class="q-py-xs q-body-1">
                  <q-item-main>
                    <q-item-tile stamp class="text-faded">
                      Complemento
                    </q-item-tile>
                    <q-item-tile>
                      não informado
                    </q-item-tile>
                  </q-item-main>
                </q-item>

                <q-item class=" q-body-1">
                  <q-item-main>
                    <q-item-tile stamp class="text-faded">
                      Bairro
                    </q-item-tile>
                    <q-item-tile>
                      Jardim Jacarandas
                    </q-item-tile>
                  </q-item-main>
                </q-item>

                <q-item class=" q-body-1">
                  <q-item-main>
                    <q-item-tile stamp class="text-faded">
                      CEP
                    </q-item-tile>
                    <q-item-tile>
                      78555000
                    </q-item-tile>
                  </q-item-main>
                </q-item>

                <q-item class=" q-body-1">
                  <q-item-main>
                    <q-item-tile stamp class="text-faded">
                      Cidade
                    </q-item-tile>
                    <q-item-tile>
                      Sinop, MT
                    </q-item-tile>
                  </q-item-main>
                </q-item>

              </q-list>
            </q-card-main>
            <q-card-separator/>

            <q-card-actions align="end">
              <q-btn label="excluir" color="primary" flat @click="deleteAddress()"/>
              <q-btn label="editar" color="primary" flat @click="$router.push('/pessoa/editar-endereco/'+ 1 )"/>
            </q-card-actions>
          </q-card>
        </div>

        <q-page-sticky corner="bottom-right" :offset="[25, 25]">
          <q-btn size="20px" round color="secondary" @click.native="$router.push('/pessoa/novo-endereco/'+ 1 )" icon="add"/>
        </q-page-sticky>

        <!--fim tab endereco-->
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

    <!--fim slot content-->
      <br/>  <br/>   <br/>  <br/>
    </div>
  </AgroLayout>
</template>

<script>
import { required, maxLength, requiredIf, minLength } from 'vuelidate/lib/validators'
import agroAutocompleteEconomicGroup from 'components/views/utils/agroAutocompleteEconomicGroup'
import AgroLayout from 'layouts/AgroLayout'
import { Platform } from 'quasar'

export default {
  nome: 'edit-person',
  components: {
    AgroLayout,
    agroAutocompleteEconomicGroup
  },
  data () {
    return {
      modalCreateGE: false,
      novoGrupoEconomico: null,
      select: null,
      personId: null,
      personData: [],
      docType: 1,
      tabs: 'tab-perfil',
      form: {
        nome: 'MG papelaria',
        cpf: 45866655871,
        cnpj: 15877744520384,
        razaoSocial: 'Migliorini & Migliorini',
        nomeFantasia: 'Mg Papelaria',
        grupoEconomico: 'MGpapelaria',
        ie: 666999666,
        im: null
      },
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
    createEconomicGroup: function() {
      this.$q.notify( {
        type: 'positive',
        message: 'função de criar grupo economico'
      } )
    },
    deleteAddress: function(id) {
      this.$q.notify( {
        type: 'positive',
        message: 'função de excluir endereco'
      } )
    },
    deleteContact: function(id) {
      this.$q.notify( {
        type: 'positive',
        message: 'função de excluir contato'
      } )
      // let vm = this
      // vm.$axios.delete( 'account/'+ id ).then( response => {
      //   vm.contacts = response.data
      // }).catch( error => {
      //   console.log('Erro Ocorrido:')
      //   console.log(error)
      // })
    },
    getPerson: function() {
      // let vm = this
      // let params = {
      //   id: vm.$route.params.id
      // }
      // vm.$axios.get( 'account/'+ params.id ).then( response => {
      //   vm.personData = response.data
      // }).catch( error => {
      //   if (error.response.status == 404){
      //     this.$q.dialog({
      //       title:'Ops',
      //       message: 'Não foi possível carregar as informações'
      //     })
      //   }
      //   vm.$router.push( '/pessoas' )
      //   console.log('Erro Ocorrido:')
      //   console.log(error)
      // })
    },
    updatePerson: function() {
      this.$q.notify( 'função de update' )
    }
  },
  mounted() {
    this.getPerson()
  }
}
</script>

<style>
</style>
