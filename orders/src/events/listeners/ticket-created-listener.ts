import { Message } from "node-nats-streaming";
import { Listener, Subjects, TicketCreatedEvent } from "@itickets/common";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
   subject: Subjects.TicketCreated = Subjects.TicketCreated;
   queueGroupName = 'orders-service';

   onMessage(data: TicketCreatedEvent["data"], msg: Message) {
   }
}