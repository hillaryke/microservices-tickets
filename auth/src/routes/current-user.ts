const express = require('express');
const router = express.Router();

// Get current user
router.get('/api/users/currentuser', (req, res) => {
    res.send('Hello There');
});

export { router as currentUserRouter };