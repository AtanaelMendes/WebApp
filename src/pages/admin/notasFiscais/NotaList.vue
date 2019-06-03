<template>
  <custom-page widthInner="60%" isParent >
    <!--<toolbar slot="toolbar" title="Áreas" searchable navigation_type="menu" @search_changed="listBySearch">-->
    <toolbar slot="toolbar" title="Notas Fiscais" navigation_type="menu">
      <template slot="action_itens">
        <q-btn flat round dense icon="tune" >
          <q-popover anchor="bottom left">

            <q-item>
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

          </q-popover>
        </q-btn>
      </template>
    </toolbar>

    <div class="space-end">
      <q-list highlight separator no-border link>
        <q-item v-for="notaFiscal in notasFiscais" :key="notaFiscal.id" @click.native="selectNotaFiscal(notaFiscal.id)">
          <q-item-main>

            <div class="row">

              <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <div class="row">
                  {{notaFiscal.nota_fiscal_serie.nome}}
                </div>
                <div class="row q-caption">
                  <!--<q-chip small :color="(notaFiscal == 2)?'green':(notaFiscal == 3)?'red':(notaFiscal == 4)?'orange':'grey'" class="q-mt-xs q-ml-xs">-->
                  <q-chip small color="primary">
                    {{notaFiscal.numero}}
                  </q-chip>
                  <q-chip small>
                    {{numeral(notaFiscal.total_nota_fiscal).format('0,0.00')}}
                  </q-chip>
                </div>
              </div>

              <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <div class="row">

                  <div class="col-6">
                    <div class="row">{{notaFiscal.natureza}}</div>
                    <div class="row">
                      <q-chip color="primary" small :color="(notaFiscal.status == 'Digitacao')?'amber-5':'positive'">
                        {{notaFiscal.status}}
                      </q-chip>
                    </div>
                  </div>

                  <div class="col-6">
                    <div class="row q-caption text-faded">Emissão</div>
                    <div class="row">{{moment(notaFiscal.emissao).format('LLL')}}</div>
                  </div>

                </div>
              </div>
            </div>

          </q-item-main>
        </q-item>
      </q-list>
    </div>

    <create-nota-fiscal-modal ref="createNotaFiscalModal"/>

    <q-page-sticky position="bottom-right" :offset="[35, 35]">
      <q-btn round color="deep-orange" @click="createNotafiscal" icon="add" size="20px" />
    </q-page-sticky>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import apNoResults from 'components/ApNoResults'
  import agroUtils from "assets/js/AgroUtils";
  import createNotaFiscalModal from './components/CreateNotaFiscalModal.vue'
  import NotaFiscalService from '../../../assets/js/service/NotaFiscalService'
  export default {
    name: "notasFiscaisList",
    components: {
      toolbar,
      customPage,
      apNoResults,
      createNotaFiscalModal,
    },
    data () {
      return {
        notaFiscalService: new NotaFiscalService(),
        notasFiscais: [],
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
      listNotasFiscais: function(filter) {
        this.$q.loading.show();
        this.notaFiscalService.listNotasFiscaisWithFilter(agroUtils.serialize(filter)).then(response => {
          this.$q.loading.hide();
          this.notasFiscais = response;
        }).catch(()=>{
          this.isEmptyList = true;
          this.$q.loading.hide();
        })
      },
      selectNotaFiscal: function(id) {
        this.$router.push({name: 'view_nota_fiscal', params: {id:id}});
        // this.$router.push({name: 'add_pessoa'});
      },
      createNotafiscal: function(){
        this.$refs.createNotaFiscalModal.openModal()
      },
    },
    mounted () {
      this.listNotasFiscais(this.filter);
      this.$root.$on('refreshNotasFiscaisList', () => {
        this.listNotasFiscais(this.filter);
      });
    },
  }
</script>
<style>
  .space-end{
    margin-bottom: 300px;
  }
  .no-result{
    text-align: center;
    padding-top: 150px;
  }

  .no-result img{
    width: 300px;
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
