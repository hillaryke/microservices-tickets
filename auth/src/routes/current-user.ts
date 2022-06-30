const express = require('express');
const router = express.Router();

// Get current user
router.get('/api/users/currentuser', (req, res) => {

});

export { router as currentUserRouter };