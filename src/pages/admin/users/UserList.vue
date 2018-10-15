<template>
  <custom-page >
    <toolbar slot="toolbar" title="Usuários" navigation_type="menu"></toolbar>

    <q-list highlight no-border sparse>

        <q-item link separator multiline @click.native="viewProfile(user.id)"  v-for="user in users">

          <q-item-main >
            <q-item-tile>
              {{user.email}}
              <q-chip v-if="user.deleted_at" small square color="red">
                INATIVO
              </q-chip>
            </q-item-tile>
          </q-item-main>

          <q-item-side right>
            <q-item-tile stamp>{{ moment(user.created_at).format('DD MMMM YYYY') }}</q-item-tile>
            <q-item-tile v-if="user.deleted_at" stamp>{{ moment(user.deleted_at).format('DD MMMM YYYY') }}</q-item-tile>
          </q-item-side>

        </q-item>


    </q-list>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'

    export default {
      name: "UserList",
      components: {
        toolbar,
        customPage
      },
      data () {
        return {
          users: [],
        }
      },
      methods: {
        list: function(val) {
          let vm = this
          vm.$axios.get( 'account?' + this.serialize(val) ).then( response => {
            vm.users = response.data
          }).catch( error => {
            console.log('Erro Ocorrido:')
            console.log(error)
          })
        },
        viewProfile: function(id) {
          this.$router.push('/admin/usuarios/' + id)
          /*let vm = this
          if(this.$q.platform.is.mobile) {
            vm.$router.push('usuarios/' + id)
          }else {
            vm.$axios.get( 'account/'+ id ).then( response => {
              vm.userProfile = response.data
              vm.details = true
            }).catch( error => {
              if (error.response.status == 404){
                this.$q.dialog({
                  title:'Ops',
                  message: 'Não foi possível carregar as informações'
                })
              }
              console.log('Erro Ocorrido:')
              console.log(error)
            })
          }*/

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

<style scoped>

</style>
