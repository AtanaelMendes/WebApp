<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction" :title="'Safra ' + safra.inicio + '/' + safra.fim">
      <template slot="action_itens" v-if="safra">
        <q-btn flat round dense icon="edit" @click.native="editSafra(safra.id)"/>
        <q-btn flat round dense icon="more_vert" >
          <q-popover anchor="bottom left">
            <q-list link>
              <q-item dense @click.native="disableSafra(safra.id)" v-if="!safra.deleted_at">
                <q-item-main label="Inativar safra"  />
              </q-item>
              <q-item dense @click.native="enableSafra(safra.id)" v-if="safra.deleted_at">
                <q-item-main label="Ativar safra"  />
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </template>
    </toolbar>
    <div>
      <q-list no-border>
        <q-list-header class="q-title">Informações</q-list-header>
        <q-item>
          <q-item-main>
            <q-item-tile class="q-subheading">Local</q-item-tile>
            <q-item-tile sublabel>{{safra.area.nome}}</q-item-tile>
            <q-item-tile sublabel>{{safra.area.localizacao}}</q-item-tile>
          </q-item-main>
        </q-item>

        <q-item>
          <q-item-main>
            <q-item-tile class="q-subheading">Talhão</q-item-tile>
            <q-item-tile sublabel>{{safra.talhao.nome}} ({{pluralize(safra.talhao.tamanho, safra.talhao.unidade_area)}})</q-item-tile>
            <q-item-tile sublabel>{{pluralize(safra.culturas.length, 'cultura')}} para o plantio</q-item-tile>
          </q-item-main>
        </q-item>
        <q-list-header class="q-title">Culturas</q-list-header>
        <q-item v-for="cultura in safra.culturas">
          <q-item-main>
            <q-item-tile class="q-subheading">{{cultura.nome}}</q-item-tile>
            <!--<q-item-tile sublabel>Tamanho ocupado: {{pluralize(cultura.tamanho, safra.talhao.unidade_area)}} ({{'~'+fixPercent(cultura.tamanho / safra.talhao.tamanho * 100)}}%)</q-item-tile>-->
            <q-item-tile sublabel>Tamanho ocupado: <span>{{pluralize(cultura.tamanho, safra.talhao.unidade_area)}}</span></q-item-tile>
            <q-item-tile sublabel>Estimativa de colheita:  <span>{{pluralize(cultura.estimativa, cultura.estimativa_unidade_medida)}}</span></q-item-tile>
          </q-item-main>
        </q-item>
      </q-list>
    </div>
  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import safraService from 'assets/js/service/SafraService'

  export default {
    name: "SafraView",
    components: {
      toolbar,
      customPage,
    },
    data(){
      return {
        safra: null,
      }
    },
    watch: {
      '$route' (to, from) {
        this.getSafraById(to.params.id)
      }
    },
    methods:{
      pluralize: function(amount, word){
        return amount + ' ' + word + (amount > 1 ? 's' : '');
      },
      fixPercent(value){
        return Number(value).toLocaleString(undefined, {maximumFractionDigits:1})
      },
      getSafraById: function(id){
        safraService.getSafra(id).then(response => {
          this.safra = response.data;
        })
      },
      editSafra: function(id){
        this.$router.push({name: 'edit_safra', params: {id:id}});
      },
      enableSafra: function(id){
        safraService.restoreSafra(id).then(response => {
          if(response.status === 200) {
            this.$root.$emit('refreshSafraList')
          }
        })
      },
      disableSafra: function(id){
        safraService.deleteSafra(id).then(response => {
          if(response.status === 200) {
            this.$root.$emit('refreshSafraList')
          }
        })
      },
      backAction: function () {
        this.$router.push({name: 'safras'});
      }
    },
    mounted(){
      this.getSafraById(this.$route.params.id);
    }
  }

</script>

<style scoped>

</style>
