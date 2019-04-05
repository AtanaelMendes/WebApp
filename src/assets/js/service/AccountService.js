import AccountRepository from "../repository/AccountRepository";
import AccountAPI from "../api/AccountAPI";
import SafraAPI from "../api/SafraAPI";

export default class AccountService{
  #accountRepository;

  constructor() {
    this.accountRepository = new AccountRepository();
  }

  getInfo(){
    return this.accountRepository.getFirst();
  }

  updateInfo(info){
    return new Promise((resolve, reject) => {
      AccountAPI.updateAccountInfo(info).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        if(error.response.status === 422){
          let msg = null;
          if(error.response.data.password){
            msg = "Senha incorreta!";
          }else if(error.response.data.email){
            msg = error.response.data.email[0];
          }
          reject(new Error(msg));
        }else{
          reject(error)
        }
      })
    });
  }

  changePassword(data){
    return new Promise((resolve, reject) => {
      AccountAPI.changePassword(data).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        if(error.response.status === 422){
          reject(new Error("Senha incorreta!"));
        }else{
          reject(error)
        }
      })
    });
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
