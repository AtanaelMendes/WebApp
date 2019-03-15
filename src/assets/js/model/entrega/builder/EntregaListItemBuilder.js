import CaminhaoRepository from "../../../repository/resource/CaminhaoRepository";
import ImageRepository from "../../../repository/resource/ImageRepository";
import EntregaTalhaoRepository from "../../../repository/resource/EntregaTalhaoRepository";
import SafraCulturaTalhaoRepository from "../../../repository/resource/SafraCulturaTalhaoRepository";
import SafraCulturaRepository from "../../../repository/resource/SafraCulturaRepository";
import CulturaRepository from "../../../repository/resource/CulturaRepository";
import SafraRepository from "../../../repository/resource/SafraRepository";
import TalhaoRepository from "../../../repository/resource/TalhaoRepository";
import AreaRepository from "../../../repository/resource/AreaRepository";
import Localizacao from "../../../dbModel/Localizacao";
import MotoristaRepository from "../../../repository/resource/MotoristaRepository";
import ArmazemRepository from "../../../repository/resource/ArmazemRepository";
import LocalizacaoRepository from "../../../repository/resource/LocalizacaoRepository";
import UnidadeConversaoUtil from "../../../UnidadeConversaoUtil";
import EntregaPesagemRepository from "../../../repository/resource/EntregaPesagemRepository";
import UnidadeRepository from "../../../repository/resource/UnidadeRepository";

export default class EntregaListItemBuilder{
  #caminhaoRepository;
  #imageRepository;
  #entregaTalhaoRepository;
  #safraCulturaTalhaoRepository;
  #safraCulturaRepository;
  #culturaRepository;
  #safraRepository;
  #talhaoRepository;
  #areaRepository;
  #motoristaRepository;
  #armazemRepository;
  #localizacaoRepository;
  #entregaPesagemRepository;
  #unidadeRepository;

  constructor() {
    this.caminhaoRepository = new CaminhaoRepository();
    this.imageRepository = new ImageRepository();
    this.entregaTalhaoRepository = new EntregaTalhaoRepository();
    this.safraCulturaTalhaoRepository = new SafraCulturaTalhaoRepository();
    this.safraCulturaRepository = new SafraCulturaRepository();
    this.culturaRepository = new CulturaRepository();
    this.safraRepository = new SafraRepository();
    this.talhaoRepository = new TalhaoRepository();
    this.areaRepository = new AreaRepository();
    this.motoristaRepository = new MotoristaRepository();
    this.armazemRepository = new ArmazemRepository();
    this.localizacaoRepository = new LocalizacaoRepository();
    this.entregaPesagemRepository = new EntregaPesagemRepository();
    this.unidadeRepository = new UnidadeRepository();
  }

  async buildCarregandoListItem(entrega){
    let caminhao = await this.caminhaoRepository.getById(entrega.caminhao_id);
    let caminhaoImage = await this.imageRepository.getById(caminhao.image_id);
    let entregasTalhoes = await this.entregaTalhaoRepository.getByEntregaId(entrega.id);

    let safraCulturasTalhoes = await Promise.all(entregasTalhoes.map(async entregaTalhao => {
      let safraCulturaTalhao = await this.safraCulturaTalhaoRepository.getById(entregaTalhao.safra_cultura_talhao_id);
      let safraCultura = await this.safraCulturaRepository.getById(safraCulturaTalhao.safra_cultura_id);
      let cultura = await this.culturaRepository.getById(safraCultura.cultura_id);
      let safra = await this.safraRepository.getById(safraCultura.safra_id);
      let talhao = await this.talhaoRepository.getById(safraCulturaTalhao.talhao_id);
      let area = await this.areaRepository.getById(talhao.area_id);

      return {
        id: entregaTalhao.id,
        percentual: entregaTalhao.percentual,
        safra: cultura.nome + ' ' + safra.ano_inicio + '/' + safra.ano_fim,
        area: area.nome,
        talhao: talhao.nome,
      }
    }));

    return {
      id: entrega.id,
      inicio_carregamento: entrega.inicio_carregamento,
      caminhao: {
        id: caminhao.id,
        nome: caminhao.nome,
        placa: caminhao.placa,
        image_file_name: caminhaoImage.file_name,
      },
      safra_culturas_talhoes: safraCulturasTalhoes,
    }
  }

