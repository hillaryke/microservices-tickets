import StripeCheckout from "react-stripe-checkout";
import type { LoaderFunction } from "@remix-run/node";
import axios from "axios";
import { displayErrors } from "~/components/display-errors";
import { useActionData, useFetcher, useLoaderData } from "@remix-run/react";
import React, { useEffect } from "react";

export const loader: LoaderFunction = async ({ request, params }) => {
   const orderId = params.orderId;
   const cookies = request.headers.get('cookie') as string;

   const res = await axios.get(`${process.env.HOST_URL}/api/users/currentuser`, {
      headers: { "cookie": cookies }
   });
   const currentUser = res.data.currentUser;

   try {
      const res = await axios.get(`${process.env.HOST_URL}/api/orders/${orderId}`, {
         headers: { 'cookie': request.headers.get('cookie') as string }
      });
      return { order: res.data, cookies, currentUser };
   } catch (err) {
      console.log(err);
      return null;
   }
};

export default function OrderShow() {
   const actionData = useActionData();
   const { order, currentUser } = useLoaderData();

   const fetcher = useFetcher();

   const initiatePayment = (id: string) => {
      const data = {
         orderId: order.id,
         token: id
      };
      return fetcher.submit(data,
         { method: "post", action: "/orders/payments" }
      );
   };

   const [timeLeft, setTimeLeft] = React.useState(0);
   useEffect(() => {
      const findTimeLeft = () => {
         // @ts-ignore
         const msLeft = new Date(order.expiresAt) - new Date();
         const secondsLeft = msLeft / 1000;
         setTimeLeft(Math.round(secondsLeft));
      };
      findTimeLeft();
      const timerId = setInterval(findTimeLeft, 1000);

      return () => {
         clearInterval(timerId);
      };
   }, []);

   if (timeLeft <= 0) {
      return <div>Order Expired</div>;
   }

   return (
      <div>
         {timeLeft} seconds remaining to pay
         <StripeCheckout
            token={({ id }) => initiatePayment(id)}
            stripeKey="pk_test_51LOfKnJ7OTzCedir8qobSRRskMokPSYqkkzTA6Fgua5svXmYNjg22Dco8tp6Acn390nTpT0vndaefRAkxuF219b500jER1fjHD"
            amount={order.ticket.price * 100}
            email={currentUser.email}
         />
         {displayErrors(actionData?.errors)}
      </div>
   );
};