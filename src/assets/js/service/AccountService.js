import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
import AccountRepository from "../repository/AccountRepository";

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
      Vue.prototype.$axios.post('account/logout').then(() => {
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
  localStorage.removeItem('account.produtor_id');
}
