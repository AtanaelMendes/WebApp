<template>
  <AgroLayout rightDrawer back-path="/">

    <div slot="title" v-if="$q.platform.is.desktop">
      Usuários
    </div>

    <div slot="searchField">
      <q-search no-icon	inverted-light placeholder="Busca por nome" color="white"
      clearable v-model="filter.email" :after="[{icon: 'search'}]"/>
    </div>

    <div slot="rightBtn">
      <q-btn flat round icon="edit" @click="editUser()" v-if="$q.platform.is.desktop && profile.id"/>
    </div>

    <div slot="rightDrawer">
      <q-list>
        <q-list-header>Filtros</q-list-header>
        <q-item>
          <q-item-main>
            <q-option-group type="radio" color="secondary"v-model="filter.type"
                            :options="[
                            { label: 'Ativos', value: 'non-trashed'},
                            { label: 'Inativos', value: 'trashed' },
                            { label: 'Todos', value: '' }
                            ]"
            />
          </q-item-main>
        </q-item>
      </q-list>
    </div>

    <div slot="content">
      <q-page class="row">

        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
          <q-list highlight no no-border>

            <template v-if="users">
              <template v-for="user in users">
                <q-item link inset-separator multiline @click.native="viewProfile(user)">
                  <q-item-side icon="account_circle"/>

                  <q-item-main>
                    <q-item-tile>
                      {{user.id}} {{user.email}}
                      <q-chip v-if="user.deleted_at" small square color="red">
                        INATIVO
                      </q-chip>
                    </q-item-tile>
                  </q-item-main>

                  <q-item-side>
                    <q-item-tile stamp>{{ moment(user.created_at).format('DD MMMM YYYY') }}</q-item-tile>
                    <q-item-tile v-if="user.deleted_at" stamp>{{ moment(user.deleted_at).format('DD MMMM YYYY') }}</q-item-tile>
                  </q-item-side>

                </q-item>
              </template>
            </template>

          </q-list>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-pa-sm" v-if="details">
          <q-list no-border>

            <q-item>
              <q-item-main class="q-title">
                {{profile.email}}
              </q-item-main>
            </q-item>

            <q-item class="bg-negative text-white" v-if="profile.deleted">
              <q-item-side icon="voice_over_off" color="white"/>
              <q-item-main>
                Usuário inativo
              </q-item-main>
              <q-item-side>
                <q-item-tile stamp class="text-white">01 outubro 2018</q-item-tile>
                <!--<q-item-tile stamp>{{ moment(profile.deleted_at).format('DD MMMM YYYY') }}</q-item-tile>-->
              </q-item-side>
            </q-item><br/>

            <q-card>
              <q-card-main>

                <q-item>
                  <q-item-side icon="work"/>
                  <q-item-main>
                    <q-item-tile>Nome do grupo econômico</q-item-tile>
                  </q-item-main>
                </q-item>

                <q-item>
                  <q-item-side icon="contact_mail"/>
                  <q-item-main>
                    {{profile.email}}
                  </q-item-main>
                </q-item>

              </q-card-main>
              <q-card-separator/>

              <q-card-actions align="end">
                <q-btn @click.native="activateUser(profile.id)" color="primary" flat label="ativar" v-if="profile.deleted"/>
                <q-btn @click.native="inactivateUser(profile.id)" color="primary" flat label="inativar" v-else/>
              </q-card-actions>

            </q-card>

          </q-list>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-pa-sm" v-if="details">

          <div class="q-title q-mb-sm">Papéis</div>

          <q-list id="chip_container"
                  v-if="form.selectedRoles"
                  class="chip-container"
                  :class="{ 'chip-container-error': $v.form.selectedRoles.$error }"
          >
            <q-item v-for="role in form.selectedRoles" :key="role.id" class="chip-inline">
              <q-chip class="q-ma-xs" @hide="removeRole(role)" closable color="light" text-color="black">{{role.name}}</q-chip>
            </q-item>
          </q-list>

          <q-btn class="full-width q-my-md" color="secondary" @click="openRolesDialog()" label="Adicionar"/>

          <div align="end">
            <q-btn color="secondary" label="salvar" @click="updateUserRoles()" v-if="$q.platform.is.desktop"/>
          </div>

        </div>

      </q-page>

      <q-page-sticky corner="bottom-right" :offset="[25, 25]">
        <q-btn size="20px" round color="secondary" @click.native="$router.push('/usuario/cadastro')" icon="person_add" />
      </q-page-sticky>

    </div>
  </AgroLayout>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import AgroLayout from 'layouts/AgroLayout'
import { Platform } from 'quasar'

