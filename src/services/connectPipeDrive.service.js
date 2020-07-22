import fetch from 'node-fetch';
import dotenv from 'dotenv';
import Querystring from 'query-string';

export default class ConnectPipeDrive {
  constructor(path) {
    this.envs = dotenv.config().parsed;

    this.requestsUrl = this.envs.PIPEDRIVE_BASE_URL + path;
  }

  get(queryObject = {}) {
    const queryDicente = Querystring.stringify({
      api_token: this.envs.PIPEDRIVE_KEY,
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
      api_token: this.envs.PIPEDRIVE_KEY,
    });
    return fetch(`${this.requestsUrl}?${queryDicente}`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: Querystring.stringify(bodyObject),
    }).then(async (data) => {
      if (data.status === 201) {
        const result = await data.json();
        return result.success ? result.data : new Error('error na requisição');
      }
      return new Error('error na requisição');
    });
  }
}
