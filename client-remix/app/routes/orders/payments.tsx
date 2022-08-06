import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { doRequest } from "~/utils/do-request";

export const action: ActionFunction = async ({ request }) => {
   const formData = await request.formData();
   const orderId = formData.get('orderId');
   const token = formData.get('token');

   return doRequest({
      request,
      method: 'post',
      url: '/api/payments',
      body: { orderId, token },
      onSuccess: () => redirect('/orders')
   });
};