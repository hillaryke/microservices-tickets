import { Message } from "node-nats-streaming";
import { Listener, Subjects, TicketUpdatedEvent } from "@itickets/common";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
   subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
   queueGroupName = queueGroupName;

   async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
      console.log('=======TUL 1=========', data);
      const { title, price } = data;

      const filterQuery = {
         id: data.id,
         version: data.version - 1
      };
      const ticket = await Ticket.findOne(filterQuery);

      console.log('==========TUL 1.1========', ticket);
      if (!ticket) {
         throw new Error('Ticket not found');
      }

      const existingTicket = await Ticket.exists({ title, price });

      if (existingTicket) {
         console.log('====== TUL --1.2 UPDATING VERSION ======');
         await Ticket.findOneAndUpdate(filterQuery,
            {
               $inc: { version: 1 }
            }
         );
      } else {
         // Update ticket given new title or price values, then save it
         ticket.set({ title, price });
         await ticket.save();
      }

      const updatedTicket = await Ticket.findById(data.id);

      console.log('=======TUL 2 FINALUPATED=========', updatedTicket);


      msg.ack();
   }
}