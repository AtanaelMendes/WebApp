export default class PasswordCredential{
  #email;
  #password;

  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  toString(){
    return {
      grant_type: 'password',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      scope: null,
      username: this.email,
      password: this.password
    }
  }
}

/*PasswordCredential.prototype.toString = function () {
  return {
    grant_type: 'password',
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    scope: null,
    username: this.email,
    password: this.password
  }
};*/
