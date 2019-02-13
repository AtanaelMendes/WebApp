export default class SafraCulturaListitem {
  id = null;
  cultura = {
    id: null,
    nome: null,
    image_file_name: null,
    default_unidade_medida_id: null,
  };
  safra = {
    id: null,
    is_safrinha: null,
    ano_inicio: null,
    ano_fim: null,
  };

  constructor(safraCultura) {
    console.log(safraCultura.cultura)
    this.id = safraCultura.id;
    this.cultura = {
      id: safraCultura.cultura.id,
      nome: safraCultura.cultura.nome,
      image_file_name: safraCultura.cultura.image_file_name,
      default_unidade_medida_id: safraCultura.cultura.default_unidade_medida_id,
    };
    this.safra = {
      id: safraCultura.safra.id,
      is_safrinha: safraCultura.safra.is_safrinha,
      ano_inicio: safraCultura.safra.ano_inicio,
      ano_fim: safraCultura.safra.ano_fim,
    };
  }
}
