export default {
  methods: {
    cleanContactForm: function(){
      this.formContact.fiscal = false
      this.formContact.cobranca = false
      this.formContact.nome = null
      this.formContact.email = null
      this.formContact.phone = null
      this.formContact.isCelular = false
      this.formContact.isFixo = false
      this.formContact.setTelefoneTipo = 1
    },
    getPersonContactByID: function (id) {
      this.$axios( { url: 'pessoa/contato/1', baseURL: 'http://demo3716022.mockable.io/' } ).then( response => {
        this.fillFormContact(response.data)
        this.contactsformLoaded = true
      }).catch( error => {
        console.log(error.request)
      })
    },
    deleteContact(id) {
      // pessoa_id: vm.personProfile.id,
      this.$q.notify({ type: 'positive',  message: 'função de delete' })
    },
    updateContact: function (id) {
      this.$v.formContact.$touch()
      if ( this.$v.formContact.$error ) {
        if( this.$v.formContact.nome.$error ){
          this.$q.notify( 'Nome Inválido' )
        }
        if( this.$v.formContact.email.$error ){
          this.$q.notify( 'Email inválido' )
        }
        if( this.$v.formContact.phone.$error ){
          this.$q.notify( 'Telefone inválido' )
        }
        return
      }
      if (this.formContact.fiscal == false && this.formContact.cobranca == false ){
        this.$q.notify( 'Selecione ao menos um tipo de contato' )
        return
      }
      var fixo = false
      var celular = false
      if(this.formContact.setTelefoneTipo == 1){
        celular = true
      }
      if(this.formContact.setTelefoneTipo == 2){
        fixo = true
      }
      let params = {
        pessoa_id: vm.personProfile.id,
        nome: this.formContact.nome,
        is_fiscal: this.formContact.fiscal,
        is_cobranca: this.formContact.cobranca,
        email: {
          endereco: this.formContact.email
        },
        telefone: {
          numero: this.formContact.phone,
          is_celular: celular,
          is_fixo: fixo,
        }
      }
      this.$axios( { url: 'pessoa/1/contato/1', baseURL: 'http://demo3716022.mockable.io/', method: 'put', data: params } ).then( response => {
        if(response.status == 200){
          this.cleanContactForm()
          this.modalEditContact = false
          this.$q.notify({ type: 'positive', message: 'função de update' })
        }
      }).catch( error => {
        console.log(error.request)
      })
    }
  }
}
