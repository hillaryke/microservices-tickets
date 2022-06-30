import {Request, Response} from "express";

const express = require('express');
const router = express.Router();

// Get current user
router.get('/api/users/currentuser', (req: Request, res: Response) => {
    res.send('CURRENT USER');
});

export { router as currentUserRouter };