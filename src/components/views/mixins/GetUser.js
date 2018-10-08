export default {
  methods: {
    getUser: function() {
      let vm = this
      vm.$axios.get( 'account/'+ vm.$route.params.id ).then( response => {
        vm.userData = response.data
        vm.form.selectedRoles = vm.userData.roles
        vm.form.email = vm.userData.email
      }).catch( error => {
        if (error.response.status == 404){
          this.$q.dialog({
            title:'Ops',
            message: 'Não foi possível carregar as informações'
          })
        }
        vm.$router.push( '/usuario' )
        console.log('Erro Ocorrido:')
        console.log(error)
      })
    },
  },
  created() {
    this.getUser()
  }
}
