import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";

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

});

it('updates the ticket provided valid inputs', async () => {

});