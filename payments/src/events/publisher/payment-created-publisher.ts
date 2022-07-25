import { PaymentCreatedEvent, Publisher, Subjects } from "@itickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
   readonly subject = Subjects.PaymentCreated;
}