import { OrderCancelledEvent, Publisher, Subjects } from "@itickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
   subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}