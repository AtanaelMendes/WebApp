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

            <!--GRUPO ECONOMICO-->
            <div>
              <q-item class="q-pa-none">
                <q-item-main>
                  <agro-select-economic-group
                    label="Grupo Econômico"
                    v-model="formPerson.grupoEconomico"
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
                v-model="formPerson.nome"
                float-label="Nome"
                upper-case
                @blur="$v.formPerson.nome.$touch"
                :error="$v.formPerson.nome.$error"
                clearable
              />
            </div>

            <!--CPF-->
            <div v-if="docType == 1">
              <q-input
                v-model="formPerson.cpf"
                float-label="CPF"
                @blur="$v.formPerson.cpf.$touch"
                :error="$v.formPerson.cpf.$error"
                clearable
              />
            </div>

            <!--CNPJ-->
            <div v-if="docType == 2" >
              <q-input
                v-model="formPerson.cnpj"
                float-label="CNPJ"
                @blur="$v.formPerson.cnpj.$touch"
                :error="$v.formPerson.cnpj.$error"
                clearable
              />
            </div>

            <!--INSCRICAO ESTADUAL-->
            <div>
              <q-input v-model="formPerson.ie" float-label="Inscrição Estadual" clearable/>
            </div>

            <!--INSCRICAO MUNICIPAL-->
            <div>
              <q-input v-model="formPerson.im" float-label="Inscrição Municipal" clearable/>
            </div>

            <!--RAZAO SOCIAL-->
            <div v-if="docType == 2">
              <q-input upper-case	v-model="formPerson.razaoSocial" float-label="Razão Social" clearable/>
            </div>

            <!--NOME FANTASIA-->
            <div v-if="docType == 2">
              <q-input upper-case	v-model="formPerson.nomeFantasia" float-label="Nome Fantasia" clearable/>
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
            <form @keyup.enter="createEconomicGroup()">
              <q-input
                float-label="Grupo Econômico"
                v-model="novoGrupoEconomico"
                @blur="$v.novoGrupoEconomico.$touch"
                :error="$v.novoGrupoEconomico.$error"
              />
            </form>
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
import AgroSelectEconomicGroup from 'components/views/utils/AgroSelectEconomicGroup'
export default {
  name: 'nova-pessoa',
  components: {
    AgroLayout,
    agroAutocompleteEconomicGroup,
    AgroSelectEconomicGroup
  },
  data () {
    return {
      docType: 1,
      modalCreateGE: false,
      novoGrupoEconomico: null,
      tabs: 'tab-perfil',
      formPerson: {
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
    formPerson: {
      nome: { required, minLength: minLength(3) },
      grupoEconomico: { required },
      cpf: { minLength: minLength(11), maxLength: maxLength(11), required: requiredIf(function () { return this.docType == 1 }) },
      cnpj: { minLength: minLength(14), maxLength: maxLength(14), required: requiredIf(function () { return this.docType == 2 }) },
    },
    novoGrupoEconomico: { required, minLength: minLength(5) }
  },
  methods: {
    createEconomicGroup: function(){
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
    create: function () {
      this.$v.formPerson.$touch()
      if ( this.$v.formPerson.$error ) {
        if( this.$v.formPerson.nome.$error ){
          this.$q.notify( 'Nome inválido' )
        }
        if( this.$v.formPerson.cpf.$error ){
          this.$q.notify( 'CPF inválido' )
        }
        if( this.$v.formPerson.cnpj.$error ){
          this.$q.notify( 'CNPJ inválido' )
        }
        if( this.$v.formPerson.grupoEconomico.$error ){
          this.$q.notify( 'Selecione ao menos um grupo econômico' )
        }
        return
      }
      let vm = this
      let params = {
        grupo_economico_id: vm.formPerson.grupoEconomico,
        nome: vm.formPerson.nome,
        cpf: this.formatCpf(vm.formPerson.cpf),
        cnpj: this.formatCnpj(vm.formPerson.cnpj),
        inscricao_estadual: vm.formPerson.ie,
        inscricao_municipal: vm.formPerson.im,
        razao_social: vm.formPerson.razaoSocial,
        nome_fantasia: vm.formPerson.nomeFantasia
      }
      vm.$axios.post( 'pessoa', params ).then( response => {
        if (response.status == 201){
          vm.$q.notify({
            type: 'positive',
            message: 'Cadastro criado com sucesso'
          })
          vm.$router.push( '/pessoas' )
        }
      }).catch( error => {
        console.log('Erro Ocorrido:')
        console.log(error)
      })
    },
    formatCpf: function(cpf){
      if(cpf != null) {
        cpf = this.numeral(cpf).format('00000000000').replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
        return cpf
      }
    },
    formatCnpj: function(cnpj){
      if(cnpj != null) {
        cnpj = this.numeral(cnpj).format('00000000000000').replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
        return cnpj
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
