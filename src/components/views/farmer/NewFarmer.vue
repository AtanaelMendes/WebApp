<template>
  <AgroLayout back-path="/produtores">
    <template slot="title">
      Novo Cadastro
    </template>


    <div slot="content" >

      <q-page padding class="row">
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3">

          <!--LOCALIZACAO-->
          <q-item>
            <q-item-main>
              <q-select
                float-label="Localização"
                v-model="formFarmer.localizacao"
                :options="options"
              />
            </q-item-main>
          </q-item>

          <!--TAMANHO-->
          <q-item>
            <q-item-main>
              <q-input float-label="Tamanho" v-model="formFarmer.tamanho" clearable/>
            </q-item-main>
            <q-item-side>
              <q-btn-dropdown color="secondary" :label="formFarmer.unidadeMedida">
                <q-list link>

                  <q-item @click.native="formFarmer.unidadeMedida = 'm2' " v-close-overlay>
                    <q-item-main>
                      <q-item-tile>M²</q-item-tile>
                      <q-item-tile sublabel>Metros quadrados</q-item-tile>
                    </q-item-main>
                  </q-item>

                  <q-item @click.native="formFarmer.unidadeMedida = 'hm2' " v-close-overlay>
                    <q-item-main>
                      <q-item-tile>HM²</q-item-tile>
                      <q-item-tile sublabel>Hectare</q-item-tile>
                    </q-item-main>
                  </q-item>

                  <q-item @click.native="formFarmer.unidadeMedida = 'hag' " v-close-overlay>
                    <q-item-main>
                      <q-item-tile>HA</q-item-tile>
                      <q-item-tile sublabel>alqueire Goiano</q-item-tile>
                    </q-item-main>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </q-item-side>
          </q-item>

          <q-list>
            <q-item>
              <q-item-main>
                <span v-for="talhao in arrayTalhoes" :key="talhao.nome">
                  <q-chip closable @hide="removeTalhao(talhao)" class="q-ma-xs">
                    {{talhao.nome}}
                  </q-chip>
                </span>
              </q-item-main>
            </q-item>
          </q-list>

          <q-item>
            <q-item-main>
              <q-btn color="secondary" label="adicionar talhão" class="full-width" @click.native="modalAddTalhao = true"/>
            </q-item-main>
          </q-item>

        </div>
      </q-page>

      <!--MODALADICIONAR TALHAO-->
      <template>
        <q-modal v-model="modalAddTalhao" minimized>

          <q-list no-border>

            <q-item>
              <q-item-main class="gutter-y-sm">
                <q-item-tile>
                  <q-input float-label="Nome Talhão" v-model="novoTalhao" @keyup.enter="addTalhao()"/>
                </q-item-tile>
                <q-item-tile align="end">
                  <q-btn label="cancelar" color="secondary" flat @click.native="modalAddTalhao = false"/>
                  <q-btn label="adicionar" color="secondary" @click.native="addTalhao()"/>
                </q-item-tile>
              </q-item-main>
            </q-item>

          </q-list>
        </q-modal>
      </template>
      <!-- FIM MODALADICIONAR TALHAO-->

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
        options: [
          {
            label: 'FAZENDA MIGLIORINI',
            sublabel: 'Rua Firmino de souza',
            value: '1'
          },
          {
            label: 'FAZENDA ROCHA',
            sublabel: 'Rua Adebaram',
            value: '2'
          },
          {
            label: 'FAZENDA TAMOIO',
            sublabel: 'Rua Touro sentado',
            value: '3'
          },
          {
            label: 'FAZENDA BAYER',
            sublabel: 'Rua Maximilion Werner',
            value: '4'
          },
          {
            label: 'FAZENDA BUNGE',
            sublabel: 'Rua Josefino Alcantara',
            value: '5'
          }
        ],
        loaded: false,
        modalAddTalhao: false,
        novoTalhao: null,
        arrayTalhoes: [],
        formFarmer: {
          localizacao: null,
          tamanho: null,
          unidadeMedida: 'Área',
        },
      }
    },
    methods: {
      removeTalhao: function(id) {
        var rm = this.arrayTalhoes.indexOf(id)
        this.arrayTalhoes.splice(rm, 1)
      },
      addTalhao: function() {
        this.arrayTalhoes.push({
          nome: this.novoTalhao
        })
        this.modalAddTalhao = false
        this.novoTalhao = null
        // this.$q.notify({
        //   type: 'positive',
        //   message: 'funcao adicionar talhao'
        // })
      },
      axiosRequest: function() {
        let vm = this
        let params = {
          nome: vm.formFarmer
        }
        vm.$axios.post( 'rota/'+ params ).then( response => {
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
