export default class Entrega {
  id = null;
  is_saida = null;
  caminhao_id = null;
  inicio_carregamento = null;
  envio_armazem = null;
  armazem_id = null;
  motorista_id = null;
  status = null;
  created_at = null;
  updated_at = null;
  deleted_at = null;


  constructor(entrega) {
    this.id = entrega.id;
    this.is_saida = entrega.is_saida;
    this.caminhao_id = entrega.caminhao_id;
    this.inicio_carregamento = entrega.inicio_carregamento;
    this.envio_armazem = entrega.envio_armazem;
    this.armazem_id = entrega.armazem_id;
    this.motorista_id = entrega.motorista_id;
    this.status = entrega.status;
    this.created_at = entrega.created_at;
    this.updated_at = entrega.updated_at;
    this.deleted_at = entrega.deleted_at;
  }
}

