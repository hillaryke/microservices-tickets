const express = require('express');
const router = express.Router();

// Get current user
router.post('/api/users/signin', (req, res) => {
    res.send('Hello There');
});

export { router as signinRouter };