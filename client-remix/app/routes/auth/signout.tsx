import type { ActionFunction } from "@remix-run/node";

import doRequest from "~/utils/auth-session";

export const action: ActionFunction = ({ request }) => {
   return doRequest({
      request,
      method: "post",
      url: "/api/users/signout",
      body: {},
      redirectTo: "/",
   });
};