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
         'Cookie': request.headers.get('Cookie') as string,
      },
   });

   return res.data?.currentUser;
}