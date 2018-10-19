<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="noneAndBack" @navigation_clicked="backAction">
      <template slot="action_itens" v-if="account">
        <q-btn flat round dense icon="edit" />
        <q-btn flat round dense icon="more_vert" >
          <q-popover anchor="bottom left">
            <q-list link>
              <q-item dense @click.native="disableAccount(account.id)" v-if="!account.deleted_at">
                <q-item-main label="Inativar usuário"  />
              </q-item>
              <q-item dense @click.native="enableAccount(account.id)" v-if="account.deleted_at">
                <q-item-main label="Ativar usuário"  />
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </template>
    </toolbar>

    <q-list no-border v-if="account">
      <q-item class="bg-red text-white q-mx-md q-py-sm round-borders" v-if="account.deleted_at">
        <q-item-side icon="error" color="white"/>
        <q-item-main>
          Conta desativada
        </q-item-main>
        <q-item-side>
          <q-item-tile stamp class="text-white">{{ moment(account.deleted_at).format('DD MMMM YYYY') }}</q-item-tile>
        </q-item-side>
      </q-item>
      <q-list-header>Informações Básicas</q-list-header>
      <q-item>
        <q-item-side icon="contact_mail"/>
        <q-item-main>
          {{account.email}}
        </q-item-main>
      </q-item>
      <q-item-separator />
      <q-list-header>Funções</q-list-header>
      <q-item>
        <q-item-main>
          <q-chip color="secondary" v-for="role in account.roles" :key="role.id" class="q-ma-xs">
            {{role.name}}
          </q-chip>
        </q-item-main>
      </q-item>
    </q-list>


  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import { Loading } from 'quasar'

    export default {
      name: "UserView",
      components: {
        toolbar,
        customPage
      },
      watch: {
        '$route' (to, from) {
          this.getUser(to.params.id)
        }
      },
      data(){
        return {
          account: null
        }
      },
      methods:{
        getUser: function(id) {
          //let vm = this
          this.$axios.get( 'account/'+ id).then( response => {
            this.account = response.data;
            //vm.form.selectedRoles = vm.userData.roles
            //vm.form.email = vm.userData.email
          }).catch( error => {

          })
        },
        disableAccount: function(id) {
          this.$q.dialog({
            title: 'Atenção',
            message: 'Realmente deseja desativar esta conta?',
            ok: 'Sim',
            cancel: 'Não',
            preventClose: true,
            color: 'primary'
          }).then(data => {
            Loading.show();
            this.$axios.delete( 'account/'+ id).then( response => {
              this.$root.$emit('refreshUserList')
              Loading.hide();
              if(response.status === 200){
                this.account.deleted_at = new Date();
              }
            }).catch( error => {
              Loading.hide();
            })
          })
        },
        enableAccount: function(id) {
          this.$q.dialog({
            title: 'Atenção',
            message: 'Realmente deseja ativar esta conta?',
            ok: 'Sim',
            cancel: 'Não',
            preventClose: true,
            color: 'primary'
          }).then(data => {
            Loading.show();
            this.$axios.put( 'account/'+  id + '/restore').then( response => {
              this.$root.$emit('refreshUserList')
              Loading.hide();
              if(response.status === 200){
                this.account.deleted_at = null;
              }
            }).catch( error => {
              Loading.hide();
            })
          })
        },
        backAction: function () {
          this.$router.go(-1);
        }
      },
      mounted(){
        this.getUser(this.$route.params.id );
      }

    }
</script>

<style scoped>

</style>
