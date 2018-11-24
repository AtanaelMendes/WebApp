<template>
  <custom-page widthInner="60%" isParent >
    <!--<toolbar slot="toolbar" title="Áreas" searchable navigation_type="menu" @search_changed="listBySearch">-->
    <toolbar slot="toolbar" title="Áreas" searchable navigation_type="menu">
      <template slot="action_itens">
        <q-btn flat round dense icon="tune" >
          <q-popover anchor="bottom left">
            <q-list>
              <q-list-header>Filtrar por:</q-list-header>
              <q-item dense>
                <q-item-main>
                  <q-option-group type="radio" color="primary"v-model="filter.type"
                                  :options="[
                            { label: 'Ativos', value: 'non-trashed'},
                            { label: 'Inativos', value: 'trashed' },
                            { label: 'Todos', value: '' }
                            ]"
                  />
                </q-item-main>
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </template>
    </toolbar>

    <div v-if="!isEmptyList" class="space-end row">
      <div class="col-12">
        <q-list highlight no-border sparse>

          <q-item separator multiline link v-for="area in areas" :key="area.id" @click.native="selectArea(area.id)">
            <q-item-main>
              <q-item-tile>
                {{area.nome}}
              </q-item-tile>
              <q-item-tile sublabel>
                {{area.localizacao.bairro}},&nbsp{{area.localizacao.cidade.nome}}-{{area.localizacao.cidade.estado.sigla}}
              </q-item-tile>
            </q-item-main>
          </q-item>

        </q-list>
      </div>
    </div>


    <div v-if="isEmptyList" class="no-result">
      <img src="~/assets/sad_2.svg"/>
      <span>Nenhum resultado encontrado.</span>
    </div>

    <q-btn slot="fab-container" round color="primary" @click="addArea()" icon="add" size="20px" />

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import areaService from 'assets/js/service/area/AreaService'
  export default {
    name: "area-list",
    components: {
      toolbar,
      customPage
    },
    data () {
      return {
        areas: [],
        isEmptyList: null,
        areaLoaded: false,
        filter: {
          type: 'non-trashed',
        },
      }
    },
    watch: {
      filter: {
        handler: function(val, oldval) {
          // this.list(filter)
        },
        deep: true,
      }
    },
    methods: {
      list: function(filter) {
        areaService.listAreas(filter).then(response => {
          this.areas = response.data;
          this.isEmptyList = this.areas.length === 0;
        });
      },
      selectArea: function(id) {
        this.$router.push({name: 'view_area', params: {id:id}});
        // this.$router.push({name: 'add_pessoa'});
      },
      addArea: function(){
        this.$router.push({name: 'add_area'});
      },
    },
    mounted () {
      this.list(this.filter);
      this.$root.$on('refreshAreaList', () => {
        this.list(this.filter);
      });
    },
  }
</script>
<style>
  .space-end{
    margin-bottom: 150px;
  }
  .no-result{
    text-align: center;
    padding-top: 150px;
  }

  .no-result img{
    width: 120px;
    height: auto;
  }

  .no-result span{
    display: block;
    margin-top: 30px;
    font-size: 25px;
    font-weight: 300;
    color: #ababab;
  }
</style>
