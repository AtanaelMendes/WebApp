import Vue from 'vue'
import CaminhaoRepository from "../../repository/resource/CaminhaoRepository";
import Caminhao from "../../dbModel/Caminhao";
import SafraCultura from "../../dbModel/SafraCultura";
import SafraCulturaRepository from "../../repository/resource/SafraCulturaRepository";
import SafraRepository from "../../repository/resource/SafraRepository";
import CulturaRepository from "../../repository/resource/CulturaRepository";
import Safra from "../../dbModel/Safra";
import Cultura from "../../dbModel/Cultura";
import AreaRepository from "../../repository/resource/AreaRepository";
import TalhaoRepository from "../../repository/resource/TalhaoRepository";
import Area from "../../dbModel/Area";
import Talhao from "../../dbModel/Talhao";
import UnidadeRepository from "../../repository/resource/UnidadeRepository";
import Unidade from "../../dbModel/Unidade";
import ClassificacaoRepository from "../../repository/resource/ClassificacaoRepository";
import Classificacao from "../../dbModel/Classificacao";
import SafraCulturaTalhao from "../../dbModel/SafraCulturaTalhao";
import SafraCulturaTalhaoRepository from "../../repository/resource/SafraCulturaTalhaoRepository";
import ImageRepository from "../../repository/resource/ImageRepository";
import Image from "../../dbModel/Image";
import EntregaRepository from "../../repository/resource/EntregaRepository";
import Entrega from "../../dbModel/Entrega";
import CultivarRepository from "../../repository/resource/CultivarRepository";
import Cultivar from "../../dbModel/Cultivar";
import MarcaRepository from "../../repository/resource/MarcaRepository";
import Marca from "../../dbModel/Marca";
import NegocioRepository from "../../repository/resource/NegocioRepository";
import NegocioCulturaRepository from "../../repository/resource/NegocioCulturaRepository";
import Negocio from "../../dbModel/Negocio";
import NegocioCultura from "../../dbModel/NegocioCultura";
import PessoaRepository from "../../repository/resource/PessoaRepository";
import Pessoa from "../../dbModel/Pessoa";
import NegocioCulturaArmazemRepository from "../../repository/resource/NegocioCulturaArmazemRepository";
import NegocioCulturaArmazem from "../../dbModel/NegocioCulturaArmazem";
import LocalizacaoRepository from "../../repository/resource/LocalizacaoRepository";
import Localizacao from "../../dbModel/Localizacao";
import ArmazemRepository from "../../repository/resource/ArmazemRepository";
import Armazem from "../../dbModel/Armazem";
import EntregaNegocioRepository from "../../repository/resource/EntregaNegocioRepository";
import EntregaNegocio from "../../dbModel/EntregaNegocio";
import MotoristaRepository from "../../repository/resource/MotoristaRepository";
import Motorista from "../../dbModel/Motorista";
import NotaFiscalSerieRepository from "../../repository/resource/NotaFiscalSerieRepository";
import NotaFiscalSerie from "../../dbModel/NotaFiscalSerie";
import CfopRepository from "../../repository/resource/CfopRepository";
import Cfop from "../../dbModel/Cfop";
import TipoNegocioRepository from "../../repository/resource/TipoNegocioRepository";
import TipoNegocio from "../../dbModel/TipoNegocio";
import CulturaClassificacaoRepository from "../../repository/resource/CulturaClassificacaoRepository";
import CulturaClassificacao from "../../dbModel/CulturaClassificacao";
import UnidadeConversaoRepository from "../../repository/resource/UnidadeConversaoRepository";
import UnidadeConversao from "../../dbModel/UnidadeConversao";

let path;
let caminhaoRepository;
let safraCulturaRepository;
let safraCulturaTalhaoRepository;
let safraRepository;
let culturaRepository;
let areaRepository;
let talhaoRepository;
let unidadeRepository;
let classificacaoRepository;
let imageRepository;
let entregaRepository;
let cultivarRepository;
let marcaRepository;
let negocioRepository;
let negocioCulturaRepository;
let pessoaRepository;
let negocioCulturaArmazemRepository;
let localizacaoRepository;
let armazemRepository;
let entregaNegocioRepository;
let motoristaRepository;
let notaFiscalSerieRepository;
let cfopRepository;
let tipoNegocioRepository;
let culturaClassificacaoRepository;
let unidadeConversaoRepository;

export default class ResourceService{

