<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Negócios" searchable @search_changed="listBySearch" navigation_type="menu" >
      <template slot="action_itens">
        <q-btn flat round dense icon="tune" >
          <q-popover anchor="bottom left">
            <q-list>
              <q-list-header>Filtrar por:</q-list-header>
              <q-item dense>
                <q-item-main>
                  <q-option-group type="radio" color="primary" v-model="filter.type"
                                  :options="[
                            { label: 'Ativos', value: 'non-trashed'},
                            { label: 'Inativos', value: 'trashed' },
                            { label: 'Todos', value: 'all' }
                            ]"
                  />
                </q-item-main>
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </template>
    </toolbar>

    <!--LISTA DE CONTRATOS-->
    <div class="row gutter-sm space-end q-pa-md" v-if="negocios">
      <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3" v-for="negocio in negocios" :key="negocio.id">

        <q-card @click.native="viewNegocio(negocio.id)" class="cursor-pointer full-height">
          <q-card-title>
            {{ negocio.nome }}
            <span slot="subtitle">
              {{ negocio.tipoNegocio.nome }} de
                    {{ moment(negocio.emissao).format('DD/MMM/YYYY') }}
            </span>
            <q-btn slot="right" @click.stop round flat icon="more_vert" @click.stop>
              <q-popover>
                <q-list link no-boder>
                  <q-item v-close-overlay @click.native="archiveNegocio(negocio.id)" v-if="!negocio.deleted_at">
                    <q-item-main label="Arquivar"/>
                  </q-item>
                  <q-item v-close-overlay @click.native="restoreNegocio(negocio.id)" v-if="negocio.deleted_at">
                    <q-item-main label="Ativar"/>
                  </q-item>
                  <q-item v-close-overlay @click.native="deleteNegocio(negocio.id)">
                    <q-item-main label="Excluir"/>
                  </q-item>
                </q-list>
              </q-popover>
            </q-btn>
          </q-card-title>

          <q-card-separator/>
          <q-item class="bg-negative" v-if="negocio.deleted_at">
            <q-item-side icon="folder" color="white"/>
            <q-item-main class="text-white">
              Arquivado
            </q-item-main>
          </q-item>
          <q-card-main class="q-pa-none">
            <q-item inset-separator>

              <q-item-side v-if="negocio.image_file_name">
                <q-item-tile avatar>
                  <ap-image size="250x250" :file-name="negocio.image_file_name"/>
                </q-item-tile>
              </q-item-side>
              <q-item-side icon="work" v-if="!negocio.image_file_name"/>

              <q-item-main>
                <q-item-tile>
                  {{ negocio.safra }}
                </q-item-tile>

                <q-item-tile sublabel>
                  {{negocio.numero_contrato}}<span v-if="negocio.numero_contrato && negocio.numero_pedido">,</span>
                  {{negocio.numero_pedido}}
                </q-item-tile>
              </q-item-main>
            </q-item>

            <q-item inset-separator v-if="negocio.quantidade_entregue || negocio.quantidade">
              <q-item-side icon="mdi-scale" :color="negocio.quantidade_entregar >= 1?'negative':'primary'" />
              <q-item-main>
                <q-item-tile>

                  <span class="text-faded">Entregue</span>
                  {{ numeral(negocio.quantidade_entregue).format('0,0') }}

                  <span class="text-faded" v-if="negocio.quantidade">de</span>
                  <span v-if="negocio.quantidade">
                    {{ numeral(negocio.quantidade).format('0,0') }}
                  </span>

                  <span v-if="negocio.unidadeMedida" class="text-faded">{{ negocio.unidadeMedida.plural }}</span>
                </q-item-tile>

                <q-item-tile sublabel v-if="negocio.quantidade_entregar >= 1">
                  Faltando
                  {{ numeral(negocio.quantidade_entregar).format('0,0') }}
                  {{negocio.unidadeMedida.sigla}}
                  ({{ numeral(negocio.quantidade_entregar / negocio.quantidade * 100).format('0,0.0') }}%)
                </q-item-tile>

                <q-item-tile sublabel v-else-if="negocio.quantidade_entregar <= -1">
                  Sobrando
                  {{ numeral(negocio.quantidade_entregar*-1).format('0,0') }}
                  {{negocio.unidadeMedida.sigla}}
                </q-item-tile>

              </q-item-main>
            </q-item>


            <q-item v-if="negocio.tipoNegocio.is_fixacao && negocio.quantidade_fixar" inset-separator	>
              <q-item-side icon="attach_money" :color="negocio.quantidade_fixar >= 1?'negative':'primary'" />
              <q-item-main>
                <q-item-tile label v-for="fixacao in negocio.fixacoes" :key="negocio.id + '_' + fixacao.id">
                  <template v-if="negocio.quantidade != fixacao.quantidade">
                    {{ numeral(fixacao.quantidade).format('0,0') }}
                    {{ fixacao.unidade_medida_quantidade }}
                    à
                  </template>
                  {{ fixacao.moeda }}
                  {{ numeral(fixacao.preco).format('0,0.00') }}/{{ fixacao.unidade_medida_preco }}
                  <template v-if="fixacao.is_preco_liquido">
                    Líquido
                  </template>
                  <template v-else>
                    Bruto
                  </template>
                </q-item-tile>
                <q-item-tile v-if="negocio.quantidade_fixar >= 1">
                  {{ numeral(negocio.quantidade_fixar).format('0,0') }}
                  {{negocio.unidadeMedida.sigla}}
                  à fixar
                </q-item-tile>
              </q-item-main>
            </q-item>

            <q-item v-if="negocio.prazo_entrega_final" inset-separator>
              <q-item-side icon="date_range" :color="(negocio.quantidade_entregar >= 1 && moment(negocio.prazo_entrega_final).isBefore())?'negative':'primary'" />
              <q-item-main>
                <q-item-tile label>
                  <template v-if="negocio.prazo_entrega_inicial">
                    {{ moment(negocio.prazo_entrega_inicial).format('DD/MMM') }}
                    a
                  </template>
                  {{ moment(negocio.prazo_entrega_final).format('DD/MMM/YYYY') }}
                </q-item-tile>
                <q-item-tile sublabel v-if="negocio.quantidade_entregar >= 1">
                  {{ moment(negocio.prazo_entrega_final).fromNow() }}
                </q-item-tile>
              </q-item-main>
            </q-item>



          </q-card-main>
        </q-card>

      </div>

      <!--EMPTY LIST-->
      <div class="col-12" v-if="negocios.length <= 0">
        <ap-no-results />
      </div>

      <!--PAGE STICKY BUTTOMS-->
      <q-page-sticky position="bottom-right" :offset="[35, 35]">
        <q-fab icon="add" direction="up" color="deep-orange" class="custom-fab" >
          <q-fab-action color="grey-1" text-color="grey-7" icon="add"  v-for="tipoNegocio in tipoNegocios" :key="tipoNegocio.id"
                        @click="addNegocio(tipoNegocio)">
            <span class="shadow-2">{{tipoNegocio.nome}}</span>
          </q-fab-action>
        </q-fab>
      </q-page-sticky>
    </div>
    <new-negocio-modal ref="newNegocioModal" />

  </custom-page>
