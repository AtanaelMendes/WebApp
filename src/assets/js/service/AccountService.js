import AccountRepository from "../repository/AccountRepository";
import AccountAPI from "../api/AccountAPI";

export default class AccountService{
  #accountRepository;

  constructor() {
    this.accountRepository = new AccountRepository();
  }

  getInfo(){
    return this.accountRepository.getFirst();
  }

  logout () {
    return new Promise((resolve, reject) => {
      AccountAPI.logout().then(() => {
        clearAccountInfo();
        resolve();
      }).catch(error => {
        reject(error)
      })

    });
  }
}


function clearAccountInfo(){
  localStorage.removeItem('auth.token');
  localStorage.removeItem('auth.refresh_token');
}
