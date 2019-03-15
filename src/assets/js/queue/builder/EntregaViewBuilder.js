import EntregasQueue from "../EntregasQueue";
import UnidadeConversaoUtil from "../../UnidadeConversaoUtil";
import CaminhaoRepository from "../../repository/resource/CaminhaoRepository";
import SafraCulturaTalhaoRepository from "../../repository/resource/SafraCulturaTalhaoRepository";
import ImageRepository from "../../repository/resource/ImageRepository";
import AreaRepository from "../../repository/resource/AreaRepository";
import SafraRepository from "../../repository/resource/SafraRepository";
import SafraCulturaRepository from "../../repository/resource/SafraCulturaRepository";
import CulturaRepository from "../../repository/resource/CulturaRepository";
import TalhaoRepository from "../../repository/resource/TalhaoRepository";
import EntregaViewRepository from "../../repository/list/EntregaViewRepository";
import UnidadeRepository from "../../repository/resource/UnidadeRepository";
import ArmazemRepository from "../../repository/resource/ArmazemRepository";
import MotoristaRepository from "../../repository/resource/MotoristaRepository";
import CfopRepository from "../../repository/resource/CfopRepository";
import NotaFiscalSerieRepository from "../../repository/resource/NotaFiscalSerieRepository";
import NegocioCulturaRepository from "../../repository/resource/NegocioCulturaRepository";
import NegocioRepository from "../../repository/resource/NegocioRepository";
import TipoNegocioRepository from "../../repository/resource/TipoNegocioRepository";
import PessoaRepository from "../../repository/resource/PessoaRepository";
import NegocioCulturaArmazemRepository from "../../repository/resource/NegocioCulturaArmazemRepository";
import ClassificacaoRepository from "../../repository/resource/ClassificacaoRepository";

export default class EntregaViewBuilder{
  #entregasQueue;
  #caminhaoRepository;
  #safraCulturaTalhaoRepository;
  #imageRepository;
  #areaRepository;
  #safraRepository;
  #safraCulturaRepository;
  #culturaRepository;
  #talhaoRepository;
  #unidadeRepository;
  #armazemRepository;
  #motoristaRepository;
  #cfopRepository;
  #notaFiscalSerieRepository;
  #negocioCulturaRepository;
  #negocioRepository;
  #tipoNegocioRepository;
  #pessoaRepository;
  #negocioCulturaArmazemRepository;
  #classificacaoRepository;
  #entregaViewRepository;

  constructor() {
    this.entregasQueue = new EntregasQueue();
    this.caminhaoRepository = new CaminhaoRepository();
    this.safraCulturaTalhaoRepository = new SafraCulturaTalhaoRepository();
    this.imageRepository = new ImageRepository();
    this.areaRepository = new AreaRepository();
    this.safraRepository = new SafraRepository();
    this.safraCulturaRepository = new SafraCulturaRepository();
    this.culturaRepository = new CulturaRepository();
    this.talhaoRepository = new TalhaoRepository();
    this.unidadeRepository = new UnidadeRepository();
    this.armazemRepository = new ArmazemRepository();
    this.motoristaRepository = new MotoristaRepository();
    this.cfopRepository = new CfopRepository();
    this.notaFiscalSerieRepository = new NotaFiscalSerieRepository();
    this.negocioCulturaRepository = new NegocioCulturaRepository();
    this.negocioRepository = new NegocioRepository();
    this.tipoNegocioRepository = new TipoNegocioRepository();
    this.pessoaRepository = new PessoaRepository();
    this.negocioCulturaArmazemRepository = new NegocioCulturaArmazemRepository();
    this.classificacaoRepository = new ClassificacaoRepository();
    this.entregaViewRepository = new EntregaViewRepository();
  }

