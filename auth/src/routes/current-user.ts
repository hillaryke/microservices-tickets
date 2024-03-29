const express = require("express");
import { Request, Response } from "express";

import { currentUser } from "@itickets/common";

const router = express.Router();

// Get current user
router.get("/api/users/currentuser", currentUser, (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };