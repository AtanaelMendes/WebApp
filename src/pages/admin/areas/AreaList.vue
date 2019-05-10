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
        <q-list link sparse no-border inset-separator>

          <q-item v-for="area in areas" :key="area.id" @click.native="viewArea(area.id)">
            <q-item-side align="center">
              <q-item-tile icon="place" color="primary" v-if="!area.deleted_at"/>
              <q-item-tile icon="location_off" color="negative" v-if="area.deleted_at"/>
            </q-item-side>
            <q-item-main inset>
              <q-item-tile>
                {{area.nome}}
                <q-chip color="negative" dense pointing="left" v-if="area.deleted_at">
                  inativo
                </q-chip>
              </q-item-tile>
              <q-item-tile sublabel>
                {{area.localizacao.endereco}},
                {{area.localizacao.bairro}}
                {{area.localizacao.cidade.nome}} -
                {{area.localizacao.cidade.estado.sigla}}
              </q-item-tile>
            </q-item-main>
          </q-item>

        </q-list>
      </div>
    </div>

    <div v-if="isEmptyList" class="no-result">
      <ap-no-results />
    </div>

    <q-page-sticky position="bottom-right" :offset="[35, 35]">
      <q-btn round color="deep-orange" @click="addArea()" icon="add" size="20px" />
    </q-page-sticky>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import apNoResults from 'components/ApNoResults'
  import AreaService from "../../../assets/js/service/area/AreaService";

  export default {
    name: "area-list",
    components: {
      toolbar,
      customPage,
      apNoResults
    },
    data () {
      return {
        areaService: new AreaService(),
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
        this.$q.loading.show();
        this.areaService.listAreas(filter).then(areas => {
          this.areas = areas;
          this.isEmptyList = this.areas.length === 0;
          this.$q.loading.hide();
        })
      },
      viewArea: function(id) {
        this.$router.push({name: 'view_area', params: {id:id}});
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
