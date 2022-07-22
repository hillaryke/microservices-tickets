import { Message } from "node-nats-streaming";
import { Listener, Subjects, TicketCreatedEvent } from "@itickets/common";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
   subject: Subjects.TicketCreated = Subjects.TicketCreated;
   queueGroupName = queueGroupName;

   async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
      console.log('=======TCL 1=========', data);

      const { id, title, price } = data;
      const ticket = Ticket.build({
         id,
         title,
         price
      });
      await ticket.save();
      console.log('=======TCL 2=========', ticket);


      msg.ack();
   }
}