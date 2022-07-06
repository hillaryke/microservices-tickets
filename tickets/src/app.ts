const express = require('express');
const { json } = require('body-parser');
import 'express-async-errors';
import cookieSession from "cookie-session";

import { errorHandler, NotFoundError } from "@itickets/common";
import { createTicketRouter } from "./routes/new";

const app = express();

app.set('trust proxy', true);

app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));

app.use(createTicketRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };