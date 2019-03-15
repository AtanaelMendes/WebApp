import EntregaCarregandoListItem from "../../model/entrega/EntregaCarregandoListItem";
import CaminhaoRepository from "../../repository/resource/CaminhaoRepository";
import ImageRepository from "../../repository/resource/ImageRepository";
import SafraCulturaTalhaoRepository from "../../repository/resource/SafraCulturaTalhaoRepository";
import TalhaoRepository from "../../repository/resource/TalhaoRepository";
import SafraCulturaRepository from "../../repository/resource/SafraCulturaRepository";
import SafraRepository from "../../repository/resource/SafraRepository";
import CulturaRepository from "../../repository/resource/CulturaRepository";
import AreaRepository from "../../repository/resource/AreaRepository";

export default class EntregaCarregandoListItemBuilder{
  #caminhaoRepository;
  #imageRepository;
  #safraCulturaTalhaoRepository;
  #talhaoRepository;
  #safraCulturaRepository;
  #safraRepository;
  #culturaRepository;
  #areaRepository;

  constructor(){
    this.caminhaoRepository = new CaminhaoRepository();
    this.imageRepository = new ImageRepository();
    this.safraCulturaTalhaoRepository = new SafraCulturaTalhaoRepository();
    this.talhaoRepository = new TalhaoRepository();
    this.safraCulturaRepository = new SafraCulturaRepository();
    this.safraRepository = new SafraRepository();
    this.culturaRepository = new CulturaRepository();
    this.areaRepository = new AreaRepository();
  }

  async build(queueItem){
    let caminhao = await this.caminhaoRepository.getById(queueItem.request.body.caminhao_id);
    let caminhaoImage = await this.imageRepository.getById(caminhao.image_id);
    let safraCulturaTalhao = await this.safraCulturaTalhaoRepository.getById(queueItem.request.body.safra_cultura_talhao_id);
    let talhao = await this.talhaoRepository.getById(safraCulturaTalhao.talhao_id);
    let safraCultura = await this.safraCulturaRepository.getById(safraCulturaTalhao.safra_cultura_id);
    let safra = await this.safraRepository.getById(safraCultura.safra_id);
    let cultura = await this.culturaRepository.getById(safraCultura.cultura_id);
    let area = await this.areaRepository.getById(talhao.area_id);

    let entregaItem = new EntregaCarregandoListItem();
    entregaItem.id = 'queue::' + queueItem.id;
    entregaItem.isInQueueState = true;
    entregaItem.caminhao.nome = caminhao.nome;
    entregaItem.caminhao.placa = caminhao.placa;
    entregaItem.caminhao.image_file_name = caminhaoImage.file_name;
    entregaItem.inicio_carregamento = queueItem.date;
    entregaItem.safra_culturas_talhoes.push({
      area: area.nome,
      safra: cultura.nome + " " + safra.ano_inicio + "/" + safra.ano_fim,
      talhao: talhao.nome,
    });

    return entregaItem;
  }
}
