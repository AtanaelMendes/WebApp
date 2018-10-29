<template>
  <AgroLayout back-path="/areas">
    <div slot="title">
      Editar Área
    </div>

    <!--TAB HEADER-->
    <div slot="tabHeader">
      <q-tabs v-model="tabs" color="secondary">
        <q-tab slot="title" name="tab-area"  label="Área" default/>
        <q-tab slot="title" name="tab-talhoes" label="Talhões"/>
      </q-tabs>
    </div>

    <div slot="content" >

      <q-page padding class="row">
        <!--TAB AREA-->
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" v-if="tabs == 'tab-areas' ">

          <!--LOCALIZACAO-->
          <q-item>
            <q-item-main>
              <q-select
                clearable
                float-label="Localização"
                v-model="formArea.localizacaoID"
                :options="options"
                @blur="$v.formArea.localizacaoID.$touch"
                :error="$v.formArea.localizacaoID.$error"
              />
            </q-item-main>
          </q-item>

          <!--TAMANHO-->
          <q-item>
            <q-item-main>
              <q-input
                type="number"
                float-label="Tamanho"
                clearable
                v-model="formArea.tamanho"
                @blur="$v.formArea.tamanho.$touch"
                :error="$v.formArea.tamanho.$error"
              />
            </q-item-main>

            <!--UNIDADE MEDIDA-->
            <q-item-side>
              <q-btn-dropdown
                outline
                :color="($v.formArea.unidadeMedidaID.$error)?'red':'secondary'"
                :label="(formArea.unidadeMedidaID)?formArea.unidadeMedidaID:'Medida'"
              >
                <q-list link>

                  <q-item @click.native="formArea.unidadeMedidaID = 'm2' " v-close-overlay>
                    <q-item-main>
                      <q-item-tile>M²</q-item-tile>
                      <q-item-tile sublabel>Metros quadrados</q-item-tile>
                    </q-item-main>
                  </q-item>

                  <q-item @click.native="formArea.unidadeMedidaID = 'hm2' " v-close-overlay>
                    <q-item-main>
                      <q-item-tile>HM²</q-item-tile>
                      <q-item-tile sublabel>Hectare</q-item-tile>
                    </q-item-main>
                  </q-item>

                  <q-item @click.native="formArea.unidadeMedidaID = 'hag' " v-close-overlay>
                    <q-item-main>
                      <q-item-tile>HA</q-item-tile>
                      <q-item-tile sublabel>alqueire Goiano</q-item-tile>
                    </q-item-main>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </q-item-side>
          </q-item>

          <q-item>
            <q-item-main align="end">
              <q-btn color="secondary" label="salvar" @click.native="updateArea()"/>
            </q-item-main>
          </q-item>

        </div>
        <!--FIM TAB AREA-->

        <!--TAB TALHAO-->
        <div class="col-12" v-if="tabs == 'tab-talhoes' ">
          <div class="row gutter-sm" v-if="arrayTalhoes.length > 0">
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="talhao in arrayTalhoes" :key="talhao.nome">
              <q-card>
                <q-card-title>
                  {{talhao.nome}}
                </q-card-title>
                <q-card-main>
                  <q-item class="q-pa-none">
                    <q-item-main>
                      <q-item-tile sublabel>
                        Localização
                      </q-item-tile>
                      <q-item-tile>
                        {{talhao.localizacao}}
                      </q-item-tile>
                    </q-item-main>
                  </q-item>
                </q-card-main>
                <q-card-separator/>
                <q-card-actions align="end">
                  <q-btn flat color="secondary" @click.native="deleteTalhao()" label="excluir"/>
                  <q-btn color="secondary" @click.native="modalUpdateTalhao = true" label="editar"/>
                </q-card-actions>
              </q-card>
            </div>
          </div>
          <q-page-sticky corner="bottom-right" :offset="[25, 25]">
            <q-btn size="20px" round color="secondary" @click.native="modalAddTalhao = true" icon="add" />
          </q-page-sticky>
        </div>
        <!--FIM TAB TALHAO-->

      </q-page>


      <!--MODAL ADICIONAR TALHAO-->
      <template>
        <q-modal v-model="modalAddTalhao" minimized no-backdrop-dismiss>

          <q-list no-border>

            <q-item>
              <q-item-main class="gutter-y-sm">
                <q-item-tile>
                  <q-input float-label="Nome Talhão" v-model="novoTalhao" @keyup.enter="createTalhao()"/>
                </q-item-tile>
                <q-item-tile align="end">
                  <q-btn label="cancelar" color="secondary" flat @click.native="modalAddTalhao = false"/>
                  <q-btn label="adicionar" color="secondary" @click.native="createTalhao()"/>
                </q-item-tile>
              </q-item-main>
            </q-item>

          </q-list>
        </q-modal>
      </template>
      <!-- FIM MODAL ADICIONAR TALHAO-->

      <!--MODAL UPDATE TALHAO-->
      <template>
        <q-modal v-model="modalUpdateTalhao" minimized no-backdrop-dismiss>
          <q-list no-border>

            <q-item>
              <q-item-main class="gutter-y-sm">
                <q-item-tile>
                  <q-input float-label="Nome Talhão" v-model="UpdTalhao" @keyup.enter="updateTalhao()"/>
                </q-item-tile>
                <q-item-tile align="end">
                  <q-btn label="cancelar" color="secondary" flat @click.native="modalUpdateTalhao = false, UpdTalhao = null"/>
                  <q-btn label="adicionar" color="secondary" @click.native="updateTalhao()"/>
                </q-item-tile>
              </q-item-main>
            </q-item>

          </q-list>
        </q-modal>
      </template>
      <!-- FIM MODAL UPDATE TALHAO-->


    </div>
  </AgroLayout>