  constructor(produtorId) {
    path = '/produtor/' + produtorId + '/resource';
    caminhaoRepository = new CaminhaoRepository();
    safraCulturaRepository = new SafraCulturaRepository();
    safraCulturaTalhaoRepository = new SafraCulturaTalhaoRepository();
    safraRepository = new SafraRepository();
    culturaRepository = new CulturaRepository();
    areaRepository = new AreaRepository();
    talhaoRepository = new TalhaoRepository();
    unidadeRepository = new UnidadeRepository();
    classificacaoRepository = new ClassificacaoRepository();
    imageRepository = new ImageRepository();
    entregaRepository = new EntregaRepository();
    cultivarRepository = new CultivarRepository();
    marcaRepository = new MarcaRepository();
    negocioRepository = new NegocioRepository();
    negocioCulturaRepository = new NegocioCulturaRepository();
    pessoaRepository = new PessoaRepository();
    negocioCulturaArmazemRepository = new NegocioCulturaArmazemRepository();
    localizacaoRepository = new LocalizacaoRepository();
    armazemRepository = new ArmazemRepository();
    entregaNegocioRepository = new EntregaNegocioRepository();
    motoristaRepository = new MotoristaRepository();
    notaFiscalSerieRepository = new NotaFiscalSerieRepository();
    cfopRepository = new CfopRepository();
    tipoNegocioRepository = new TipoNegocioRepository();
    culturaClassificacaoRepository = new CulturaClassificacaoRepository();
    unidadeConversaoRepository = new UnidadeConversaoRepository();
  }

  download(){
    return Promise.all([
      getCaminhoes(),
      getSafraCulturas(),
      getSafraCulturasTalhoes(),
      getSafras(),
      getCulturas(),
      getAreas(),
      getTalhoes(),
      getUnidades(),
      getClassificacoes(),
      getImages(),
      getEntregas(),
      getCultivares(),
      getMarcas(),
      getNegocios(),
      getNegociosCulturas(),
      getPessoas(),
      getNegociosCulturasArmazens(),
      getLocalizacoes(),
      getArmazens(),
      getEntregasNegocios(),
      getMotoristas(),
      getNotasFiscaisSeries(),
      getCfops(),
      getTiposNegocios(),
      getCulturasClassificacoes(),
      getUnidadesConversoes()
    ])

  }
}

function getCaminhoes(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/caminhao').then(response => {
      caminhaoRepository.clearTable().then(() => {
        response.data.forEach((caminhao, index, array) => {
          caminhaoRepository.update(new Caminhao(caminhao));

          if(index === (array.length - 1)){
            return resolve();
          }
        })
      });
    })
  });
}

