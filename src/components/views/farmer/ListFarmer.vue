<template>
  <AgroLayout back-path="/" rightDrawer>
    <div slot="title">
      Administração
    </div>

    <div slot="rightBtn">
      <q-btn flat round icon="edit" @click="editArea()" v-if="$q.platform.is.desktop && areaLoaded"/>
    </div>


    <!--MENU DA DIREITA-->
    <div slot="rightDrawer">
      <q-list>
        <q-list-header>Filtros</q-list-header>
        <q-item>
          <q-item-main>
            <q-option-group
              type="radio"
              color="secondary"
              v-model="filter.type"
              :options="[{ label: 'Ativos', value: 'non-trashed'},
                         { label: 'Inativos', value: 'trashed' },
                         { label: 'Todos', value: '' }]"
            />
          </q-item-main>
        </q-item>
      </q-list>
    </div>
    <!--FIM MENU DA DIREITA-->


    <div slot="content" >

      <q-page padding class="row" v-if="loaded">

        <div class="col-xs-12 col-sm-12 col-6 col-lg-4">
          <q-list highlight inset-separator no-border>
            <q-item v-for="farmer in 10" :key="farmer" @click.native="selectArea()">
              <q-item-side icon="account_circle"/>
              <q-item-main>
                LISTA DE AREAS
              </q-item-main>
            </q-item>
          </q-list>
        </div>

        <div class="col-xs-12 col-sm-12 col-6 col-lg-8" v-if="areaLoaded">

          <div class="row">
            <div class="col-xs-12 col-sm-12 col-6 col-lg-6">
              <q-card inline class="bigger q-ma-sm">
                <q-card-media>
                  <img src="~assets/coxinha.jpg">
                </q-card-media>
                <q-card-title class="relative-position">
                  <q-btn fab color="primary" icon="place" class="absolute" style="top: 0; right: 8px; transform: translateY(-50%);" />

                  <div class="ellipsis">Cafe Basilico</div>
                  <q-rating slot="subtitle" v-model="stars" :max="5" />
                  <div slot="right" class="row items-center">
                    <q-icon name="place" /> 250 ft
                  </div>
                </q-card-title>
                <q-card-main>
                  <p>$・Italian, Cafe</p>
                  <p class="text-faded">Small plates, salads & sandwiches in an intimate setting.</p>
                </q-card-main>
                <q-card-separator />
                <q-card-actions>
                  <q-btn flat round icon="event" />
                  <q-btn flat>5:30PM</q-btn>
                  <q-btn flat>7:30PM</q-btn>
                  <q-btn flat>9:00PM</q-btn>
                  <q-btn flat color="primary">Reserve</q-btn>
                </q-card-actions>
              </q-card>

              <q-card inline class="q-ma-sm">
                <q-card-media overlay-position="top">
                  <img src="~/assets/milho.jpg">

                  <q-card-title slot="overlay">
                    Title
                    <span slot="subtitle">Subtitle</span>
                  </q-card-title>
                </q-card-media>
              </q-card>
            </div>

            <div class="col-xs-12 col-sm-12 col-6 col-lg-6">
              <q-card inline class="q-ma-sm">
                <q-card-media>
                  <img src="~/assets/milho.jpg">
                </q-card-media>
                <q-list>
                  <q-item>
                    <q-item-side>
                      <q-item-tile color="primary" icon="local bar" />
                    </q-item-side>
                    <q-item-main>
                      <q-item-tile label>Bar XYZ</q-item-tile>
                      <q-item-tile sublabel>Have a drink.</q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item>
                    <q-item-side>
                      <q-item-tile color="red" icon="local gas station" />
                    </q-item-side>
                    <q-item-main>
                      <q-item-tile label>Gas Station</q-item-tile>
                      <q-item-tile sublabel>Fill your gas tank.</q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item>
                    <q-item-side>
                      <q-item-tile color="amber" icon="local movies" />
                    </q-item-side>
                    <q-item-main>
                      <q-item-tile label>Cinema XYZ</q-item-tile>
                      <q-item-tile sublabel>Watch a movie.</q-item-tile>
                    </q-item-main>
                  </q-item>
                </q-list>
              </q-card>

              <q-card inline class="q-ma-sm">
                <q-card-main>
                  {{ lorem }}
                </q-card-main>
              </q-card>

              <q-card inline class="q-ma-sm">
                <q-card-media>
                  <img src="~/assets/milho.jpg">
                  <q-card-title slot="overlay">
                    Title
                  </q-card-title>
                </q-card-media>
              </q-card>

              <q-card inline class="q-ma-sm">
                <q-card-media>
                  <img src="~/assets/milho.jpg">
                  <q-card-title slot="overlay">
                    Title
                    <span slot="subtitle">Subtitle</span>
                  </q-card-title>
                </q-card-media>
                <q-card-main>
                  {{ lorem }}
                </q-card-main>
              </q-card>
            </div>

          </div>

        </div>
      </q-page>

      <q-page-sticky corner="bottom-right" :offset="[25, 25]">
        <q-btn size="20px" round color="secondary" @click.native="$router.push('/area/nova-area')" icon="person_add" />
      </q-page-sticky>

    </div>
  </AgroLayout>
</template>

<script>

  import AgroLayout from 'layouts/AgroLayout'

  export default {
    name: 'index-example',
    components: {
      AgroLayout
    },
    data () {
      return {
        stars: 3,
        lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        areaLoaded: false,
        loaded: false,
        filter: {
          type: null
        }
      }
    },
    methods: {
      selectArea: function() {
        this.areaLoaded = true
      },
      editArea: function(){
        this.$router.push('/area/editar-area')
      },
      axiosRequest: function() {
        let vm = this
        vm.$axios.get( 'rota/'+ vm.$route.params.id ).then( response => {
          vm.var = response.data
          console.log(vm.var)
          vm.loaded = true
        }).catch( error => {
          console.log('Erro Ocorrido:')
          console.log(error)
        })
      }
    },
    mounted() {
      this.loaded = true
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
