export default class{
  grouper = null;
  request = null;
  date = null;

  constructor(grouper, url, method, body, headers) {
    this.grouper = grouper;
    this.request = {
      url: url,
      method: method,
      body: (typeof body === "string") ? JSON.parse(body) : body,
      headers: headers,
    }
  }
}
