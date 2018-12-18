
            this.cultivar.isInox.value = false;
            this.cultivar.isIntacta.value = false;
          }
        },
        isNextButtomEnabled: function(){
          if(this.currentStep === 'tipo'){
            return true
          }
          return false
        },
        goToNextStepNewCultivar(){
          if(this.currentStep === 'tipo'){
            if(!this.cultivar.isConvencional.value){
              if(!this.cultivar.isRoundupReady.value && !this.cultivar.isInox.value && !this.cultivar.isIntacta.value){
                this.$q.dialog({
                  noBackdropDismiss: true,
                  title: 'Oops!',
                  message: 'Escolha ao menos um tipo',
                  ok: 'OK'
                });
                return;
              }
            }
          }
          this.$refs.stepperNewCultivar.next()
        },
      },
      mounted () {
        this.listCulturas();
        this.selectUnidadeMedida();
        this.selectUnidadeArea();
        // this.$root.$on('refreshSafraList', () => {
        //   this.listSafras();
        // });
      },
    }
  </script>
<style>
  .space-end{
    margin-bottom: 100px;
  }
</style>

        <div class="col-6" align="end">
          <q-btn icon="edit" @click.native="editCultura(cultura)" flat round color="primary"/>
          <q-btn round flat dense icon="more_vert">
            <q-popover>
              <q-list link class="no-border">
                <q-item v-close-overlay @click.native="addFotoCultura(cultura.id)">
                  <q-item-main label="Atualizar Foto"/>
                </q-item>
                <q-item v-close-overlay @click.native="archiveCultura(cultura.id)" v-if="!cultura.deleted_at">
                  <q-item-main label="Arquivar"/>
                </q-item>
                <q-item v-close-overlay @click.native="restoreCultura(cultura.id)" v-if="cultura.deleted_at">
                  <q-item-main label="Ativar"/>
                </q-item>
                <q-item v-close-overlay @click.native="deleteCultura(cultura.id)">
                  <q-item-main label="Excluir"/>
                </q-item>
              </q-list>
            </q-popover>
          </q-btn>
            this.cultivar.isInox.value = false;
            this.cultivar.isIntacta.value = false;
          }
        },
        isNextButtomEnabled: function(){
          if(this.currentStep === 'tipo'){
            return true
          }
          return false
        },
        goToNextStepNewCultivar(){
          if(this.currentStep === 'tipo'){
            if(!this.cultivar.isConvencional.value){
              if(!this.cultivar.isRoundupReady.value && !this.cultivar.isInox.value && !this.cultivar.isIntacta.value){
                this.$q.dialog({
                  noBackdropDismiss: true,
                  title: 'Oops!',
                  message: 'Escolha ao menos um tipo',
                  ok: 'OK'
                });
                return;
              }
            }
          }
          this.$refs.stepperNewCultivar.next()
        },
      },
      mounted () {
        this.listCulturas();
        this.selectUnidadeMedida();
        this.selectUnidadeArea();
        // this.$root.$on('refreshSafraList', () => {
        //   this.listSafras();
        // });
      },
    }
  </script>
<style>
  .space-end{
    margin-bottom: 100px;
  }
</style>
