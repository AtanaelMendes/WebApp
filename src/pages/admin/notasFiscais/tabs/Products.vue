<template>
  <q-scroll-area style="width: 100%; height: 100%;" :thumb-style="{
        right: '4px',
        borderRadius: '5px',
        background: '#dfdfdf',
        width: '8px',
        opacity: 1}">

    <div class="row">
      <div class="col-12">
        <q-list no-border separator>

          <q-item v-for="produto in produtos" :key="produto.id">
            <q-item-main>
              <div class="row">
                <div class="col-3 q-caption">
                  <div class="row">{{produto.id}}</div>
                  <div class="row"><span class=" text-blue">NCM:</span>&nbsp 9608.20.00</div>
                  <div class="row"><span class=" text-blue">CFOP:</span>&nbsp 1717</div>
                  <div class="row"><span class=" text-blue">Barras:</span>&nbsp 7897424081417</div>
                </div>

                <div class="col-6" @click.native="toggle()">
                  <div class="row">MILHO SAFRINHA</div>
                </div>

                <div class="col-3 q-caption">
                  <div class="row">{{produto.quantidade}} -&nbsp<span class=" text-blue">UN</span></div>
                  <div class="row"><span class=" text-blue">Preço:</span>&nbsp {{produto.preco}}</div>
                  <div class="row"><span class=" text-blue">Total:</span>&nbsp {{produto.total}} </div>
                </div>
              </div>

              <div class="col-12" align="center">
                <q-collapsible>

                  <template slot="header">
                    <q-item-main></q-item-main>
                    <q-item-side right color="blue">Ver mais</q-item-side>
                  </template>

                  <div class="row gutter-xs">
                    <div class="col-2">
                      <div class="row bg-grey-3">ICMS</div>
                      <div class="row"><span class="text-faded">CST:</span>&nbsp 60</div>
                      <div class="row"><span class="text-faded">Valor:</span>&nbsp 0</div>
                    </div>
                    <div class="col-2">
                      <div class="row bg-grey-3">IPI</div>
                      <div class="row"><span class="text-faded">CST:</span>&nbsp 99</div>
                      <div class="row"><span class="text-faded">Valor:</span>&nbsp 0</div>
                    </div>
                    <div class="col-2">
                      <div class="row bg-grey-3">PIS</div>
                      <div class="row"><span class="text-faded">CST:</span>&nbsp 1</div>
                      <div class="row"><span class="text-faded">Valor:</span>&nbsp 0,22</div>
                    </div>
                    <div class="col-2">
                      <div class="row bg-grey-3">Cofins</div>
                      <div class="row"><span class="text-faded">CST:</span>&nbsp 1</div>
                      <div class="row"><span class="text-faded">Valor:</span>&nbsp 1,50</div>
                    </div>
                    <div class="col-2">
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
      getNotaById: function(){
        NotaFiscalService.getNotaById(this.$route.params.id).then(produtos => {
          this.produtos = produtos.data;
        })
      },
      addContato: function(){
        this.$router.push({name:'add_contact'});
      },
      backAction: function () {
        //this.$router.go(-1);
        this.$router.push({name:'notas-fiscais'})
      }
    },
    mounted(){
      this.getNotaById();
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
