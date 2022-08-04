import https from "https";
import axios from "axios";

export const reqAgent = () => new https.Agent({
   rejectUnauthorized: false
});

export const axiosInstance = (request: Request) => {
   const url = new URL(request.url);
   const myCookies: string = request.headers.get("cookie") as string;
   const contentType = request.headers.get('Content-Type') as string;

   return axios.create({
      baseURL: url.origin,
      httpsAgent: new https.Agent({
         rejectUnauthorized: false
      }),
      // @ts-ignore
      headers: request.headers
   });
};