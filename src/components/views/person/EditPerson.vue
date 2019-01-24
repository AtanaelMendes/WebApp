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
        <q-tab slot="title" name="tab-perfil" label="Perfil" default/>
        <q-tab slot="title" name="tab-contato" label="Contatos"/>
        <q-tab slot="title" name="tab-endereco" label="Endereços"/>
      </q-tabs>
    </div>

    <div slot="content">

      <!--TAB PEFIL-->
      <q-page padding class="row" v-if="tabs == 'tab-perfil'">
        <div  class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
          <form @keyup.enter="updatePerson()" class="q-mx-lg q-px-lg gutter-y-xs">

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
                clearable
                float-label="Nome"
                v-model="formPersonUpdate.nome"
                @blur="$v.formPersonUpdate.nome.$touch"
                :error="$v.formPersonUpdate.nome.$error"
              />
            </div>

            <!--CPF-->
            <div>
              <q-item class="q-pa-none">
                <q-item-main v-if="docType == 1">
                  <q-input
                    clearable
                    key="cpf"
                    float-label="CPF"
                    v-model.trim="formPersonUpdate.cpf"
                    @blur="$v.formPersonUpdate.cpf.$touch"
                    :error="$v.formPersonUpdate.cpf.$error"
                  />
                </q-item-main>

                <!--CNPJ-->
                <q-item-main v-if="docType == 2">
                  <q-input
                    clearable
                    key="cnpj"
                    float-label="CNPJ"
                    v-model.trim="formPersonUpdate.cnpj"
                    @blur="$v.formPersonUpdate.cnpj.$touch"
                    :error="$v.formPersonUpdate.cnpj.$error"
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
                clearable
                v-model="formPersonUpdate.ie"
                float-label="Inscrição Estadual"
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
import CPF from 'gerador-validador-cpf'
import ValidateCnpjMixin from 'components/views/mixins/ValidateCnpjMixin'
export default {
  nome: 'edit-person',
  components: {
    AgroLayout,
    agroAutocompleteEconomicGroup,
    AgroSelectEconomicGroup
  },
  mixins: [ValidateCnpjMixin],
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
      cpf: { minLength: minLength(11), maxLength: maxLength(14), required: requiredIf(function () { return this.docType == 1 }) },
      cnpj: { minLength: minLength(14), maxLength: maxLength(18), required: requiredIf(function () { return this.docType == 2 }) },
    },
    novoGrupoEconomico: { required, minLength: minLength(5) }
  },
  methods: {
    updatePerson: function() {
      this.$v.formPersonUpdate.$touch()
      if ( this.$v.formPersonUpdate.$error ) {
        if( this.$v.formPersonUpdate.nome.$error ){
          this.$q.notify( 'Nome inválido' )
        }
        if( this.$v.formPersonUpdate.cpf.$error ){
          this.$q.notify( 'Informe o CPF' )
        }
        if( this.$v.formPersonUpdate.cnpj.$error ){
          this.$q.notify( 'CNPJ inválido' )
        }
        if( this.$v.formPersonUpdate.grupoEconomico.$error ){
          this.$q.notify( 'Selecione ao menos um grupo econômico' )
        }
        return
      }
      let vm = this
      var id = this.$route.params.id
      var validatedCpf = null
      if (vm.formPersonUpdate.cpf != null) {
        validatedCpf = vm.formatCpf(vm.formPersonUpdate.cpf)
      }
      if (validatedCpf == false){
        this.$q.notify({type: 'negative', message: 'CPF Inválido'})
        return
      }
      var validatedCnpj = null
      if ( vm.formPersonUpdate.cnpj != null ) {
        validatedCnpj = vm.CNPJ(vm.formPersonUpdate.cnpj)
      }
      if (validatedCnpj == false){
        this.$q.notify({type: 'negative', message: 'CNPJ Inválido'})
        return
      }
      let params = {
        grupo_economico_id: vm.formPersonUpdate.grupoEconomico,
        nome: vm.formPersonUpdate.nome,
        cpf: validatedCpf,
        cnpj: validatedCnpj,
        inscricao_estadual: vm.formPersonUpdate.ie,
        inscricao_municipal: vm.formPersonUpdate.im,
        razao_social: vm.formPersonUpdate.razaoSocial,
        nome_fantasia: vm.formPersonUpdate.nomeFantasia
      }
      vm.$axios.put( 'pessoa/'+ id, params ).then( response => {
        vm.$q.notify({ type: 'positive', message: 'Cadastro alterado com sucesso' })
        vm.$router.push( '/pessoas' )
      }).catch( error => {
        if(error.request.status == 422){
          vm.$q.notify({ type: 'negative', message: error.request.response })
        }
      })
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
        vm.loaded = true
      }).catch( error => {})
    },
    formatCpf: function(cpf){
      var isCpf = CPF.validate(cpf)
      if(cpf != null && isCpf == true) {
        cpf = CPF.format(cpf)
        return cpf
      }else {
        return isCpf
      }
    }
  },
  mounted() {
    this.getPerson()
  }
}
</script>

<style>
</style>
