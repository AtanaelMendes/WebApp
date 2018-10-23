<template>
  <AgroLayout back-path="/areas">
    <div slot="title">
      Nova Área
    </div>
    <div slot="content" >

      <q-page padding class="row">
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3">

          <!--LOCALIZACAO-->
          <q-item>
            <q-item-main>
              <q-select
                clearable
                float-label="Localização"
                :options="options"
                v-model="formFarmer.localizacaoID"
                @blur="$v.formArea.localizacaoID.$touch"
                :error="$v.formArea.localizacaoID.$error"
              />
            </q-item-main>
          </q-item>

          <!--TAMANHO-->
          <q-item>
            <q-item-main>
              <q-input
                float-label="Tamanho"
                type="number"
                clearable
                v-model="formFarmer.tamanho"
                @blur="$v.formArea.tamanho.$touch"
                :error="$v.formArea.tamanho.$error"
              />
            </q-item-main>

            <!--UNIDADE MEDIDA-->
            <q-item-side>
              <q-btn-dropdown
                outline
                :color="($v.formArea.unidadeMedidaID.$error)?'red':'secondary'"
                :label="(formFarmer.unidadeMedidaID)?formFarmer.unidadeMedidaID:'Medida'"
              >
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

          <q-item>
            <q-item-main align="end">
              <q-btn color="secondary" label="salvar" @click.native="createArea()"/>
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
  import { required } from 'vuelidate/lib/validators'
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
        formArea: {
          produtorID: null,
          localizacaoID: null,
          tamanho: null,
          unidadeMedidaID: null,
        },
      }
    },
    validations: {
      formArea: {
        localizacaoID: { required },
        tamanho: { required },
        unidadeMedidaID: { required },
      }
    },
    methods: {
      removeTalhao: function(id) {
        var rm = this.arrayTalhoes.indexOf(id)
        this.arrayTalhoes.splice(rm, 1)
      },
      addTalhao: function() {
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
            message: 'Este nome já foi adicionado'
          })
          return
        }
        this.modalAddTalhao = false
        this.novoTalhao = null
      },
      createTalhao: function(id) {
        let vm = this
        let params = {
          area_id: id
        }
        vm.$axios.post( 'rota/'+ params ).then( response => {
          console.log(response)
        }).catch( error => {
          console.log('Erro Ocorrido:')
          console.log(error)
        })
      },
      createArea: function() {
        this.$v.formArea.$touch()
        if ( this.$v.formArea.$error ) {
          if ( this.$v.formArea.localizacaoID.$error ) {
            this.$q.notify( 'Selecione uma localização' )
          }
          if ( this.$v.formArea.tamanho.$error ) {
            this.$q.notify( 'Imforme um tamanho' )
          }
          if ( this.$v.formArea.unidadeMedidaID.$error ) {
            this.$q.notify( 'Selecione uma unidade de medida' )
          }
          return
        }
        let vm = this
        let params = {
          produtor_id: vm.produtorID,
          localizacao_id: vm.localizacaoID,
          tamanho: vm.tamanho,
          unidade_medida_id: vm.unidadeMedidaID
        }
        vm.$axios.post( 'rota/'+ params ).then( response => {
          vm.areaID = response.data
          this.createTalhao(id)
          console.log(vm.areaID)
        }).catch( error => {
          console.log('Erro Ocorrido:')
          console.log(error)
        })
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
