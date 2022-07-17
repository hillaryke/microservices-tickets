const mongoose = require('mongoose');

import { natsWrapper } from "./nats-wrapper";
import { app } from './app';

const start = async () => {
   if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY must be defined');
   }

   if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI must be defined');
   }

   try {
      await natsWrapper.connect('ticketing', 'laksdf', 'http://nats-svc:4222');
      natsWrapper.client.on('close', () => {
         console.log('NATS connection closed!');
         process.exit();
      });
      process.on('SIGINT', () => natsWrapper.client.close());
      process.on('SIGTERM', () => natsWrapper.client.close());

      await mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true
      });
      console.log('Tickets MongoDB Connected...');


   } catch (err) {
      console.error(err);
   }

   app.listen(3000, () => {
      console.log('Tickets listening on port 3000');
   });
};

start();