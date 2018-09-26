<template>
  <AgroLayout rightDrawer back-path="/">

    <template slot="title">
      Usuários
    </template>

    <div slot="rightDrawer">
      <q-list>
        <q-list-header>Filtros</q-list-header>
        <q-item>
          <q-item-side/>
          <q-item-main>
            <q-toggle v-model="filter.inactive" color="secondary" label="todos" true-value="1" false-value="2"/>
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
                    {{user.id}} Atanael Gamarra Mendes Costa
                  </q-item-tile>
                  <q-item-tile sublabel>
                    {{user.email}}
                  </q-item-tile>
                </q-item-main>

                <q-item-side>
                  <q-item-tile stamp>{{ moment(user.created_at).format('DD MMMM YYYY') }}</q-item-tile>
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
        inactive: null
      },
      trashed: '',
      users: null,
      userData: null,
    }
  },
  watch: {
    filter: {
      handler: function(val, oldVal) {
        console.log(val)
        console.log(oldVal)
      },
      deep: true,
    }
  },
  methods: {
    list: function() {
      let vm = this
      if (vm.filter.inactive == true){
        vm.trashed = '?trashed=true'
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
