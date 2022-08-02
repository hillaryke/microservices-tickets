import https from "https";
import axios from "axios";

export const axiosConfig = (request: Request) => {
   const agent = new https.Agent({
      rejectUnauthorized: false,
   });

   const url = new URL(request.url);
   const myCookies: string = request.headers.get("cookie") as string;

   return axios.create({
      baseURL: url.origin,
      httpsAgent: agent,
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         Cookie: myCookies
      },
      withCredentials: true
   });
}
//