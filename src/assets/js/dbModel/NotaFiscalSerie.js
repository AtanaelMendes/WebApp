export default class NotaFiscalSerie {
  id = null;
  nome = null;
  pessoa_id = null;
  serie = null;
  ultima_nota_emitida = null;
  created_at = null;
  updated_at = null;
  deleted_at = null;

  constructor(notaFiscalSerie) {
    this.id = notaFiscalSerie.id;
    this.nome = notaFiscalSerie.nome;
    this.pessoa_id = notaFiscalSerie.pessoa_id;
    this.serie = notaFiscalSerie.serie;
    this.ultima_nota_emitida = notaFiscalSerie.ultima_nota_emitida;
    this.created_at = notaFiscalSerie.created_at;
    this.updated_at = notaFiscalSerie.updated_at;
    this.deleted_at = notaFiscalSerie.deleted_at;
  }
}
