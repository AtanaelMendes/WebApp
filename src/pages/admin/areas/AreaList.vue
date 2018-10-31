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

    <q-list highlight inset-separator no-border v-if="areas" link>
      <q-item v-for="area in areas" :key="area.id" @click.native="selectArea(area.id)">
        <q-item-side icon="place"/>
        <q-item-main>
          <q-item-tile>
            {{area.complemento}}
          </q-item-tile>
          <q-item-tile sublabel>
            {{area.endereco}} - {{area.cidade}}
          </q-item-tile>
        </q-item-main>
      </q-item>
    </q-list>
    <div v-else class="no-result">
      <img src="~/assets/sad_2.svg"/>
      <span>Nenhum resultado encontrado.</span>
    </div>

    <q-btn slot="fab-container" round color="primary" @click="addArea()" icon="add" size="20px" />

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import areaService from 'assets/js/service/AreaService'
  export default {
    name: "AreasList",
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
          // var filter = {type: val.type, email:(val.email.length > 2 ? val.email : '')};
          // this.list(filter)
        },
        deep: true,
      }
    },
    methods: {
      list: function(filter) {
        areaService.listAreas(filter).then(response => {
          // console.log(response.data)
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
      // this.$root.$on('refreshPessoaList', () => {
      //
      // });
    },
  }
</script>
<style>
  .no-result span{
    display: block;
    margin-top: 30px;
    font-size: 25px;
    font-weight: 300;
    color: #ababab;
  }
</style>
