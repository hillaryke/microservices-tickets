const express = require('express');
const router = express.Router();

// Get current user
router.post('/api/users/signout', (req, res) => {
    res.send('Hello There');
});

export { router as signoutRouter };