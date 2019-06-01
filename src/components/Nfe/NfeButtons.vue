<template>
  <q-btn-dropdown
    split
    size="md"
    color="primary"
    :label="labelAcaoPadrao"
    :icon="iconeAcaoPadrao"
    @click="executarAcaoPadrao()"
  >
    <q-list link>
      <q-item v-close-overlay @click.native="emitir()" v-if="emitirVisivel">
        <q-item-side icon="mdi-send" color="primary" />
        <q-item-main label="Emitir NFe"/>
      </q-item>
      <q-item v-close-overlay @click.native="criar()" v-if="criarVisivel">
        <q-item-side icon="mdi-file-document" />
        <q-item-main label="Criar NFe"/>
      </q-item>
      <q-item v-close-overlay @click.native="assinar()" v-if="assinarVisivel">
        <q-item-side icon="mdi-pencil" />
        <q-item-main label="Assinar NFe"/>
      </q-item>
      <q-item v-close-overlay @click.native="enviarSincrono()" v-if="enviarVisivel">
        <q-item-side icon="mdi-cloud-upload" />
        <q-item-main label="Enviar NFe para Sefaz"/>
      </q-item>
      <q-item v-close-overlay @click.native="danfePerguntar()" v-if="danfeVisivel">
        <q-item-side icon="mdi-file-pdf-box" color="positive" />
        <q-item-main label="Emitir a Danfe"/>
      </q-item>
      <q-item v-close-overlay @click.native="consultar()" v-if="consultarVisivel">
        <q-item-side icon="mdi-cloud-sync" color="info" />
        <q-item-main label="Consultar na Sefaz"/>
      </q-item>
      <q-item v-close-overlay @click.native="mailPerguntar()" v-if="mailVisivel">
        <q-item-side icon="mdi-email" color="info" />
        <q-item-main label="Enviar por E-mail"/>
      </q-item>
      <q-item v-close-overlay @click.native="cancelar()" v-if="cancelarVisivel">
        <q-item-side icon="mdi-close-circle" color="negative" />
        <q-item-main label="Cancelar NFe"/>
      </q-item>
      <q-item v-close-overlay @click.native="inutilizar()" v-if="inutilizarVisivel">
        <q-item-side icon="mdi-close-circle" color="negative" />
        <q-item-main label="Inutilizar NFe"/>
      </q-item>
      <q-item v-close-overlay @click.native="xml()">
        <q-item-side icon="mdi-file-xml" />
        <q-item-main label="Visualizar arquivo XML"/>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>

  import NfeService from '../../assets/js/service/NfeService'

  import { Notify } from 'quasar'
  import { Loading } from 'quasar'
  import { Dialog } from 'quasar'

  export default {
    name: "NfeButtons",
    props: {
      notaFiscalId: {
        type: Number,
        default: 0,
      },
      status: {
        type: String,
        default: '',
      }
    },
    components: {
    },
    data(){
      return {
        nfeService: new NfeService(),
      }
    },
    computed: {
      emitirVisivel: function () {
        if (this.status == 'Digitacao' || this.status == 'Enviada') {
          return true;
        }
        return false;
      },
      criarVisivel: function () {
        return this.emitirVisivel;
      },
      assinarVisivel: function () {
        return this.emitirVisivel;
      },
      enviarVisivel: function () {
        return this.emitirVisivel;
      },
      danfeVisivel: function () {
        if (this.status == 'Informada' || this.status == 'Inutilizada') {
          return false;
        }
        return true;
      },
      consultarVisivel: function () {
        if (this.status == 'informada') {
          return false;
        }
        return true;
      },
      mailVisivel: function () {
        return this.danfeVisivel;
      },
      cancelarVisivel: function () {
        if (this.status == 'Autorizada') {
          return true;
        }
        return false;
      },
      inutilizarVisivel: function () {
        return false;
      },
      acaoPadrao: function () {
        switch (this.status) {
          case 'Digitacao':
          case 'Enviada':
            return 'Emitir';
            break;

          case 'Autorizada':
            return 'Danfe';
            break;

          case 'Cancelada':
          case 'Denegada':
            return 'Consultar';

          default:
            return null;
        }
      },
      iconeAcaoPadrao: function () {
        switch (this.acaoPadrao) {
          case 'Emitir':
            return 'mdi-send';
          case 'Danfe':
            return 'mdi-file-pdf-box';
          case 'Consultar':
            return 'mdi-cloud-sync';
        }
      },
      labelAcaoPadrao: function () {
        switch (this.acaoPadrao) {
          case 'Emitir':
            return 'Emitir NFe';
          case 'Danfe':
            return 'Danfe';
          case 'Consultar':
            return 'consultar nfe';
        }
      }
    },
    methods: {
      executarAcaoPadrao() {
        switch (this.acaoPadrao) {
          case 'Danfe':
            this.danfe();
            break;
          case 'Emitir':
            this.emitir();
            break;
          case 'Consultar':
            this.consultar();
            break;
        }
      },

      emitir() {
        this.criar(true);
      },

      criar(continuar = false) {
        this.$q.loading.show();
        this.nfeService.criar(this.notaFiscalId).then((response) => {
          this.$q.notify({type: 'positive', message: 'Arquivo da Nfe criado!'});
          if (continuar) {
            this.assinar(continuar);
          } else {
            Loading.hide();
            this.$emit('atualizada');
          }
        }).catch((error) => {
          Loading.hide();
          var message = 'Erro ao criar arquivo da Nfe!'
          if (typeof error.response.data.message !== 'undefined') {
            message = error.response.data.message
          }
          this.$q.notify({type: 'negative', message: message });
          this.$emit('atualizada');
        });
      },

      assinar(continuar = false) {
        this.$q.loading.show();
        this.nfeService.assinar(this.notaFiscalId).then((response) => {
          if (continuar) {
            this.enviarSincrono(continuar);
          } else {
            Loading.hide();
          }
          this.$q.notify({type: 'positive', message: 'Arquivo da Nfe assinado!'});
        }).catch((error) => {
          Loading.hide();
          var message = 'Erro ao assinar arquivo da Nfe!'
          if (typeof error.response.data.message !== 'undefined') {
            message = error.response.data.message
          }
          this.$q.notify({type: 'negative', message: message });
        });
      },

      enviarSincrono(continuar = false) {
        this.$q.loading.show();
        this.nfeService.enviarSincrono(this.notaFiscalId).then((response) => {
          if (continuar) {
            this.danfe();
            this.mail();
          } else {
            Loading.hide();
          }
          this.$emit('atualizada');
          this.$q.notify({type: 'positive', message: 'NFe Autorizada!'});
        }).catch((error) => {
          Loading.hide();
          this.$emit('atualizada');
          var message = 'Erro ao enviar NFe para Sefaz!'
          if (typeof error.response.data.message !== 'undefined') {
            message = error.response.data.message
          }
          this.$q.notify({type: 'negative', message: message });
        });
      },

      consultar() {
        this.$q.loading.show();
        this.nfeService.consultar(this.notaFiscalId).then((response) => {
          Loading.hide();
          var type = 'positive';
          if (response.data.status != 'Autorizada') {
            type = 'negative';
          }
          this.$q.notify({type: type, message: response.data.message});
          this.$emit('atualizada');
        }).catch((error) => {
          Loading.hide();
          var message = 'Erro ao consultar NFe na Sefaz!'
          if (typeof error.response.data.message !== 'undefined') {
            message = error.response.data.message
          }
          this.$q.notify({type: 'negative', message: message });
          this.$emit('atualizada');
        });
      },

      cancelar() {
        Dialog.create({
            title: 'Justificativa',
            message: 'Digite a justificativa para o cancelamento desta NF-e.',
            cancel: true,
            color: 'secondary',
            prompt: {
              model: '',
              type: 'text' // optional
            },
        }).then(justificativa => {
          this.$q.loading.show();
          return new Promise((resolve, reject) => {
            this.nfeService.cancelar(this.notaFiscalId, justificativa).then(response => {
              Loading.hide();
              this.$q.notify({type: 'positive', message: 'Nfe Cancelada!'});
              this.$emit('atualizada');
            }).catch(error => {
              Loading.hide();
              var message = "Erro ao cancelar NFe na Sefaz!";
              if (typeof error.response.data.justificativa !== 'undefined') {
                message = error.response.data.justificativa.join(', ');
              }
              if (typeof error.response.data.message !== 'undefined') {
                message = error.response.data.message;
              }
              this.$q.notify({type: 'negative', message: message});
            });
          });
        });
      },

      inutilizar() {
        Dialog.create({
            title: 'Justificativa',
            message: 'Digite a justificativa para a inutilização desta NF-e.',
            cancel: true,
            color: 'secondary',
            prompt: {
              model: '',
              type: 'text' // optional
            },
        }).then(justificativa => {
          this.$q.loading.show();
          return new Promise((resolve, reject) => {
            this.nfeService.inutilizar(this.notaFiscalId, justificativa).then(response => {
              Loading.hide();
              this.$q.notify({type: 'positive', message: 'Nfe Inutilizada!'});
              this.$emit('atualizada');
            }).catch(error => {
              Loading.hide();
              var message = "Erro ao Inutilizar NFe na Sefaz!";
              if (typeof error.response.data.justificativa !== 'undefined') {
                message = error.response.data.justificativa.join(', ');
              }
              if (typeof error.response.data.message !== 'undefined') {
                message = error.response.data.message;
              }
              this.$q.notify({type: 'negative', message: message});
            });
          });
        });
      },

      mailPerguntar() {
        Dialog.create({
            title: 'E-mail NF-e',
            message: 'Digite o endereço para o qual você deseja enviar esta NF-e. Deixe em branco para utilizar o endereço que no cadastro.',
            cancel: true,
            color: 'secondary',
            prompt: {
              model: '',
              type: 'email' // optional
            },
        }).then(para => {
          this.mail(para)
        })
      },

      mail(para) {
        this.$q.loading.show();
        this.nfeService.mail(this.notaFiscalId, para).then((response) => {
          Loading.hide();
          var message = 'Email enviado para: ';
          if (typeof response.data.para !== 'undefined') {
            message += response.data.para.join(', ');
          }
          this.$q.notify({type: 'positive', message: message});
        }).catch((error) => {
          Loading.hide();
          var message = "Erro ao enviar e-mail!";
          if (typeof error.response.data.para !== 'undefined') {
            message = error.response.data.para.join(', ');
          }
          if (typeof error.response.data.message !== 'undefined') {
            message = error.response.data.message;
          }
          this.$q.notify({type: 'negative', message: message});
        });
      },

      danfePerguntar() {
        if (this.status == 'Autorizada') {
          this.danfe();
        } else {
          Dialog.create({
              title: 'NFe não autorizada',
              message: 'Esta NFe não está autorizada. A emissão da Danfe é meramente informativa e não tem validade Fiscal. Deseja continuar?',
              ok: 'Desejo continuar',
              cancel: 'Desisto',
              stackButtons: true
          }).then(para => {
            Dialog.create({
                title: 'Tem certeza?',
                message: 'Deseja mesmo continuar por sua conta e risco? Esta Danfe não tem validade fiscal.',
                ok: 'desejo mesmo continuar',
                cancel: 'Desisto',
                stackButtons: true
            }).then(para => {
              this.danfe();
            })
          });
        }
      },

      danfe() {
        this.nfeService.danfe(this.notaFiscalId).then((response) => {
          const file = new Blob([response.data], {type: 'application/pdf'});
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
          this.$q.notify({type: 'positive', message: 'Danfe aberta!'});
        }).catch((error) => {
          var reader = new FileReader();
          reader.onload = function() {
            var res = JSON.parse(reader.result);
            this.$q.notify({type: 'negative', message: res.message});
          }
          reader.readAsText(error.response.data);
        });
      },

      xml() {
        this.nfeService.xml(this.notaFiscalId).then((response) => {
          const file = new Blob([response.data], {type: 'application/xml'});
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
          this.$q.notify({type: 'positive', message: 'XML aberto!'});
        }).catch((error) => {
          this.$q.notify({type: 'negative', message: error.response.data.message});
        });
      },
    },
    mounted(){
    }
  }
</script>

<style>
</style>
