<template>
  <q-scroll-area style="width: 100%; height: 100%;" :thumb-style="{
        right: '4px',
        borderRadius: '5px',
        background: '#dfdfdf',
        width: '8px',
        opacity: 1}">

    <div class="row">
      <div class="col-12" style="margin-bottom: 100px">
        <q-list no-border>

          <q-list-header>Duplicatas</q-list-header>
          <q-item>
            <q-item-main>
              <!--<q-item-tile class="bg-grey-4 q-headline q-my-sm"></q-item-tile>-->
              <q-item-tile>
                <div class="row gutter-sm">
                  <div class="col-3" v-for="duplicata in 5" :key="duplicata">
                    <q-card>
                      <q-card-main>
                        <div class="row">00{{duplicata}}</div>
                        <div class="row">16/12/2018</div>
                        <div class="row">2,000,00</div>
                      </q-card-main>
                      <q-card-separator/>
                      <q-card-actions align="end">
                        <q-btn dense flat color="primary" icon="delete"/>
                        <q-btn dense flat color="primary" icon="edit"/>
                      </q-card-actions>
                    </q-card>
                  </div>

                  <div class="col-3">
                    <q-card>
                      <q-card-main>
                        <div class="row">Total</div>
                        <div class="row">10,000,00</div>
                      </q-card-main>
                    </q-card>
                  </div>

                </div>

              </q-item-tile>
            </q-item-main>
          </q-item>
          <q-item-separator/>

          <q-list-header>Notas referênciadas</q-list-header>
          <q-item>
            <q-item-main>
              <!--<q-item-tile class="bg-grey-4 q-headline q-my-sm">Notas referênciadas</q-item-tile>-->
              <q-item-tile></q-item-tile>
            </q-item-main>
          </q-item>
          <q-item-separator/>

          <q-list-header>Observações</q-list-header>
          <q-item>
            <q-item-main>
              <!--<q-item-tile class="bg-grey-4 q-headline q-my-sm">Observações</q-item-tile>-->
              <q-item-tile>
                PROCOM-MT - Av. Historiador Rubens de Mendonca, 917 - Bairro Araes - Cuiaba/MT - Fone 151.;
              </q-item-tile>
            </q-item-main>
          </q-item>
          <q-item-separator/>

          <q-list-header>Carta de correção</q-list-header>
          <q-item>
            <q-item-main>
              <!--<q-item-tile class="bg-grey-4 q-headline q-my-sm">Carta de correção</q-item-tile>-->
              <q-item-tile></q-item-tile>
            </q-item-main>
          </q-item>
          <q-item-separator/>

          <q-list-header>Autor</q-list-header>
          <q-item>
            <q-item-main>
              <!--<q-item-tile class="bg-primary text-white q-headline q-my-sm">Autor</q-item-tile>-->
              <q-item-tile>
                <p>Criado em 09/11/2018 15:17:21	por claudinei</p>
                <p>Alterado em 09/11/2018 16:19:22	por claudinei</p>
              </q-item-tile>
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
    name: "complementos",

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
