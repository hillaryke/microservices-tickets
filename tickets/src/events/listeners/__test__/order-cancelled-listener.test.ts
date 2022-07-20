const mongoose = require("mongoose");
import { OrderCancelledEvent } from "@itickets/common";
import { OrderCancelledListener } from "../order-cancelled-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";
import { Message } from "node-nats-streaming";

const setup = async () => {
   const listener = new OrderCancelledListener(natsWrapper.client);

   const orderId = mongoose.Types.ObjectId().toHexString();
   const ticket = Ticket.build({
      title: 'concert',
      price: 20,
      userId: 'ljfadfd'
   });
   ticket.set({ orderId });
   await ticket.save();

   const data: OrderCancelledEvent['data'] = {
      id: orderId,
      version: 0,
      ticket: {
         id: ticket.id
      }
   };

   // @ts-ignore
   const msg: Message = {
      ack: jest.fn()
   };

   return { listener, data, ticket, msg, orderId };
};

it('updates the ticket', async () => {
   const { listener, ticket, data, msg } = await setup();

   await listener.onMessage(data, msg);

   const updatedTicket = await Ticket.findById(ticket.id);
   expect(updatedTicket!.orderId).not.toBeDefined();
});

it('acks the message', async () => {
   const { listener, data, msg } = await setup();

   await listener.onMessage(data, msg);

   expect(msg.ack).toHaveBeenCalled();
});

it('publishes an event', async () => {
   const { listener, data, msg } = await setup();

   await listener.onMessage(data, msg);

   expect(natsWrapper.client.publish).toHaveBeenCalled();

   const ticketUpdatedData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);
   expect(ticketUpdatedData.orderId).not.toBeDefined();
});