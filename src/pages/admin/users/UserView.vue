<template>
  <custom-page >
    <toolbar slot="toolbar" >
      <template slot="action_itens">
        <q-btn flat round dense icon="edit" />
        <q-btn flat round dense icon="more_vert" />
        <!--<q-btn flat round dense icon="more_vert"  @click="openMenu" />-->
      </template>
    </toolbar>

    <q-list no-border v-if="account">
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
            console.log(error)
          })
        },
      },
      mounted(){
        this.getUser(this.$route.params.id );
      }

    }
</script>

<style scoped>

</style>
