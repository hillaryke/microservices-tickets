import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/use-request";

const OrderShow = ({ order, currentUser }) => {
   const [timeLeft, setTimeLeft] = useState(0);
   const { doRequest, errors } = useRequest({
      url: `/api/payments`,
      method: "post",
      body: {
         orderId: order.id,
      },
      onSuccess: (payment) => console.log(payment),
   });

   useEffect(() => {
      const findTimeLeft = () => {
         const msLeft = new Date(order.expiresAt) - new Date();
         const secondsLeft = msLeft / 1000;
         setTimeLeft(Math.round(secondsLeft));
      };
      const msLeft = new Date(order.expiresAt) - new Date();

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
              token={({ id }) => doRequest({ token: id })}
              stripeKey="pk_test_51LOfKnJ7OTzCedir8qobSRRskMokPSYqkkzTA6Fgua5svXmYNjg22Dco8tp6Acn390nTpT0vndaefRAkxuF219b500jER1fjHD"
              amount={order.ticket.price * 100}
              email={currentUser.email}
          />
          {errors}
       </div>
   );
};

OrderShow.getInitialProps = async (context, client) => {
   const { orderId } = context.query;
   const { data } = await client.get(`/api/orders/${orderId}`);

   return { order: data };
};

export default OrderShow;