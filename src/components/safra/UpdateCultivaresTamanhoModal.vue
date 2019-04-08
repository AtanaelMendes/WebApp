<template>
  <q-modal v-model="isModalOpened" class="update-cultivares-tamanho-modal" minimized @hide="closeModal">
    <q-modal-layout v-if="cultivaresForm">
      <div class="q-px-lg q-pb-sm q-pt-lg q-title" slot="header">
        Atualizar tamanho dos cultivares
      </div>

      <div class="">
        <q-list no-border>
          <q-item v-for="(cultivar, index) in cultivares" :key="cultivar.id">
            <q-item-side>
              <q-item-tile avatar>
                <ap-image size="200x125" :file-name="cultivar.marca.image_file_name" />
              </q-item-tile>
            </q-item-side>
            <q-item-main>
              <q-item-tile label>{{cultivar.nome}}</q-item-tile>
              <q-item-tile sublabel>{{cultivar.marca.nome}}</q-item-tile>
            </q-item-main>
            <q-item-side right style="display: flex; align-items: baseline">
              <q-input type="number" align="right"
                       v-model="getCultivarFormByIndex(index).tamanho" :suffix="currentSafraCultura.view_unidade_area.sigla"
                       style="width: 50px;" class="q-mr-sm"/>
            </q-item-side>
          </q-item>
          <q-item >
            <q-item-main class="text-right">
              Área Ocupada:
            </q-item-main>
            <q-item-side right>
              <span v-bind:style="{color: isTotalErrado ? 'red' : 'blue'}" >{{totalOcupado}} {{currentSafraCultura.view_unidade_area.sigla}}</span>
            </q-item-side>
          </q-item>
          <q-item dense>
            <q-item-main class="text-right">
              Área Total:
            </q-item-main>
            <q-item-side right>
              {{currentTalhao.tamanho}} {{currentSafraCultura.view_unidade_area.sigla}}
            </q-item-side>
          </q-item>
        </q-list>
      </div>

      <div class="q-pa-sm text-right" slot="footer">
        <q-btn @click.native="closeModal" flat color="primary" label="Cancelar" class="q-mr-xs"/>
        <q-btn @click.native="save" flat label="Atualizar" color="primary" :disabled="isTotalErrado" />
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  import SafraCulturaService from "../../assets/js/service/safra/SafraCulturaService";
  import apImage from 'components/ApImage'

  export default {
    name: "UpdateCultivaresTamanhoModal",
    components:{
      apImage,
    },
    data(){
      return {
        isModalOpened:false,
        safraCulturaService: new SafraCulturaService(),
        currentSafraCultura: null,
        currentTalhao: null,
        cultivares: null,
        cultivaresForm: null,
      }
    },
    computed:{
      totalOcupado(){
        let total = 0;
        for(let cultivar of this.cultivaresForm){
          total += parseFloat(cultivar.tamanho);
        }
        return total;
      },
      isTotalErrado(){
        return this.totalOcupado !== parseFloat(this.currentTalhao.tamanho);
      }
    },
    methods:{
      openModal(talhao, safraCultura){
        console.log(talhao)
        console.log(safraCultura)
        this.isModalOpened = true;
        this.currentSafraCultura = safraCultura;
        this.currentTalhao = talhao;
        this.listCultivares(talhao.safra_cultura_talhao_id);
      },
      closeModal(){
        this.isModalOpened = false;
        this.cultivares = null;
        this.cultivaresForm = null;
      },
      listCultivares(safraCulturaTalhaoId){
        this.safraCulturaService.listSafraCulturaTalhoesCultivares(
          this.currentSafraCultura.id, safraCulturaTalhaoId
        ).then(cultivares => {
          this.cultivares = cultivares;

          this.cultivaresForm = cultivares.map(cultivar => {
            return {
              id: cultivar.id,
              tamanho: cultivar.tamanho
            }
          })
        })
      },
      getCultivarFormByIndex(index){
        return this.cultivaresForm[index];
      }
      ,
      save(){
        this.safraCulturaService.updateSafraCulturaTalhoesCultivaresTamanho(
          {'cultivares': this.cultivaresForm},
          this.currentSafraCultura.id,
          this.currentTalhao.safra_cultura_talhao_id
        ).then(() => {
          this.$q.notify({type: 'positive', message: 'Culturas atualizadas com sucesso!'});
          this.closeModal();
          this.$root.$emit('refreshSafrasCulura');
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          this.$q.loading.hide();
        });
      }
    }
  }
</script>

<style>
  .update-cultivares-tamanho-modal .q-layout-header{
    box-shadow: none;
  }

  .update-cultivares-tamanho-modal .q-layout-footer{
    box-shadow: none;
  }
</style>
