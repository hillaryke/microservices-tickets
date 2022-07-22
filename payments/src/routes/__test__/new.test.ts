const mongoose = require('mongoose');
import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/order";
import { OrderStatus } from "@itickets/common";

const { ObjectId } = require("mongodb");

it('returns a 404 when purchasing on order that does not exist', async () => {
   await request(app)
      .post('/api/payments')
      .set('Cookie', global.signin())
      .send({
         token: 'asdlfasdf',
         orderId: mongoose.Types.ObjectId().toHexString()
      })
      .expect(404);
});

it('returns a 401 when purchasing an order that doesn\'t belong to the user', async () => {
   const order = Order.build({
      id: mongoose.Types.ObjectId().toHexString(),
      price: 10,
      status: OrderStatus.Created,
      userId: mongoose.Types.ObjectId().toHexString(),
      version: 0
   });
   await order.save();

   await request(app)
      .post('/api/payments')
      .set('Cookie', global.signin())
      .send({
         token: 'asdlfasdf',
         orderId: order.id
      })
      .expect(401);
});

it('returns a 400 when purchasing a cancelled order with same user', async () => {
   const userId = mongoose.Types.ObjectId().toHexString();

   const order = Order.build({
      id: mongoose.Types.ObjectId().toHexString(),
      price: 10,
      status: OrderStatus.Cancelled,
      version: 0,
      userId
   });
   await order.save();

   console.log(order);

   await request(app)
      .post('/api/payments')
      .set("Cookie", global.signin(userId))
      .send({
         orderId: order.id,
         token: 'ajflkasdjf'
      })
      .expect(400);
});
