<template>
  <AgroLayout leftDrawer>

    <div slot="title">
      Início
    </div>

    <div slot="leftDrawer">
      <q-item>
        <q-item-side link to="/inbox/1"/>
        <q-item-main @click.native="$router.push('/usuario/perfil')" style="cursor:pointer">
          Atanael
        </q-item-main>
        <q-item-side link icon="exit_to_app" @click.native="logout" style="cursor:pointer"/>
      </q-item>

      <q-list link no-border>

        <q-item>
          <q-item-side icon="receipt"/>
          <q-item-main>
            Emissão de Notas
          </q-item-main>
        </q-item>

        <q-item>
          <q-item-side icon="gavel"/>
          <q-item-main>
            Contratos
          </q-item-main>
        </q-item>

        <q-item>
          <q-item-side icon="account_box"/>
          <q-item-main @click.native="$router.push('/usuario')">
            Usuários
          </q-item-main>
        </q-item>

        <q-item>
          <q-item-side icon="account_box"/>
          <q-item-main @click.native="$router.push('/pessoas')">
            Pessoas
          </q-item-main>
        </q-item>

        <q-item>
          <q-item-side icon="info"/>
          <q-item-main>
            Sobre
          </q-item-main>
        </q-item>

      </q-list>
    </div>

    <div slot="content" class="layout-padding">
      <div class="row gutter-sm">

        <div :class="column">

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

        <div :class="column">

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

        <div :class="column">

          <q-card inline class="q-ma-sm">
            <q-card-title>
              Title
            </q-card-title>
            <q-list separator>
              <q-collapsible icon="explore" label="First">
                <div>
                  Lorem ipsum dolor sit amet...
                </div>
              </q-collapsible>

              <q-collapsible icon="perm_identity" label="Second">
                <div>
                  Lorem ipsum dolor sit amet...
                </div>
              </q-collapsible>

              <q-collapsible icon="shopping_cart" label="Third">
                <div>
                  Lorem ipsum dolor sit amet...
                </div>
              </q-collapsible>
            </q-list>
          </q-card>

          <q-card inline class="q-ma-sm">
            <q-card-media>
              <img src="~/assets/coxinha.jpg">
            </q-card-media>
            <q-card-title>
              Title
              <span slot="subtitle">Subtitle</span>
            </q-card-title>
            <q-card-main>
              {{ lorem }}
            </q-card-main>
          </q-card>

          <q-card inline class="q-ma-sm">
            <q-card-title>
              Title
              <span slot="subtitle">Subtitle</span>
            </q-card-title>
            <q-card-main>
              {{ lorem }}
            </q-card-main>
          </q-card>
        </div>

        <div :class="column">

          <q-card inline color="secondary" dark class="q-ma-sm">
            <q-card-title>
              Title
              <span slot="subtitle">Subtitle</span>
              <q-icon slot="right" name="alarm" />
            </q-card-title>
            <q-card-main>
              {{ lorem }}
            </q-card-main>
            <q-card-separator />
            <q-card-actions>
              <q-btn flat>Action 1</q-btn>
              <q-btn flat>Action 2</q-btn>
            </q-card-actions>
          </q-card>

          <q-card inline class="q-ma-sm">
            <q-card-title>
              Title
              <span slot="subtitle">Subtitle</span>
              <q-btn round flat icon="more_vert" slot="right">
                <q-popover>
                  <q-list link class="no-border">
                    <q-item v-close-overlay>
                      <q-item-main label="Remove Card" />
                    </q-item>
                    <q-item v-close-overlay>
                      <q-item-main label="Send Feedback" />
                    </q-item>
                    <q-item v-close-overlay>
                      <q-item-main label="Share" />
                    </q-item>
                  </q-list>
                </q-popover>
              </q-btn>
            </q-card-title>
            <q-card-main>
              {{ lorem }}
            </q-card-main>
            <q-card-separator />
            <q-card-actions>
              <q-btn flat>Action 1</q-btn>
              <q-btn flat>Action 2</q-btn>
            </q-card-actions>
          </q-card>

        </div>
      </div>
    </div>

  </AgroLayout>
</template>

<script>
import AgroLayout from '../layouts/AgroLayout'
import router from '../router'

export default {
  name: 'index',
  components: {
    AgroLayout
  },

  data () {
    return {
      column: 'col-xs-12 col-sm-6 col-md-4 col-lg-3',
      stars: 3,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  methods: {
    getCredentials: function (){
      let vm = this
      vm.$axios.get('account/info').then(response => {

        // localStorage.setItem('auth.usuario.usuario', response.data.user.usuario)
        // localStorage.setItem('auth.usuario.codusuario', response.data.user.codusuario)
        //
        // this.$store.commit('perfil/updatePerfil', {
        //   usuario: localStorage.getItem('auth.usuario.usuario'),
        //   codusuario: localStorage.getItem('auth.usuario.codusuario')
        // })

      }).catch(error => {
        console.log('Erro Ocorrido:')
        console.log(error)
      })
    },
    logout () {
      var vm = this

      vm.$q.dialog({
        title: 'Sair do sistema',
        message: 'Tem certeza que deseja sair?',
        ok: 'Sair',
        cancel: 'Cancelar'
      }).then(() => {

        console.log('pegando o token_id')

        vm.$axios.get('oauth/personal-access-tokens').then(response => {
          vm.token_id = response.data[0].id

        }).then(function (){

          console.log('deletando o token')

          vm.$axios.delete('oauth/personal-access-tokens/' + vm.token_id).then(response => {

            if (response.status === 200){
              localStorage.removeItem('auth.token')
              localStorage.removeItem('auth.refresh_token')

              router.push('/login')

              vm.$q.notify({
                message: 'Até mais...',
                type: 'positive',
              })

            }
          })
        })
      })
    }
  },
  mounted () {
    this.getCredentials()
  }

}
</script>

<style>
.dash {
  background-image: url("/statics/images/dash.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color:#464646;
  height: 100vh;
}
.img-responsive{
  height: auto;
  width: auto;
}
</style>
