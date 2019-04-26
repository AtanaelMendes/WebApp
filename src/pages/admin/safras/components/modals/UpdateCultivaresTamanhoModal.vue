<template>
  <ap-modal ref="updateCultivaresTamanhoModal" title="Estimativa e Tamanho" :visible="isModalOpened" @hide="closeModal">
    <template slot="content" v-if="cultivares && cultivaresForm && currentSafraCultura">
      <q-list no-border>
        <q-item v-for="(cultivar, index) in cultivares" :key="cultivar.id">
          <q-item-side>
            <q-item-tile style="width:70px">
              <ap-image size="200x125" :file-name="cultivar.marca.image_file_name" />
            </q-item-tile>
          </q-item-side>
          <q-item-main>
            <q-item-tile label>{{cultivar.nome}}</q-item-tile>
            <q-item-tile sublabel>{{cultivar.marca.nome}}</q-item-tile>
          </q-item-main>
          <q-item-side right style="display: flex; align-items: baseline">
            <q-input type="number" align="right" @input="checkTamanhoCultivares"
                     v-model="getCultivarFormByIndex(index).tamanho" :suffix="currentSafraCultura.view_unidade_area.sigla"
                     style="width: 140px;" class="q-mr-sm"/>
          </q-item-side>
        </q-item>

        <q-item>
          <q-item-side style="width:70px">
            <ap-image size="200x125" :file-name="currentTalhao.image_file_name" />
          </q-item-side>
          <q-item-main>
            Total Ocupado <br/>De {{currentTalhao.tamanho_talhao}} {{currentSafraCultura.view_unidade_area.plural}}
          </q-item-main>
          <q-item-side right>
            <q-input type="number" align="right" style="width: 140px;" class="q-mr-sm" @blur="checkTamanhoMaximo" @input="checkAreaOcupada"
                     v-model="tamanho" :suffix="currentSafraCultura.view_unidade_area.sigla" :disabled="cultivares.length > 0" :readonly="cultivares.length > 0"/>
          </q-item-side>
        </q-item>
        <q-item>
          <q-item-side style="width:70px" icon="schedule" align="center">

          </q-item-side>
          <q-item-main>
            Estimativa <br/>Por Hectare
          </q-item-main>
          <q-item-side right>
            <q-input type="number" align="right" style="width: 140px;" class="q-mr-sm" @blur="checkEstimativaValue"
                     v-model="estimativa" :suffix="currentSafraCultura.view_unidade_medida.sigla + '/' + currentSafraCultura.view_unidade_area.sigla"/>
          </q-item-side>
        </q-item>
        <q-item>
          <q-item-side style="width:70px"></q-item-side>
          <q-item-main>
            Estimativa <br/>Total
          </q-item-main>
          <q-item-side right>
            {{tamanho * estimativa}} {{currentSafraCultura.view_unidade_medida.sigla}}
          </q-item-side>
        </q-item>
      </q-list>
    </template>

    <div slot="footer" class="text-right">
      <q-btn @click.native="closeModal" flat color="primary" label="Cancelar" class="q-mr-xs"/>
      <q-btn @click.native="save" flat label="Salvar" color="primary" :disabled="isSaveButtonDisable" />
    </div>
  </ap-modal>
</template>

<script>
  import apImage from 'components/ApImage'
  import apModal from 'components/ApModal'
  import SafraCulturaTalhaoService from "../../../../../assets/js/service/safra/SafraCulturaTalhaoService";

  export default {
    name: "UpdateCultivaresTamanhoModal",
    components:{
      apImage,
      apModal
    },
    data(){
      return {
        isModalOpened:false,
        safraCulturaTalhaoService: new SafraCulturaTalhaoService(),
        currentSafraCultura: null,
        currentTalhao: null,
        cultivares: null,
        cultivaresForm: null,
        estimativa: null,
        tamanho: null,
        tamanhoMaximo: null,
      }
    },
    watch:{
      tamanho(value){
        if(!value){
          this.tamanho = this.currentTalhao.tamanho;
        }
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
        return this.tamanho > parseFloat(this.currentTalhao.tamanho);
      },
      isSaveButtonDisable(){
        if(this.cultivares === null){
          return true;
        }
        return this.isTotalErrado || this.estimativa <= 0;
      }
    },
    methods:{
      openModal(talhao, safraCultura){
        this.isModalOpened = true;
        this.currentSafraCultura = safraCultura;
        this.currentTalhao = JSON.parse(JSON.stringify(talhao));
        this.estimativa = talhao.estimativa;
        this.tamanho = talhao.tamanho;
        this.listCultivares(talhao.safra_cultura_talhao_id);
      },
      closeModal(){
        this.isModalOpened = false;
        this.cultivares = null;
        this.cultivaresForm = null;
        this.estimativa = null;
        this.tamanho = null;
      },
      listCultivares(safraCulturaTalhaoId){
        this.$refs.updateCultivaresTamanhoModal.showInnerProgress();
        this.safraCulturaTalhaoService.listSafraCulturaTalhoesCultivares(
          this.currentSafraCultura.id, safraCulturaTalhaoId
        ).then(cultivares => {
          this.cultivares = cultivares;

          this.cultivaresForm = cultivares.map(cultivar => {
            return {
              id: cultivar.id,
              tamanho: cultivar.tamanho
            }
          });

          this.$refs.updateCultivaresTamanhoModal.hideInnerProgress();
        })
      },
      getCultivarFormByIndex(index){
        return this.cultivaresForm[index];
      },
      checkEstimativaValue(){
        if(this.estimativa <= 0){
          this.estimativa = this.currentTalhao.estimativa;
        }
      },
      checkAreaOcupada(){
        if(this.tamanho > this.currentTalhao.tamanho_talhao){
          this.tamanho = this.currentTalhao.tamanho_talhao;
        }
        this.recalculateCultivares()
      },
      checkTamanhoMaximo(){
        if(this.tamanho > this.currentTalhao.tamanho_talhao || this.tamanho <= 0){
          this.tamanho = this.currentTalhao.tamanho_talhao;
        }
      },
      checkTamanhoCultivares(){
        this.tamanho = this.totalOcupado;
        if(this.tamanho > this.currentTalhao.tamanho){
          this.checkAreaOcupada();
        }
      },
      recalculateCultivares(){
        let quantidadeCultivares = this.cultivaresForm.length;
        let valueToDivide = this.tamanho;
        let totalValorSomado = 0;

        for(let i = 0; i < quantidadeCultivares; i++){
          let valor = Math.floor(valueToDivide / quantidadeCultivares);

          if(i === quantidadeCultivares - 1){
            valor = valueToDivide - totalValorSomado;
          }

          this.cultivaresForm[i].tamanho = valor;

          totalValorSomado += valor;
        }
      },
      save(){
        setTimeout(() => {
          this.$refs.updateCultivaresTamanhoModal.showOuterProgress();
          this.safraCulturaTalhaoService.updateSafraCulturaTalhoesCultivaresTamanho(
            {
              'estimativa': this.estimativa,
              'tamanho': this.tamanho,
              'cultivares': this.cultivaresForm
            },
            this.currentSafraCultura.id,
            this.currentTalhao.safra_cultura_talhao_id
          ).then(() => {
            this.$q.notify({type: 'positive', message: 'Culturas atualizadas com sucesso!'});
            this.$refs.updateCultivaresTamanhoModal.hideOuterProgress();
            this.closeModal();
            this.$root.$emit('refreshSafrasCulura');
          }).catch(error => {
            this.closeModal();
            this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
            this.$refs.updateCultivaresTamanhoModal.hideOuterProgress();
          });
        }, 300);
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
