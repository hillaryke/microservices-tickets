import { Listener, OrderCreatedEvent, Subjects } from '@itickets/common';
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
   subject: Subjects.OrderCreated = Subjects.OrderCreated;
   queueGroupName = queueGroupName;

   async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
      console.log('=======OCL-exp=========', data);

      const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
      console.log('Waiting this many milliseconds to process the job: ', delay);

      await expirationQueue.add({
         orderId: data.id
      }, {
         delay,
      });

      msg.ack();
   }
}