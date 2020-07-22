import { CronJob } from 'cron';
import blingModel from '../../models/bling.model';

export default function name({ mongo }) {
  return new CronJob('*/60 * * * * *', (async () => {
    try {
      const negotiationNotSent = await mongo.deal.find({ bling_send: false }).toArray();
      if (negotiationNotSent.length > 0) {
        const newOrdered = await blingModel.insertOrdered(negotiationNotSent);
        console.log('enviado para bling', newOrdered);
        mongo.deal.updateMany({ bling_send: false }, { $set: { bling_send: true } });
      }
    } catch (error) {
      throw new Error(error);
    }
  }), null, null, 'America/Sao_Paulo');
}
