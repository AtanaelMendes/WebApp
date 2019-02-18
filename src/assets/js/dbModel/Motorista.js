export default class Motorista {
  id = null;
  nome = null;
  pessoa_id = null;
  image_id = null;
  created_at = null;
  updated_at = null;
  deleted_at = null;

  constructor(motorista) {
    this.id = motorista.id;
    this.nome = motorista.nome;
    this.pessoa_id = motorista.pessoa_id;
    this.image_id = motorista.image_id;
    this.created_at = motorista.created_at;
    this.updated_at = motorista.updated_at;
    this.deleted_at = motorista.deleted_at;
  }
}

