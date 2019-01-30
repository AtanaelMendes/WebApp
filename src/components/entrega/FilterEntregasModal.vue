<template>
  <q-modal key="safraCultura" v-model="isModalOpened" @hide="closeModal">
    <q-modal-layout footer-class="no-shadow" header-class="no-shadow">
      <q-toolbar slot="header" inverted>
        <q-toolbar-title>
          Filtro
        </q-toolbar-title>
      </q-toolbar>
      <q-list dense >
        <q-item>
          <q-item-main>
            <q-select
              v-model="filter.caminhao_id"
              stack-label="Caminhão"
              :options="options.caminhoes"/>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-select
              v-model="filter.safra_cultura_id"
              stack-label="Safra Cultura"
              :options="options.safra_culturas"/>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-select
              v-model="filter.armazem_id"
              stack-label="Armazém"
              :options="options.armazens"/>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-select
              v-model="filter.motorista_id"
              stack-label="Motorista"
              :options="options.motoristas"/>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-field label="Data do Ticket" orientation="vertical">
              <div class="row gutter-sm">
                <div class="col-6"><q-datetime v-model="filter.data_ticket_inicio" type="date" stack-label="Início"/></div>
                <div class="col-6"><q-datetime v-model="filter.data_ticket_final" type="date" class="col-6" stack-label="Fim"/></div>
              </div>
            </q-field>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-field label="Data de Envio Para Armazém" orientation="vertical">
              <div class="row gutter-sm">
                <div class="col-6"><q-datetime v-model="filter.data_envio_armazem_inicio" type="date" stack-label="Início"/></div>
                <div class="col-6"><q-datetime v-model="filter.data_envio_armazem_final" type="date" class="col-6" stack-label="Fim"/></div>
              </div>
            </q-field>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-select
              v-model="filter.negocio_cultura_id"
              stack-label="Negócio Cultura"
              :options="options.negocios_culturas"/>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-select
              v-model="filter.area_id"
              stack-label="Área"
              :options="options.areas"/>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-select
              v-model="filter.talhao_id"
              stack-label="Talhão"
              :options="options.talhoes"/>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-input v-model="filter.numero_ticket" stack-label="Número do Ticket" />
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-input v-model="filter.numero_nota" stack-label="Número da Nota" />
          </q-item-main>
        </q-item>
      </q-list>
      <div slot="footer" class="q-pa-md ">
        <q-btn label="Limpar" color="deep-orange" flat class="q-mr-sm" @click="clearForm"/>
        <div class="float-right">
          <q-btn label="Cancelar" color="primary" flat class="q-mr-sm" @click="closeModal"/>
          <q-btn label="Buscar" flat color="primary" @click="search"/>
        </div>
      </div>
    </q-modal-layout>

  </q-modal>
</template>

<script>
  import entregaService from 'assets/js/service/entrega/EntregaService'

  export default {
    name: "FilterEntregasModal",
    data(){
      return {
        isModalOpened: false,
        filter: {
          caminhao_id: null,
          safra_cultura_id: null,
          armazem_id: null,
          motorista_id: null,
          data_ticket_inicio: null,
          data_ticket_final: null,
          data_envio_armazem_inicio: null,
          data_envio_armazem_final: null,
          negocio_cultura_id: null,
          area_id: null,
          talhao_id: null,
          numero_ticket: null,
          numero_nota: null,
        },
        options: null,
        selectOptions: [
          {
            label: 'Google',
            value: 'goog'
          },
          {
            label: 'Facebook',
            value: 'fb'
          }
        ],
      }
    },
    methods: {
      openModal(){
        this.isModalOpened = true;
        this.getFilterOptions();
      },
      closeModal(){
        this.isModalOpened = false;
      },
      search(){
        this.closeModal();
        this.$emit('on-search', this.filter)
        this.clearForm();
      },
      clearForm(){
        for(let prop in this.filter){
          if(this.filter.hasOwnProperty(prop)){
            this.filter[prop] = null;
          }
        }
      },
      getFilterOptions(){
        this.$q.loading.show();
        entregaService.getFilterOptions().then(response => {
          this.options = this.parseFilterOptions(response.data);
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.loading.hide();
        })
      },
      parseFilterOptions(options){
        for(let prop in options){
          if(options.hasOwnProperty(prop)){
            options[prop] = options[prop].map(function(item){
              let obj =  {
                label: item.nome,
                value: item.id,
              };

              if(item.descr){
                obj.sublabel = item.descr;
              }

              return obj;
            });
          }
        }
        return options;
      }
    }
  }
</script>

<style scoped>

</style>
