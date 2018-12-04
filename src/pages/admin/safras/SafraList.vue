<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Safras" searchable navigation_type="menu" >
    </toolbar>

    <div class="space-end row q-pa-md">
      <div class="col-8 offset-2 q-title text-right">
        Safra 2018 - 2019
      </div>
      <div class="col-12">
        <div class="row">
          <div class="col-xs-2 col-sm-2 col-md-1 col-lg-1">
            <img src="/assets/soja-icon.jpg" class="responsive round"/>
          </div>
          <div class="col-xs-8 col-sm-8 col-md-10 col-lg-10 offset-1 q-title self-center">
            Soja RR
          </div>
        </div>

        <div class="row gutter-sm">
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="item in 4" :key="item">
            <q-card>
              <q-card-media>
                <img src="/assets/talhao1.jpeg" class="responsive"/>
              </q-card-media>
              <q-card-separator/>
              <q-card-title>
                Talhao fundo
                <q-btn round flat dense icon="more_vert" slot="right" style="margin-right: -15px;">
                  <q-popover>
                    <q-list link class="no-border">
                      <q-item v-close-overlay>
                        <!--<q-item-main @click.native="updateContato(contato.id)" label="Editar" />-->
                        <q-item-main label="ação 1" />
                      </q-item>
                      <q-item v-close-overlay >
                        <q-item-main label="ação 2"/>
                      </q-item>
                      <q-item v-close-overlay>
                        <q-item-main label="ação 3"/>
                      </q-item>
                    </q-list>
                  </q-popover>
                </q-btn>
              </q-card-title>
              <q-card-separator/>
              <q-card-main class="gutter-xs">
                <div class="row">
                  <div class="col-6">
                    5/10 <span class="text-faded">Hectare</span>
                  </div>
                  <div class="col-6 text-right text-faded q-caption">
                    10 Hectare
                  </div>
                </div>

                <div class="row">
                  <q-progress :percentage="progressBuffer"style="height: 4px"/>
                  <q-tooltip>Colhido 70%</q-tooltip>
                </div>

                <div class="row">
                  <div class="col-12">60 Sacos</div>
                </div>

                <div class="row">
                  <div class="col-12">120 Sacos</div>
                </div>

              </q-card-main>
            </q-card>
          </div>
        </div>

      </div>
    </div>
  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import safraService from 'assets/js/service/SafraService'
    export default {
      name: "safra-list",
      components: {
        toolbar,
        customPage
      },
      data () {
        return {
          progressBuffer: 70
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

  .round{
    border-radius: 50%;
  }
</style>
