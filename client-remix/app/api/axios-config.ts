import https from "https";
import axios from "axios";

export function axiosConfig(request: Request) {
   const agent = new https.Agent({
      rejectUnauthorized: false,
   });
   const url = new URL(request.url);

   return axios.create({
      baseURL: url.origin,
      httpsAgent: agent,
   });
}