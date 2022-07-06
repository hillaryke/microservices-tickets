const express = require('express');
import 'express-async-errors';
import { errorHandler, NotFoundError } from "@itickets/common";

const { json } = require('body-parser');
import cookieSession from "cookie-session";

const app = express();

app.set('trust proxy', true);

app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };