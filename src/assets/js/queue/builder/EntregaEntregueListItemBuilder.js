import EntregaEntregueListItem from "../../model/entrega/EntregaEntregueListItem";
import EntregasQueue from "../EntregasQueue";
import EntregaCarregandoListRepository from "../../repository/list/EntregaCarregandoListRepository";
import EntregaNoArmazemListRepository from "../../repository/list/EntregaNoArmazemListRepository";
import CaminhaoRepository from "../../repository/resource/CaminhaoRepository";
import ArmazemRepository from "../../repository/resource/ArmazemRepository";
import MotoristaRepository from "../../repository/resource/MotoristaRepository";
import SafraCulturaTalhaoRepository from "../../repository/resource/SafraCulturaTalhaoRepository";
import SafraCulturaRepository from "../../repository/resource/SafraCulturaRepository";
import EntregaViewRepository from "../../repository/list/EntregaViewRepository";
import ImageRepository from "../../repository/resource/ImageRepository";
import CulturaRepository from "../../repository/resource/CulturaRepository";
import SafraRepository from "../../repository/resource/SafraRepository";
import UnidadeRepository from "../../repository/resource/UnidadeRepository";

export default class EntregaEntregueListItemBuilder{
  #entregasQueue;
  #caminhaoRepository;
  #armazemRepository;
  #motoristaRepository;
  #safraCulturaTalhaoRepository;
  #safraCulturaRepository;
  #entreggaViewRepository;
  #imageRepository;
  #culturaRepository;
  #safraRepository;
  #unidadeRepository;

  constructor() {
    this.entregasQueue = new EntregasQueue();
    this.caminhaoRepository = new CaminhaoRepository();
    this.armazemRepository = new ArmazemRepository();
    this.motoristaRepository = new MotoristaRepository();
    this.safraCulturaTalhaoRepository = new SafraCulturaTalhaoRepository();
    this.safraCulturaRepository = new SafraCulturaRepository();
    this.entregaViewRepository = new EntregaViewRepository();
    this.imageRepository = new ImageRepository();
    this.culturaRepository = new CulturaRepository();
    this.safraRepository = new SafraRepository();
    this.unidadeRepository = new UnidadeRepository();
  }

  async build(queueItem){
    let url = queueItem.request.url;
    let entregaItem = new EntregaEntregueListItem();

    let caminhao = null;
    let armazem = null;
    let motorista = null;
    let safraCultura = null;

    if(url.match("(queue::([0-9]*))")){
      let entregaNoArmazemId = parseInt(url.match("(queue::([0-9]*))")[2]);
      let entregaNoArmazemQueue = await this.entregasQueue.getById(entregaNoArmazemId);
      let entregaCarregandoId = parseInt(entregaNoArmazemQueue.request.url.match("(queue::([0-9]*))")[2]);
      let entregaCarregandoQueue = await this.entregasQueue.getById(entregaCarregandoId);
      let caminhaoId = entregaCarregandoQueue.request.body.caminhao_id;

      caminhao = await this.caminhaoRepository.getById(caminhaoId);
      armazem = await this.armazemRepository.getById(entregaNoArmazemQueue.request.body.armazem_id);
      motorista = await this.motoristaRepository.getById(entregaNoArmazemQueue.request.body.motorista_id);

      let safraCulturaTalhao = await this.safraCulturaTalhaoRepository.getById(entregaCarregandoQueue.request.body.safra_cultura_talhao_id);
      safraCultura = await this.safraCulturaRepository.getById(safraCulturaTalhao.safra_cultura_id);

    }else{
      let entregaId = parseInt(url.match("(\/entrega\/([0-9]*))")[2]);
      let entregaView = await this.entregaViewRepository.get(entregaId);

      caminhao = await this.caminhaoRepository.getById(entregaView.caminhao.id);
      armazem = await this.armazemRepository.getById(entregaView.armazem.id);
      motorista = await this.motoristaRepository.getById(entregaView.motorista.id);
      safraCultura = await this.safraCulturaRepository.getById(entregaView.safra_cultura.id);
    }

    let caminhaoImage = await this.imageRepository.getById(caminhao.image_id);
    let cultura = await this.culturaRepository.getById(safraCultura.cultura_id);
    let safra = await this.safraRepository.getById(safraCultura.safra_id);

    let unidadeParaConversao = await this.unidadeRepository.getById(queueItem.request.body.unidade_medida_id);

    let total_peso_liquido = queueItem.request.body.peso_liquido;
    let total_peso_bruto_produto = queueItem.request.body.peso_bruto_produto;
    let total_peso_desconto = queueItem.request.body.peso_desconto;

    entregaItem.id = 'queue::' + queueItem.id;
    entregaItem.entregue = queueItem.date;
    entregaItem.isInQueueState = true;
    entregaItem.caminhao.image_file_name = caminhaoImage.file_name;
    entregaItem.caminhao.placa = caminhao.placa;
    entregaItem.armazem = armazem.nome;
    entregaItem.motorista = motorista.nome;
    entregaItem.peso = total_peso_liquido.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits:2 });
    if(total_peso_desconto > 0){
      entregaItem.peso += " ("
        + total_peso_bruto_produto.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits:2 })
        + " - " + total_peso_desconto.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits:2 }) + ")";
    }
    entregaItem.peso += " " + unidadeParaConversao.sigla;
    entregaItem.safra = cultura.nome + " " + safra.ano_inicio + "/" + safra.ano_fim;

    return entregaItem;
  }
}
