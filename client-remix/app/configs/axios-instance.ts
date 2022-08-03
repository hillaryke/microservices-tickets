import https from "https";
import axios from "axios";
import * as url from "url";

export const axiosInstance = (request: Request) => {

//    const url = new URL(request.url);
//    const myCookies: string = request.headers.get("cookie") as string;
//    const contentType = request.headers.get('Content-Type') as string;
//
   return axios.create({
      baseURL: request.headers.get("origin") as string,
      httpsAgent: new https.Agent({
         rejectUnauthorized: false
      }),
      // @ts-ignore
      headers: request.headers
   });
};
//