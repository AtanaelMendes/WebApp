<template>
  <q-scroll-area style="width: 100%; height: 100%;" :thumb-style="{
        right: '4px',
        borderRadius: '5px',
        background: '#dfdfdf',
        width: '8px',
        opacity: 1}">

    <div class="row">
      <div class="col-12"style="margin-bottom: 200px">
        <q-list no-border separator>

          <q-item v-for="produto in produtos" :key="produto.id">
            <q-item-main>
              <div class="row">

                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <div class="row">
                    <div class="col-1 text-faded">
                      {{produto.id}}
                    </div>
                    <div class="col-11">MILHO SAFRINHA</div>
                  </div>
                </div>

                <div class="col-xs-6 col-sm-12 col-md-3 col-lg-3 q-caption">
                  <div class="row"><span class=" text-blue">NCM:</span>&nbsp 9608.20.00</div>
                  <div class="row"><span class=" text-blue">CFOP:</span>&nbsp 1717</div>
                  <div class="row"><span class=" text-blue">Barras:</span>&nbsp 7897424081417</div>
                </div>

                <div class="col-xs-6 col-sm-12 col-md-3 col-lg-3 q-caption">
                  <div class="row">{{produto.quantidade}} -&nbsp<span class=" text-blue">UN</span></div>
                  <div class="row"><span class=" text-blue">Preço:</span>&nbsp {{produto.preco}}</div>
                  <div class="row"><span class=" text-blue">Total:</span>&nbsp {{produto.total}} </div>
                </div>
              </div>

              <div class="col-12" align="center">
                <q-collapsible>

                  <template slot="header">
                    <q-item-main/>
                    <q-item-side right>
                      <q-btn flat color="blue" dense>Ver mais</q-btn>
                    </q-item-side>
                  </template>

                  <div class="row gutter-xs">
                    <div class="col-xs-6 col-sm-6 col-md-4 col-lg-3">
                      <div class="row bg-grey-3">ICMS</div>
                      <div class="row"><span class="text-faded">CST:</span>&nbsp 60</div>
                      <div class="row"><span class="text-faded">Valor:</span>&nbsp 0</div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-4 col-lg-3">
                      <div class="row bg-grey-3">IPI</div>
                      <div class="row"><span class="text-faded">CST:</span>&nbsp 99</div>
                      <div class="row"><span class="text-faded">Valor:</span>&nbsp 0</div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-4 col-lg-3">
                      <div class="row bg-grey-3">PIS</div>
                      <div class="row"><span class="text-faded">CST:</span>&nbsp 1</div>
                      <div class="row"><span class="text-faded">Valor:</span>&nbsp 0,22</div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-4 col-lg-3">
                      <div class="row bg-grey-3">Cofins</div>
                      <div class="row"><span class="text-faded">CST:</span>&nbsp 1</div>
                      <div class="row"><span class="text-faded">Valor:</span>&nbsp 111,50</div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-4 col-lg-3">
                      <div class="row bg-grey-3">CSLL</div>
                      <div class="row"><span class="text-faded">Valor:</span>&nbsp 0,50</div>
                    </div>
                    <!--<div class="col-2">-->
                      <!--<div class="row"></div>-->
                      <!--<div class="row"></div>-->
                      <!--<div class="row"></div>-->
                    <!--</div>-->
                  </div>
                </q-collapsible>
              </div>

            </q-item-main>
          </q-item>

        </q-list>
      </div>
    </div>

  </q-scroll-area>
</template>

<script>
  import NotaFiscalService from 'assets/js/service/NotaFiscalService'
  export default {
    name: "produtos",

    data(){
      return{
        produtos: null,
        seeMore: false,
      }
    },
    methods: {
      toggle () {
        this.seeMore = !this.seeMore
      },
      /*getNotaById: function(){
        NotaFiscalService.getNotaById(this.$route.params.id).then(produtos => {
          this.produtos = produtos.data;
        })
      },*/
      addContato: function(){
        this.$router.push({name:'add_contact'});
      },
      backAction: function () {
        this.$router.back()
      }
    },
    mounted(){
      //this.getNotaById();
    }
  }
</script>

<style>
  .q-list-header{
    padding: 5px 16px;
    min-height: 30px;
  }
  .q-chip{
    margin-right: 8px;
  }
  .q-card{
    background: white;
  }
</style>
