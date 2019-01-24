<template>
  <custom-page widthInner="60%" isParent >
    <!--<toolbar slot="toolbar" title="Áreas" searchable navigation_type="menu" @search_changed="listBySearch">-->
    <toolbar slot="toolbar" title="Notas Fiscais" navigation_type="menu">
      <template slot="action_itens">
        <q-btn flat round dense icon="tune" >
          <q-popover anchor="bottom left">
            <q-list>
              <q-list-header>Filtrar por:</q-list-header>
              <q-item dense>
                <q-item-main>
                  <q-option-group
                    type="radio"
                    color="primary"
                    v-model="filter.type"
                    :options="[
                                { label: 'Autorizada', value: 100, color: 'positive' },
                                { label: 'Não autorizada', value: 10, color: 'grey' },
                                { label: 'Cancelada', value: 102, color: 'negative'},
                                { label: 'Em digitacão', value: 104, color: 'orange' }
                              ]"
                  />
                </q-item-main>
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </template>
    </toolbar>

    <div style="margin-bottom: 100px">
      <q-list highlight separator no-border link>
        <q-item v-for="notaFiscal in 10" :key="notaFiscal" @click.native="selectNotaFiscal(notaFiscal)">
          <q-item-main>

            <div class="row">

              <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <div class="row">BUNGE</div>
                <div class="row q-caption">
                  <q-chip small :color="(notaFiscal == 2)?'green':(notaFiscal == 3)?'red':(notaFiscal == 4)?'orange':'grey'" class="q-mt-xs q-ml-xs">
                    N-1-55-00342955
                  </q-chip>
                  <q-chip small class="q-mt-xs q-ml-xs">
                    R$ 10,999
                  </q-chip>
                </div>
              </div>

              <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <div class="row">

                  <div class="col-6">
                    <div class="row">Sinop-MT</div>
                    <div class="row">Venda</div>
                  </div>

                  <div class="col-6">
                    <div class="row q-caption text-faded">Emissão</div>
                    <div class="row">22 outubro 2018</div>
                    <div class="row q-caption">14:30:10</div>
                  </div>

                </div>
              </div>
            </div>

          </q-item-main>
        </q-item>
      </q-list>
    </div>

    <q-btn slot="fab-container" round color="primary" @click="newNotaFiscal()" icon="add" size="20px" />
  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import NotaFiscalService from 'assets/js/service/NotaFiscalService'
  export default {
    name: "notasFiscaisList",
    components: {
      toolbar,
      customPage
    },
    data () {
      return {
        notasFiscais: [],
        isEmptyList: null,
        notaFiscalLoaded: false,
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
        NotaFiscalService.listNotas(filter).then(response => {
          this.notasFiscais = response.data;
          this.isEmptyList = this.notasFiscais.length === 0;
        });
      },
      selectNotaFiscal: function(id) {
        this.$router.push({name: 'view_nota', params: {id:id}});
        // this.$router.push({name: 'add_pessoa'});
      },
      newNotaFiscal: function(){
        this.$router.push({name: 'new_nota'});
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
