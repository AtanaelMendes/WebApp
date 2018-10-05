<template>
  <div class="q-title q-mb-sm">Permissões</div>
  <q-list id="chip_container"
          class="chip-container"
          :class="{ 'chip-container-error': $v.form.selectedRoles.$error }"
  >
    <q-item v-for="role in form.selectedRoles" :key="role.id" class="chip-inline">
      <q-chip class="q-ma-xs" @hide="removeRole(role)" closable color="light" text-color="black">{{role.name}}</q-chip>
    </q-item>
  </q-list>

  <q-btn class="full-width q-mt-md" color="secondary" @click="openRolesDialog()" label="Adicionar"/>
</template>

<script>
  import { required} from 'vuelidate/lib/validators'

  export default {
    name: 'ag-roles',
    components: {
      QSelect
    },
    data () {
      return {
        papeis: null,
        form: {
          selectedRoles: [],
        }
      }
    },
    validations: {
      form: {
        selectedRoles: { required }
      }
    },
    methods: {
      openRolesDialog: function() {
        this.$q.dialog({
          title: 'Papéis',
          message: 'Selecione as funções do usuário.',
          options: {
            type: 'checkbox',
            model: this.getIdsByRoles(this.form.selectedRoles),
            items: this.rolesToItems()
          },
          cancel: true,
          preventClose: true,
          color: 'secondary'
        }).then(data => {
          this.replaceRoles(data)
        }).catch(() => {})
      },
      rolesToItems: function() {
        var items = []
        this.papeis.forEach(function (role) {
          var item = {}
          item['label'] = role.name
          item['value'] = role.id
          items.push(item)
        })
        return items
      },
      getIdsByRoles: function(roles) {
        var rolesIds = []
        roles.forEach(function (role) {
          rolesIds.push(role.id)
        })
        return rolesIds
      },
      getRolesById: function(ids) {
        var roles = []
        for(var i = 0; i < ids.length; i++) {
          this.papeis.forEach(function (role) {
            if(role.id == ids[i]){
              roles.push(role)
            }
          })
        }
        return roles
      },
      replaceRoles: function(selectedRoles) {
        this.form.selectedRoles = this.getRolesById(selectedRoles)
      },
      removeRole: function(role) {
        var id = this.form.selectedRoles.indexOf(role)
        this.form.selectedRoles.splice(id,1)
      },
      listRoles: function() {
        let vm = this
        vm.$axios.get( 'role' ).then( response => {
          vm.papeis = response.data
        }).catch( error => {
          console.log('Erro Ocorrido:')
          console.log(error)
        })
      },
    },
    created () {
      this.listRoles()
    }
  }
</script>

<style>
  .chip-container {
    min-height: 100px ;
  }
  .chip-inline {
    display: inline;
    padding: unset;
  }
  .chip-container-error{
    border-color: red;
  }
</style>
