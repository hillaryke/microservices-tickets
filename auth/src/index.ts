const express = require('express');
const { json } = require('body-parser');

const app = express();
app.use(json());

app.get('/api/users/currentuser', (req, res) => {
    res.send('Hi there!');
});

app.listen(3000, () => {
    console.log('listening on port 3000');
})