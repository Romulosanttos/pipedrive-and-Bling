import searchAllDeal from './pipeDrive/searchAllDeal.job';
import insertOrdered from './bling/insertOrdered';

export default function (app) {
  // * * * * * *
  // | | | | | |
  // | | | | | day of week
  // | | | | month
  // | | | day of month
  // | | hour
  // | minute
  // second ( optional )
  if (app.envs.DEVELOPMENT === 'off') {
    searchAllDeal(app.expressInstance.databases).start();
    insertOrdered(app.expressInstance.databases).start();
  }
}