</template>
<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import newNegocioModal from './components/modals/NewNegocioModal';
  import apImage from 'components/ApImage'
  import apNoResults from 'components/ApNoResults'
  import NegocioService from "assets/js/service/negocio/NegocioService";
  import agroUtils from "assets/js/AgroUtils";
  export default {
    name: "negocios",
    components: {
      apNoResults,
      apImage,
      toolbar,
      customPage,
      newNegocioModal,
    },
    data () {
      return {
        negocioService: new NegocioService(),
        negocios: null,
        tipoNegocios: null,
        filter: {
          type: 'non-trashed',
          search: '',
        },
      }
    },
    watch: {
      filter: {
        handler: function(val, oldval) {
          var filter = {type: val.type, search:(val.search.length > 2 ? val.search : '')};
          this.listNegocios(filter)
        },
        deep: true,
      }
    },
    methods: {
      listBySearch: function(val){
        this.filter.search = val;
      },
      async listNegocios(filter){
        return this.negocioService.listNegocios(agroUtils.serialize(filter)).then(negocios => {
          this.negocios = negocios;
        });
      },
      addNegocio(tipoNegocio){
        this.$refs.newNegocioModal.openModal(tipoNegocio);
      },
      archiveNegocio(id){
        this.negocioService.archiveNegocio(id).then(() => {
          this.listNegocios(this.filter)
        })
      },
      restoreNegocio(id){
        this.negocioService.restoreNegocio(id).then(() => {
          this.listNegocios(this.filter)
        })
      },
      deleteNegocio(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esta Negocio?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.negocioService.deleteNegocio(id).then(() => {
            this.listNegocios(this.filter)
          })
        })
      },
      viewNegocio(id){
        this.$router.push({name: 'negocio_view', params: {id:id}});
      },
      async listTipoNegocios(){
        return this.negocioService.listTipoNegocios().then(tiposNegocios => {
          this.tipoNegocios = tiposNegocios;
        });
      },

    },
    mounted () {
      this.$q.loading.show();
      Promise.all([
        this.listTipoNegocios(),
        this.listNegocios(this.filter)
      ]).then(()=>{
        this.$q.loading.hide();
      });

      this.$root.$on('refreshNegocioList', () => {
        this.listNegocios();
      });
    },
  }
</script>
<style scoped>
  .custom-fab .q-fab-actions .q-btn  span{
    position: absolute;
    background: white;
    right: 46px;
    border-radius: 6px;
    padding: 7px 10px;
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
