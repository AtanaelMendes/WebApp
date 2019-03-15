export default class ServiceMessage {
  static SERVER_STATUS = "server_status";
  static SYNC = "sync";
  type;
  payload;

  constructor(type, payload) {
    this.type = type;
    this.payload = payload;
  }
}
