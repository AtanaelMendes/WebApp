<template>
  <AgroLayout rightDrawer back-path="/">

    <div slot="title" v-if="$q.platform.is.desktop">
      Pessoas
    </div>

    <div slot="rightBtn">
      <q-btn flat round icon="edit" @click="editPerson()" v-if="$q.platform.is.desktop && listPersonLoaded"/>
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

        <!--LISTA DE PESSOA-->
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <q-list highlight no no-border v-if="loaded">

            <q-item v-for="person in listPersonsData" :key="person.id" link inset-separator multiline @click.native="getPerson(person.id)">
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
        <!--FIM LISTA DE PESSOA-->

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6" v-if="listPersonLoaded">
          <!--CONTROLE DAS TAB DE PERFIL DA PESSOA-->
          <q-btn-toggle
            flat
            color="primary"
            v-model="tabs"
            toggle-color="primary"
            :options="[ {label: 'Perfil', value: 'perfil' },
                        {label: 'Contatos', value: 'contato'},
                        {label: 'Endereços', value: 'endereco'}]"
          />
          <!-- CONTROLE DAS TAB DE PERFIL DA PESSOA-->

          <!--TAB PERFIL-->
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
                  {{personProfile.grupo_economico.nome}}
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
          <!--FIM TAB PERFIL-->

          <!--TAB CONTATO-->
          <div class="row" v-if="tabs == 'contato' ">
            <div key="tab-contact" v-if="personContacts.length > 0 && contactsLoaded" class="col-12">
              <div class="row">
                <div v-for="contato in personContacts" :key="contato.id" class="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                  <q-card class="q-ma-xs">
                    <q-card-title>
                      {{contato.nome}}
                    </q-card-title>
                    <q-card-separator/>
                    <q-card-main>
                      <q-list no-border>

                        <q-item class="q-px-none">
                          <q-item-main>
                            <q-item-tile sublabel>
                              Tipo
                            </q-item-tile>
                            <q-item-tile v-if="contato.isFiscal">
                              Fiscal
                            </q-item-tile>
                            <q-item-tile v-if="contato.isCobranca">
                              Cobrança
                            </q-item-tile>
                          </q-item-main>
                        </q-item>

                        <q-item v-for="email in contato.email" :key="email.endereco" class="q-px-none">
                          <q-item-main>
                            <q-item-tile sublabel>
                              Email
                            </q-item-tile>
                            <q-item-tile>
                              {{email.endereco}}
                            </q-item-tile>
                          </q-item-main>
                        </q-item>

                        <template v-for="telefone in contato.telefone">
                          <q-item v-if="telefone.is_celular" class="q-px-none">
                            <q-item-main>
                              <q-item-tile sublabel>
                                Celular
                              </q-item-tile>
                              <q-item-tile>
                                {{numeral(telefone.numero).format('00000000000').replace(/^(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2-$3-$4")}}
                              </q-item-tile>
                            </q-item-main>
                          </q-item>

                          <q-item v-if="telefone.is_fixo" class="q-px-none">
                            <q-item-main>
                              <q-item-tile sublabel>
                                Fixo
                              </q-item-tile>
                              <q-item-tile>
                                {{numeral(telefone.numero).format('0000000000').replace(/^(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")}}
                              </q-item-tile>
                            </q-item-main>
                          </q-item>
                        </template>

                      </q-list>
                    </q-card-main>
                    <q-card-separator/>
                    <q-card-actions align="end">
                      <q-btn color="primary" flat label="excluir" @click.native="deleteContact()"/>
                      <q-btn color="primary" flat label="editar" @click.native="getPersonContactByID(contato.id)"/>
                    </q-card-actions>
                  </q-card>

                </div>
              </div>
              <q-page-sticky corner="bottom-right" :offset="[100, 25]">
                <q-btn size="20px" round color="secondary" @click.native="modalNewContact = true" icon="add" />
              </q-page-sticky>
            </div>
            <div key="tab-contact" v-else class="col-12">
              <q-jumbotron class="q-ma-md">
                <div class="q-display-1">Não há contato cadastrado</div>
                <hr class="q-hr q-my-lg">
                <q-btn @click.native="modalNewContact = true" color="primary" class="full-width" label="Cadastrar contato" />
              </q-jumbotron>
            </div>
          </div>
          <!--FIm TAB CONTATO-->

          <!--TAB ENDERECO-->
          <div class="row" v-if="tabs == 'endereco' ">
            <div key="tab-endereco" v-if="personAddress.length > 0 && addressLoaded" class="col-12">
              <div class="row">
                <div v-for="endereco in personAddress" :key="endereco.id" class="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                  <q-card class="q-ma-xs">
                    <q-card-main>
                      <q-list no-border>

                        <q-item class="q-px-none">
                          <q-item-main>
                            <q-item-tile v-if="endereco.is_fiscal">
                              Fiscal
                            </q-item-tile>
                            <q-item-tile v-if="endereco.is_cobranca">
                              Cobrança
                            </q-item-tile>
                          </q-item-main>
                        </q-item>

                        <q-item class="q-px-none">
                          <q-item-main>
                            <q-item-tile sublabel>
                              Endereco
                            </q-item-tile>
                            <q-item-tile>
                              {{endereco.endereco}}
                            </q-item-tile>
                          </q-item-main>
                        </q-item>

                        <q-item class="q-px-none">
                          <q-item-main>
                            <q-item-tile sublabel>
                              Número
                            </q-item-tile>
                            <q-item-tile>
                              {{endereco.numero}}
                            </q-item-tile>
                          </q-item-main>
                        </q-item>

                        <q-item class="q-px-none" v-if="endereco.complemento">
                          <q-item-main>
                            <q-item-tile sublabel>
                              Complemento
                            </q-item-tile>
                            <q-item-tile>
                              {{endereco.complemento}}
                            </q-item-tile>
                          </q-item-main>
                        </q-item>

                        <q-item class="q-px-none">
                          <q-item-main>
                            <q-item-tile sublabel>
                              Bairro
                            </q-item-tile>
                            <q-item-tile>
                              {{endereco.bairro}}
                            </q-item-tile>
                          </q-item-main>
                        </q-item>

                        <q-item class="q-px-none">
                          <q-item-main>
                            <q-item-tile sublabel>
                              Cidade
                            </q-item-tile>
                            <q-item-tile>
                              {{endereco.cidade}}
                            </q-item-tile>
                          </q-item-main>
                        </q-item>

                        <q-item class="q-px-none">
                          <q-item-main>
                            <q-item-tile sublabel>
                              Estado
                            </q-item-tile>
                            <q-item-tile>
                              {{endereco.estado}}
                            </q-item-tile>
                          </q-item-main>
                        </q-item>

                        <q-item class="q-px-none">
                          <q-item-main>
                            <q-item-tile sublabel>
                              CEP
                            </q-item-tile>
                            <q-item-tile>
                              {{endereco.cep}}
                            </q-item-tile>
                          </q-item-main>
                        </q-item>

                      </q-list>
                    </q-card-main>
                    <q-card-separator/>
                    <q-card-actions align="end">
                      <q-btn flat color="primary" label="excluir" @click.native="deleteAddress(endereco.id)"/>
                      <q-btn flat color="primary" label="editar" @click.native="getAreaByID(endereco.id)"/>
                    </q-card-actions>
                  </q-card>

                </div>
              </div>
              <q-page-sticky corner="bottom-right" :offset="[100, 25]">
                <q-btn size="20px" round color="secondary" @click.native="modalNewAddress = true" icon="add" />
              </q-page-sticky>
            </div>
            <div v-else class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <q-jumbotron class="q-ma-md">
                <div class="q-display-1">Não há endereço cadastrado</div>
                <hr class="q-hr q-my-lg">
                <q-btn @click.native="modalNewAddress = true" color="primary" class="full-width" label="Cadastrar endereço" />
              </q-jumbotron>
            </div>

          </div>
          <!--FIM TAB ENDERECO-->
        <br/><br/><br/><br/><br/>
        </div>
      </q-page>

      <!--MODAL NEW ENDERECO-->
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
              <q-btn flat color="secondary" @click="cleanAddressForm()" label="Cancelar"/>
              <q-btn color="secondary" label="Salvar" @click="createAddress()"/>
            </div>

          </form>
        </q-modal>
      </template>
      <!--FIM MODAL NEW ENDERECO-->

      <!--MODAL EDIT ENDERECO-->
      <template>
        <q-modal v-model="modalEditAddress" minimized no-backdrop-dismiss>
          <form class="q-pa-md gutter-y-xs" @keyup.enter="updateAddress()">

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
              <q-btn flat color="secondary" @click="cleanAddressForm()" label="Cancelar"/>
              <q-btn color="secondary" label="Salvar" @click="updateAddress()"/>
            </div>

          </form>
        </q-modal>
      </template>
      <!--FIM MODAL EDIT ENDERECO-->

      <!--MODAL UPDATE CONTATO-->
      <template>
        <q-modal v-model="modalEditContact" minimized no-backdrop-dismiss>
          <form class="q-pa-md gutter-y-xs" @keyup.enter="updateContact()">

            <!--CONTATO NOME-->
            <q-item>
              <q-item-main>
                <q-input
                  clearable
                  type="text"
                  float-label="Nome"
                  v-model="formContact.nome"
                  @blur="$v.formContact.nome.$touch"
                  :error="$v.formContact.nome.$error"
                />
              </q-item-main>
            </q-item>

            <!--CONTATO EMAIL-->
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

            <!--CONTATO TELEFONE-->
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

              <!--CONTATO TIPO TELEFONE-->
              <q-item-side>
                <q-btn-toggle
                  dense v-model="formContact.setTelefoneTipo"
                  toggle-color="secondary"
                  :options="[{label: 'celular', value: 1, icon: 'stay_primary_portrait'},
                             {label: 'Fixo', value: 2, icon: 'phone'}]"
                />
              </q-item-side>
            </q-item>

            <!--CONTATO TIPO FISCAL COBRANCA-->
            <q-item>
              <q-item-main>
                <q-checkbox class="q-pr-sm" v-model="formContact.fiscal" label="Fiscal" />
                <q-checkbox v-model="formContact.cobranca" label="Cobrança" />
              </q-item-main>
            </q-item>

            <div align="end">
              <q-btn flat color="secondary" @click="modalEditContact = false, cleanContactForm()" label="Cancelar"/>
              <q-btn color="secondary" label="Salvar" @click="updateContact()"/>
            </div>

          </form>
        </q-modal>
      </template>
      <!--FIM MODAL UPDATE CONTATO-->

      <!--MODAL NEW CONTATO-->
      <template>
        <q-modal v-model="modalNewContact" minimized no-backdrop-dismiss>
          <form class="q-pa-md gutter-y-xs" @keyup.enter="updateContact()">

            <!--CONTATO NOME-->
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

            <!--CONTATO EMAIL-->
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

            <!--CONTATO TELEFONE-->
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

              <!--CONTATO TIPO TELEFONE-->
              <q-item-side>
                <q-btn-toggle
                  dense v-model="formContact.setTelefoneTipo"
                  toggle-color="secondary"
                  :options="[{label: 'celular', value: 1, icon: 'stay_primary_portrait'},
                           {label: 'Fixo', value: 2, icon: 'phone'}]"
                />
              </q-item-side>
            </q-item>

            <!--CONTATO TIPO FISCAL COBRANCA-->
            <q-item>
              <q-item-main>
                <q-checkbox class="q-pr-sm" v-model="formContact.fiscal" label="Fiscal" />
                <q-checkbox v-model="formContact.cobranca" label="Cobrança" />
              </q-item-main>
            </q-item>

            <div align="end">
              <q-btn flat color="secondary" @click="modalNewContact = false, cleanContactForm()" label="Cancelar"/>
              <q-btn color="secondary" label="Salvar" @click="updateContact()"/>
            </div>

          </form>
        </q-modal>
      </template>
      <!--FIM MODAL NEW CONTATO-->

      <q-page-sticky corner="bottom-right" :offset="[25, 25]">
        <q-btn size="20px" round color="secondary" @click.native="$router.push('/pessoa/cadastro')" icon="person_add" />
      </q-page-sticky>

    </div>
  </AgroLayout>
</template>

<script>
import NewAddressMixin from 'components/views/mixins/NewAddressMixin'
import EditContactMixin from 'components/views/mixins/EditContactMixin'
import EditAddressMixin from 'components/views/mixins/EditAddressMixin'
import { required, minLength, maxLength, requiredIf, email } from 'vuelidate/lib/validators'
import AgroLayout from 'layouts/AgroLayout'
import { Platform } from 'quasar'
export default {
  name: 'list-person',
  components: {
    AgroLayout
  },
  mixins: [NewAddressMixin, EditContactMixin, EditAddressMixin],
  data () {
    return {
      tabs: 'perfil',
      filter: {
        type: null,
      },
      formContact: {
        fiscal: false,
        cobranca: false,
        nome: null,
        email: null,
        phone: null,
        isCelular: false,
        isFixo: false,
        setTelefoneTipo: 1,
      },
      formAddress: {
        endereco: null,
        numero: null,
        complemento: null,
        bairro: null,
        cep: null,
        cobranca: false,
        fiscal: false
      },
      loaded: false,
      listPersonLoaded: false,
      contactsLoaded: false,
      addressLoaded:false,
      contactsformLoaded: false,
      addressformLoaded: false,
      personProfile: [],
      listPersonsData: [],
      personContacts: [],
      personAddress: [],
      searchName: '',
      modalEditContact: false,
      modalNewContact: false,
      modalEditAddress: false,
      modalNewAddress: false,
    }
  },
  watch: {
    filter: {
      handler: function(val, oldval) {
        this.listPersons(val)
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
          this.listPersons()
        })
      }).catch( error => {})
    },
    active: function(id) {
      let vm = this
      this.$q.dialog({
        title: 'Ativar',
        message: 'Têm certeza que deseja ativar esta pessoa?',
        ok: 'OK',
        cancel: 'Cancelar'
      }).then(() => {
        vm.$axios.put( 'pessoa/'+ id +'/restore').then( response => {
          this.$q.notify({
            type: 'positive',
            message: 'Pessoa ativada com sucesso'
          })
          this.listPersons()
        })
      }).catch( error => {})
    },
    listPersons: function() {
      this.loaded = true
      let vm = this
      vm.$axios.get( 'pessoa' ).then( response => {
        vm.listPersonsData = response.data
      }).catch( error => {})
    },
    getPerson: function (id) {
      if(this.$q.platform.is.mobile) {
        this.$router.push('pessoa/perfil')
      }else {
        let vm = this
        vm.$axios.get( 'pessoa/'+ id ).then( response => {
          vm.personProfile = response.data
          var id = vm.personProfile.id
          this.getPersonContacts(id)
          this.getPersonAddress(id)
          this.listPersonLoaded = true
        }).catch( error => {})
      }
    },
    getPersonContacts: function (id) {
      let vm = this
      this.$axios( { url: '/pessoa/1/contato/', baseURL: 'https://demo3716022.mockable.io' } ).then( response => {
        vm.personContacts = response.data
        this.contactsLoaded = true
      }).catch( error => {})
    },
    getPersonAddress: function (id) {
      let vm = this
      this.$axios( { url: 'pessoa/id/endereco/', baseURL: 'http://demo3716022.mockable.io/' } ).then( response => {
        vm.personAddress = response.data
        this.addressLoaded = true
      }).catch( error => {})
    },
    fillFormContact: function(data) {
      this.formContact.fiscal = data.isFiscal
      this.formContact.cobranca = data.isCobranca
      this.formContact.nome = data.nome
      this.formContact.email = data.email[0].endereco
      this.formContact.emailDescricao = data.email[0].descricao
      this.formContact.phone = data.telefone[0].numero
      this.formContact.isFixo = data.telefone[0].is_fixo
      this.formContact.isCelular = data.telefone[0].is_Celular
      if( data.telefone[0].is_celular == true ) {
        this.formContact.setTelefoneTipo = 1
      }
      if( data.telefone[0].is_fixo == true) {
        this.formContact.setTelefoneTipo = 2
      }
      this.modalEditContact = true
    },
    fillFormAddress: function (data) {
      this.formAddress.endereco = data.endereco
      this.formAddress.bairro = data.bairro
      this.formAddress.numero = data.numero
      this.formAddress.complemento = data.complemento
      this.formAddress.cep = data.cep
      this.formAddress.cidade = data.cidade
      this.formAddress.estado = data.estado
      this.formAddress.cobranca = data.is_cobranca
      this.formAddress.fiscal = data.is_fiscal
    }
  },
  mounted () {
    this.listPersons()
  }
}
</script>
<style>
</style>
