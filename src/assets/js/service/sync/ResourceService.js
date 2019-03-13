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
import ResourcesSyncTimeRepository from "../../repository/ResourcesSyncTimeRepository";
import EntregaPesagem from "../../dbModel/EntregaPesagem";
import EntregaPesagemRepository from "../../repository/resource/EntregaPesagemRepository";

let basePath;

export default class ResourceService{
  #resourcesSyncTimeRepository;
  #resources;
  //TODO: Remover essas variaveis estaticas daqui e passar para outra classe
  static entregasToUpdate = [];
  static entregasToDelete = [];

  constructor(produtorId) {
    basePath = '/produtor/' + produtorId + '/resource';
    this.resourcesSyncTimeRepository = new ResourcesSyncTimeRepository();
    this.resources = [
      ['caminhao', Caminhao, CaminhaoRepository],
      ['safra_cultura', SafraCultura, SafraCulturaRepository],
      ['safra_cultura_talhao', SafraCulturaTalhao, SafraCulturaTalhaoRepository],
      ['safra', Safra, SafraRepository],
      ['cultura', Cultura, CulturaRepository],
      ['area', Area, AreaRepository],
      ['talhao', Talhao, TalhaoRepository],
      ['unidade', Unidade, UnidadeRepository],
      ['classificacao', Classificacao, ClassificacaoRepository],
      ['image', Image, ImageRepository],
      ['entrega', Entrega, EntregaRepository],
      ['cultivar', Cultivar, CultivarRepository],
      ['marca', Marca, MarcaRepository],
      ['negocio', Negocio, NegocioRepository],
      ['negocio_cultura', NegocioCultura, NegocioCulturaRepository],
      ['pessoa', Pessoa, PessoaRepository],
      ['negocio_cultura_armazem', NegocioCulturaArmazem, NegocioCulturaArmazemRepository],
      ['localizacao', Localizacao, LocalizacaoRepository],
      ['armazem', Armazem, ArmazemRepository],
      ['motorista', Motorista, MotoristaRepository],
      ['nota_fiscal_serie', NotaFiscalSerie, NotaFiscalSerieRepository],
      ['cfop', Cfop, CfopRepository],
      ['tipo_negocio', TipoNegocio, TipoNegocioRepository],
      ['cultura_classificacao', CulturaClassificacao, CulturaClassificacaoRepository],
      ['unidade_conversao', UnidadeConversao, UnidadeConversaoRepository],
      ['negocio_cultura_movimento', NegocioCulturaMovimento, NegocioCulturaMovimentoRepository],
      ['entrega_talhao', EntregaTalhao, EntregaTalhaoRepository],
      ['entrega_pesagem', EntregaPesagem, EntregaPesagemRepository],
    ];
  }

  async getSyncState(){
    let resourcesSyncTime = await this.resourcesSyncTimeRepository.getAll();
    let body = {resources: resourcesSyncTime};

    let response = await Vue.prototype.$axios.post(basePath, body);

    if(response.status === 200){
      return Promise.resolve(response.data)
    } else {
      return Promise.resolve(response)
    }
  }

  async download(){
    let resources = [];

    if(await this.resourcesSyncTimeRepository.isEmpty()){
      resources = this.resources;
    }else{
      let tablesToSync = await this.getSyncState();
      resources = this.resources.filter(resource => tablesToSync.includes(resource[0]));
    }

    let requests = resources.map(resource => this.getResource(resource[0], resource[1], resource[2]));

    return Promise.all(requests)
  }

  async getResource(name, model, repository){
    //console.log('start getResource', name);
    let resourceSyncTime = await this.resourcesSyncTimeRepository.getByTableName(name);
    let repositoryInstance = new repository();
    let afterTime = 0;

    if(resourceSyncTime !== null && resourceSyncTime !== undefined){
      afterTime = resourceSyncTime.last_update_registry;
    }

    let response = await Vue.prototype.$axios.get(basePath + '?name=' + name + "&after=" + afterTime);
    //console.log('response', name);
    await this.resourcesSyncTimeRepository.put(name, response.data.last_update_registry);

    if(name === 'entrega'){
      ResourceService.entregasToUpdate = [];
      ResourceService.entregasToDelete = [];
    }

    //TODO: Usar bulkPut ao invés do for aqui para ver se processa mais rapido
    for(let resource of response.data.resources){
      if(name === 'entrega'){
        ResourceService.entregasToUpdate.push(resource.id);
      }
      repositoryInstance.update(new model(resource));
    }

    //TODO: Usar bulkDelete ao invés do for aqui para ver se processa mais rapido
    for(let purgedId of response.data.purged_ids){
      if(name === 'entrega'){
        ResourceService.entregasToDelete.push(purgedId);
      }
      repositoryInstance.delete(purgedId);
    }

    //console.log('end getResource', name);
    return Promise.resolve();
  }
}

