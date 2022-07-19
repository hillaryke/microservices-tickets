import request from 'supertest';
import { app } from "../../app";

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

});

it('reserves a ticket', async () => {

});