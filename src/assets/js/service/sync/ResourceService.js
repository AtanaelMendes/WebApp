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
import NegocioCulturaMovimentoRepository from "../../repository/resource/NegocioCulturaMovimentoRepository";
import NegocioCulturaMovimento from "../../dbModel/NegocioCulturaMovimento";
import EntregaTalhaoRepository from "../../repository/resource/EntregaTalhaoRepository";
import EntregaTalhao from "../../dbModel/EntregaTalhao";

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
let motoristaRepository;
let notaFiscalSerieRepository;
let cfopRepository;
let tipoNegocioRepository;
let culturaClassificacaoRepository;
let unidadeConversaoRepository;
let negocioCulturaMovimentoRepository;
let entregaTalhaoRepository;

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
    motoristaRepository = new MotoristaRepository();
    notaFiscalSerieRepository = new NotaFiscalSerieRepository();
    cfopRepository = new CfopRepository();
    tipoNegocioRepository = new TipoNegocioRepository();
    culturaClassificacaoRepository = new CulturaClassificacaoRepository();
    unidadeConversaoRepository = new UnidadeConversaoRepository();
    negocioCulturaMovimentoRepository = new NegocioCulturaMovimentoRepository();
    entregaTalhaoRepository = new EntregaTalhaoRepository();
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
      getMotoristas(),
      getNotasFiscaisSeries(),
      getCfops(),
      getTiposNegocios(),
      getCulturasClassificacoes(),
      getUnidadesConversoes(),
      getNegocioCulturaMovimento(),
      getEntregasTalhoes()
    ])

  }
}


async function getCaminhoes(){
  let response = await Vue.prototype.$axios.get(path + '/caminhao');
  await caminhaoRepository.clearTable();

  for(let item of response.data){
    await caminhaoRepository.update(new Caminhao(item));
  }
}

async function getSafraCulturas(){
  let response = await Vue.prototype.$axios.get(path + '/safra_cultura');
  await safraCulturaRepository.clearTable();

  for(let item of response.data){
    await safraCulturaRepository.update(new SafraCultura(item));
  }
}

async function getSafraCulturasTalhoes(){
  let response = await Vue.prototype.$axios.get(path + '/safra_cultura_talhao');
  await safraCulturaTalhaoRepository.clearTable();

  for(let item of response.data){
    await safraCulturaTalhaoRepository.update(new SafraCulturaTalhao(item));
  }
}

async function getSafras(){
  let response = await Vue.prototype.$axios.get(path + '/safra');
  await safraRepository.clearTable();

  for(let item of response.data){
    await safraRepository.update(new Safra(item));
  }
}

async function getCulturas(){
  let response = await Vue.prototype.$axios.get(path + '/cultura');
  await culturaRepository.clearTable();

  for(let item of response.data){
    await culturaRepository.update(new Cultura(item));
  }
}

async function getAreas(){
  let response = await Vue.prototype.$axios.get(path + '/area');
  await areaRepository.clearTable();

  for(let item of response.data){
    await areaRepository.update(new Area(item));
  }
}

async function getTalhoes(){
  let response = await Vue.prototype.$axios.get(path + '/talhao');
  await talhaoRepository.clearTable();

  for(let item of response.data){
    await talhaoRepository.update(new Talhao(item));
  }
}

async function getUnidades(){
  let response = await Vue.prototype.$axios.get(path + '/unidade');
  await unidadeRepository.clearTable();

  for(let item of response.data){
    await unidadeRepository.update(new Unidade(item));
  }
}

async function getClassificacoes(){
  let response = await Vue.prototype.$axios.get(path + '/classificacao');
  await classificacaoRepository.clearTable();

  for(let item of response.data){
    await classificacaoRepository.update(new Classificacao(item));
  }
}

async function getImages(){
  let response = await Vue.prototype.$axios.get(path + '/image');
  await imageRepository.clearTable();

  for(let item of response.data){
    await imageRepository.update(new Image(item));
  }
}

async function getEntregas(){
  let response = await Vue.prototype.$axios.get(path + '/entrega');
  await entregaRepository.clearTable();

  for(let item of response.data){
    await entregaRepository.update(new Entrega(item));
  }
}