  async build(queueId){
    let entregaQueue = await this.entregasQueue.getById(queueId);

    let entrega = {
      id: entregaQueue.id,
    };

    switch (entregaQueue.type) {
      case EntregasQueue.NOVA_ENTREGA:
        entrega.status = 'Carregando';
        var entregaCarregandoQueue = entregaQueue;

        entrega = Object.assign(entrega, await this.montaCarregandoByQueue(entregaCarregandoQueue));
        break;
      case EntregasQueue.ENVIAR_PARA_ARMAZEM:
        entrega.status = 'No Armazem';
        var entregaNoArmazemQueue = entregaQueue;

        entrega = Object.assign(entrega, await this.montaNoArmazemByQueue(entregaNoArmazemQueue, entrega));
        break;
      case EntregasQueue.INFORMAR_PESAGEM:
        entrega.status = 'Entregue';
        var entregaEntregueQueue = entregaQueue;
        let negocioCulturaUnidadeMedida = null;

        if(entregaEntregueQueue.request.url.match("(queue::([0-9]*))")){
          //Entrega no armazem é uma queue
          let entregaNoArmazemQueueId = parseInt(entregaEntregueQueue.request.url.match("(queue::([0-9]*))")[2]);
          var entregaNoArmazemQueue = await this.entregasQueue.getById(entregaNoArmazemQueueId);

          entrega = Object.assign(entrega, await this.montaNoArmazemByQueue(entregaNoArmazemQueue, entrega));

          let negocioCultura = await this.negocioCulturaRepository.getById(entregaNoArmazemQueue.request.body.negocio_cultura_id);
          negocioCulturaUnidadeMedida = await this.unidadeRepository.getById(negocioCultura.unidade_medida_id);
        }else{
          let entregaNoArmazemQueueId = parseInt(entregaEntregueQueue.request.url.match("(\/entrega\/([0-9]*))")[2]);
          var entregaView = await this.entregaViewRepository.get(entregaNoArmazemQueueId);

          entrega = Object.assign(entregaView, entrega);
          negocioCulturaUnidadeMedida = await this.unidadeRepository.getById(entrega.negocios[0].negocio_cultura.unidade_medida.id);
        }

        let pesagemUnidadeMedida = await this.unidadeRepository.getById(entregaEntregueQueue.request.body.unidade_medida_id);

        entrega.entregue = entregaEntregueQueue.request.body.emissao;
        entrega.pesagens = [{
          id: -1,
          peso_bruto_total: entregaEntregueQueue.request.body.peso_bruto_total,
          peso_tara: entregaEntregueQueue.request.body.peso_tara,
          peso_bruto_produto: entregaEntregueQueue.request.body.peso_bruto_produto,
          peso_desconto: entregaEntregueQueue.request.body.peso_desconto,
          peso_liquido: entregaEntregueQueue.request.body.peso_liquido,
          peso_bruto_produto_convertido: await new UnidadeConversaoUtil().convert(pesagemUnidadeMedida.id, negocioCulturaUnidadeMedida.id, entregaEntregueQueue.request.body.peso_bruto_produto),
          peso_desconto_convertido: await new UnidadeConversaoUtil().convert(pesagemUnidadeMedida.id, negocioCulturaUnidadeMedida.id, entregaEntregueQueue.request.body.peso_desconto),
          peso_liquido_convertido: await new UnidadeConversaoUtil().convert(pesagemUnidadeMedida.id, negocioCulturaUnidadeMedida.id, entregaEntregueQueue.request.body.peso_liquido),

          emissao: entregaEntregueQueue.request.body.emissao,
          numero_ticket: entregaEntregueQueue.request.body.numero_ticket,
          unidade_medida_sigla: null,
          classificacoes: await Promise.all(entregaEntregueQueue.request.body.classificacoes.map(async classificacao => {
            let classificacaoDb = await this.classificacaoRepository.getById(classificacao.classificacao_id);
            return {
              id: classificacaoDb.id,
              nome: classificacaoDb.nome,
              verificado: classificacao.verificado,
              desconto: classificacao.peso_desconto,
              desconto_convertido: await new UnidadeConversaoUtil().convert(pesagemUnidadeMedida.id, negocioCulturaUnidadeMedida.id, classificacao.peso_desconto),
            }
          }))
        }];

        break;
    }

    return entrega;
  }

