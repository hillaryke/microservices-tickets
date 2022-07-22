const express = require('express');

const { json } = require('body-parser');
import 'express-async-errors';
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@itickets/common";

const app = express();

app.set('trust proxy', true);


app.use(json());
app.use(cookieSession({
   signed: false,
   secure: process.env.NODE_ENV !== 'test'
}));

app.use(currentUser);

app.all('*', async () => {
   throw new NotFoundError();
});

app.use(errorHandler);

export { app };