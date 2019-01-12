export default class{
  id = null;
  caminhaoId = null;
  safraCulturaTalhaoId = null;

  getValues(){
    return{
      caminhao_id: this.caminhaoId,
      safra_cultura_talhao_id: this.safraCulturaTalhaoId,
    }
  }
}
