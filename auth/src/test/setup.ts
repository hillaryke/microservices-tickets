import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoose = require('mongoose');

import { app } from '../app';
import request from "supertest";

declare global {
    function signin(): Promise<string[]>;
}

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'asdf';

    mongo = new MongoMemoryServer();

    await mongo.start();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterEach(() => {
    jest.useRealTimers();
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongo.stop();
});

global.signin = async () => {
    const email = 'test@test.com';
    const password = 'password';

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email, password
        })
        .expect(201);

    const cookie = response.get('Set-Cookie');

    return cookie;
};