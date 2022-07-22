import { ExpirationCompleteEvent, Listener, NotFoundError, OrderStatus, Subjects } from "@itickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";
import { natsWrapper } from "../../nats-wrapper";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
   subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
   queueGroupName = queueGroupName;

   async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
      // Find order with expiration complete
      const order = await Order.findById(data.orderId).populate('ticket');
      console.log('========ECL 1============', order);
      // Check if order exists
      if (!order) {
         throw new NotFoundError();
      }

      // Update Status of order to cancelled and save
      order.set({
         status: OrderStatus.Cancelled
      });
      await order.save();
      console.log('=========ECL 2===========', order);
      // Emit event saying order is cancelled
      await new OrderCancelledPublisher(natsWrapper.client).publish({
         id: order.id,
         version: order.version,
         ticket: {
            id: order.ticket.id
         }
      });

      msg.ack();
   }
}