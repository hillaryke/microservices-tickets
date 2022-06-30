const express = require('express');
const router = express.Router();

// Get current user
router.post('/api/users/signup', (req, res) => {
    res.send('Hello There');
});

export { router as signupRouter };