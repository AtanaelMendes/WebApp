<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction" title="Safra">
      <template slot="action_itens" v-if="safra">
        <q-btn flat round dense icon="edit" @click.native="editSafra(safra.id)"/>
        <q-btn flat round dense icon="more_vert" >
          <q-popover anchor="bottom left">
            <q-list link>
              <q-item dense @click.native="disableSafra(safra.id)" v-if="!safra.deleted_at">
                <q-item-main label="Inativar safra"  />
              </q-item>
              <q-item dense @click.native="enableSafra(safra.id)" v-if="safra.deleted_at">
                <q-item-main label="Ativar safra"  />
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </template>
    </toolbar>
    <div>
      ss
    </div>
  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import safraService from 'assets/js/service/SafraService'

  export default {
    name: "SafraView",
    components: {
      toolbar,
      customPage,
    },
    data(){
      return {
        safra: null,
      }
    },
    methods:{
      getSafraById: function(){
        safraService.getSafra(this.$route.params.id).then(response => {
          //this.areaData = area.data;
          //this.fillForm(this.areaData)
          this.safra = response.data;
        })
      },
      editSafra: function(id){
        this.$router.push({name: 'edit_safra', params: {id:id}});
      },
      enableSafra: function(id){
        safraService.deleteSafra(id).then(response => {
          if(response.status === 200) {
            this.$root.$emit('refreshSafraList')
          }
        })
      },
      disableSafra: function(id){
        safraService.deleteSafra(id).then(response => {
          if(response.status === 200) {
            this.$root.$emit('refreshSafraList')
          }
        })
      },
      backAction: function () {
        this.$router.push({name: 'safras'});
      }
    },
    mounted(){
      this.getSafraById();
    }
  }

</script>

<style scoped>

</style>
