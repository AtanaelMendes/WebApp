import EntregaNoArmazemListItem from "../../model/entrega/EntregaNoArmazemListItem";
import EntregasQueue from "../EntregasQueue";
import CaminhaoRepository from "../../repository/resource/CaminhaoRepository";
import ImageRepository from "../../repository/resource/ImageRepository";
import ArmazemRepository from "../../repository/resource/ArmazemRepository";
import MotoristaRepository from "../../repository/resource/MotoristaRepository";
import LocalizacaoRepository from "../../repository/resource/LocalizacaoRepository";
import EntregaListItemBuilder from "../../model/entrega/builder/EntregaListItemBuilder";
import EntregaRepository from "../../repository/resource/EntregaRepository";

export default class EntregaNoArmazemListItemBuilder{
  #entregasQueue;
  #caminhaoRepository;
  #imageRepository;
  #armazemRepository;
  #motoristaRepository;
  #localizacaoRepository;
  #entregaListItemBuilder;
  #entregaRepository;

  constructor() {
    this.entregasQueue = new EntregasQueue();
    this.caminhaoRepository = new CaminhaoRepository();
    this.imageRepository = new ImageRepository();
    this.armazemRepository = new ArmazemRepository();
    this.motoristaRepository = new MotoristaRepository();
    this.localizacaoRepository = new LocalizacaoRepository();
    this.entregaListItemBuilder = new EntregaListItemBuilder();
    this.entregaRepository = new EntregaRepository();
  }

  async build(queueItem){
    let url = queueItem.request.url;
    let entregaItem = new EntregaNoArmazemListItem();
    entregaItem.id = 'queue::' + queueItem.id;
    entregaItem.isInQueueState = true;

    if(url.match("(queue::([0-9]*))")) {
      let entregaId = parseInt(url.match("(queue::([0-9]*))")[2]);
      let entregaQueue = await this.entregasQueue.getById(entregaId);
      let caminhaoId = entregaQueue.request.body.caminhao_id;
      let caminhao = await this.caminhaoRepository.getById(caminhaoId);
      let caminhaoImage = await this.imageRepository.getById(caminhao.image_id);
      let armazem = await this.armazemRepository.getById(queueItem.request.body.armazem_id);
      let motorista = await this.motoristaRepository.getById(queueItem.request.body.motorista_id);
      let motoristaImage = await this.imageRepository.getById(motorista.image_id);

      let localizacao = await this.localizacaoRepository.getById(armazem.localizacao_id);
      let endereco = localizacao.endereco + ', ' + localizacao.numero + '  ' + localizacao.bairro + ' - ' + localizacao.cidade.nome + '/' + localizacao.cidade.estado.nome;

      entregaItem.caminhao.nome = caminhao.nome;
      entregaItem.caminhao.placa = caminhao.placa;
      entregaItem.caminhao.image_file_name = caminhaoImage.file_name;
      entregaItem.armazem.nome = armazem.nome;
      entregaItem.armazem.localizacao = endereco;
      entregaItem.motorista.nome = motorista.nome;
      entregaItem.motorista.image_file_name = motoristaImage.file_name;
      entregaItem.envio_armazem = queueItem.date;
    }else {
      let entregaCarregandoId = parseInt(url.match("(\/entrega\/([0-9]*))")[2]);
      let entrega = await this.entregaRepository.getById(entregaCarregandoId);

      entregaItem = await this.entregaListItemBuilder.buildNoArmazemListItem(entrega)
    }

    return entregaItem;
  }
}
