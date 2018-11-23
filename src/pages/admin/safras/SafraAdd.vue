<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction" title="Nova Safra">
      <q-btn slot="action_itens" flat dense round icon="done" @click="saveSafra()"/>
    </toolbar>

    <q-stepper ref="stepper">
      <q-step default title="First Step" subtitle="Here we go">
        <div class="row q-pa-md">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <form>
              <custom-input-text type="text" label="Início" :model="safra.inicio" maxlength="4" mask="####"/>

              <custom-input-text type="text" label="Fim" :model="safra.fim" maxlength="4" mask="####"/>

              <q-field :error="safra.area.errorMessage != null" class="q-mb-sm">
                <q-select v-model="safra.area.value" :options="areas" @input="getTalhoesByArea(safra.area.value)"/>
                <div class="q-field-bottom row no-wrap" style="height: 22px">
                  <div class="q-field-error col" v-if="safra.area.errorMessage != null" >{{safra.area.errorMessage}}</div>
                </div>
              </q-field>

              <q-field :error="safra.talhao.errorMessage != null" class="q-mb-sm">
                <q-select v-model="safra.talhao.value" :options="talhoes"/>
                <div class="q-field-bottom row no-wrap" style="height: 22px">
                  <div class="q-field-error col" v-if="safra.talhao.errorMessage != null" >{{safra.talhao.errorMessage}}</div>
                </div>
              </q-field>

            </form>
          </div>
        </div>
      </q-step>

      <q-step title="Step 2">aaa</q-step>

      <q-stepper-navigation>
        <q-btn
          flat
          @click="$refs.stepper.previous()"
          label="Back"
        />
        <q-btn
          @click="$refs.stepper.next()"
          label="Next"
        />
      </q-stepper-navigation>
    </q-stepper>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import Safra from 'assets/js/model/Safra'
  import areaService from 'assets/js/service/area/AreaService'
  import talhaoService from 'assets/js/service/TalhaoService'

  export default {
    name: "SafraAdd",
    components: {
      toolbar,
      customPage,
      customInputText,
    },
    data(){
      return {
        safra: new Safra(),
        areas: [],
        talhoes: []
      }
    },
    methods:{
      saveSafra: function(){
        if(!this.safra.isValid()){
          return;
        }
        /*PessoaService.savePessoa(this.pessoa.getValues()).then(response => {
          console.log(response.status)
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Pessoa criada com sucesso'});
            this.$router.push({name: 'pessoas'});
            this.$root.$emit('refreshPessoaList')
          }
        }).catch(error => {
          this.$q.notify({type: 'negative'', message: 'http:' + error.status + error.request.response})
        });*/

      },
      getAreas: function(){
        areaService.listAreas().then(response => {
          this.areas = response.data.map(area => {
            return {
              label: area.nome,
              value: area.id
            }
          })
        })
      },
      getTalhoesByArea: function(area_id){
        talhaoService.listTalhoes(area_id).then(response => {
          this.talhoes = response.data.map(talhao => {
            return {
              label: talhao.nome,
              value: talhao.id
            }
          })
        })
      },
      backAction: function () {
        this.$router.push({name: 'safras'});
      }
    },
    mounted () {
      this.getAreas();
    },
  }
</script>

<style scoped>

</style>
