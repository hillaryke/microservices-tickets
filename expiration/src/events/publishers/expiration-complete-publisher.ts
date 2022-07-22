import { ExpirationCompleteEvent, Publisher, Subjects } from "@itickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
   subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}