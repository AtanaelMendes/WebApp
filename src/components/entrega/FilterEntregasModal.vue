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
              stack-label="Caminhão" clearable
              :options="parseOptions(options.caminhoes)"/>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-select
              v-model="filter.safra_cultura_id"
              stack-label="Safra Cultura" clearable
              :options="parseOptions(options.safra_culturas)"/>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-select
              v-model="filter.armazem_id"
              stack-label="Armazém" clearable
              :options="parseOptions(options.armazens)"/>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-select
              v-model="filter.motorista_id"
              stack-label="Motorista" clearable
              :options="parseOptions(options.motoristas)"/>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-field label="Data do Ticket" orientation="vertical">
              <div class="row gutter-sm">
                <div class="col-6">
                  <q-datetime v-model="filter.data_ticket_inicio" type="date" clearable
                              @input="setTicketDataFinal" format="DD/MM/YYYY" stack-label="Início"/>
                </div>
                <div class="col-6">
                  <q-datetime v-model="filter.data_ticket_final" type="date" clearable
                              @input="setTicketDataInicial" format="DD/MM/YYYY" stack-label="Fim"/>
                </div>
              </div>
            </q-field>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-field label="Data de Envio Para Armazém" orientation="vertical">
              <div class="row gutter-sm">
                <div class="col-6">
                  <q-datetime v-model="filter.data_envio_armazem_inicio" type="date" clearable
                              @input="setEnvioArmazemDataFinal" format="DD/MM/YYYY" stack-label="Início"/>
                </div>
                <div class="col-6">
                  <q-datetime v-model="filter.data_envio_armazem_final" type="date" clearable
                              @input="setEnvioArmazemDataInicial" format="DD/MM/YYYY" stack-label="Fim"/>
                </div>
              </div>
            </q-field>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-select
              v-model="filter.negocio_cultura_id"
              stack-label="Negócio Cultura" clearable
              :options="parseOptions(options.negocios_culturas)"/>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-select
              v-model="filter.area_id"
              stack-label="Área"clearable
              :options="parseOptions(options.areas)"/>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-select
              v-model="filter.talhao_id"
              stack-label="Talhão" clearable
              :options="parseOptions(options.talhoes)"/>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-input v-model="filter.numero_ticket" stack-label="Número do Ticket" clearable />
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-input v-model="filter.numero_nota" stack-label="Número da Nota" clearable />
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


  import EntregaService from "../../assets/js/service/entrega/EntregaService";
  import AccountRepository from "../../assets/js/repository/AccountRepository";

  export default {
    name: "FilterEntregasModal",
    data(){
      return {
        entregaService: null,
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
      }
    },
    methods: {
      openModal(){
        this.isModalOpened = true;
        this.getFilterOptions();

        if(this.$store.state.entrega.filter.value){
          this.filter = this.$store.state.entrega.filter.value;
          return;
        }
      },
      closeModal(){
        this.isModalOpened = false;
      },
      search(){
        this.$store.commit('entrega/setFilterValue', this.filter)
        this.closeModal();
        this.$emit('on-search', this.filter)
      },
      clearForm(){
        for(let prop in this.filter){
          if(this.filter.hasOwnProperty(prop)){
            this.filter[prop] = null;
          }
        }
        this.$store.commit('entrega/setFilterValue', null)
      },
      setTicketDataInicial(value){
        if(value === null){
          this.filter.data_ticket_inicio = null;
          return;
        }

        if(this.filter.data_ticket_inicio === null){
          this.filter.data_ticket_inicio = value;
          return;
        }

        if(this.moment(value).isBefore(this.filter.data_ticket_inicio)){
          this.filter.data_ticket_inicio = value;
        }
      },
      setTicketDataFinal(value){
        if(value === null){
          this.filter.data_ticket_final = null;
          return;
        }

        if(this.filter.data_ticket_final === null){
          this.filter.data_ticket_final = value;
          return;
        }

        if(this.moment(value).isAfter(this.filter.data_ticket_final)){
          this.filter.data_ticket_final = value;
        }
      },
      setEnvioArmazemDataInicial(value){
        if(value === null){
          this.filter.data_envio_armazem_inicio = null;
          return;
        }

        if(this.filter.data_envio_armazem_inicio === null){
          this.filter.data_envio_armazem_inicio = value;
          return;
        }

        if(this.moment(value).isBefore(this.filter.data_envio_armazem_inicio)){
          this.filter.data_envio_armazem_inicio = value;
        }
      },
      setEnvioArmazemDataFinal(value){
        if(value === null){
          this.filter.data_envio_armazem_final = null;
          return;
        }

        if(this.filter.data_envio_armazem_final === null){
          this.filter.data_envio_armazem_final = value;
          return;
        }

        if(this.moment(value).isAfter(this.filter.data_envio_armazem_final)){
          this.filter.data_envio_armazem_final = value;
        }
      },
      getFilterOptions(){
        this.$q.loading.show();
        this.entregaService.getFilterOptions().then(options => {
          this.options = options;
          this.$store.commit('entrega/setFilterOptions', this.options)
          this.$q.loading.hide();
        }).catch(error => {
          this.$store.commit('entrega/setFilterOptions', null)
          this.$q.loading.hide();
        })
      },
      parseOptions(options){
        if(options){
          return options.map(function(item){
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
      },
      getFilterDesciption(filter = null, options = null){
        var filterDescription = [];

        if(filter === null && options === null){
          filter = this.$store.state.entrega.filter.value;
          options = this.$store.state.entrega.filter.options;
        }

        if(filter.caminhao_id){
          filterDescription.push({
            nome: 'Caminhão', valor: this.getFilterItemById(options.caminhoes, filter.caminhao_id).nome,
          });
        }

        if(filter.safra_cultura_id){
          filterDescription.push({
            nome: 'Safra Cultura', valor: this.getFilterItemById(options.safra_culturas, filter.safra_cultura_id).nome,
          });
        }

        if(filter.armazem_id){
          filterDescription.push({
            nome: 'Armazém', valor: this.getFilterItemById(options.armazens, filter.armazem_id).nome,
          });
        }

        if(filter.motorista_id){
          filterDescription.push({
            nome: 'Motorista', valor: this.getFilterItemById(options.motoristas, filter.motorista_id).nome,
          });
        }

        if(filter.data_ticket_inicio){
          filterDescription.push({
            nome: 'Data Início do Ticket', valor: this.moment(filter.data_ticket_inicio).format('DD/MM/YYYY'),
          });
        }

        if(filter.data_ticket_final){
          filterDescription.push({
            nome: 'Data Final do Ticket', valor: this.moment(filter.data_ticket_final).format('DD/MM/YYYY'),
          });
        }

        if(filter.data_envio_armazem_inicio){
          filterDescription.push({
            nome: 'Data Início do Envio Para Armazém', valor: this.moment(filter.data_envio_armazem_inicio).format('DD/MM/YYYY'),
          });
        }

        if(filter.data_envio_armazem_final){
          filterDescription.push({
            nome: 'Data Final do Envio Para Armazém', valor: this.moment(filter.data_envio_armazem_final).format('DD/MM/YYYY'),
          });
        }

        if(filter.negocio_cultura_id){
          filterDescription.push({
            nome: 'Negócio Cultura', valor: this.getFilterItemById(options.negocios_culturas, filter.negocio_cultura_id).nome,
          });
        }

        if(filter.area_id){
          filterDescription.push({
            nome: 'Área', valor: this.getFilterItemById(options.areas, filter.area_id).nome,
          });
        }

        if(filter.talhao_id){
          filterDescription.push({
            nome: 'Talhão', valor: this.getFilterItemById(options.talhoes, filter.talhao_id).nome,
          });
        }

        if(filter.numero_ticket){
          filterDescription.push({
            nome: 'Número do Ticket', valor: filter.numero_ticket,
          });
        }

        if(filter.numero_nota){
          filterDescription.push({
            nome: 'Número da Nota', valor: filter.numero_nota,
          });
        }

        return filterDescription;
      },
      getFilterItemById(array, id){
        return array.find(item => item.id === id);
      },
    },
    mounted(){
      new AccountRepository().getFirst().then(account => {
        this.entregaService = new EntregaService(account.produtor_id);
      });
    }
  }
</script>

<style scoped>

</style>
