import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";

jest.useRealTimers();

it('has a route handler listening to /api/tickets for post requests', async () => {
   const response = await request(app)
      .post('/api/tickets')
      .send({});

   expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
   await request(app)
      .post('/api/tickets')
      .send({})
      .expect(401);
});

it('return a status other than 401 if user is signed in', async () => {
   jest.setTimeout(10 * 1000);
   const cookie = global.signin();
   const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({});

   expect(response.status).not.toEqual(401);
}, 10000);

it('returns an error if an invalid title is provided', async () => {
   await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({
         title: '',
         price: 10
      })
      .expect(400);

   await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({
         price: 10
      })
      .expect(400);
});

it('returns an error if an invalid price is provided', async () => {
   await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({
         title: 'AldjandD',
         price: -10
      })
      .expect(400);

   await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({
         title: 'AldjandD',
      })
      .expect(400);
});

it('creates a ticket with valid inputs', async () => {
   let tickets = await Ticket.find({});
   expect(tickets.length).toEqual(0);

   const title = 'NewTIcket';

   await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({
         title,
         price: 20
      })
      .expect(201);

   tickets = await Ticket.find({});
   expect(tickets.length).toEqual(1);
   expect(tickets[0].price).toEqual(20);
   expect(tickets[0].title).toEqual(title);
});

it('publishes an event', async () => {

   const title = 'NewTIcket';

   await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({
         title,
         price: 20
      })
      .expect(201);

   expect(natsWrapper.client.publish).toHaveBeenCalled();
});



