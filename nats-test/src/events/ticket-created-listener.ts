import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";

export class TicketCreatedListener extends Listener {
   subject = 'ticket:created';
   queueGroupName = 'payment-service';
   onMessage = (data: any, msg: Message) => {
      console.log('Now Doing something', data);

      msg.ack();
   };
}