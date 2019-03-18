export default class ServiceMessage {
  static SERVER_STATUS = "server_status";
  static SYNC = "sync";
  static SYNC_FINISHED = 'queue_sync_finished';
  type;
  payload;

  constructor(type, payload) {
    this.type = type;
    this.payload = payload;
  }
}
