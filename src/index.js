import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import dotenv from 'dotenv';
import morgan from 'morgan';

import Routes from './Controllers/index';
import cronJob from './jobs/index';
import Databases from '../db/index';

class App {
  constructor() {
    this.expressInstance = express();
    this.envs = dotenv.config().parsed;

    this.expressInstance.use(cors());
    this.expressInstance.use(compression());
    this.expressInstance.use(bodyParser.urlencoded({ extended: true }));
    this.expressInstance.use(bodyParser.json());
    this.expressInstance.disable('x-powered-by');
    this.expressInstance.use('/static/', express.static('public'));
    this.expressInstance.use(morgan('tiny'));

    if (this.envs.DEVELOPMENT === 'on') {
      this.expressInstance.get('/welcome', (req, res) => {
        res.send('Welcome!');
      });
    }

    this.expressInstance = Routes(this.expressInstance);
    this.httpServer = http.createServer(this.expressInstance);
  }

  async start() {
    await Databases(this);
    const newServer = new Promise((resolve, reject) => {
      this.httpServer
        .listen(this.envs.PORT)
        .on('listening', () => resolve(this.httpServer))
        .on('error', (err) => reject(err));
    }).then((server) => {
      let address;
      if (server.address().family === 'IPv6') {
        if (server.address().address === '::') {
          address = 'localhost';
        } else {
          address = `[${server.address().address}]`;
        }
      } else {
        address = server.address().address;
      }

      return {
        host: address,
        address: server.address(),
        port: server.address().port,
        server,
      };
    });
    cronJob(this);

    return Promise.all([newServer]).then((res) => res[0]);
  }

  stop() {
    this.httpServer.close();
    return true;
  }
}

new App().start()
  .then((server) => {
    console.info(`Inicializado: http://${server.host}:${server.port}/`);
  }).catch((err) => console.error(err));

process.on('exit', () => console.info('Process exited'));

process.on('SIGINT', () => {
  console.info('(Ctrl-C) fechando processo');
  process.exit(1);
});
