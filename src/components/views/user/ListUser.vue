<template>
  <AgroLayout rightDrawer back-path="/">

    <div slot="title" v-if="$q.platform.is.desktop">
      Usuários
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
            <q-toggle v-model="filter.inactive" color="secondary" label="todos" true-value="true" false-value="false"/>
          </q-item-main>
        </q-item>
      </q-list>
    </div>

    <div slot="content">
      <q-page padding>
        <q-list highlight no no-border>
          <template v-if="users">
            <template v-for="user in users">
              <q-item link inset-separator multiline @click.native="getUser(user.id)">
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
        inactive: false
      },
      trashed: '',
      users: null,
      userData: null,
      searchName: ''
    }
  },
  watch: {
    filter: {
      handler: function(val, oldval) {
        this.list(val.inactive)
      },
      deep: true,
    }
  },
  methods: {
    list: function(val) {
      let vm = this

      if (val == 'true'){
        vm.trashed = '?trashed=true'
      }else if (val == 'false'){
        vm.trashed = ''
      }

      vm.$axios.get( 'account'+ vm.trashed ).then( response => {
        vm.users = response.data
      }).catch( error => {
        console.log('Erro Ocorrido:')
        console.log(error)
      })
    },
    getUser: function (id) {
      this.$router.push('usuario/editar/' + id)
    },

  },
  mounted () {
    this.list()
  }

}
</script>

<style>
.img-responsive{
  height: auto;
  width: auto;
}
</style>
