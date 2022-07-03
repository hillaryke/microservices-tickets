import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

const express = require('express');
const router = express.Router();

// Get current user
router.get('/api/users/currentuser', (req: Request, res: Response) => {
    if (!req.session?.jwt) {
        return res.send({ currentUser: null });
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);

        res.send({ currentUser: payload });
    } catch (err) {
        res.send({ currentUser: null });
    }

});

export { router as currentUserRouter };