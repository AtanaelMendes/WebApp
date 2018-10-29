export default {
  methods: {
    getUser: function() {
      let vm = this
      vm.$axios.get( 'account/'+ vm.$route.params.id ).then( response => {
        vm.userData = response.data
        vm.formUser.selectedRoles = vm.userData.roles
        vm.formUser.email = vm.userData.email
      }).catch( error => {
        if (error.response.status == 404){
          this.$q.dialog({
            title:'Ops',
            message: 'Não foi possível carregar as informações'
          })
        }
        vm.$router.push( '/usuario' )
        console.log(error.request)
      })
    },
  },
  created() {
    this.getUser()
  }
}