  async getCaminhaoById(id){
    let caminhao = await this.caminhaoRepository.getById(id);
    let unidade = await this.unidadeRepository.getById(caminhao.unidade_medida_id);
    let caminhaoImagem = await this.imageRepository.getById(caminhao.image_id);

    return {
      id: caminhao.id,
      nome: caminhao.nome,
      placa: caminhao.placa,
      estimativa_carga: caminhao.pbt - caminhao.tara,
      unidade_medida_sigla: unidade.sigla,
      image_file_name: caminhaoImagem.file_name,
    }
  }

  async getSafraCulturaBySafraCulturaTalhao(id, caminhao){
    let caminhaoUnidadeMedida = await this.unidadeRepository.getById(caminhao.unidade_medida_id);
    let safraCulturaTalhao = await this.safraCulturaTalhaoRepository.getById(id);
    let safraCultura = await this.safraCulturaRepository.getById(safraCulturaTalhao.safra_cultura_id);
    let safraCulturaUnidade = await this.unidadeRepository.getById(safraCultura.view_unidade_medida_id);
    let cultura = await this.culturaRepository.getById(safraCultura.cultura_id);
    let culturaImagem = await this.imageRepository.getById(cultura.image_id);
    let safra = await this.safraRepository.getById(safraCultura.safra_id);
    let quantidade = await new UnidadeConversaoUtil().convert(caminhaoUnidadeMedida.id, safraCultura.view_unidade_medida_id, caminhao.estimativa_carga);
    let talhao = await this.talhaoRepository.getById(safraCulturaTalhao.talhao_id);
    let talhaoImagem = await this.imageRepository.getById(talhao.image_id);
    let area = await this.areaRepository.getById(talhao.area_id);

    let talhoes = [
      {
        id: -1,
        percentual: 100,
        quantidade: quantidade,
        talhao: {
          nome: talhao.nome,
          area: area.nome,
          image_file_name: talhaoImagem.file_name,
        },
        safra_cultura_talhao: {
          id: safraCulturaTalhao.id
        }
      }
    ];

    return {
      id: safraCultura.id,
      view_unidade_medida: {
        id: safraCulturaUnidade.id,
        sigla: safraCulturaUnidade.sigla,
      },
      cultura: {
        nome: cultura.nome,
        image_file_name: culturaImagem.file_name,
      },
      safra: {
        ano_inicio: safra.ano_inicio,
        ano_fim: safra.ano_fim,
      },
      talhoes: talhoes,
    };
  }

  async getMotoristaById(id){
    let motorista = await this.motoristaRepository.getById(id);
    let motoristaImage = await this.imageRepository.getById(motorista.image_id);

    return {
      id: motorista.id,
      nome: motorista.nome,
      image_file_name: motoristaImage.file_name,
    };
  }

  async getArmazemById(id){
    let armazem = await this.armazemRepository.getById(id);
    return {nome: armazem.nome}
  }

