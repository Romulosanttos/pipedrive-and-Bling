import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  const { mongo } = req.databases;
  return mongo.deal.find({}).toArray().then((deals) => res.status(200).json(deals));
});

router.get('/reports', (req, res) => {
  const { mongo } = req.databases;
  return mongo.deal.aggregate([
    {
      $group:
      {
        _id: '$created_at',
        totalAmount: { $sum: '$value' },
        count: { $sum: 1 },
      },
    },
    { $sort: { count: 1 } },
  ]).toArray().then((deals) => res.status(200).json(deals));
});

export default router;
