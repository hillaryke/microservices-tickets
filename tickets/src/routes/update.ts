import express, { Response, Request } from "express";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";
import {
   validateRequest,
   NotFoundError,
   requireAuth,
   NotAuthorizedError
} from "@itickets/common";
import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.put('/api/tickets/:id',
   [
      body('title').not().isEmpty().withMessage('Title is required!'),
      body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than zero')
   ],
   validateRequest,
   requireAuth,
   async (req: Request, res: Response) => {
      const { title, price } = req.body;

      const ticket = await Ticket.findById(req.params.id);

      if (!ticket) {
         throw new NotFoundError();
      }

      if (ticket.userId !== req.currentUser!.id) {
         throw new NotAuthorizedError();
      }

      ticket.set({ title, price });

      await ticket.save();
      await new TicketUpdatedPublisher(natsWrapper.client).publish({
         id: ticket.id,
         title: ticket.title,
         price: ticket.price,
         userId: ticket.userId
      });

      res.send(ticket);
   });

export { router as updateTicketRouter };