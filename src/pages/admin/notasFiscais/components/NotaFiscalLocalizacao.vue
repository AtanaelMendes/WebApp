<template>
  <q-card>
    <div class="row ">

      <!--NOME RAZAO SOCIAL-->
      <div class="col-6 q-pa-xs">
        <div class="text-faded q-caption ellipsis">
          Nome/Razão Social
        </div>
        <div class="ellipsis">
          {{localizacao.razao_social}}
        </div>
      </div>

      <!--CPF / CNPJ-->
      <div class="col-3 q-pa-xs borda-esquerda">
        <div class="text-faded q-caption ellipsis">
          CPF / CNPJ
        </div>
        <div class="ellipsis text-center">
            <span v-if="localizacao.cpf">
              {{formatCPF(localizacao.cpf)}}
            </span>
          <span v-if="localizacao.cnpj">
              {{formatCNPJ(localizacao.cnpj)}}
            </span>
        </div>
      </div>

      <!--DATA EMISSAO-->
      <div class="col-2 q-pa-xs borda-esquerda">
        <div class="text-faded q-caption ellipsis">
          Data Emissão
        </div>
        <div class="ellipsis text-center" v-if="notaFiscal.emissao">
          {{moment(notaFiscal.emissao).format('L')}}
        </div>
      </div>

      <div class="col-1 borda-esquerda">
        <q-btn icon="more_vert" color="grey-7" flat round class="float-right">

          <q-popover>
            <q-list link>
              <q-item v-close-overlay @click.native="editNotaFiscalLocalizacao(localizacao)">
                <q-item-side icon="edit" />
                <q-item-main label="Editar"/>
              </q-item>
              <q-item v-close-overlay @click.native="deleteNotaFiscalLocalizacao(localizacao)">
                <q-item-side icon="delete" />
                <q-item-main label="Excluir"/>
              </q-item>
            </q-list>
          </q-popover>

        </q-btn>
      </div>
    </div>

    <div class="row borda-superior">

      <!--ENDERECO-->
      <div class="col-5 q-pa-xs">
        <div class="text-faded q-caption ellipsis">
          Endereço
        </div>
        <div class="ellipsis">
          {{localizacao.endereco}}, {{localizacao.numero}}, {{localizacao.complemento}}
        </div>
      </div>

      <!--BAIRRO DISTRITO-->
      <div class="col-2 q-pa-xs borda-esquerda">
        <div class="text-faded q-caption ellipsis">
          Bairro / Distrito
        </div>
        <div class="ellipsis text-center">
          {{localizacao.bairro}}
        </div>
      </div>

      <!--CEP-->
      <div class="col-2 q-pa-xs borda-esquerda">
        <div class="text-faded q-caption ellipsis">
          CEP
        </div>
        <div class="ellipsis text-center">
          {{formatCEP(localizacao.cep)}}
        </div>
      </div>

      <!--ENTRADA SAIDA-->
      <div class="col-2 q-pa-xs borda-esquerda">
        <div class="text-faded q-caption ellipsis">
          Data Entrada/Saída
        </div>
        <div class="ellipsis text-center">
          {{moment(notaFiscal.saida).format('L')}}
        </div>
      </div>

      <div class="col-1">
        &nbsp
      </div>

    </div>

    <div class="row borda-superior">

      <!--MUNICIPIO-->
      <div class="col-4 q-pa-xs">
        <div class="text-faded q-caption ellipsis">
          Município
        </div>
        <div class="ellipsis">
          {{localizacao.cidade.nome}}
        </div>
      </div>

      <!--ESTADO SIGLA-->
      <div class="col-1 q-pa-xs borda-esquerda">
        <div class="text-faded q-caption ellipsis">
          UF
        </div>
        <div class="ellipsis text-center">
          {{localizacao.cidade.estado.sigla}}
        </div>
      </div>

      <!--FONE FAX-->
      <div class="col-2 q-pa-xs borda-esquerda">
        <div class="text-faded q-caption ellipsis">
          Fone / Fax
        </div>
        <div class="ellipsis text-center">
          {{localizacao.fone}}
        </div>
      </div>

      <!--INSCRICAO ESTADUAL-->
      <div class="col-2 q-pa-xs borda-esquerda">
        <div class="text-faded q-caption ellipsis">
          Inscrição Estadual
        </div>
        <div class="ellipsis text-center">
          {{localizacao.inscricao_estadual}}
        </div>
      </div>

      <!--HORA ENTRADA SAIDA-->
      <div class="col-2 q-pa-xs borda-esquerda">
        <div class="text-faded q-caption ellipsis">
          Hora da Saída/Entrada
        </div>
        <div class="ellipsis text-center">
          {{moment(notaFiscal.saida).format('LTS')}}
        </div>
      </div>

      <div class="col-1 ">
        &nbsp
      </div>

    </div>

    <nota-fiscal-localizacao-form-modal ref="notaFiscalLocalizacaoFormModal" @atualizada='notaFiscalAtualizada' :nota-fiscal-id="notaFiscal.id"/>

  </q-card>
</template>

<script>
  import notaFiscalLocalizacaoFormModal from './NotaFiscalLocalizacaoFormModal'
  import apSelectType from '../../../../components/form/ApSelectType'
  export default {
    name: "notaFiscalLocalizacao",
    components: {
      apSelectType,
      notaFiscalLocalizacaoFormModal,
    },
    data(){
      return {
      }
    },

    props: {
      localizacao: Object,
      notaFiscal: Object
    },

    computed: {
    },

    methods: {
      formatCNPJ(cnpj){
        return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
      },
      formatCPF(cpf){
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      },
      formatCEP(cpf){
        return cpf.replace(/(\d{5})(\d{3})/, "$1-$2");
      },
      notaFiscalAtualizada(notaFiscal) {
        this.$emit('atualizada', notaFiscal);
      },
      editNotaFiscalLocalizacao(item){
        this.$refs.notaFiscalLocalizacaoFormModal.edit(item)
      },
      deleteNotaFiscalLocalizacao(item){
        this.$refs.notaFiscalLocalizacaoFormModal.delete(item)
      },
    },

    mounted(){
    }

  }
</script>

<style scoped>

</style>
