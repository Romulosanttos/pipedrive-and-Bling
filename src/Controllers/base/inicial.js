import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  console.log('receiver:', Date.now());
  res.sendStatus(200);
});

export default router;
