<template>
  <AgroLayout rightDrawer back-path="/">

    <div slot="title" v-if="$q.platform.is.desktop">
      Pessoas
    </div>

    <div slot="rightBtn">
      <q-btn flat round icon="edit" @click="editPerson()" v-if="$q.platform.is.desktop && personsData.id"/>
    </div>

    <div slot="searchField">
      <q-search no-icon	inverted-light placeholder="Busca por nome" color="white"
      clearable v-model="searchName" :after="[{icon: 'search'}]"/>
    </div>

    <div slot="rightDrawer">
      <q-list>
        <q-list-header>Filtros</q-list-header>
        <q-item>
          <q-item-main>
            <q-option-group type="radio" color="secondary"v-model="filter.type"
                            :options="[
                            { label: 'Todos', value: null },
                            { label: 'Inativos', value: 'trashed' },
                            { label: 'Ativos', value: 'non-trashed'}]"
            />
          </q-item-main>
        </q-item>
      </q-list>
    </div>

    <div slot="content">

      <q-page class="row gutter-x-md q-px-sm">

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <q-list highlight no no-border v-if="loaded">
            <q-item v-for="person in 10" :key="person" link inset-separator multiline @click.native="getPerson()">
              <q-item-side icon="account_circle"/>

              <q-item-main>
                <q-item-tile>
                  {{person}} Fulano da Silva
                  <q-chip small square color="red" v-if="person == 3">
                    INATIVO
                  </q-chip>
                </q-item-tile>
              </q-item-main>

              <q-item-side>
                <q-item-tile stamp>16 maio 2002</q-item-tile>
                <!--<q-item-tile stamp>{{ moment(person.created_at).format('DD MMMM YYYY') }}</q-item-tile>-->
                <!--<q-item-tile v-if="person.deleted_at" stamp>{{ moment(person.deleted_at).format('DD MMMM YYYY') }}</q-item-tile>-->
              </q-item-side>
            </q-item>
          </q-list>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6" v-if="personLoaded">
          <q-list no-border highlight>

            <q-item>
              <q-item-main class="q-title">
                Fulano da Silva
              </q-item-main>
              <q-item-side>
                <q-btn  color="primary" flat label="ativar"/>
                <q-btn  color="primary" flat label="inativar"/>
                <!--<q-btn @click.native="activateUser(userProfile.id)" color="primary" flat label="ativar" v-if="userProfile.deleted_at"/>-->
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

              <q-card class="q-ma-xs">
                <q-card-title>
                  Fiscal/Cobrança
                </q-card-title>
                <q-card-separator/>
                <q-card-main>
                  <q-list highlight no-border>

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
      </q-page>

      <q-page-sticky corner="bottom-right" :offset="[25, 25]">
        <q-btn size="20px" round color="secondary" @click.native="$router.push('/pessoa/cadastro')" icon="person_add" />
      </q-page-sticky>

    </div>
  </AgroLayout>
</template>

<script>
import AgroLayout from 'layouts/AgroLayout'
import { Platform } from 'quasar'

export default {
  name: 'list-person',
  components: {
    AgroLayout
  },
  data () {
    return {
      filter: {
        type: null,
      },
      loaded: false,
      personLoaded: false,
      personsData: [],
      searchName: '',

      celular: 66999763509,
      fixo: 6635325569,
      cpf: 45855566932,
      cnpj: 987666334189
    }
  },
  watch: {
    filter: {
      handler: function(val, oldval) {
        this.list(val)
        console.log(val)
      },
      deep: true,
    }
  },
  methods: {
    editPerson: function() {
      if(this.personsData.id) {
        this.$router.push('pessoa/editar/' + this.personsData.id)
      }
    },
    inactive: function(id) {
      let vm = this
      this.$q.dialog({
        title: 'Inativar',
        message: 'Têm certeza que deseja inativar este usuário?',
        ok: 'OK',
        cancel: 'Cancelar'
      }).then(() => {
        vm.$axios.delete( 'account/'+ id ).then( response => {
          this.$q.notify({
            type: 'positive',
            message: 'Usuário excluido com sucesso'
          })
          vm.$router.push( '/usuario' )
        })
      }).catch( error => {
        console.log('Erro Ocorrido:')
        console.log(error)
      })
    },
    list: function(val) {
      this.loaded = true
      // let vm = this
      // vm.$axios.get( 'account'+ vm.email ).then( response => {
      //   vm.personsData = response.data
      // }).catch( error => {
      //   console.log('Erro Ocorrido:')
      //   console.log(error)
      // })
    },
    getPerson: function (id) {
      if(this.$q.platform.is.mobile) {
        this.$router.push('pessoa/editar/' + id)
      }else {
        this.personLoaded = true
        // let vm = this
        // vm.$axios.get( 'account'+ vm.email ).then( response => {
        //   vm.personsData = response.data
        // }).catch( error => {
        //   console.log('Erro Ocorrido:')
        //   console.log(error)
        // })
      }

    },
  },
  mounted () {
    this.list()
    this.personsData.id = 1
  }
}
</script>
<style>
</style>