function getSafraCulturas(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/safra_cultura').then(response => {
      safraCulturaRepository.clearTable().then(() => {
        response.data.forEach((safraCultura, index, array) => {
          safraCulturaRepository.update(new SafraCultura(safraCultura));

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  });
}

function getSafraCulturasTalhoes(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/safra_cultura_talhao').then(response => {
      safraCulturaTalhaoRepository.clearTable().then(() => {
        response.data.forEach((safraCulturaTalhao, index, array) => {
          safraCulturaTalhaoRepository.update(new SafraCulturaTalhao(safraCulturaTalhao));

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  });
}

function getSafras(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/safra').then(response => {
      safraRepository.clearTable().then(() => {
        response.data.forEach((safra, index, array) => {
          safraRepository.update(new Safra(safra));

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  });
}

function getCulturas(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/cultura').then(response => {
      culturaRepository.clearTable().then(() => {
        response.data.forEach((cultura, index, array) => {
          culturaRepository.update(new Cultura(cultura));

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  });
}

function getAreas(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/area').then(response => {
      areaRepository.clearTable().then(() => {
        response.data.forEach((area, index, array) => {
          areaRepository.update(new Area(area));

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  });
}

function getTalhoes(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/talhao').then(response => {
      talhaoRepository.clearTable().then(() => {
        response.data.forEach((talhao, index, array) => {
          talhaoRepository.update(new Talhao(talhao));

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  });
}

function getUnidades(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/unidade').then(response => {
      unidadeRepository.clearTable().then(() => {
        response.data.forEach((unidade, index, array) => {
          unidadeRepository.update(new Unidade(unidade));

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  });
}

function getClassificacoes(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/classificacao').then(response => {
      classificacaoRepository.clearTable().then(() => {
        response.data.forEach((classificacao, index, array) => {
          classificacaoRepository.update(new Classificacao(classificacao));

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  });
}

function getImages(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/image').then(response => {
      imageRepository.clearTable().then(() => {
        response.data.forEach((image, index, array) => {
          imageRepository.update(new Image(image));

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  });
}

function getEntregas(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/entrega').then(response => {
      entregaRepository.clearTable().then(() => {
        response.data.forEach((entrega, index, array) => {
          entregaRepository.update(new Entrega(entrega));

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  });
}

function getCultivares(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/cultivar').then(response => {
      cultivarRepository.clearTable().then(() => {
        response.data.forEach((cultivar, index, array) => {
          cultivarRepository.update(new Cultivar(cultivar));

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  });
}

function getMarcas(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/marca').then(response => {
      marcaRepository.clearTable().then(() => {
        response.data.forEach((marca, index, array) => {
          marcaRepository.update(new Marca(marca));

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  });
}

function getNegocios(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/negocio').then(response => {
      negocioRepository.clearTable().then(() => {
        response.data.forEach((negocio, index, array) => {
          negocioRepository.update(new Negocio(negocio));

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  });
}

function getNegociosCulturas(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/negocio_cultura').then(response => {
      negocioCulturaRepository.clearTable().then(() => {
        response.data.forEach((negocioCultura, index, array) => {
          negocioCulturaRepository.update(new NegocioCultura(negocioCultura));

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  });
}

function getPessoas(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/pessoa').then(response => {
      pessoaRepository.clearTable().then(() => {
        response.data.forEach((pessoa, index, array) => {
          pessoaRepository.update(new Pessoa(pessoa));

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  });
}

function getNegociosCulturasArmazens(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/negocio_cultura_armazem').then(response => {
      negocioCulturaArmazemRepository.clearTable().then(() => {
        response.data.forEach((negocioCulturaArmazem, index, array) => {
          negocioCulturaArmazemRepository.update(new NegocioCulturaArmazem(negocioCulturaArmazem));

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  });
}

function getLocalizacoes(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/localizacao').then(response => {
      localizacaoRepository.clearTable().then(() => {
        response.data.forEach((localizacao, index, array) => {
          localizacaoRepository.update(new Localizacao(localizacao));

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  });
}

function getArmazens(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/armazem').then(response => {
      armazemRepository.clearTable().then(() => {
        response.data.forEach((armazem, index, array) => {
          armazemRepository.update(new Armazem(armazem));

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  });
}

function getEntregasNegocios(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/entrega_negocio').then(response => {
      entregaNegocioRepository.clearTable().then(() => {
        response.data.forEach((entregaNegocio, index, array) => {
          entregaNegocioRepository.update(new EntregaNegocio(entregaNegocio));

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  });
}

function getMotoristas(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/motorista').then(response => {
      motoristaRepository.clearTable().then(() => {
        response.data.forEach((motorista, index, array) => {
          motoristaRepository.update(new Motorista(motorista));

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  });
}

function getNotasFiscaisSeries(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/nota_fiscal_serie').then(response => {
      notaFiscalSerieRepository.clearTable().then(() => {
        response.data.forEach((notaFiscalSerie, index, array) => {
          notaFiscalSerieRepository.update(new NotaFiscalSerie(notaFiscalSerie));

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  });
}

function getCfops(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/cfop').then(response => {
      cfopRepository.clearTable().then(() => {
        response.data.forEach((cfop, index, array) => {
          cfopRepository.update(new Cfop(cfop));

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  });
}

function getTiposNegocios(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/tipo_negocio').then(response => {
      tipoNegocioRepository.clearTable().then(() => {
        response.data.forEach((tipo_negocio, index, array) => {
          tipoNegocioRepository.update(new TipoNegocio(tipo_negocio));

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  });
}

function getCulturasClassificacoes(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/cultura_classificacao').then(response => {
      culturaClassificacaoRepository.clearTable().then(() => {
        response.data.forEach((cultura_classificacao, index, array) => {
          culturaClassificacaoRepository.update(new CulturaClassificacao(cultura_classificacao));

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  });
}

function getUnidadesConversoes(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(path + '/unidade_conversao ').then(response => {
      unidadeConversaoRepository.clearTable().then(() => {
        response.data.forEach((unidade_conversao, index, array) => {
          unidadeConversaoRepository.update(new UnidadeConversao(unidade_conversao));

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  });
}
