export default {
  methods: {
    cnpjFormat: function(cnpj) {
      cnpj = cnpj.replace(/[^\d]+/g,'')
      cnpj = this.numeral(cnpj).format('00000000000000').replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
    },
    validateCnpj: function(cnpj) {
      var b = [6,5,4,3,2,9,8,7,6,5,4,3,2];
      if((cnpj = cnpj.replace(/[^\d]/g,"")).length != 14){
        return false;
      }
      if(/0{14}/.test(cnpj)){
        return false;
      }
      for (var i = 0, n = 0; i < 12; n += cnpj[i] * b[++i]);
      if(cnpj[12] != (((n %= 11) < 2) ? 0 : 11 - n)){
        return false;
      }
      for (var i = 0, n = 0; i <= 12; n += cnpj[i] * b[i++]);
      if(cnpj[13] != (((n %= 11) < 2) ? 0 : 11 - n)){
        return false;
      }
      return true;
    }
  }
}
