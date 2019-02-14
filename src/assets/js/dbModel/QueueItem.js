export default class QueueItem{
  grouper = null;
  type = null;
  request = null;
  date = null;

  constructor(grouper, type, url, method, body, headers) {
    this.grouper = grouper;
    this.type = type;
    this.request = {
      url: url,
      method: method,
      body: (typeof body === "string") ? JSON.parse(body) : body,
      headers: headers,
    }
  }
}
