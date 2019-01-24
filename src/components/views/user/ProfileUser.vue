<template>
  <AgroLayout back-path="/usuario">

    <div slot="title">
      Perfil
    </div>

    <div slot="rightBtn">
      <q-btn flat round icon="edit" @click="editUser()"/>
    </div>

    <div slot="content" >

      <q-page padding class="row">
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
          <q-list no-border>

            <q-item>
              <q-item-main class="q-title">
                {{userData.email}}
              </q-item-main>
            </q-item>

            <q-item class="bg-negative text-white" v-if="userData.deleted_at">
              <q-item-side icon="voice_over_off" color="white"/>
              <q-item-main>
                Usuário inativo
              </q-item-main>
              <q-item-side>
                <q-item-tile stamp class="text-white">{{ moment(userData.deleted_at).format('DD MMMM YYYY') }}</q-item-tile>
              </q-item-side>
            </q-item><br/>

            <q-card>
              <q-card-main>

                <q-item>
                  <q-item-side icon="contact_mail"/>
                  <q-item-main>
                    {{userData.email}}
                  </q-item-main>
                </q-item>
              </q-card-main>
              <q-card-separator/>

              <q-card-main>
                <q-chip color="secondary" v-for="userRoles in userData.roles" :key="userData.id" class="q-ma-xs">
                  {{userRoles.name}}
                </q-chip>
              </q-card-main>
              <q-card-separator/>

              <q-card-actions align="end">
                <q-btn @click.native="activateUser(userData.id)" color="primary" flat label="ativar" v-if="userData.deleted_at"/>
                <q-btn @click.native="inactivateUser(userData.id)" color="primary" flat label="inativar" v-else/>
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

    </div>
  </AgroLayout>
</template>

<script>
  import AgroLayout from 'layouts/AgroLayout'
  import GetUser from 'components/views/mixins/GetUser'

  export default {
    name: 'profile-user',
    components: {
      AgroLayout
    },
    mixins: [GetUser],
    data () {
      return {
        userId: null,
        userData: null,
      }
    },
    methods: {
      editUser: function() {
        this.$router.push( '/usuario/editar/' + this.$route.params.id)
      },
      inactivateUser: function() {
        let vm = this
        let params = {
          id: vm.$route.params.id
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
            vm.$router.push( '/usuario' )
          })
        }).catch( error => {})
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
            vm.$router.push( '/usuario' )
          })
        }).catch( error => {})
      },
    },
    mounted() {}
  }
</script>

<style>
</style>
