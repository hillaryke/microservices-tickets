import nats, { Message, Stan } from 'node-nats-streaming';
import { randomBytes } from "crypto";

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
   url: 'http://localhost:4222'
});

stan.on('connect', () => {
   console.log('Listener connected to NATS');

   stan.on('close', () => {
      console.log('NATS connection closed');
      process.exit();
   });

   new TicketCreatedListener(stan).listen();
});

process.on('SIGNINT', () => stan.close());
process.on('SIGTERM', () => stan.close());


abstract class Listener {
   abstract subject: string;
   abstract queueGroupName: string;

   abstract onMessage(data: any, msg: Message): void;

   private client: Stan;
   protected ackWait = 5 * 1000;

   constructor(client: Stan) {
      this.client = client;
   }

   subscriptionOptions() {
      return this.client
         .subscriptionOptions()
         .setDeliverAllAvailable()
         .setManualAckMode(true)
         .setAckWait(this.ackWait)
         .setDurableName(this.queueGroupName);
   }

   listen() {
      const subscription = this.client.subscribe(
         this.subject,
         this.queueGroupName,
         this.subscriptionOptions()
      );

      subscription.on('message', (msg: Message) => {
         console.log(
            `Message Recieved: ${this.subject} / ${this.queueGroupName}`
         );

         const parseData = this.parseMessage(msg);
         this.onMessage(parseData, msg);
      });
   }

   parseMessage(msg: Message) {
      const data = msg.getData();

      // if string or buffer
      return typeof data === 'string'
         ? JSON.parse(data)
         : JSON.parse(data.toString('utf8'));

   }
}

class TicketCreatedListener extends Listener {
   subject = 'ticket:created';
   queueGroupName = 'payment-service';
   onMessage = (data: any, msg: Message) => {
      console.log('Now Doing something', data);

      msg.ack();
   };
}