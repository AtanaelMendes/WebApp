<template>
  <AgroLayout back-path="/pessoas">
    <template slot="title">
      Perfil
    </template>

    <div slot="rightBtn">
      <q-btn flat round icon="edit" @click="$router.push('/pessoa/editar/' + 1)"/>
    </div>

    <div slot="content">

      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6" v-if="personLoaded">
        <q-list no-border highlight>

          <q-item>
            <q-item-main class="q-title">
              Atanael Gamarra Mendes Costa
            </q-item-main>
            <q-item-side>
              <q-btn  color="primary" flat label="inativar"/>
              <!--<q-btn @click.native="active(userProfile.id)" color="primary" flat label="ativar" v-if="userProfile.deleted_at"/>-->
              <!--<q-btn @click.native="inactive(userProfile.id)" color="primary" flat label="inativar" v-else/>-->
            </q-item-side>
          </q-item>

          <q-item class="bg-negative text-white">
            <q-item-side icon="voice_over_off" color="white"/>
            <q-item-main>
              Pessoa inativo
            </q-item-main>
            <q-item-side>
              <q-item-tile stamp class="text-white">16 maio 2002</q-item-tile>
              <!--<q-item-tile stamp class="text-white">{{ moment(userProfile.deleted_at).format('DD MMMM YYYY') }}</q-item-tile>-->
            </q-item-side>
          </q-item>

          <q-item>
            <q-item-main>
              <q-item-tile stamp class="text-faded">
                Razão Social
              </q-item-tile>
              <q-item-tile>
                Migliorini & migliorini
              </q-item-tile>
            </q-item-main>
          </q-item>

          <q-item>
            <q-item-main>
              <q-item-tile stamp class="text-faded">
                Fantasia
              </q-item-tile>
              <q-item-tile>
                MG Papelaria
              </q-item-tile>
            </q-item-main>
          </q-item>

          <q-item>
            <q-item-main>
              <q-item-tile stamp class="text-faded">
                CNPJ
              </q-item-tile>
              <q-item-tile>
                {{numeral(cnpj).format('00000000000000').replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}}
              </q-item-tile>
            </q-item-main>
          </q-item>

          <q-item>
            <q-item-main>
              <q-item-tile stamp class="text-faded">
                CNPJ
              </q-item-tile>
              <q-item-tile>
                {{numeral(cnpj).format('00000000000').replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}}
              </q-item-tile>
            </q-item-main>
          </q-item>

          <q-item>
            <q-item-main>
              <q-item-tile stamp class="text-faded">
                Grupo Econômico
              </q-item-tile>
              <q-item-tile>
                MG Papelaria
              </q-item-tile>

            </q-item-main>
          </q-item>
        </q-list>

        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6" v-for="contato in 4" :key="contato">

            <q-card class="q-ma-sm">
              <q-card-title>
                Fiscal/Cobrança
              </q-card-title>
              <q-card-separator/>
              <q-card-main>
                <q-list no-border>
                  <q-item>
                    <q-item-main>
                      <q-item-tile stamp class="text-faded">
                        Nome
                      </q-item-tile>
                      <q-item-tile>
                        Ronaldinho
                      </q-item-tile>
                    </q-item-main>
                  </q-item>

                  <q-item>
                    <q-item-main>
                      <q-item-tile stamp class="text-faded">
                        Email
                      </q-item-tile>
                      <q-item-tile>
                        atanaelmendes@gmail.com
                      </q-item-tile>
                    </q-item-main>
                  </q-item>

                  <q-item>
                    <q-item-main>
                      <q-item-tile stamp class="text-faded">
                        Celular
                      </q-item-tile>
                      <q-item-tile>
                        {{numeral(celular).format('00000000000').replace(/^(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2-$3-$4")}}
                      </q-item-tile>
                    </q-item-main>
                  </q-item>

                  <q-item>
                    <q-item-main>
                      <q-item-tile stamp class="text-faded">
                        Fixo
                      </q-item-tile>
                      <q-item-tile>
                        {{numeral(fixo).format('0000000000').replace(/^(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")}}
                      </q-item-tile>
                    </q-item-main>
                  </q-item>

                </q-list>
              </q-card-main>
            </q-card>

          </div>
        </div>

      </div>

    </div>
  </AgroLayout>
</template>

<script>

  import AgroLayout from 'layouts/AgroLayout'

  export default {
    name: 'person-profile',
    components: {
      AgroLayout
    },
    data () {
      return {
        personLoaded: false,
        personData: [],

        celular: 66999763509,
        fixo: 6635325569,
        cpf: 45855566932,
        cnpj: 987666334189
      }
    },
    methods: {
      getPerson: function () {
        this.personLoaded = true

      //   let vm = this
      //   let params = {
      //     id: vm.$route.params.id
      //   }
      //   vm.$axios.get( 'account/'+ params.id ).then( response => {
      //     vm.personData = response.data
      //     this.personLoaded = true
      //   }).catch( error => {
      //     if (error.response.status == 404){
      //       this.$q.dialog({
      //         title:'Ops',
      //         message: 'Não foi possível carregar as informações'
      //       })
      //     }
      //     vm.$router.push( '/pessoas' )
      //     console.log('Erro Ocorrido:')
      //     console.log(error.request)
      //   })
      }
    },
    mounted() {
      this.getPerson()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
