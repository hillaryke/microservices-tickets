import axios from "axios";

export default ({ req }) => {
   if (typeof window === 'undefined') {
      // we are on the server!

      return axios.create({
         baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
         headers: req.headers,
         timeout: 60000,
         maxContentLength: 500 * 1000 * 1000,
         httpsAgent: new https.Agent({ keepAlive: true }),
      });

   } else {
      // we are on the browser!

      return axios.create({
         baseURL: "/",
         timeout: 60000,
         maxContentLength: 500 * 1000 * 1000,
         httpsAgent: new https.Agent({ keepAlive: true }),
      });
   }
}