export default {
  name: 'list-user',
  components: {
    AgroLayout
  },
  data () {
    return {
      filter: {
        type: 'non-trashed',
        email: '',
      },
      form: {
        selectedRoles: []
      },
      profile: {
        id: null,
        nome: null,
        email: null,
        deleted: null
      },
      details: false,
      users: null,
      userData: null,
    }
  },
  watch: {
    filter: {
      handler: function(val, oldval) {
        var filter = {type: val.type, email:(val.email.length > 2 ? val.email : '')}
        this.list(filter)
      },
      deep: true,
    }
  },
  validations: {
    form: {
      selectedRoles: { required }
    }
  },
  methods: {
    updateUserRoles: function() {
      this.$v.form.$touch()
      if ( this.$v.form.$error ) {
        if( this.$v.form.selectedRoles.$error ){
          // this.$v.form.selectedRoles
          this.$q.notify( 'Selecione ao menos um papel' )
        }
        return
      }
    },
    openRolesDialog: function() {
      this.$q.dialog({
        title: 'Papéis',
        message: 'Selecione os funções do usuário.',
        options: {
          type: 'checkbox',
          model: this.getIdsByRoles(this.form.selectedRoles),
          items: this.rolesToItems()
        },
        cancel: true,
        preventClose: true,
        color: 'secondary'
      }).then(data => {
        this.replaceRoles(data)
      }).catch(() => {})
    },
    rolesToItems: function() {
      var items = []
      this.papeis.forEach(function (role) {
        var item = {}
        item['label'] = role.name
        item['value'] = role.id
        items.push(item)
      })
      return items
    },
    getIdsByRoles: function(roles) {
      var rolesIds = []
      roles.forEach(function (role) {
        rolesIds.push(role.id)
      })
      return rolesIds
    },
    getRolesById: function(ids) {
      var roles = []
      for(var i = 0; i < ids.length; i++) {
        this.papeis.forEach(function (role) {
          if(role.id == ids[i]){
            roles.push(role)
          }
        })
      }
      return roles
    },
    replaceRoles: function(selectedRoles) {
      this.form.selectedRoles = this.getRolesById(selectedRoles)
    },
    removeRole: function(role) {
      var id = this.form.selectedRoles.indexOf(role)
      this.form.selectedRoles.splice(id,1)
    },
    listRoles: function() {
      let vm = this
      vm.$axios.get( 'role' ).then( response => {
        vm.papeis = response.data
      }).catch( error => {
        console.log('Erro Ocorrido:')
        console.log(error)
      })
    },
    activateUser: function(id) {
      let vm = this
      this.$q.dialog({
        title: 'Ativar',
        message: 'Têm certeza que deseja ativar este usuário?',
        ok: 'OK',
        cancel: 'Cancelar'
      }).then(() => {
        vm.$axios.put( 'account/'+ id + '/restore' ).then( response => {
          this.$q.notify({
            type: 'positive',
            message: 'Usuário ativado com sucesso'
          })
          vm.list(vm.filter)
          vm.details = false
        })
      }).catch( error => {
        console.log('Erro Ocorrido:')
        console.log(error)
      })
    },
    inactivateUser: function(id) {
      let vm = this
      let params = {
        id: id
      }
      this.$q.dialog({
        title: 'Inativar',
        message: 'Têm certeza que deseja inativar este usuário?',
        ok: 'OK',
        cancel: 'Cancelar'
      }).then(() => {
        vm.$axios.delete( 'account/'+ params.id ).then( response => {
          this.$q.notify({
            type: 'positive',
            message: 'Usuário excluido com sucesso'
          })
          vm.list(vm.filter)
          vm.details = false
        })
      }).catch( error => {
        console.log('Erro Ocorrido:')
        console.log(error)
      })
    },
    editUser: function() {
      if(this.profile.id) {
        this.$router.push('usuario/editar/' + this.profile.id)
      }
    },
    viewProfile: function(user) {
      let vm = this
      if(vm.$q.platform.is.desktop) {
        vm.details = true
        vm.profile.id = user.id
        vm.profile.nome = user.id
        vm.profile.email = user.email
        vm.profile.deleted = user.deleted_at
        // vm.form.selectedRoles = user.roles
      }else {
        vm.$router.push('usuario/perfil/' + user.id)
      }
    },
    list: function(val) {
      let vm = this
      vm.$axios.get( 'account?' + this.serialize(val) ).then( response => {
        vm.users = response.data
        console.log(vm.users)
      }).catch( error => {
        console.log('Erro Ocorrido:')
        console.log(error)
      })
    },
    serialize: function(obj) {
      var query = [];
      for (var property in obj)
        if (obj.hasOwnProperty(property)) {
          if(obj[property] != null){
            query.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
          }
        }
      return query.join("&");
    },
  },
  mounted () {
    this.list({type: 'non-trashed'})
    this.listRoles()
  }

}
</script>

<style>
  .chip-container {
    min-height: 100px ;
  }
  .chip-inline {
    display: inline;
    padding: unset;
  }
  .chip-container-error{
    border-color: red;
  }
</style>
