const express = require('express');
import 'express-async-errors';
import { errorHandler, NotFoundError } from "@itickets/common";

const { json } = require('body-parser');
import cookieSession from "cookie-session";

const { currentUserRouter } = require('./routes/current-user');
const { signinRouter } = require('./routes/signin');
const { signoutRouter } = require('./routes/signout');
const { signupRouter } = require('./routes/signup');

const app = express();

app.set('trust proxy', true);

app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };