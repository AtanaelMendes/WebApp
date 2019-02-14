export default class SafraCulturaTalhaoItem {
  id = null;
  cultivar = {
    id: null,
    nome: null,
    marca: {
      id: null,
      nome: null,
      image_file_name: null,
    },
  };
  talhao = {
    id: null,
    nome: null,
    area: {
      id: null,
      nome: null,
      image_file_name: null,
    },
  };


  constructor(safraCulturaTalhao) {
    this.id = safraCulturaTalhao.id;
    this.talhao = {
      id: safraCulturaTalhao.talhao.id,
      nome: safraCulturaTalhao.talhao.nome,
      image_file_name: safraCulturaTalhao.talhao.image_file_name,
      area: {
        id: safraCulturaTalhao.talhao.area.id,
        nome: safraCulturaTalhao.talhao.area.nome,
        image_file_name: safraCulturaTalhao.talhao.area.image_file_name,
      },
    };
    if(safraCulturaTalhao.cultivar !== null && safraCulturaTalhao.cultivar !== undefined) {
      this.cultivar = {
        id: safraCulturaTalhao.cultivar.id,
        nome: safraCulturaTalhao.cultivar.nome,
        marca: {
          id: safraCulturaTalhao.cultivar.marca.id,
          nome: safraCulturaTalhao.cultivar.marca.nome,
          image_file_name: safraCulturaTalhao.cultivar.marca.image_file_name,
        },
      };
    }
  }
}
