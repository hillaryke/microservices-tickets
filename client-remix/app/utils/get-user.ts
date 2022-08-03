import axios from "axios";
import https from "https";

export async function getUser(request: any) {
   // TODO - add base url
   const res = await axios.get('https://ticketing.dev/api/users/currentuser', {
      baseURL: request.headers.get("Origin") as string,
      httpsAgent: new https.Agent({
         rejectUnauthorized: false,
      }),
      headers: {
         'Cookies': request.headers.get('Cookies') as string,
      },
   });

   return res.data?.currentUser;
}