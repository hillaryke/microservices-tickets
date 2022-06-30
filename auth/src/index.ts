const express = require('express');
const { json } = require('body-parser');

const { currentUserRouter } = require('./routes/current-user');
const { signinRouter } = require('./routes/signin');
const { signoutRouter } = require('./routes/signout');
const { signupRouter } = require('./routes/signup');

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.user(signupRouter);

app.listen(3000, () => {
   console.log('listening on port 3000');
});