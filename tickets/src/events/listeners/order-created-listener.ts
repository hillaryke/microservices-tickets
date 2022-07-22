import { Listener, OrderCreatedEvent, Subjects } from "@itickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
   subject: Subjects.OrderCreated = Subjects.OrderCreated;
   queueGroupName = queueGroupName;

   async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
      console.log('=======OCreaE 1=========', data);

      // Find the ticket that the order is reserving
      const ticket = await Ticket.findById(data.ticket.id);

      console.log('=======OCreaE 2=========', ticket);

      // If no ticket , throw error
      if (!ticket) {
         throw new Error('Ticket not found!');
      }

      // Mark the ticket as being reserved by setting its orderId proprty
      ticket.set({ orderId: data.id });

      // Save the ticket
      await ticket.save();

      console.log('=======OCreaE 3========', ticket);

      // Emit event
      await new TicketUpdatedPublisher(this.client).publish({
         id: ticket.id,
         price: ticket.price,
         title: ticket.title,
         userId: ticket.userId,
         orderId: ticket.orderId,
         version: ticket.version,
      });

      // ack the message
      msg.ack();
   }
}