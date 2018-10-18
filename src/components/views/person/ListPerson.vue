<template>
  <AgroLayout rightDrawer back-path="/">

    <div slot="title" v-if="$q.platform.is.desktop">
      Pessoas
    </div>

    <div slot="rightBtn">
      <q-btn flat round icon="edit" @click="editPerson()" v-if="$q.platform.is.desktop && personLoaded"/>
    </div>

    <div slot="searchField">
      <q-search no-icon	inverted-light placeholder="Busca por nome" color="white"
      clearable v-model="searchName" :after="[{icon: 'search'}]"/>
    </div>

    <div slot="rightDrawer">
      <q-list>
        <q-list-header>Filtros</q-list-header>
        <q-item>
          <q-item-main>
            <q-option-group
              type="radio"
              color="secondary"
              v-model="filter.type"
              :options="[
                        { label: 'Todos', value: null },
                        { label: 'Inativos', value: 'trashed' },
                        { label: 'Ativos', value: 'non-trashed'}]"
            />
          </q-item-main>
        </q-item>
      </q-list>
    </div>

    <div slot="content">
      <q-page class="row">

        <!--lista de pessoa-->
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <q-list highlight no no-border v-if="loaded">

            <q-item v-for="person in personsData" :key="person.id" link inset-separator multiline @click.native="getPerson(person.id)">
              <q-item-side icon="account_circle"/>
              <q-item-main>
                <q-item-tile>
                  {{person.nome}}
                  <q-chip small square color="red" v-if="person.deleted_at">
                    INATIVO
                  </q-chip>
                </q-item-tile>
              </q-item-main>

              <q-item-side>
                <q-item-tile stamp>{{ moment(person.created_at).format('DD MMMM YYYY') }}</q-item-tile>
                <q-item-tile v-if="person.deleted_at" stamp>{{ moment(person.deleted_at).format('DD MMMM YYYY') }}</q-item-tile>
              </q-item-side>
            </q-item>
          </q-list>
        </div>
        <!--fim lista pessoa-->

        <!--controle das tab de perfil da pesssoa-->
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6" v-if="personLoaded">
          <q-btn-toggle
            flat
            color="primary"
            v-model="tabs"
            toggle-color="primary"
            :options="[ {label: 'Perfil', value: 'perfil' },
                        {label: 'Contatos', value: 'contato'},
                        {label: 'Endereços', value: 'endereco'}]"
          />
          <!-- FIM controle das tab de perfil da pesssoa-->

          <!--tab perfil-->
          <q-list no-border v-if="tabs == 'perfil' ">

            <q-item>
              <q-item-main class="q-title">
                {{personProfile.nome}}
              </q-item-main>
              <q-item-side>
                <q-btn @click.native="active(personProfile.id)" color="primary" flat label="ativar" v-if="personProfile.deleted_at"/>
                <q-btn @click.native="inactive(personProfile.id)" color="primary" flat label="inativar" v-else/>
              </q-item-side>
            </q-item>
            <q-item-separator class="q-mx-md"/>

            <q-item>
              <q-item-main>
                <q-item-tile stamp class="text-faded">
                  Grupo Econômico
                </q-item-tile>
                <q-item-tile>
                  {{personProfile.grupo_economico_id}}
                </q-item-tile>
              </q-item-main>
            </q-item>

            <q-item class="bg-negative text-white q-ma-sm" v-if="personProfile.deleted_at">
              <q-item-side icon="voice_over_off" color="white"/>
              <q-item-main>
                Pessoa inativo
              </q-item-main>
              <q-item-side>
                <q-item-tile stamp class="text-white">{{ moment(personProfile.deleted_at).format('DD MMMM YYYY') }}</q-item-tile>
              </q-item-side>
            </q-item>

            <q-item v-if="personProfile.razao_social">
              <q-item-main>
                <q-item-tile stamp class="text-faded">
                  Razão Social
                </q-item-tile>
                <q-item-tile>
                  {{personProfile.razao_social}}
                </q-item-tile>
              </q-item-main>
            </q-item>

            <q-item v-if="personProfile.nome_fantasia">
              <q-item-main>
                <q-item-tile stamp class="text-faded">
                  Nome Fantasia
                </q-item-tile>
                <q-item-tile>
                  {{personProfile.nome_fantasia}}
                </q-item-tile>
              </q-item-main>
            </q-item>

            <q-item v-if="personProfile.cnpj">
              <q-item-main>
                <q-item-tile stamp class="text-faded">
                  CNPJ
                </q-item-tile>
                <q-item-tile>
                  {{personProfile.cnpj}}
                </q-item-tile>
              </q-item-main>
            </q-item>

            <q-item v-if="personProfile.cpf">
              <q-item-main>
                <q-item-tile stamp class="text-faded">
                  CPF
                </q-item-tile>
                <q-item-tile>
                  {{personProfile.cpf}}
                </q-item-tile>
              </q-item-main>
            </q-item>

          </q-list>
          <!--FIM profile person-->

          <!--tab contato-->
          <div class="row" v-if="tabs == 'contato' ">
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6" v-for="contato in 4" :key="contato">

              <q-card class="q-ma-xs">
                <q-card-title>
                  Fiscal/Cobrança
                </q-card-title>
                <q-card-separator/>
                <q-card-main>
                  <q-list highlight no-border>

                    <q-item>
                      <q-item-main>
                        <q-item-tile stamp class="text-faded">
                          Nome
                        </q-item-tile>
                        <q-item-tile>
                          Ronaldinho
                        </q-item-tile>
                      </q-item-main>
                    </q-item>

                    <q-item>
                      <q-item-main>
                        <q-item-tile stamp class="text-faded">
                          Email
                        </q-item-tile>
                        <q-item-tile>
                          atanaelmendes@gmail.com
                        </q-item-tile>
                      </q-item-main>
                    </q-item>

                    <q-item>
                      <q-item-main>
                        <q-item-tile stamp class="text-faded">
                          Celular
                        </q-item-tile>
                        <q-item-tile>
                          (66) 9-9966-9966
                          <!--{{numeral(celular).format('00000000000').replace(/^(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2-$3-$4")}}-->
                        </q-item-tile>
                      </q-item-main>
                    </q-item>

                    <q-item>
                      <q-item-main>
                        <q-item-tile stamp class="text-faded">
                          Fixo
                        </q-item-tile>
                        <q-item-tile>
                          (66) 3532-5569
                          <!--{{numeral(fixo).format('0000000000').replace(/^(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")}}-->
                        </q-item-tile>
                      </q-item-main>
                    </q-item>

                  </q-list>
                </q-card-main>
                <q-card-actions align="end">
                  <q-btn color="primary" flat label="excluir" @click.native="deleteContact()"/>
                  <q-btn color="primary" flat label="editar" @click.native="modalEditContact = true"/>
                </q-card-actions>
              </q-card>
            </div>
            <div>
              <q-btn label="Adicionar novo" color="secondary"/>
            </div>
          </div>
          <!--FIm tab contato-->

          <!--TAB endereco-->
          <div class="row" v-if="tabs == 'endereco' ">
            <div>
              <!--<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6" v-for="endereco in 4" :key="endereco"></div>-->
            </div>

            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <q-jumbotron class="q-ma-md">
                <div class="q-display-1">Não há endereço cadastrado</div>
                <hr class="q-hr q-my-lg">
                <q-btn @click.native="modalNewAddress = true" color="primary" class="full-width" label="Cadastrar endereço" />
              </q-jumbotron>
            </div>

          </div>
          <!--FIM tab endereco-->

        </div>
      </q-page>

      <!--MODAL endereco-->
      <template>
        <q-modal v-model="modalNewAddress" minimized no-backdrop-dismiss>
          <form class="q-pa-md gutter-y-xs" @keyup.enter="createAddress()">

            <div>
              <q-input
                v-model="formAddress.endereco"
                float-label="Endereço"
                clearable
                @blur="$v.formAddress.endereco.$touch"
                :error="$v.formAddress.endereco.$error"
              />
            </div>
            <div>
              <q-input
                v-model="formAddress.numero"
                type="number"
                float-label="Número"
                clearable
                @blur="$v.formAddress.numero.$touch"
                :error="$v.formAddress.numero.$error"
              />
            </div>
            <div>
              <q-input v-model="formAddress.complemento" float-label="Complemento" clearable/>
            </div>
            <div>
              <q-input
                v-model="formAddress.bairro"
                float-label="Bairro"
                clearable
                @blur="$v.formAddress.bairro.$touch"
                :error="$v.formAddress.bairro.$error"
              />
            </div>
            <div>
              <q-select
                v-model="formAddress.cidade"
                placeholder="Cidade"
                clearable
                :options="selectOptions"
                @blur="$v.formAddress.cidade.$touch"
                :error="$v.formAddress.cidade.$error"
              />
            </div>
            <div>
              <q-input v-model="formAddress.cep" type="number" float-label="CEP" clearable/>
            </div>
            <div>
              <q-checkbox class="q-pr-sm" v-model="formAddress.fiscal" label="Fiscal" />
              <q-checkbox v-model="formAddress.cobranca" label="Cobrança" />
            </div>
            <div align="end">
              <q-btn flat color="secondary" @click="modalNewAddress = false" label="Cancelar"/>
              <q-btn color="secondary" label="Salvar" @click="createAddress()"/>
            </div>

          </form>
        </q-modal>
      </template>
      <!--FIM modal endereco-->

      <!--MODAL update contato-->
      <template>
        <q-modal v-model="modalEditContact" minimized no-backdrop-dismiss>
          <form class="q-pa-md gutter-y-xs" @keyup.enter="updateContact()">

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

            <div align="end">
              <q-btn flat color="secondary" @click="modalEditContact = false" label="Cancelar"/>
              <q-btn color="secondary" label="Salvar" @click="updateContact()"/>
            </div>

          </form>
        </q-modal>
      </template>
      <!--FIM modal update contato-->

      <q-page-sticky corner="bottom-right" :offset="[25, 25]">
        <q-btn size="20px" round color="secondary" @click.native="$router.push('/pessoa/cadastro')" icon="person_add" />
      </q-page-sticky>

    </div>
  </AgroLayout>
</template>

<script>
import NewAddressMixin from 'components/views/mixins/NewAddressMixin'
import EditContactMixin from 'components/views/mixins/EditContactMixin'
import { required, minLength, maxLength, requiredIf, email } from 'vuelidate/lib/validators'
import AgroLayout from 'layouts/AgroLayout'
import { Platform } from 'quasar'

export default {
  name: 'list-person',
  components: {
    AgroLayout
  },
  mixins: [NewAddressMixin, EditContactMixin],
  data () {
    return {
      tabs: 'perfil',
      filter: {
        type: null,
      },
      loaded: false,
      personLoaded: false,
      personProfile: null,
      personsData: [],
      searchName: '',
      modalNewAddress: false,
      modalEditContact: false,
    }
  },
  watch: {
    filter: {
      handler: function(val, oldval) {
        this.list(val)
        console.log(val)
      },
      deep: true,
    }
  },
  validations: {
    formContact: {
      nome: { required, minLength: minLength(3) },
      email: { email, required: requiredIf(function () { return this.formContact.phone == undefined}) },
      phone: { minLength: minLength(10), maxLength: maxLength(11),
        required: requiredIf(function () { return this.formContact.email == undefined})
      }
    },
    formAddress: {
      endereco: { required, minLength: minLength(5) },
      numero: { required },
      bairro: { required, minLength: minLength(5) },
      cidade: { required }
    }
  },
  methods: {
    editPerson: function() {
      if(this.personProfile.id) {
        this.$router.push('pessoa/editar/' + this.personProfile.id)
      }
    },
    inactive: function(id) {
      let vm = this
      this.$q.dialog({
        title: 'Inativar',
        message: 'Têm certeza que deseja inativar esta pessoa?',
        ok: 'OK',
        cancel: 'Cancelar'
      }).then(() => {
        vm.$axios.delete( 'pessoa/'+ id ).then( response => {
          this.$q.notify({
            type: 'positive',
            message: 'Pessoa inativada com sucesso'
          })
          this.list()
        })
      }).catch( error => {
        console.log('Erro Ocorrido:')
        console.log(error)
      })
    },
    active: function(id) {
      let vm = this
      this.$q.dialog({
        title: 'Ativar',
        message: 'Têm certeza que deseja ativar esta pessoa?',
        ok: 'OK',
        cancel: 'Cancelar'
      }).then(() => {
        vm.$axios.delete( 'pessoa/'+ id ).then( response => {
          this.$q.notify({
            type: 'positive',
            message: 'Pessoa ativada com sucesso'
          })
          this.list()
        })
      }).catch( error => {
        console.log('Erro Ocorrido:')
        console.log(error)
      })
    },
    list: function() {
      this.loaded = true
      let vm = this
      vm.$axios.get( 'pessoa' ).then( response => {
        vm.personsData = response.data
        // console.log(vm.personsData)
      }).catch( error => {
        console.log('Erro Ocorrido:')
        console.log(error)
      })
    },
    getPerson: function (id) {
      if(this.$q.platform.is.mobile) {
        this.$router.push('pessoa/perfil')
      }else {
        let vm = this
        vm.$axios.get( 'pessoa/'+ id ).then( response => {
          vm.personProfile = response.data
          this.personLoaded = true
          console.log(vm.personProfile)
        }).catch( error => {
          console.log('Erro Ocorrido:')
          console.log(error)
        })
      }

    },
  },
  mounted () {
    this.list()
  }
}
</script>
<style>
</style>