  async getNegociosByEntregaNoArmazemQueue(entregaNoArmazemQueue){
    let cfop = await this.cfopRepository.getById(entregaNoArmazemQueue.request.body.nota_fiscal.cfop_id);
    let notaFiscalSerie = await this.notaFiscalSerieRepository.getById(entregaNoArmazemQueue.request.body.nota_fiscal.nota_fiscal_serie_id);
    let negocioCultura = await this.negocioCulturaRepository.getById(entregaNoArmazemQueue.request.body.negocio_cultura_id);
    let negocioCulturaUnidadeMedida = await this.unidadeRepository.getById(negocioCultura.unidade_medida_id);
    let negocio = await this.negocioRepository.getById(negocioCultura.negocio_id);
    let pessoaNegocio = await this.pessoaRepository.getById(negocio.pessoa_id);
    let tipoNegocio = await this.tipoNegocioRepository.getById(negocio.tipo_negocio_id);
    let negocioCulturaArmazens = await this.negocioCulturaArmazemRepository.getAllByNegocioCultura(negocioCultura.id);
    let negocioCulturaSafraCultura = await this.safraCulturaRepository.getById(negocioCultura.safra_cultura_id);
    let negocioCulturaSafraCulturaCultura = await this.culturaRepository.getById(negocioCulturaSafraCultura.cultura_id);

    return [{
      id: -1,
      //quantidade: quantidade,
      notas_fiscais_itens: [{
        id: -1,
        quantidade: entregaNoArmazemQueue.request.body.nota_fiscal.peso,
        valor_unitario: entregaNoArmazemQueue.request.body.nota_fiscal.valor_unitario,
        valor_total: entregaNoArmazemQueue.request.body.nota_fiscal.valor_total,
        nota_fiscal_emissao: entregaNoArmazemQueue.request.body.nota_fiscal.emissao,
        cfop: {
          id: cfop.id,
          numero: cfop.numero,
          descricao: cfop.descricao,
        },
        nota_fiscal:{
          numero: entregaNoArmazemQueue.request.body.nota_fiscal.numero,
          emissao: entregaNoArmazemQueue.request.body.nota_fiscal.emissao,
          nota_fiscal_serie:{
            id: notaFiscalSerie.id,
            nome: notaFiscalSerie.nome,
            serie: notaFiscalSerie.serie,
          }
        }
      }],
      negocio_cultura: {
        id: negocioCultura.id,
        quantidade: negocioCultura.quantidade,
        unidade_medida: {
          id: negocioCulturaUnidadeMedida.id,
          sigla: negocioCulturaUnidadeMedida.sigla
        },
        prazo_entrega_final: negocioCultura.prazo_entrega_final,
        negocio: {
          id: negocio.id,
          pessoa: pessoaNegocio.nome,
          tipo: tipoNegocio.nome,
          emissao: negocio.emissao,
          numero_pedido: negocio.numero_pedido,
          numero_contrato: negocio.numero_contrato,
        },
        armazens: [{
          id: negocioCulturaArmazens.map(armazem => {return armazem.id}),
        }],
        safra_cultura: {
          id: negocioCulturaSafraCultura.id,
          cultura:{
            id: negocioCulturaSafraCulturaCultura.id,
            default_unidade_pesagem_id: negocioCulturaSafraCulturaCultura.default_unidade_pesagem_id
          }
        }
      }
    }];
  }

  async montaCarregandoByQueue(entregaCarregandoQueue){
    var caminhao = await this.caminhaoRepository.getById(entregaCarregandoQueue.request.body.caminhao_id);
    return{
      caminhao: await this.getCaminhaoById(caminhao.id),
      safra_cultura: await this.getSafraCulturaBySafraCulturaTalhao(entregaCarregandoQueue.request.body.safra_cultura_talhao_id, caminhao)
    }
  }

  async montaNoArmazemByQueue(entregaNoArmazemQueue, entrega){
    if(entregaNoArmazemQueue.request.url.match("(queue::([0-9]*))")){
      let entregaCarregandoQueueId = parseInt(entregaNoArmazemQueue.request.url.match("(queue::([0-9]*))")[2]);
      let entregaCarregandoQueue = await this.entregasQueue.getById(entregaCarregandoQueueId);
      entrega.inicio_carregamento = entregaCarregandoQueue.date;
      entrega = Object.assign(entrega, await this.montaCarregandoByQueue(entregaCarregandoQueue));
      entrega.motorista = await this.getMotoristaById(entregaNoArmazemQueue.request.body.motorista_id);
    }else{
      let entregaViewId = parseInt(entregaNoArmazemQueue.request.url.match("(\/entrega\/([0-9]*))")[2]);
      var entregaView = await this.entregaViewRepository.get(entregaViewId);

      entrega = Object.assign(entregaView, entrega)
    }

    entrega.envio_armazem = entregaNoArmazemQueue.date;

    entrega.armazem = await this.getArmazemById(entregaNoArmazemQueue.request.body.armazem_id);
    entrega.negocios = await this.getNegociosByEntregaNoArmazemQueue(entregaNoArmazemQueue);
    entrega.negocios[0].quantidade = entrega.safra_cultura.talhoes[0].quantidade;

    return entrega;
  }
}
