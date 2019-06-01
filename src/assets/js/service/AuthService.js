import Vue from 'vue';
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

        this.getAccountInfo().then(()=>{
          resolve();
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

  async getAccountInfo(){
    return AccountAPI. getAccountInfo().then(async response => {
      let user = this.buildUser(response.data);

      if(!localStorage.key('tenant_key')){
        localStorage.setItem('tenant_key', user.getDefaultTenant().key);
      }else{
        let actived_tenant = localStorage.getItem('tenant_key');
        if(!user.tenants.includes(tenant => tenant.key === actived_tenant)){
          localStorage.setItem('tenant_key', user.getDefaultTenant().key);
        }
      }

      await this.accountRepository.update(response.data);

      return user;
    });
  }

  changeActiveTenant(key){
    localStorage.setItem('tenant_key', key);
  }

  buildUser(data){
    let user = Object.assign({}, data);

    user.getTenantsParsed = function () {
      return user.tenants.map(tenant => {
        return {
          label: tenant.nome,
          value: tenant.key
        }
      })
    };

    user.getDefaultTenant = function(){
      return user.tenants.find(tenant => {return tenant.is_default === true});
    };

    user.activedTenant = user.getDefaultTenant();

    Vue.prototype.$user = user;

    return user;
  }

}
