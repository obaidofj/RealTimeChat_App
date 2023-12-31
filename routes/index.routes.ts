// @ts-nocheck
// to be able to deploy successfully to ecs and ec2
import express from 'express';

const router = express.Router();



router.get('/', (req, res, next) => {
  console.log(req.cookies);

  let name = "";
  if (req.cookies['fullName']) {
    name = req.cookies['fullName'];
  }

  res.send(`{msg: Hi ${name ? 'Mr/Ms' : 'you are not logged in , Please login'} ${name}, app: 'RealTimeChat'}`);
});

export default router;
