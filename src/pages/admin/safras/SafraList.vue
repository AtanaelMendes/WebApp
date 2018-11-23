<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Safras" searchable navigation_type="menu" >
    </toolbar>

    <div class="space-end row">
      <div class="col-12">
        <q-list separator link highlight no-border  v-if="!isEmptyList">

          <q-item sparse multiline @click.native="viewSafra(safra.id)" v-for="(safra, key) in safras" :key="key">
            <q-item-main >
              <q-item-tile>
                {{safra.nome}}
                <q-chip v-if="safra.deleted_at" small square color="red">
                  INATIVO
                </q-chip>
              </q-item-tile>
            </q-item-main>

            <q-item-side right>
              <q-item-tile stamp>{{ moment(safra.created_at).format('DD MMMM YYYY') }}</q-item-tile>
              <q-item-tile v-if="safra.deleted_at" stamp>{{ moment(safra.deleted_at).format('DD MMMM YYYY') }}</q-item-tile>
            </q-item-side>
          </q-item>
        </q-list>

        <div v-if="isEmptyList" class="no-result">
          <img src="~/assets/sad_2.svg"/>
          <span>Nenhum resultado encontrado.</span>
        </div>

      </div>
    </div>

    <div slot="fab-container">
      <q-btn round color="primary" @click="addSafra" icon="add" size="20px" />
    </div>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import safraService from 'assets/js/service/SafraService'
    export default {
      name: "SafraList",
      components: {
        toolbar,
        customPage
      },
      data () {
        return {
          safras: [],
          isEmptyList: false
        }
      },
      methods: {
        /*listBySearch: function(val){
          this.filter.email = val;
        },*/
        listSafras: function() {
          safraService.listSafras().then(response => {
            this.safras = response.data;
            this.isEmptyList = this.safras.length === 0;
          });
        },
        viewSafra: function(id) {
          this.$router.push({name: 'view_safra', params: {id:id}});
        },
        addSafra: function(){
          this.$router.push({name: 'add_safra'});
        },
      },
      mounted () {
        this.listSafras();

        this.$root.$on('refreshSafraList', () => {
          this.listSafras();
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