</template>

<script>
  import AgroLayout from 'layouts/AgroLayout'
  import { required } from 'vuelidate/lib/validators'
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
        tabs: null,
        loaded: false,
        talhaoLoaded: false,
        modalAddTalhao: false,
        modalUpdateTalhao: false,
        novoTalhao: null,
        areaData: null,
        arrayTalhoes: [],
        UpdTalhao: null,
        formArea: {
          produtorID: null,
          localizacaoID: null,
          tamanho: null,
          unidadeMedidaID: null,
        }
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
      listTalhao: function(id) {
        this.$axios.get( 'rota/' + id  ).then( response => {
          // console.log(response)
          this.arrayTalhoes = response.data
          this.talhaoLoaded = true
        }).catch( error => {
          console.log(error)
        })
      },
      loadArea: function() {
        this.$axios.get( 'rota' ).then( response => {
          // console.log(response)
          this.areaData = response
          this.loaded = true
          this.listTalhao(this.areaData.id)
        }).catch( error => {
          console.log(error)
        })
      },
      deleteTalhao: function(id) {
        let vm = this
        vm.$q.notify({type: 'positive', message: 'Excluído com sucesso'})
        // let params = {
        //   area_id: vm.areaData.id,
        //   id: id
        // }
        // this.$axios.delete( 'rota'+ params ).then( response => {
        //   // console.log(response)
        //   vm.$q.notify({type: 'positive', message: 'Excluído com sucesso'})
        // }).catch( error => {
        //   console.log(error)
        // })
      },
      updateTalhao: function() {
        let vm = this
        if(vm.UpdTalhao == null){
          vm.$q.notify({ type: 'negative', message: 'Nome está em branco'})
          return
        }
        var verifyName = 0
        vm.arrayTalhoes.forEach(function (talhao) {
          if(talhao.nome == vm.UpdTalhao){
            verifyName++
          }
        })
        if(verifyName > 0){
          vm.$q.notify({ type: 'negative', message: 'Este nome já existe'})
          return
        }
        vm.$q.notify({type: 'positive', message: 'Alterado com sucesso'})
        // let params = {
        //   area_id: this.areaData.id,
        //   nome: this.UpdTalhao
        // }
        // vm.$axios.post( 'rota/'+ params ).then( response => {
        //   console.log(response)
        // vm.$q.notify({type: 'positive', message: 'Adicionado com sucesso'})
        this.modalUpdateTalhao = false
        this.UpdTalhao = null
        // }).catch( error => {
        //   console.log(error)
        // })
      },
      createTalhao: function () {
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
        vm.$q.notify({type: 'positive', message: 'Adicionado com sucesso'})
        // let params = {
        //   area_id: this.areaData.id,
        //   nome: this.novoTalhao
        // }
        // vm.$axios.post( 'rota/'+ params ).then( response => {
        //   console.log(response)
        // vm.$q.notify({type: 'positive', message: 'Adicionado com sucesso'})
          this.modalAddTalhao = false
          this.novoTalhao = null
        // }).catch( error => {
        //   console.log(error)
        // })
      },
      updateArea: function() {
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
        vm.$axios.put( 'rota/'+ params ).then( response => {
          // console.log(response)
          vm.$q.notify({type: 'positive', message: 'Atualizado com sucesso'})
        }).catch( error => {
          console.log(error)
        })
      },
      fakeData: function() {
        let vm = this
        for (var i = 0; i < 5; i++) {
          vm.arrayTalhoes.push({
            nome: 'Mg'+ i,
            localizacao: 'FAZENDA MIGLIORINI'
          })
        }
      }
    },
    mounted() {
      this.fakeData()
      // this.loadArea
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
