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

      <!--TAB PEFIL-->
      <q-page padding class="row" v-if="tabs == 'tab-perfil'">
        <div  class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
          <form @keyup.enter="create()" class="q-mx-lg q-px-lg gutter-y-xs">

            <!--GRUPO ECONOMICO-->
            <div>
              <q-item class="q-pa-none">
                <q-item-main>
                  <agro-select-economic-group
                    label="Grupo Econômico"
                    v-model="formPersonUpdate.grupoEconomico"
                    required>
                  </agro-select-economic-group>
                  <!--<agro-autocomplete-economic-group
                  placeholder="Grupo Econômico"
                  v-model="data.codgrupoeconomico"
                  :init="data.codgrupoeconomico"
                  />-->
                </q-item-main>
                <q-item-side>
                  <q-btn color="secondary" dense square icon="add" @click.native="modalCreateGE = true"/>
                </q-item-side>
              </q-item>
            </div>

            <!--NOME-->
            <div>
              <q-input
                v-model="formPersonUpdate.nome"
                float-label="Nome"
                @blur="$v.formPersonUpdate.nome.$touch"
                :error="$v.formPersonUpdate.nome.$error"
                clearable
              />
            </div>

            <!--CPF-->
            <div>
              <q-item class="q-pa-none">
                <q-item-main v-if="docType == 1">
                  <q-input
                    v-model="formPersonUpdate.cpf"
                    float-label="CPF"
                    @blur="$v.formPersonUpdate.cpf.$touch"
                    :error="$v.formPersonUpdate.cpf.$error"
                    clearable
                  />
                </q-item-main>

                <!--CNPJ-->
                <q-item-main v-if="docType == 2">
                  <q-input
                    v-model="formPersonUpdate.cnpj"
                    float-label="CNPJ"
                    @blur="$v.formPersonUpdate.cnpj.$touch"
                    :error="$v.formPersonUpdate.cnpj.$error"
                    clearable
                  />
                </q-item-main>

                <!--TIPO PESSOA-->
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

            <!--ISCRICAO ESTADUAL-->
            <div>
              <q-input
                v-model="formPersonUpdate.ie"
                float-label="Inscrição Estadual"
                clearable
              />
            </div>

            <!--INSCRICAO MUNICIPAL-->
            <div>
              <q-input
                v-model="formPersonUpdate.im"
                float-label="Inscrição Municipal"
                clearable
              />
            </div>

            <!--RAZAO SOCIAL-->
            <div v-if="docType == 2">
              <q-input
                v-model="formPersonUpdate.razaoSocial"
                float-label="Razão Social"
                clearable
              />
            </div>

            <!--NOME FANTASIA-->
            <div v-if="docType == 2">
              <q-input
                v-model="formPersonUpdate.nomeFantasia"
                float-label="Nome Fantasia"
                clearable
              />
            </div>

            <div align="end">
              <q-btn color="secondary" label="Salvar" @click="updatePerson()" v-if="$q.platform.is.desktop"/>
            </div>

          </form>
        </div>
      </q-page>
      <!-- FIM TAB PERFIL-->

      <!-- TAB CONTATO-->
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

      </q-page>
      <!--FIM TAB CONTATO-->

      <!--TAB ENDERECO-->
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

      </q-page>
      <!--FIM TAB ENDERECO-->

      <!--MODAL NOVO GE-->
      <q-modal v-model="modalCreateGE" minimized>
        <q-card>
          <q-card-main>
            <q-input
              float-label="Grupo Econômico"
              v-model="novoGrupoEconomico"
              @blur="$v.novoGrupoEconomico.$touch"
              :error="$v.novoGrupoEconomico.$error"
            />
          </q-card-main>
          <q-card-actions align="end">
            <q-btn flat color="secondary" @click="modalCreateGE = false"  label="Cancelar"/>
            <q-btn color="secondary" @click="createEconomicGroup()"  label="Criar"/>
          </q-card-actions>
        </q-card>
      </q-modal>
      <!--FIM MODAL NOVO GE-->

    <!-- FIM SLOT CONTENT-->
      <br/>  <br/>   <br/>  <br/>
    </div>
  </AgroLayout>
</template>

<script>
import { required, maxLength, requiredIf, minLength } from 'vuelidate/lib/validators'
import agroAutocompleteEconomicGroup from 'components/views/utils/agroAutocompleteEconomicGroup'
import AgroSelectEconomicGroup from 'components/views/utils/AgroSelectEconomicGroup'
import AgroLayout from 'layouts/AgroLayout'
import { Platform } from 'quasar'

export default {
  nome: 'edit-person',
  components: {
    AgroLayout,
    agroAutocompleteEconomicGroup,
    AgroSelectEconomicGroup
  },
  data () {
    return {
      modalCreateGE: false,
      loaded: false,
      novoGrupoEconomico: null,
      personId: null,
      personProfile: null,
      docType: 1,
      tabs: 'tab-perfil',
      formPersonUpdate: {
        nome: null,
        cpf: null,
        cnpj: null,
        razaoSocial: null,
        nomeFantasia: null,
        grupoEconomico: null,
        ie: null
      }
    }
  },
  validations: {
    formPersonUpdate: {
      nome: { required, minLength: minLength(3) },
      grupoEconomico: { required },
      cpf: { minLength: minLength(11), maxLength: maxLength(11), required: requiredIf(function () { return this.docType == 1 }) },
      cnpj: { minLength: minLength(14), maxLength: maxLength(14), required: requiredIf(function () { return this.docType == 2 }) },
    },
    novoGrupoEconomico: { required, minLength: minLength(5) }
  },
  methods: {
    updatePerson: function() {
      this.$q.notify( 'função de update' )
    },
    createEconomicGroup: function() {
      this.$v.novoGrupoEconomico.$touch()
      if ( this.$v.novoGrupoEconomico.$error ) {
        this.$q.notify( 'Nome do Grupo inválido' )
        return
      }
      let vm = this
      let params = {
        nome: vm.novoGrupoEconomico
      }
      vm.$axios.post( 'grupo_economico', params ).then( response => {
        if (response.status == 201){
          vm.$q.notify({
            type: 'positive',
            message: 'Grupo criado com sucesso'
          })
        }
        vm.novoGrupoEconomico = null
        vm.modalCreateGE = false
      }).catch( error => {
        console.log('Erro Ocorrido:')
        console.log(error)
        vm.modalCreateGE = false
      })
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
    fillForm: function(person){
      this.formPersonUpdate.nome = person.nome
      if(person.cpf != null){
        this.docType = 1
        this.formPersonUpdate.cpf = person.cpf
      }
      if(person.cnpj != null){
        this.docType = 2
        this.formPersonUpdate.cnpj = person.cnpj
      }
      this.formPersonUpdate.razaoSocial = person.razao_social
      this.formPersonUpdate.nomeFantasia = person.nome_fantasia
      this.formPersonUpdate.grupoEconomico = person.grupo_economico.id
      this.formPersonUpdate.ie = person.inscricao_estadual
      this.formPersonUpdate.im = person.inscricao_municipal
    },
    getPerson: function() {
      let vm = this
      vm.$axios.get( 'pessoa/'+ vm.$route.params.id ).then( response => {
        vm.personProfile = response.data
        this.fillForm(vm.personProfile)
        console.log(vm.personProfile)
        vm.loaded = true
      }).catch( error => {
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
