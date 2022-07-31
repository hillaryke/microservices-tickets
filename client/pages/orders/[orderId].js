import { useEffect, useState } from "react";

const OrderShow = ({ order }) => {
   const [timeLeft, setTimeLeft] = useState('');

   useEffect(() => {
      const findTimeLeft = () => {
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

   return <div>{timeLeft} remaining to pay</div>;
};

OrderShow.getInitialProps = async (context, client) => {
   const { orderId } = context.query;
   const { data } = await client.get(`/api/orders/${orderId}`);

   return { order: data };
};

export default OrderShow;