async function getCultivares(){
  let response = await Vue.prototype.$axios.get(path + '/cultivar');
  await cultivarRepository.clearTable();

  for(let item of response.data){
    await cultivarRepository.update(new Cultivar(item));
  }
}

async function getMarcas(){
  let response = await Vue.prototype.$axios.get(path + '/marca');
  await marcaRepository.clearTable();

  for(let item of response.data){
    await marcaRepository.update(new Marca(item));
  }
}

async function getNegocios(){
  let response = await Vue.prototype.$axios.get(path + '/negocio');
  await negocioRepository.clearTable();

  for(let item of response.data){
    await negocioRepository.update(new Negocio(item));
  }
}

async function getNegociosCulturas(){
  let response = await Vue.prototype.$axios.get(path + '/negocio_cultura');
  await negocioCulturaRepository.clearTable();

  for(let item of response.data){
    await negocioCulturaRepository.update(new NegocioCultura(item));
  }
}

async function getPessoas(){
  let response = await Vue.prototype.$axios.get(path + '/pessoa');
  await pessoaRepository.clearTable();

  for(let item of response.data){
    await pessoaRepository.update(new Pessoa(item));
  }
}

async function getNegociosCulturasArmazens(){
  let response = await Vue.prototype.$axios.get(path + '/negocio_cultura_armazem');
  await negocioCulturaArmazemRepository.clearTable();

  for(let item of response.data){
    await negocioCulturaArmazemRepository.update(new NegocioCulturaArmazem(item));
  }
}

async function getLocalizacoes(){
  let response = await Vue.prototype.$axios.get(path + '/localizacao');
  await localizacaoRepository.clearTable();

  for(let item of response.data){
    await localizacaoRepository.update(new Localizacao(item));
  }
}

async function getArmazens(){
  let response = await Vue.prototype.$axios.get(path + '/armazem');
  await armazemRepository.clearTable();

  for(let item of response.data){
    await armazemRepository.update(new Armazem(item));
  }
}

async function getMotoristas(){
  let response = await Vue.prototype.$axios.get(path + '/motorista');
  await motoristaRepository.clearTable();

  for(let item of response.data){
    await motoristaRepository.update(new Motorista(item));
  }
}

async function getNotasFiscaisSeries(){
  let response = await Vue.prototype.$axios.get(path + '/nota_fiscal_serie');
  await notaFiscalSerieRepository.clearTable();

  for(let item of response.data){
    await notaFiscalSerieRepository.update(new NotaFiscalSerie(item));
  }
}

async function getCfops(){
  let response = await Vue.prototype.$axios.get(path + '/cfop');
  await cfopRepository.clearTable();

  for(let item of response.data){
    await cfopRepository.update(new Cfop(item));
  }
}

async function getTiposNegocios(){
  let response = await Vue.prototype.$axios.get(path + '/tipo_negocio');
  await tipoNegocioRepository.clearTable();

  for(let item of response.data){
    await tipoNegocioRepository.update(new TipoNegocio(item));
  }
}

async function getCulturasClassificacoes(){
  let response = await Vue.prototype.$axios.get(path + '/cultura_classificacao');
  await culturaClassificacaoRepository.clearTable();

  for(let item of response.data){
    await culturaClassificacaoRepository.update(new CulturaClassificacao(item));
  }
}

async function getUnidadesConversoes(){
  let response = await Vue.prototype.$axios.get(path + '/unidade_conversao');
  unidadeConversaoRepository.clearTable();

  for(let item of response.data){
    await unidadeConversaoRepository.update(new UnidadeConversao(item));
  }
}

async function getNegocioCulturaMovimento(){
  let response = await Vue.prototype.$axios.get(path + '/negocio_cultura_movimento');
  await negocioCulturaMovimentoRepository.clearTable();

  for(let item of response.data){
    await negocioCulturaMovimentoRepository.update(new NegocioCulturaMovimento(item));
  }
}

async function getEntregasTalhoes(){
  let response = await Vue.prototype.$axios.get(path + '/entrega_talhao');
  await entregaTalhaoRepository.clearTable();

  for(let item of response.data){
    await entregaTalhaoRepository.update(new EntregaTalhao(item));
  }
}
