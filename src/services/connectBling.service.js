import fetch from 'node-fetch';
import dotenv from 'dotenv';
import Querystring from 'query-string';

export default class ConnectBling {
  constructor(path) {
    this.envs = dotenv.config().parsed;

    this.requestsUrl = this.envs.BLING_URL + path;
  }

  get(queryObject = {}) {
    const queryDicente = Querystring.stringify({
      apikey: this.envs.BLING_KEY,
      ...queryObject,
    });
    return fetch(`${this.requestsUrl}?${queryDicente}`, {
      method: 'get',
      headers: {
        Accept: 'application/json',
      },
    }).then(async (data) => {
      if (data.status === 200) {
        const result = await data.json();
        return result.success ? result.data : new Error('error na requisição');
      }
      return new Error('error na requisição');
    });
  }

  post(bodyObject = {}) {
    const queryDicente = Querystring.stringify({
      apikey: this.envs.BLING_KEY,
    });

    const requestsUrl = (bodyObject.xml) ? `${this.requestsUrl}?${queryDicente}&xml=${bodyObject.xml}` : `${this.requestsUrl}?${queryDicente}`;
    return fetch(requestsUrl, {
      method: 'post',
    }).then(async (data) => {
      const result = await data.json();
      if (result.retorno && !result.retorno.erros) {
        return result.retorno;
      }
      throw new Error(result.retorno.erros[0].erro.msg);
    });
  }
}
