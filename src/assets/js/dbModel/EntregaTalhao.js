export default class EntregaTalhao {
  id = null;
  entrega_id = null;
  safra_cultura_talhao_id = null;
  percentual = null;
  quantidade = null;
  created_at = null;
  updated_at = null;
  deleted_at = null;

  constructor(entregaTalhao) {
    this.id = entregaTalhao.id;
    this.entrega_id = entregaTalhao.entrega_id;
    this.safra_cultura_talhao_id = entregaTalhao.safra_cultura_talhao_id;
    this.percentual = entregaTalhao.percentual;
    this.quantidade = entregaTalhao.quantidade;
    this.created_at = entregaTalhao.created_at;
    this.updated_at = entregaTalhao.updated_at;
    this.deleted_at = entregaTalhao.deleted_at;
  }
}

