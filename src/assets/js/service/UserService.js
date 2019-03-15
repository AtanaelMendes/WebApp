import AgroUtils from 'assets/js/AgroUtils'
import UserAPI from "../api/UserAPI";

export default class UserService{
  constructor() {
  }

  listProdutores(){
    return new Promise((resolve, reject) => {
      this.getListProdutor().then(produtores => {
        let produtorOptions = produtores.map(data => {
          return {
            value: data.id,
            label: data.nome
          }
        });
        resolve(produtorOptions)
      }).catch(error => {
        reject(error)
      })
    })
  };

  getListProdutor(){
    return new Promise((resolve, reject) => {
      UserAPI.listProdutores().then( response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  saveProdutor(params){
    return new Promise((resolve, reject) => {
      UserAPI.saveProdutor(params).then(response => {
        if (response.status === 201) {
          resolve(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  listAccounts(filter){
    return new Promise((resolve, reject) => {
      UserAPI.listAccounts(AgroUtils.serialize(filter)).then( response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  getAccount(accountId){
    return new Promise((resolve, reject) => {
      UserAPI.getAccount(accountId).then(response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error);
      })
    });
  };

  saveAccount(params){
    return new Promise((resolve, reject) => {
      UserAPI.saveAccount(params).then(response => {
        if(response.status === 201){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  updateAccount(params, accountId){
    return new Promise((resolve, reject) => {
      UserAPI.updateAccount(params, accountId).then(response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  openRolesDialog(selectedRoles, roles){
    return new Promise((resolve, reject) => {
      Dialog.create({
        title: 'Funções',
        message: 'Selecione as funções do usuário.',
        options: {
          type: 'checkbox',
          model: this.getIdsByRoles(selectedRoles),
          items: parseRolesToItems(roles)
        },
        cancel: true,
        preventClose: true,
        color: 'primary'
      }).then(data => {
        resolve(getRolesById(roles, data));
      }).catch(error => {
        reject(error)
      })
    });
  };

  removeRole(selectedRoles, role){
    return new Promise((resolve, reject) => {
      Dialog.create({
        title: 'Atenção',
        message: 'Realmente deseja apagar essa permissão?',
        ok: 'Sim',
        cancel: 'Não',
        preventClose: true,
        color: 'primary'
      }).then(data => {
        let id = selectedRoles.indexOf(role);
        selectedRoles.splice(id, 1);
        resolve(data);
      }).catch(error => {
        reject(error)
      })
    });
  };

  listRoles(){
    return new Promise((resolve, reject) => {
      UserAPI.listRoles().then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error)
      })
    });
  };

  getIdsByRoles(roles) {
    let rolesIds = [];
    roles.forEach(function (role) {
      rolesIds.push(role.id)
    });
    return rolesIds
  }
}
function parseRolesToItems(roles) {
  var items = [];
  roles.forEach(function (role) {
    var item = {};
    item['label'] = role.name;
    item['value'] = role.id;
    items.push(item)
  });
  return items
}

function getRolesById(roles, ids) {
  let selectedRoles = [];
  for(let i = 0; i < ids.length; i++) {
    roles.forEach(function (role) {
      if(role.id === ids[i]){
        selectedRoles.push(role)
      }
    })
  }
  return selectedRoles;
}
