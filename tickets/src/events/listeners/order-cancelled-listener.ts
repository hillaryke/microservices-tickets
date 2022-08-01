import { Listener, OrderCancelledEvent, Subjects } from "@itickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
   subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
   queueGroupName = queueGroupName;

   async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
      // Find the ticket that the order is reserving
      const ticket = await Ticket.findById(data.ticket.id);

      // If no ticket , throw error
      if (!ticket) {
         throw new Error('Ticket not found');
      }

      // Mark the ticket as not reserved by removing its orderId property
      ticket.set({ orderId: undefined });

      // Save the ticket
      await ticket.save();

      // Emit event
      new TicketUpdatedPublisher(this.client).publish({
         id: ticket.id,
         orderId: ticket.orderId,
         price: ticket.price,
         title: ticket.title,
         userId: ticket.userId,
         version: ticket.version
      });

      // ack the message
      msg.ack();
   }
}