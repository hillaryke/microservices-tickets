const express = require('express');
import 'express-async-errors';

const { json } = require('body-parser');
const mongoose = require('mongoose');

const { currentUserRouter } = require('./routes/current-user');
const { signinRouter } = require('./routes/signin');
const { signoutRouter } = require('./routes/signout');
const { signupRouter } = require('./routes/signup');
const { errorHandler } = require('./middlewares/error-handler');
const { NotFoundError } = require('./errors/not-found-error');

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-svc:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log('listening on port 3000');
    });
};

start();