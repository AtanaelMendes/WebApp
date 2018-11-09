<template>
  <custom-page isChild noScroll style="background: #fdfdfd">
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction">

      <template slot="action_itens" v-if="pessoa">
        <!--<q-btn flat round dense icon="edit" @click.native="editUser(pessoa.id)"/>-->
        <q-btn flat round dense icon="more_vert" >
          <q-popover anchor="bottom left">
            <q-list link>
              <q-item dense @click.native="disablePessoa(pessoa.id)" v-if="!pessoa.deleted_at">
                <q-item-main label="Inativar pessoa"  />
              </q-item>
              <q-item dense @click.native="enablePessoa(pessoa.id)" v-if="pessoa.deleted_at">
                <q-item-main label="Ativar pessoa"  />
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </template>

      <q-tabs slot="tabs" v-model="selectedTab" align="justify"  class="shadow-3" color="brand" text-color="brand" underline-color="deep-orange">
        <q-tab slot="title" name="tab-info" label="Informações" />
        <q-tab slot="title" name="tab-contatos" label="Contatos"></q-tab>
        <q-tab slot="title" name="tab-localizacoes" label="Localizações"/>
      </q-tabs>

    </toolbar>
    <swipe v-if="pessoa" ref="mySwiper" class="my-swipe" :continuous="false" :auto="0" :showIndicators="false" :disabled="true">
      <swipe-item >
        <div class="q-pa-md row gutter-sm">
          <div class="col-6">
            <q-card>
              <q-card-main>

                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    Série
                  </q-item-side>
                  <q-item-main>
                    1
                  </q-item-main>
                </q-item>

                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    Número
                  </q-item-side>
                  <q-item-main>
                    00342955
                  </q-item-main>
                </q-item>

                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    Emissão
                  </q-item-side>
                  <q-item-main>
                    09/11/2018 16:19:20
                  </q-item-main>
                </q-item>

                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    Saída/Entrada
                  </q-item-side>
                  <q-item-main>
                    09/11/2018 16:19:20
                  </q-item-main>
                </q-item>

              </q-card-main>
              <q-card-separator/>
              <q-card-actions align="end">
                <q-btn label="cancelar" color="negative" flat/>
                <q-btn label="email" color="primary" flat/>
                <q-btn label="danfe" color="primary" flat/>
              </q-card-actions>
            </q-card>

          </div>
          <div class="col-6">

            <q-card>
              <q-card-main>

                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    Filial
                  </q-item-side>
                  <q-item-main>
                    FAZENDA MIGLIORINI
                  </q-item-main>
                </q-item>

                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    Natureza de Operação
                  </q-item-side>
                  <q-item-main>
                    Venda - Saida
                  </q-item-main>
                </q-item>

                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    Frete
                  </q-item-side>
                  <q-item-main>
                    FOB
                  </q-item-main>
                </q-item>

                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    Volumes
                  </q-item-side>
                  <q-item-main>
                    0
                  </q-item-main>
                </q-item>

                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    Pessoa
                  </q-item-side>
                  <q-item-main>
                    BUNGE
                  </q-item-main>
                </q-item>

              </q-card-main>
            </q-card>

          </div>

        </div>
      </swipe-item>

      <swipe-item>
        <ContatoList></ContatoList>
      </swipe-item>

      <swipe-item>
        <LocalizacaoList></LocalizacaoList>
      </swipe-item>

    </swipe>
    <transition
      slot="fab-container"
      appear
      enter-active-class="animated slideInUp faster"
      leave-active-class="animated slideOutDown faster">
      <q-btn key="contatos" v-if="isFabVisible" @click="addContato" round color="deep-orange" icon="add" size="20px"/>
      <!--<q-btn key="localizacoes" v-if="selectedTab === 'tab-localizacoes'"
           round
           color="red"
           icon="add"
           size="20px"
      />-->
    </transition>

  </custom-page>
</template>

<script>
  require('vue-swipe/dist/vue-swipe.css');
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import PessoaService from 'assets/js/service/PessoaService'
  import ContatoList from 'pages/admin/pessoas/tabs/ContatoList'
  import LocalizacaoList from 'pages/admin/pessoas/tabs/LocalizacaoList'
  import { Swipe, SwipeItem } from 'vue-swipe';
  export default {
    name: "PessoaView",
    components: {
      toolbar,
      customPage,
      LocalizacaoList,
      ContatoList,
      Swipe,
      SwipeItem
    },
    watch: {
      '$route' (to, from) {
        this.getPessoa();
        this.selectedTab ='tab-info';
      },
      selectedTab: function (value) {
        let index;
        switch (value) {
          case 'tab-info':
            index = 0;
            break;
          case 'tab-contatos':
            index = 1;
            break;
          case 'tab-localizacoes':
            index = 2;
            break;
        }
        this.$refs.mySwiper.goto(index)
      }
    },
    data(){
      return{
        pessoa: null,
        selectedTab: 'tab-info',
      }
    },
    computed: {
      isFabVisible: function () {
        return this.selectedTab === 'tab-contatos' || this.selectedTab === 'tab-localizacoes';
      }
    },
    methods: {
      getPessoa: function(){
        PessoaService.getPessoa(this.$route.params.id).then(pessoa => {
          this.pessoa = pessoa;
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
      this.getPessoa();
    }
  }
</script>

<style>
  .label{
    color: #005f5f;
    font-size: 14px;
    text-transform: uppercase;
  }
  .field{
    font-size: 18px;
    font-weight: 400;
    margin-top: 6px;
    margin-bottom: 0px;
    color: #333333;
  }
  .item{
    margin-bottom: 26px;
  }

  .text-brand {
    color: #909090 !important;
  }
  .bg-brand {
    background: #fcfcfc !important;
  }
  .q-tabs{
    border-radius: unset;
  }
  .shadow-3{
    box-shadow: 0 1px 8px rgba(0,0,0,0.05), 0 3px 4px rgba(0,0,0,0.04), 0 3px 3px -2px rgba(0,0,0,0.03);
  }

  .animated.faster {
    -webkit-animation-duration: 200ms !important;
    animation-duration: 200ms !important;
  }

  .my-swipe {
    height: 100%;
  }
</style>
