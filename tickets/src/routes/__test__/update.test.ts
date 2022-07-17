import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";

it('returns a 404 if the provided id does not exist', async () => {
   const id = new mongoose.Types.ObjectId().toHexString();
   const response = await request(app)
      .put(`/api/tickets/${id}`)
      .set("Cookie", global.signin())
      .send({
         title: 'concert',
         price: 20
      })
      .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
   const id = new mongoose.Types.ObjectId().toHexString();
   const response = await request(app)
      .put(`/api/tickets/${id}`)
      .send({
         title: 'concert',
         price: 20
      })
      .expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
   const response = await request(app)
      .post('/api/tickets')
      .set("Cookie", global.signin())
      .send({
         title: 'concert',
         price: 20
      })
      .expect(201);

   await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", global.signin())
      .send({
         title: 'new concert',
         price: 125
      })
      .expect(401);
});

it('returns a 400 if the user provides an invalid title or price', async () => {
   const cookie = global.signin();

   const response = await request(app)
      .post('/api/tickets')
      .set("Cookie", cookie)
      .send({
         title: 'concert',
         price: 20
      })
      .expect(201);

   await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', cookie)
      .send({
         title: '',
         price: 45
      })
      .expect(400);

   await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', cookie)
      .send({
         title: 'Concert',
         price: -24
      })
      .expect(400);
});

it('updates the ticket provided valid inputs', async () => {
   const cookie = global.signin();

   const response = await request(app)
      .post('/api/tickets')
      .set("Cookie", cookie)
      .send({
         title: 'concert',
         price: 20
      })
      .expect(201);

   const newTitle = 'new concert';
   const newPrice = 35;

   await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', cookie)
      .send({
         title: newTitle,
         price: newPrice
      })
      .expect(200);

   const ticketReponse = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .send();

   expect(ticketReponse.body.title).toEqual(newTitle);
   expect(ticketReponse.body.price).toEqual(newPrice);
});

it('publishes an event', async () => {
   const cookie = global.signin();

   const response = await request(app)
      .post('/api/tickets')
      .set("Cookie", cookie)
      .send({
         title: 'concert',
         price: 20
      })
      .expect(201);

   const newTitle = 'new concert';
   const newPrice = 35;

   await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', cookie)
      .send({
         title: newTitle,
         price: newPrice
      })
      .expect(200);

   expect(natsWrapper.client.publish).toHaveBeenCalled();
});