const express = require('express');
const { json } = require('body-parser');
const { currentUserRouter } = require('./routes/current-user')

const app = express();
app.use(json());

app.user(currentUserRouter);

app.get('/api/users/currentuser', (req,res ) => {
    res.send('Hi there!');
});

app.listen(3000, () => {
    console.log('listening on port 3000');
})