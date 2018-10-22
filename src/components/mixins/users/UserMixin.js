import * as UserUtils from 'assets/js/UserUtils'
export default {
  methods: {
    openRolesDialog: function() {
      this.$q.dialog({
        title: 'Funções',
        message: 'Selecione as funções do usuário.',
        options: {
          type: 'checkbox',
          model: UserUtils.getIdsByRoles(this.form.selectedRoles.value),
          items: UserUtils.parseRolesToItems(this.roles)
        },
        cancel: true,
        preventClose: true,
        color: 'primary'
      }).then(data => {
        this.replaceRoles(data)
      })
    },
    listRoles: function() {
      this.$axios.get( 'role' ).then( response => {
        this.roles = response.data;
      })
    },
    replaceRoles: function(selectedRoles) {
      this.form.selectedRoles.error = false;
      this.form.selectedRoles.value = UserUtils.getRolesById(this.roles, selectedRoles)
    },
    removeRole: function(role) {
      this.$q.dialog({
        title: 'Atenção',
        message: 'Realmente deseja apagar essa permissão?',
        ok: 'Sim',
        cancel: 'Não',
        preventClose: true,
        color: 'primary'
      }).then(data => {
        let id = this.form.selectedRoles.value.indexOf(role);
        this.form.selectedRoles.value.splice(id,1)
      })
    },

  }
}
