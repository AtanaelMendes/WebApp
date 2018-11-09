<template>
  <q-scroll-area style="width: 100%; height: 100%;" :thumb-style="{
        right: '4px',
        borderRadius: '5px',
        background: '#dfdfdf',
        width: '8px',
        opacity: 1}">
    <div class="row gutter-sm q-pa-md">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-4" v-for="contato in 10">
        <q-card >
          <q-card-title class="q-pb-none q-pt-sm">
            Fulano
            <q-btn round flat dense icon="more_vert" slot="right" style="margin-right: -15px;">
              <q-popover>
                <q-list link class="no-border">
                  <q-item v-close-overlay>
                    <q-item-main label="Apagar Contato" />
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
                <q-chip small color="teal">Cobrança</q-chip>
                <q-chip small color="teal">Fiscal</q-chip>
              </q-item-main>
            </q-item>
            <q-item-separator />
            <q-list-header >Telefones</q-list-header>
            <q-item dense>
              <q-item-main>
                <q-item-tile label>(66) 3531-3456</q-item-tile>
              </q-item-main>
              <q-item-side>
                <q-item-tile stamp color="deep-orange" align="end">Fixo</q-item-tile>
              </q-item-side>
            </q-item>

            <q-list-header >Emails</q-list-header>
            <q-item dense>
              <q-item-main>
                <q-item-tile label>fulano@teste.com</q-item-tile>
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
        name: "ContatoList"
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