  async buildNoArmazemListItem(entrega){
    let caminhao = await this.caminhaoRepository.getById(entrega.caminhao_id);
    let caminhaoImage = await this.imageRepository.getById(caminhao.image_id);
    let motorista = await this.motoristaRepository.getById(entrega.motorista_id);
    let motoristaImage = await this.imageRepository.getById(motorista.image_id);
    let armazem = await this.armazemRepository.getById(entrega.armazem_id);
    let localizacao = new Localizacao(await this.localizacaoRepository.getById());

    return {
      id: entrega.id,
      envio_armazem: entrega.envio_armazem,
      caminhao: {
        nome: caminhao.nome,
        placa: caminhao.placa,
        image_file_name: caminhaoImage.file_name,
      },
      motorista: {
        nome: motorista.nome,
        image_file_name: motoristaImage.file_name,
      },
      armazem: {
        nome: armazem.nome,
        localizacao: localizacao.getFullAddress(),
      }
    }
  }

  async buildEntregueListItem(entrega){
    let unidadeConversaoUtil = new UnidadeConversaoUtil();
    let caminhao = await this.caminhaoRepository.getById(entrega.caminhao_id);
    let caminhaoImage = await this.imageRepository.getById(caminhao.image_id);
    let motorista = await this.motoristaRepository.getById(entrega.motorista_id);
    let armazem = await this.armazemRepository.getById(entrega.armazem_id);
    let entregasPesagens = await this.entregaPesagemRepository.getAllSortedByEmissaoDesc(entrega.id);
    let entregaTalhao = await this.entregaTalhaoRepository.first();
    let safraCulturaTalhao = await this.safraCulturaTalhaoRepository.getById(entregaTalhao.safra_cultura_talhao_id);
    let safraCultura = await this.safraCulturaRepository.getById(safraCulturaTalhao.safra_cultura_id);
    let safra = await this.safraRepository.getById(safraCultura.safra_id);
    let cultura = await this.culturaRepository.getById(safraCultura.cultura_id);

    let unidadeParaConversao = await this.unidadeRepository.getById(entregasPesagens[0].unidade_medida_id);
    let total_peso_liquido = 0;
    let total_peso_bruto_produto = 0;
    let total_peso_desconto = 0;

    for(let entregaPesagem of entregasPesagens){
      let entregaPesagemUnidadeMedida = await this.unidadeRepository.getById(entregaPesagem.unidade_medida_id);

      total_peso_liquido += await unidadeConversaoUtil.convert(entregaPesagemUnidadeMedida.id, unidadeParaConversao.id, parseFloat(entregaPesagem.peso_liquido));
      total_peso_bruto_produto += await unidadeConversaoUtil.convert(entregaPesagemUnidadeMedida.id, unidadeParaConversao.id, parseFloat(entregaPesagem.peso_bruto_produto));
      total_peso_desconto += await unidadeConversaoUtil.convert(entregaPesagemUnidadeMedida.id, unidadeParaConversao.id, parseFloat(entregaPesagem.peso_desconto));
    }

    let peso =  total_peso_liquido.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits:2 });

    if(total_peso_desconto > 0){
      peso += " ("
        + total_peso_bruto_produto.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits:2 })
        + " - " + total_peso_desconto.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits:2 }) + ")";
    }
    peso += " " + unidadeParaConversao.sigla;

    return {
      id: entrega.id,
      caminhao: {
        placa: caminhao.placa,
        image_file_name: caminhaoImage.file_name
      },
      motorista: motorista.nome,
      armazem: armazem.nome,
      entregue: entregasPesagens[0].emissao,
      safra: cultura.nome + " " + safra.ano_inicio + "/" + safra.ano_fim,
      peso: peso,
    }
  }
}
