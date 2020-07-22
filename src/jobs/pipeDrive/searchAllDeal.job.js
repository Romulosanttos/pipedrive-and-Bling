import { CronJob } from 'cron';
import pipeDriveModel from '../../models/pipeDrive.model';

export default function name({ mongo }) {
  return new CronJob('*/60 * * * * *', (async () => {
    try {
      let [startNumber] = await mongo.deal.find({}).sort({ id: -1 }).limit(1).toArray();
      startNumber = (startNumber && startNumber.id) ? startNumber.id : 0;

      const newDeal = await pipeDriveModel.searchAllDeal(startNumber);
      if (newDeal) {
        await mongo.deal.insertMany(newDeal).then(() => {
          console.log('inserindo novos pedidos');
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }), null, null, 'America/Sao_Paulo');
}
