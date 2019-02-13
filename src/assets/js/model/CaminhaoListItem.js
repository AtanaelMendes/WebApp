export default class CaminhaoListItem{
  id = null;
  image_file_name = null;
  lotacao = null;
  nome = null;
  placa = null;
  tara = null;
  unidade_medida_sigla = null


  constructor(caminhao) {
    if(caminhao) {
      this.id = caminhao.id;
      this.image_file_name = caminhao.image_file_name;
      this.lotacao = caminhao.lotacao;
      this.nome = caminhao.nome;
      this.placa = caminhao.placa;
      this.tara = caminhao.tara;
      this.unidade_medida_sigla = caminhao.unidade_medida_sigla;
    }
  }
}
