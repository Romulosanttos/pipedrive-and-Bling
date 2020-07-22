# api_base

## requisitos

  1. Credenciais Contas Utilizadas
     * [se encontra aqui](ACCOUNTS.md)
  1. Node.js (LTS) Version: 12.18.0 (includes npm 6.14.4)
     * https://nodejs.org/en/download/
  1. docker ce Version: 19.03
     * https://docs.docker.com/install/ 
  1. docker compose Version: 1.25.4
     * https://docs.docker.com/compose/install/

_____________________________________________

## instruções utilizando Pm2

- executar na raiz do projeto
  >  `npm i -g pm2` 
  >  `pm2 start ecosystem.config.js` 
  
_____________________________________________

## instruções utilizando docker-compose

- arquivo para instalação em distribuições Red Hat 
   > [instalar docker e executar docker-compose](fedora-install-docker-and-run.sh)

- instalar docker e docker-compose

- executar na raiz do projeto
  >   `docker build --pull --rm -f "Dockerfile" -t api_base:latest "."`

  >   `docker-compose -f "docker-compose.yml" up -d --build`

## links

- obs:
   > `utiliza proxy no docker subnet 192.168.2.0/24`
  
1. Servidor Node.js
   * host: 192.168.2.2:8080
1. Servidor MongoDB 
   * host: 192.168.1.3:27017
   * user: root
   * password: example

_____________________________________________

## variáveis [(.env)](.env)

- obs:
   > `já está com configuração previa para funcionar com docker`

* APP_NAME=base
* DEVELOPMENT=off
* DOMAIN=localhost
* PORT=8080

1. Mongo *variaveis de conexão*
    * MONGO_USERNAME=
    * MONGO_PASSWORD=
    * MONGO_URI=
    * MONGO_AUTH=
    * MONGO_DATABASE=

1. pipeDrive *Credenciais e URL da api*
    * PIPEDRIVE_BASE_URL=
    * PIPEDRIVE_KEY=

1. Bling *Credenciais e URL da api*
    * BLING_URL=
    * BLING_KEY=