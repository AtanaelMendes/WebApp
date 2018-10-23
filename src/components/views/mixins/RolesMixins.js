export default {
methods: {
  openRolesDialog: function() {
    this.$q.dialog({
      title: 'Papéis',
      message: 'Selecione as funções do usuário.',
      options: {
        type: 'checkbox',
        model: this.getIdsByRoles(this.formUser.selectedRoles),
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
    this.formUser.selectedRoles = this.getRolesById(selectedRoles)
  },
  removeRole: function(role) {
    var id = this.formUser.selectedRoles.indexOf(role)
    this.formUser.selectedRoles.splice(id,1)
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
}
}
