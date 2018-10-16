<template>
  <custom-page >
    <toolbar slot="toolbar" title="Usuários" searchable navigation_type="menu" @search_changed="listBySearch">
      <template slot="action_itens">
        <q-btn flat round dense icon="tune" >
          <q-popover anchor="bottom left">
            <q-list>
              <q-list-header>Filtrar por:</q-list-header>
              <q-item dense>
                <q-item-main>
                  <q-option-group type="radio" color="primary"v-model="filter.type"
                                  :options="[
                            { label: 'Ativos', value: 'non-trashed'},
                            { label: 'Inativos', value: 'trashed' },
                            { label: 'Todos', value: '' }
                            ]"
                  />
                </q-item-main>
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </template>
    </toolbar>

    <q-list highlight no-border sparse v-if="!isEmptyList">

        <q-item link separator multiline @click.native="viewUser(user.id)" v-for="user in users">
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

    <div v-if="isEmptyList" class="no-result">
      <img src="/assets/sad_2.svg"/>
      <span>Nenhum resultado encontrado.</span>
    </div>

    <q-btn
      slot="fab-container"
      round
      color="primary"
      @click="addUser"
      icon="add"
      size="20px"
    />

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
          isEmptyList: false,
          filter: {
            type: 'non-trashed',
            email: '',
          },
        }
      },
      watch: {
        filter: {
          handler: function(val, oldval) {
            var filter = {type: val.type, email:(val.email.length > 2 ? val.email : '')};
            this.list(filter)
          },
          deep: true,
        }
      },
      methods: {
        listBySearch: function(val){
          this.filter.email = val;
        },
        list: function(val) {
          this.$axios.get( 'account?' + this.serialize(val) ).then( response => {
            this.users = response.data;
            this.isEmptyList = this.users.length === 0;
          }).catch( error => {
            console.log('Erro Ocorrido:')
            console.log(error)
          })
        },
        viewUser: function(id) {
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
        addUser: function(){

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
  .no-result{
    text-align: center;
    padding-top: 150px;
  }

  .no-result img{
    width: 120px;
    height: auto;
  }

  .no-result span{
    display: block;
    margin-top: 30px;
    font-size: 25px;
    font-weight: 300;
    color: #ababab;
  }
</style>
