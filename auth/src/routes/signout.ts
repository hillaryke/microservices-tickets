import {Request, Response} from "express";

const express = require('express');
const router = express.Router();

// Get current user
router.post('/api/users/signout', (req: Request, res: Response) => {
    res.send('SIGN OUT');
});

export { router as signoutRouter };