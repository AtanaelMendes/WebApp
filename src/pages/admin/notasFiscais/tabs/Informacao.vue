<template>
  <q-scroll-area style="width: 100%; height: 100%;" :thumb-style="{
        right: '4px',
        borderRadius: '5px',
        background: '#dfdfdf',
        width: '8px',
        opacity: 1}">

    <div class="q-pa-md row gutter-sm" style="margin-bottom: 100px">

      <div class="col-12">
        <q-card>
          <q-card-main>

            <q-item class="q-px-none">
              <q-item-side class="q-caption">
                Status
              </q-item-side>
              <q-item-main class="text-right">
                <q-chip small color="positive" flat >Autorizada</q-chip>
                Emissão normal
              </q-item-main>
            </q-item>

            <q-item class="q-px-none">
              <q-item-side class="q-caption">
                Chave
              </q-item-side>
              <q-item-main class="text-right">
                5118 1104 5767 7500 0241 5500 1000 0176 0410 0017 6049
              </q-item-main>
            </q-item>

            <q-item class="q-px-none">
              <q-item-side class="q-caption">
                Autorização
              </q-item-side>
              <q-item-main class="text-right">
                151180054933243 - {{moment('09/11/2018 15:30').format('lll')}}
              </q-item-main>
            </q-item>

          </q-card-main>
        </q-card>

      </div>

      <div class="col-12">
        <q-card>
          <q-card-main >
            <div class="row gutter-md">
              <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    Série
                  </q-item-side>
                  <q-item-main class="text-right">
                    1
                  </q-item-main>
                </q-item>

                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    Modelo NFE
                  </q-item-side>
                  <q-item-main class="text-right">
                    55 - NFe - Nota
                  </q-item-main>
                </q-item>

                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    Número
                  </q-item-side>
                  <q-item-main class="text-right">
                    00342955
                  </q-item-main>
                </q-item>

                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    Emissão
                  </q-item-side>
                  <q-item-main class="text-right">
                    {{moment('09/11/2018 15:30').format('lll')}}
                  </q-item-main>
                </q-item>

                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    Saída/Entrada
                  </q-item-side>
                  <q-item-main class="text-right">
                    {{moment('09/11/2018 16:20').format('lll')}}
                  </q-item-main>
                </q-item>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    Filial
                  </q-item-side>
                  <q-item-main class="text-right">
                    FAZENDA MIGLIORINI
                  </q-item-main>
                </q-item>

                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    Emitida
                  </q-item-side>
                  <q-item-main class="text-right">
                    Pela Filial
                  </q-item-main>
                </q-item>

                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    Natureza de Operação
                  </q-item-side>
                  <q-item-main class="text-right">
                    Venda - Saida
                  </q-item-main>
                </q-item>

                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    Frete
                  </q-item-side>
                  <q-item-main class="text-right">
                    FOB
                  </q-item-main>
                </q-item>

                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    Volumes
                  </q-item-side>
                  <q-item-main class="text-right">
                    0
                  </q-item-main>
                </q-item>

                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    Pessoa
                  </q-item-side>
                  <q-item-main class="text-right">
                    BUNGE
                  </q-item-main>
                </q-item>
              </div>
            </div>
          </q-card-main>
        </q-card>
      </div>

      <div class="col-12">
        <q-card>
          <q-card-main >
            <div class="row gutter-md">
              <div class="col-6">
                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    Produtos
                  </q-item-side>
                  <q-item-main class="text-right">
                    1,000,999,00
                  </q-item-main>
                </q-item>

                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    Total
                  </q-item-side>
                  <q-item-main class="text-right">
                    100,999
                  </q-item-main>
                </q-item>

                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    Desconto
                  </q-item-side>
                  <q-item-main class="text-right">
                    0
                  </q-item-main>
                </q-item>

                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    Outras
                  </q-item-side>
                  <q-item-main class="text-right">
                    0
                  </q-item-main>
                </q-item>

                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    Frete
                  </q-item-side>
                  <q-item-main class="text-right">
                    0
                  </q-item-main>
                </q-item>
              </div>
              <div class="col-6">
                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    Seguro
                  </q-item-side>
                  <q-item-main class="text-right">
                    0
                  </q-item-main>
                </q-item>

                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    ICMS Base
                  </q-item-side>
                  <q-item-main class="text-right">
                    0
                  </q-item-main>
                </q-item>

                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    ICMS Valor
                  </q-item-side>
                  <q-item-main class="text-right">
                    0
                  </q-item-main>
                </q-item>

                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    ICMS ST Base
                  </q-item-side>
                  <q-item-main class="text-right">
                    10,000
                  </q-item-main>
                </q-item>

                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    ICMS ST Valor
                  </q-item-side>
                  <q-item-main class="text-right">
                    0
                  </q-item-main>
                </q-item>

                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    IPI Base
                  </q-item-side>
                  <q-item-main class="text-right">
                    0
                  </q-item-main>
                </q-item>

                <q-item class="q-px-none">
                  <q-item-side class="q-caption">
                    IPI Valor
                  </q-item-side>
                  <q-item-main class="text-right">
                    0
                  </q-item-main>
                </q-item>

              </div>
            </div>
          </q-card-main>
        </q-card>
      </div>
    </div>

  </q-scroll-area>
</template>

<script>
  export default {
    name: "informacao"
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
