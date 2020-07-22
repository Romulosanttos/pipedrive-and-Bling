import baseInicial from './base/inicial';
import salesOrders from './salesOrders/index';

class Routers {
  constructor(app) {
    this.app = app;
  }

  instance() {
    this.app.use('/', baseInicial);
    this.app.use('/salesOrders', salesOrders);
    return this.app;
  }
}

export default (app) => new Routers(app).instance();
