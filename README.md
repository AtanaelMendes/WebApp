# AgroProject
### Instalação após clonar o repositório

Levante o container com o comando
```sh
$ ./start
```

Acesse o shell do container
```sh
$ ./shell app
```

Instale as dependências do projeto com o comando dentro do container
```sh
$ npm install
```

### Pronto!
Agora saia do container e execute o comando abaixo para iniciar a aplicação
```sh
$ ./run
```
Após alguns segundos a apicalção já estará rodando no endereço `http://localhost:9090/`
