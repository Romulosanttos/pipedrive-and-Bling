import { MongoClient } from 'mongodb';
import CollectionDeal from './schema/deal';

export default class Mongo {
  constructor(config = {}, options = {}) {
    this.config = config.envs;
    this.options = options;
  }

  /*
 * Responsavel por iniciar o módulo
 * @returns {Promise<string>} o módulo instanciado
 */
  start() {
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.config.MONGO_URI, {
        auth: {
          user: this.config.MONGO_USERNAME,
          password: this.config.MONGO_PASSWORD,
          authSource: this.config.MONGO_AUTH,
        },
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .then((connection) => connection.db(this.config.MONGO_DATABASE))
        .then((db) => {
          CollectionDeal(db);
          resolve(this.wrapper(db));
        })
        .catch((err) => reject(err));
    });
  }

  // eslint-disable-next-line class-methods-use-this
  wrapper(dbmongo) {
    return new Proxy(dbmongo, {
      get(target, key) {
        return target[key] || target.collection(key);
      },
    });
  }
}
