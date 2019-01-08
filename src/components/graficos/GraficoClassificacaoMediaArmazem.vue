<template>
  <q-card>
    <q-card-main>


      <q-list no-border separator highlight>

        <q-item class="row q-caption ">
          <div class="col-2"></div>
          <div class="col-2 text-center" v-for="classificacao in classificacoes" :key="classificacao">
            <span class="gt-xs">{{classificacao.nome}}</span>
            <span class="lt-sm">{{classificacao.nome.substring(0,4)}}</span>
          </div>
        </q-item>

        <q-item class="row q-caption " v-for="entregaClassificacao in entregasClassificacoes" :key="entregaClassificacao">
          <div class="col-2 text-center">
            {{entregaClassificacao.armazem}}
          </div>
          <div class="col-2 text-center" v-for="verificado in entregaClassificacao.classificacao" :key="verificado.nome">
            {{verificado.verificado}}
          </div>
        </q-item>

      </q-list>


    </q-card-main>
  </q-card>
</template>
<script>
  export default {
    name: "grafico-classificacao-media-armazem",
    props: {
      label: String,
      model: Object,
      terms: String,
    },
    data: function () {
      return {
        classificacoes: [
          {
            id: 1,
            nome: 'Umidade'
          },
          {
            id: 2,
            nome: 'Impureza'
          },
          {
            id: 3,
            nome: 'Verde'
          },
          {
            id: 4,
            nome: 'Avariado'
          }
        ],
        entregasClassificacoes: [
          {
            id: 1,
            armazem: 'ADM',
            classificacao: [
              {
                id: 1,
                nome: 'Umidade',
                verificado: '15'
              },
              {
                id: 2,
                nome: 'Impureza',
                verificado: '1'
              },
              {
                id: 3,
                nome: 'Verde',
                verificado: '2'
              },
              {
                id: 4,
                nome: 'Avariado',
                verificado: '5'
              },
            ]
          },
          {
            id: 2,
            armazem: 'Cargil',
            classificacao: [
              {
                id: 1,
                nome: 'Umidade',
                verificado: '15'
              },
              {
                id: 2,
                nome: 'Impureza',
                verificado: '1'
              },
              {
                id: 3,
                nome: 'Verde',
                verificado: '2'
              },
              {
                id: 4,
                nome: 'Avariado',
                verificado: '5'
              },
            ]
          },
          {
            id: 3,
            armazem: 'Bunge',
            classificacao: [
              {
                id: 1,
                nome: 'Umidade',
                verificado: '15'
              },
              {
                id: 2,
                nome: 'Impureza',
                verificado: '1'
              },
              {
                id: 3,
                nome: 'Verde',
                verificado: '2'
              },
              {
                id: 4,
                nome: 'Avariado',
                verificado: '5'
              },
            ]
          },
          {
            id: 4,
            armazem: 'Soy tech',
            classificacao: [
              {
                id: 1,
                nome: 'Umidade',
                verificado: '15'
              },
              {
                id: 2,
                nome: 'Impureza',
                verificado: '1'
              },
              {
                id: 3,
                nome: 'Verde',
                verificado: '2'
              },
              {
                id: 4,
                nome: 'Avariado',
                verificado: '5'
              },
            ]
          },
          {
            id: 5,
            armazem: 'Jone Dere',
            classificacao: [
              {
                id: 1,
                nome: 'Umidade',
                verificado: '15'
              },
              {
                id: 2,
                nome: 'Impureza',
                verificado: '1'
              },
              {
                id: 3,
                nome: 'Verde',
                verificado: '2'
              },
              {
                id: 4,
                nome: 'Avariado',
                verificado: '5'
              },
            ]
          },
          {
            id: 6,
            armazem: 'Em Casa',
            classificacao: [
              {
                id: 1,
                nome: 'Umidade',
                verificado: '15'
              },
              {
                id: 2,
                nome: 'Impureza',
                verificado: '1'
              },
              {
                id: 3,
                nome: 'Verde',
                verificado: '2'
              },
              {
                id: 4,
                nome: 'Avariado',
                verificado: '5'
              },
            ]
          }
        ]
      }
    },
    methods: {
    }
  }
</script>
