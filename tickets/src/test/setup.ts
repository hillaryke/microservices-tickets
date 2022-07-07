import { MongoMemoryServer } from 'mongodb-memory-server';
import jwt from 'jsonwebtoken';

const mongoose = require('mongoose');

declare global {
   function signin(): string[];
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

global.signin = () => {
   // Build a JWT payload. { id, email }
   const payload = {
      id: new mongoose.Types.ObjectId().toHexString(),
      email: 'test@test.com'
   };

   // Create the JWT!
   const token = jwt.sign(payload, process.env.JWT_KEY!);

   // Build a session object { jwt: MY_JWT }
   const session = { jwt: token };

   // Turn that session into JSON
   const sessionJSON = JSON.stringify(session);

   // Take JSON and encode it as base64
   const base64 = Buffer.from(sessionJSON).toString('base64');

   // return a string thats the cookie with the encoded data
   return [`session=${base64}`];
};