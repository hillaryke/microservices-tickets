import request from 'supertest';
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { OrderStatus } from "@itickets/common";
import { Order } from "../../models/order";
import { natsWrapper } from "../../nats-wrapper";

const mongoose = require('mongoose');

jest.useRealTimers();

// TODO add tests for auth

it('returns an error if the ticket does not exist', async () => {
   const ticketId = mongoose.Types.ObjectId();

   await request(app)
      .post('/api/orders')
      .set('Cookie', global.signin())
      .send({ ticketId })
      .expect(404);
});

it('returns an error if the ticket is already reserved', async () => {
   const ticket = Ticket.build({
      title: 'concert',
      price: 40
   });
   await ticket.save();

   const order = Order.build({
      ticket,
      userId: 'lasdkjlfjasdljf',
      status: OrderStatus.Created,
      expiresAt: new Date()
   });
   await order.save();

   await request(app)
      .post('/api/orders')
      .set('Cookie', global.signin())
      .send({ ticketId: ticket.id })
      .expect(400);
});

it('reserves a ticket', async () => {
   const ticket = Ticket.build({
      title: 'concert',
      price: 30
   });
   await ticket.save();

   const response = await request(app)
      .post('/api/orders')
      .set('Cookie', global.signin())
      .send({ ticketId: ticket.id })
      .expect(201);

   const savedOrder = await Order.findById(response.body.id).populate('ticket');
   expect(savedOrder?.ticket.id).toEqual(ticket.id);
});

it('emits an order created event', async () => {
   const ticket = Ticket.build({
      title: 'concert',
      price: 30
   });
   await ticket.save();

   const response = await request(app)
      .post('/api/orders')
      .set('Cookie', global.signin())
      .send({ ticketId: ticket.id })
      .expect(201);

   expect(natsWrapper.client.publish).toHaveBeenCalled();
});
