export default {
  methods: {
    cleanAddressForm: function () {
      this.formAddress.endereco = null,
      this.formAddress.numero = null,
      this.formAddress.complemento = null,
      this.formAddress.bairro = null,
      this.formAddress.cep = null,
      this.formAddress.cobranca = false,
      this.formAddress.fiscal = false,
      this.modalEditAddress = false,
      this.modalNewAddress = false
    },
    getAreaByID: function (id) {
      this.$axios( { url: 'pessoa/1/endereco/1', baseURL: 'http://demo3716022.mockable.io/' } ).then( response => {
        this.fillFormAddress(response.data)
        this.addressformLoaded = true
        this.modalEditAddress = true
      }).catch( error => {})
    },
    deleteAddress: function (id) {
      // pessoa_id: vm.personProfile.id,
      this.$q.notify({ type: 'positive',  message: 'função de delete' })
      },
    updateAddress: function (id) {
      this.$v.formAddress.$touch()
      if ( this.$v.formAddress.$error ) {
        if( this.$v.formAddress.endereco.$error ){
          this.$q.notify( 'Nome Inválido' )
        }
        return
      }
      if (this.formAddress.fiscal == false && this.formAddress.cobranca == false ){
        this.$q.notify( 'Selecione ao menos um tipo de endereço' )
        return
      }
      let params = {
        pessoa_id: vm.personProfile.id,
        endereco: this.formAddress.endereco,
        numero: this.formAddress.numero,
        complemento: this.formAddress.complemento,
        bairro: this.formAddress.bairro,
        cep: this.formAddress.cep,
        cidade_id: this.formAddress.cidade,
        estado_id: this.formAddress.estado,
        is_cobranca: this.formAddress.cobranca,
        is_fiscal: this.formAddress.fiscal
      }
      this.$axios( { url: 'pessoa/1/endereco/1', baseURL: 'http://demo3716022.mockable.io/', method: 'put', data: params } ).then( response => {
        if(response.status == 200){
          this.cleanAddressForm()
          this.modalEditAddress = false
          this.$q.notify({ type: 'positive', message: 'função de update' })
        }
      }).catch( error => {})
    }
  }
}
