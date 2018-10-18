export default {
  data () {
    return {
      formContact: {
        fiscal: false,
        cobranca: false,
        nome: null,
        email: null,
        phone: null,
        phoneType: 1,
      }
    }
  },
  methods: {
    deleteContact(id) {
      this.$q.notify( {
        type: 'positive',
        message: 'função de delete'
      } )
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
      this.$q.notify( {
        type: 'positive',
        message: 'função de update'
      } )
    }
  }
}
