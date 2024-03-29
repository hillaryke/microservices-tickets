const express = require('express');

const { json } = require('body-parser');
import 'express-async-errors';
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@itickets/common";
import { createChargeRouter } from "./routes/new";

const app = express();

app.set('trust proxy', true);


app.use(json());
app.use(cookieSession({
   signed: false,
   secure: process.env.NODE_ENV !== 'test'
}));

app.use(currentUser);
app.use(createChargeRouter);

app.all('*', async () => {
   throw new NotFoundError();
});

app.use(errorHandler);

export { app };