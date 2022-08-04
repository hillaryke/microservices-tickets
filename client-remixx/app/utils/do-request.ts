// import { redirect } from "@remix-run/node";
// import { axiosInstance } from "~/configs/axios-instance";
// import axios from "axios";
// import https from "https";

// interface RequestArgs {
//    request: Request;
//    url: string;
//    method: string;
//    body: any;
//    onSuccess?: (data: any) => void;
//    redirectTo?: string;
// }

// const doRequest = async (args: RequestArgs) => {
//    const { request, method, url, body, onSuccess, redirectTo } = args;

//    const myurl = new URL(request.url);
//    const myCookies: string = request.headers.get("cookie") as string;
//    const contentType = request.headers.get('Content-Type') as string;

//    const axiosInstan = axios.create({
//       baseURL: process.env.HOST_URL,
//       httpsAgent: new https.Agent({
//          rejectUnauthorized: false
//       }),
//       // @ts-ignore
//       headers: request.headers
//    });

//    try {
//       // @ts-ignore
//       const res = await axiosInstan[method](url, body);
//       // console.log(res)
//       if (redirectTo) {
//          return redirect(redirectTo);
//       }
//       if (onSuccess) {
//          onSuccess(res.data);
//       }

//    } catch (err) {
//       // console.log(err)
//       // @ts-ignore
//       const errors = err.response?.data.errors;
//       if (errors) return { errors };
//       // @ts-ignore
//       console.log("Unexpected error:", err.message);
//       return null;
//    }
// };

// export default doRequest;