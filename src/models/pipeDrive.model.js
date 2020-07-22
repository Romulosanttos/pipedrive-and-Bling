import ConnectPipeDrive from '../services/connectPipeDrive.service';

export default class PipeDriveModel {
  static searchAllDeal(start = 0) {
    return new ConnectPipeDrive('/deals').get({
      status: 'won',
      start,
    }).then((data) => {
      if (data) {
        return data.map(
          ({
            // eslint-disable-next-line camelcase
            id, d3ba88aee3ed92907f7255bdff1080dc43fe7ba2, title, status, value, won_time,
          }) => ({
            id,
            created_at: new Date(),
            bling_send: false,
            official_document: d3ba88aee3ed92907f7255bdff1080dc43fe7ba2,
            title,
            status,
            value,
            won_time: new Date(won_time),
          }),
        );
      }
      return data;
    });
  }
}
