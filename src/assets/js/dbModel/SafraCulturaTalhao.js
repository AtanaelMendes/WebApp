export default class SafraCulturaTalhao {
  id = null;
  talhao_id = null;
  safra_cultura_id = null;
  estimativa = null;
  tamanho = null;
  created_at = null;
  updated_at = null;
  deleted_at = null;


  constructor(safraCulturaTalhao) {
    this.id = safraCulturaTalhao.id;
    this.talhao_id = safraCulturaTalhao.talhao_id;
    this.safra_cultura_id = safraCulturaTalhao.safra_cultura_id;
    this.estimativa = safraCulturaTalhao.estimativa;
    this.tamanho = safraCulturaTalhao.tamanho;
    this.created_at = safraCulturaTalhao.created_at;
    this.updated_at = safraCulturaTalhao.updated_at;
    this.deleted_at = safraCulturaTalhao.deleted_at;
  }
}
