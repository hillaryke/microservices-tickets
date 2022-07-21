import { ExpirationCompleteEvent, Listener, NotFoundError, OrderStatus, Subjects } from "@itickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
   subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
   queueGroupName = queueGroupName;

   async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
      // Find order with expiration complete
      const order = await Order.findById(data.orderId);

      // Check if order exists
      if (!order) {
         throw new NotFoundError();
      }

      // Update Status of order to cancelled
      order.set({
         status: OrderStatus.Cancelled
      });
   }
}