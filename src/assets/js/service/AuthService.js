import AuthAPI from "../api/AuthAPI";
import PasswordCredential from "../model/auth/PasswordCredential";
import AccountAPI from "../api/AccountAPI";
import AccountRepository from "../repository/AccountRepository";


export default class AuthService{
  #accountRepository;

  constructor() {
    this.accountRepository = new AccountRepository();
  }

  login(credentials){
    if(!(credentials instanceof PasswordCredential)){
      throw new Error('Objeto não é do tipo PasswordCredential!');
    }

    return new Promise((resolve, reject) => {
      AuthAPI.login(credentials.toString()).then(response => {
        localStorage.setItem('auth.token', response.data.access_token);
        localStorage.setItem('auth.refresh_token', response.data.refresh_token);

        AccountAPI.getAccountInfo().then(response => {
          delete response.data.id;
          this.accountRepository.save(response.data).then(() => {
            resolve();
          });
        });

      }).catch(error => {
        switch(error.response.status){
          case 401:
            reject(new Error("Email e/ou senha incorretos!"));
            break;
          default:
            reject(error);
        }
      })
    });
  }

}
