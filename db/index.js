import Mongo from './mongo/mongoConnect';

class StartDbs {
  constructor({ expressInstance, envs }) {
    this.app = expressInstance;
    this.envs = envs;
  }

  mongoDB() {
    return new Mongo(this).start().then((res) => ({ mongo: res }));
  }

  async instance() {
    const mongo = await this.mongoDB();
    this.app.databases = {
      ...mongo,
    };
    this.app.request.databases = {
      ...mongo,
    };
    return this.app;
  }
}

export default async (app) => new StartDbs(app).instance();
