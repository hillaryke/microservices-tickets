import request from "supertest";
import { app } from "../../app";

jest.useRealTimers();

it('fails when a email does not exist is supplied', async () => {
    jest.setTimeout(10 * 1000);
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);
}, 10000);

it('fails when an incorrect password is supplied', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'passfail'
        })
        .expect(400);
});

it('responds with a cookie when given valid credentials', async () => {
    jest.setTimeout(10 * 1000);
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
}, 10000);
