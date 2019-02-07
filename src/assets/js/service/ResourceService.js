import Vue from 'vue'
import CaminhaoRepository from "../repository/CaminhaoRepository";
import Caminhao from "../dbModel/Caminhao";
import SafraCultura from "../dbModel/SafraCultura";
import SafraCulturaRepository from "../repository/SafraCulturaRepository";
import SafraRepository from "../repository/SafraRepository";
import CulturaRepository from "../repository/CulturaRepository";
import Safra from "../dbModel/Safra";
import Cultura from "../dbModel/Cultura";
import AreaRepository from "../repository/AreaRepository";
import TalhaoRepository from "../repository/TalhaoRepository";
import Area from "../dbModel/Area";
import Talhao from "../dbModel/Talhao";
import UnidadeRepository from "../repository/UnidadeRepository";
import Unidade from "../dbModel/Unidade";
import ClassificacaoRepository from "../repository/ClassificacaoRepository";
import Classificacao from "../dbModel/Classificacao";

let path;
let caminhaoRepository;
let safraCulturaRepository;
let safraRepository;
let culturaRepository;
let areaRepository;
let talhaoRepository;
let unidadeRepository;
let classificacaoRepository;

export default class ResourceService{

  constructor() {
    path = '/produtor/' + localStorage.getItem('account.produtor_id') + '/resource';
    caminhaoRepository = new CaminhaoRepository();
    safraCulturaRepository = new SafraCulturaRepository();
    safraRepository = new SafraRepository();
    culturaRepository = new CulturaRepository();
    areaRepository = new AreaRepository();
    talhaoRepository = new TalhaoRepository();
    unidadeRepository = new UnidadeRepository();
    classificacaoRepository = new ClassificacaoRepository();
  }

  download(){
    getCaminhoes();
    getSafraCulturas();
    getSafras();
    getCulturas();
    getAreas();
    getTalhoes();
    getUnidades();
    getClassificacoes();
  }
}

function getCaminhoes(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/caminhao').then(response => {
      response.data.forEach((caminhao, index, array) => {
        caminhaoRepository.update(new Caminhao(caminhao));

        if(index === (array.length - 1)){
          resolve();
        }
      })
    })
  });
}

function getSafraCulturas(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/safra_cultura').then(response => {
      response.data.forEach((safraCultura, index, array) => {
        safraCulturaRepository.update(new SafraCultura(safraCultura));

        if(index === (array.length - 1)){
          resolve();
        }
      })
    })
  });
}

function getSafras(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/safra').then(response => {
      response.data.forEach((safra, index, array) => {
        safraRepository.update(new Safra(safra));

        if(index === (array.length - 1)){
          resolve();
        }
      })
    })
  });
}

function getCulturas(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/cultura').then(response => {
      response.data.forEach((cultura, index, array) => {
        culturaRepository.update(new Cultura(cultura));

        if(index === (array.length - 1)){
          resolve();
        }
      })
    })
  });
}

function getAreas(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/area').then(response => {
      response.data.forEach((area, index, array) => {
        areaRepository.update(new Area(area));

        if(index === (array.length - 1)){
          resolve();
        }
      })
    })
  });
}

function getTalhoes(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/talhao').then(response => {
      response.data.forEach((talhao, index, array) => {
        talhaoRepository.update(new Talhao(talhao));

        if(index === (array.length - 1)){
          resolve();
        }
      })
    })
  });
}

function getUnidades(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/unidade').then(response => {
      response.data.forEach((unidade, index, array) => {
        unidadeRepository.update(new Unidade(unidade));

        if(index === (array.length - 1)){
          resolve();
        }
      })
    })
  });
}

function getClassificacoes(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/classificacao').then(response => {
      response.data.forEach((classificacao, index, array) => {
        classificacaoRepository.update(new Classificacao(classificacao));

        if(index === (array.length - 1)){
          resolve();
        }
      })
    })
  });
}
