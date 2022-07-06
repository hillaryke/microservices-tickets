import request from "supertest";
import { app } from "../../app";

jest.useRealTimers();

it('has a route handler listening to /api/tickets for post requests', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({});

    expect(response.status).not.toEqual(404);
});

it('returns an error if an invalid title is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .send({})
        .expect(401);

});

it('return status other than 401 if signed in', async () => {
    jest.setTimeout(10 * 1000);

    const cookie = global.signin();

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({});

    expect(response.status).not.toEqual(401);
}, 10000);

it('returns an error if an invalid title is provided', async () => {
    const cookie = await global.signin();

    await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 10
        })
        .expect(400);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            price: 10
        })
        .expect(400);
});

it('creates a ticket with invalid inputs', async () => {

});



