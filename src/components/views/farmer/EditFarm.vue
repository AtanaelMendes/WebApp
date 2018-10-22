<template>
  <AgroLayout back-path="/areas">
    <div slot="title">
      Editar Área
    </div>


    <div slot="content" >

      <q-page padding class="row">
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">

          <!--LOCALIZACAO-->
          <q-item>
            <q-item-main>
              <q-select
                float-label="Localização"
                v-model="formFarmer.localizacaoID"
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
              <q-btn-dropdown color="secondary" :label="formFarmer.unidadeMedidaID">
                <q-list link>

                  <q-item @click.native="formFarmer.unidadeMedidaID = 'm2' " v-close-overlay>
                    <q-item-main>
                      <q-item-tile>M²</q-item-tile>
                      <q-item-tile sublabel>Metros quadrados</q-item-tile>
                    </q-item-main>
                  </q-item>

                  <q-item @click.native="formFarmer.unidadeMedidaID = 'hm2' " v-close-overlay>
                    <q-item-main>
                      <q-item-tile>HM²</q-item-tile>
                      <q-item-tile sublabel>Hectare</q-item-tile>
                    </q-item-main>
                  </q-item>

                  <q-item @click.native="formFarmer.unidadeMedidaID = 'hag' " v-close-overlay>
                    <q-item-main>
                      <q-item-tile>HA</q-item-tile>
                      <q-item-tile sublabel>alqueire Goiano</q-item-tile>
                    </q-item-main>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </q-item-side>
          </q-item>

          <q-list v-if="arrayTalhoes.length > 0">
            <q-item>
              <q-item-main>
                <span v-for="talhao in arrayTalhoes" :key="talhao.nome">
                  <q-chip closable @hide="deleteTalhao(talhao)" class="q-ma-xs">
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

          <q-item>
            <q-item-main align="end">
              <q-btn color="secondary" label="salvar" @click.native="updateArea()"/>
            </q-item-main>
          </q-item>

        </div>

      </q-page>

      <!--MODAL ADICIONAR TALHAO-->
      <template>
        <q-modal v-model="modalAddTalhao" minimized>

          <q-list no-border>

            <q-item>
              <q-item-main class="gutter-y-sm">
                <q-item-tile>
                  <q-input float-label="Nome Talhão" v-model="novoTalhao" @keyup.enter="verifynomeTalhao()"/>
                </q-item-tile>
                <q-item-tile align="end">
                  <q-btn label="cancelar" color="secondary" flat @click.native="modalAddTalhao = false"/>
                  <q-btn label="adicionar" color="secondary" @click.native="verifynomeTalhao()"/>
                </q-item-tile>
              </q-item-main>
            </q-item>

          </q-list>
        </q-modal>
      </template>
      <!-- FIM MODAL ADICIONAR TALHAO-->


    </div>
  </AgroLayout>
</template>

<script>
  import AgroLayout from 'layouts/AgroLayout'

  export default {
    name: 'edit-farm',
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
        talhaoLoaded: false,
        modalAddTalhao: false,
        novoTalhao: null,
        areaData: null,
        arrayTalhoes: [],
        formFarmer: {
          produtorID: null,
          localizacaoID: null,
          tamanho: null,
          unidadeMedidaID: 'Área',
        }
      }
    },
    methods: {
      listTalhao: function(id) {
        this.$axios.get( 'rota' ).then( response => {
          console.log(response)
          this.arrayTalhoes = response.data
          this.talhaoLoaded = true
        }).catch( error => {
          console.log(error)
        })
      },
      loadArea: function() {
        this.$axios.get( 'rota' ).then( response => {
          console.log(response)
          this.areaData = response
          this.loaded = true
          this.listTalhao(this.areaData.id)
        }).catch( error => {
          console.log(error)
        })
      },
      deleteTalhao: function(id) {
        vm.$axios.del( 'rota/'+ id ).then( response => {
          console.log(response)
        }).catch( error => {
          console.log(error)
        })
      },
      verifynomeTalhao: function() {
        let vm = this
        vm.arrayTalhoes.push({
          nome: vm.novoTalhao
        })
        var verifyName = 0
        vm.arrayTalhoes.forEach(function (talhao) {
          if(talhao.nome == vm.novoTalhao){
            verifyName++
          }
        })
        if(verifyName > 1){
          vm.arrayTalhoes.pop()
          vm.$q.notify({
            type: 'negative',
            message: 'Este nome já existe'
          })
          return
        }
        this.createTalhao()
      },
      createTalhao: function () {
        let vm = this

        // let params = {
        //   area_id: this.areaData.id,
        //   nome: this.novoTalhao
        // }
        // vm.$axios.post( 'rota/'+ params ).then( response => {
        //   console.log(response)
          this.modalAddTalhao = false
          this.novoTalhao = null
        // }).catch( error => {
        //   console.log(error)
        // })
      },
      updateArea: function() {
        let vm = this
        let params = {
          produtor_id: vm.produtorID,
          localizacao_id: vm.localizacaoID,
          tamanho: vm.tamanho,
          unidade_medida_id: vm.unidadeMedidaID
        }
        vm.$axios.put( 'rota/'+ params ).then( response => {
          console.log(response)
        }).catch( error => {
          console.log('Erro Ocorrido:')
          console.log(error)
        })
      }
    },
    mounted() {
      // this.loadArea
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
