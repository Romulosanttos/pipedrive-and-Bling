FROM node:lts

# Criando diretorio para aplicações
RUN mkdir -p /home/app/]
WORKDIR /home/app/

# Copiando arquivos
COPY . .
COPY package.json yarn.lock ./
RUN yarn global add nodemon sucrase
RUN yarn

EXPOSE 8080

CMD [ "yarn","run","dev"]
