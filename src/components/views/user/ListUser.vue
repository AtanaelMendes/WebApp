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
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
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

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm" v-if="details">
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

            <!-- <q-item>
              <q-item-side/>
              <q-item-main>
              </q-item-main>
            </q-item> -->

          </q-list>
        </div>
      </q-page>

      <q-page-sticky corner="bottom-right" :offset="[25, 25]">
        <q-btn round color="secondary" @click.native="$router.push('/usuario/cadastro')" icon="person_add" />
      </q-page-sticky>

    </div>
  </AgroLayout>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import AgroLayout from 'layouts/AgroLayout'
import { Platform } from 'quasar'

export default {
  name: 'index',
  components: {
    AgroLayout
  },

  data () {
    return {
      filter: {
        type: 'non-trashed',
        email: '',
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
  methods: {
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
  }

}
</script>

<style>
.img-responsive{
  height: auto;
  width: auto;
}
</style>
