export default {
  data () {
    return {
      selectOptions: [
        {
          label: 'Google',
          value: 'goog'
        },
        {
          label: 'Facebook',
          value: 'fb'
        }
      ],
      formAddress: {
        endereco: null,
        numero: null,
        complemento: null,
        bairro: null,
        cep: null,
        cidade: null,
        cobranca: false,
        fiscal: false
      }
    }
  },
  methods: {
    createAddress: function () {
      this.$v.formAddress.$touch()
      if ( this.$v.formAddress.$error ) {
        if ( this.$v.formAddress.endereco.$error ){
          this.$q.notify( 'Informe um endereço' )
        }
        if ( this.$v.formAddress.numero.$error ){
          this.$q.notify( 'Informe o numero' )
        }
        if ( this.$v.formAddress.bairro.$error ){
          this.$q.notify( 'Informe o bairro' )
        }
        if ( this.$v.formAddress.cidade.$error ){
          this.$q.notify( 'Informe a cidade' )
        }
        return
      }
      if (this.formAddress.fiscal == false && this.formAddress.cobranca == false ){
        this.$q.notify( 'Selecione ao menos um tipo de endereco' )
        return
      }
      this.$q.notify( {
        type: 'positive',
        message: 'função de create'
      } )
    }
  },
}
