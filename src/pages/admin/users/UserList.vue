<template >
  <custom-page widthInner="60%" isParent >
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

    <div class="row space-end">
      <div class="col-12">
        <q-list highlight no-border sparse v-if="!isEmptyList">

          <q-item link separator multiline @click.native="viewUser(user.id)" v-for="(user, key) in users" :key="key">
            <q-item-main style="overflow: hidden">
              <q-item-tile>
                {{user.nome}}
                <q-chip v-if="user.deleted_at" small square color="red">
                  INATIVO
                </q-chip>
              </q-item-tile>
              <q-item-tile sublabel>{{user.email}}</q-item-tile>
            </q-item-main>

            <q-item-side right>
              <q-item-tile stamp>{{ moment(user.created_at).format('DD MMMM YYYY') }}</q-item-tile>
              <q-item-tile v-if="user.deleted_at" stamp>{{ moment(user.deleted_at).format('DD MMMM YYYY') }}</q-item-tile>
            </q-item-side>
          </q-item>

        </q-list>
      </div>
    </div>


    <div v-if="isEmptyList" class="no-result">
      <ap-no-results />
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
  import userService from 'assets/js/service/UserService'
  import apNoResults from 'components/ApNoResults'

    export default {
      name: "UserList",
      components: {
        apNoResults,
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
        list: function(filter) {
          userService.listAccounts(filter).then(response => {
            this.users = response.data;
            this.isEmptyList = this.users.length === 0;
          });
        },
        viewUser: function(id) {
          this.$router.push({name: 'view_user', params: {id:id}});
        },
        addUser: function(){
          this.$router.push({name: 'add_user'});
        },

      },
      mounted () {
        this.list(this.filter);

        this.$root.$on('refreshUserList', () => {
          this.list(this.filter);
        });
      },
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
