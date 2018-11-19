<template>
  <q-scroll-area style="width: 100%; height: 100%;" :thumb-style="{
        right: '4px',
        borderRadius: '5px',
        background: '#dfdfdf',
        width: '8px',
        opacity: 1}">
    <div class="row gutter-sm q-pa-md space-end">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6" v-for="contato in 10">
        <q-card >
          <q-card-title class="q-pb-none ">
            <q-chip small color="teal">Cobrança</q-chip>
            <q-chip small color="teal">Fiscal</q-chip>
            <q-btn round flat dense icon="more_vert" slot="right" style="margin-right: -15px;">
              <q-popover>
                <q-list link class="no-border">
                  <q-item v-close-overlay>
                    <q-item-main label="Apagar Localização" />
                  </q-item>
                  <q-item v-close-overlay>
                    <q-item-main label="Share" />
                  </q-item>
                </q-list>
              </q-popover>
            </q-btn>
          </q-card-title>
          <q-list no-border>

            <q-item dense class="q-pa-sm">
              <q-item-main>

              </q-item-main>
            </q-item>
            <q-item-separator />

            <q-item>
              <q-item-main>
                <q-item-tile sublabel>
                  Endereco
                </q-item-tile>
                <q-item-tile>
                  AVENIDA FLAMBOYANTS
                </q-item-tile>
              </q-item-main>
            </q-item>

            <q-item>
              <q-item-main>
                <q-item-tile sublabel>
                  Número
                </q-item-tile>
                <q-item-tile>
                  701
                </q-item-tile>
              </q-item-main>
            </q-item>

            <q-item>
              <q-item-main>
                <q-item-tile sublabel>
                  Complemento
                </q-item-tile>
                <q-item-tile>
                  sala 22
                </q-item-tile>
              </q-item-main>
            </q-item>

            <q-item>
              <q-item-main>
                <q-item-tile sublabel>
                  Bairro
                </q-item-tile>
                <q-item-tile>
                  Jardim Jacarandás
                </q-item-tile>
              </q-item-main>
            </q-item>

            <q-item>
              <q-item-main>
                <q-item-tile sublabel>
                  Cidade
                </q-item-tile>
                <q-item-tile>
                  Sinop
                </q-item-tile>
              </q-item-main>
            </q-item>

            <q-item>
              <q-item-main>
                <q-item-tile sublabel>
                  Estado
                </q-item-tile>
                <q-item-tile>
                  MT
                </q-item-tile>
              </q-item-main>
            </q-item>

            <q-item>
              <q-item-main>
                <q-item-tile sublabel>
                  CEP
                </q-item-tile>
                <q-item-tile>
                  78555-000
                </q-item-tile>
              </q-item-main>
            </q-item>

          </q-list>

          <q-card-separator />
          <q-card-actions align="end">
            <q-btn flat color="primary" label="Editar" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-scroll-area>
</template>

<script>
  export default {
    name: "localizacao-list"
  }
</script>

<style>
  .space-end{
    margin-bottom: 150px;
  }
</style>
