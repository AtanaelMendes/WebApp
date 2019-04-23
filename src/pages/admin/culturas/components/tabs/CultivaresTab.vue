<template>
  <div class="" v-if="visible">
    <template v-if="cultivares">
      <template v-if="cultivares.length > 0">
        <q-list separator no-border highlight>
          <q-item v-for="cultivar in cultivares" :key="cultivar.nome">
            <q-item-side class="q-item-image" style="position: relative">
              <ap-image size="200x125" :file-name="cultivar.marca.image_file_name" />
            </q-item-side>
            <q-item-main>
              <q-item-tile label>{{cultivar.nome}}</q-item-tile>
              <q-item-tile sublabel>
                Ciclo {{cultivar.ciclo}} {{cultivar.ciclo_dias}} dias
              </q-item-tile>
              <q-item-tile sublabel>
                <q-chip class="q-mr-sm" color="deep-orange" small dense v-if="cultivar.is_convencional">Convencional</q-chip>
                <q-chip class="q-mr-sm" color="deep-orange" small dense square v-if="cultivar.is_rr">RR</q-chip>
                <q-chip class="q-mr-sm" color="deep-orange" small dense square v-if="cultivar.is_inox">Inox</q-chip>
                <q-chip class="q-mr-sm" color="deep-orange" small dense square v-if="cultivar.is_intacta">Intacta</q-chip>
              </q-item-tile>
            </q-item-main>
            <q-item-side right>
              <q-btn round flat dense icon="more_vert">
                <q-popover>
                  <q-list link class="no-border">
                    <q-item v-close-overlay @click.native="editCultivar(cultura.id, cultivar)">
                      <q-item-main label="Editar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="editTypeCultivar(cultura.id, cultivar)">
                      <q-item-main label="Alterar tipo"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="archiveCultivar(cultura.id, cultivar.id)"  v-if="!cultivar.deleted_at">
                      <q-item-main label="Arquivar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="restoreCultivar(cultura.id, cultivar.id)"  v-if="cultivar.deleted_at">
                      <q-item-main label="Ativar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="deleteCultivar(cultura.id, cultivar.id)">
                      <q-item-main label="Excluir"/>
                    </q-item>
                  </q-list>
                </q-popover>
              </q-btn>
            </q-item-side>
          </q-item>
          <q-item/>
        </q-list>
      </template>

      <template v-else>
        <!--EMPTY LIST-->
        <div class="col-12">
          <ap-no-results mensagem="Nenhum cultivar adicionado. Adicione um novo clicando no botão abaixo" />
        </div>
      </template>
    </template>
    <q-page-sticky position="bottom-right" :offset="[35, 35]">
      <q-btn round color="deep-orange" size="20px" @click="addCultivar" icon="add" />
    </q-page-sticky>
  </div>
</template>

<script>
  import CultivarService from "../../../../../assets/js/service/cultura/CultivarService";
  import apNoResults from 'components/ApNoResults'
  import apImage from 'components/ApImage'

  export default {
    name: "CultivaresTab",
    components:{
      apNoResults,
      apImage
    },
    props:{
      visible: false
    },
    data() {
      return {
        cultivarService: new CultivarService(),
        cultivares: null,
      }
    },
    methods: {
      init(cultura) {
        this.listCultivares(cultura.id);
      },
      addCultivar(){

      },
      listCultivares(culturaId){
        this.cultivarService.listCultivares(culturaId).then(cultivares => {
          this.cultivares = cultivares;
        })
      }
    }
  }
</script>

<style scoped>

</style>
