import axios from "axios";
import { redirect } from "@remix-run/node";

interface RequestArgs {
   request: Request;
   url: string;
   method: string;
   body: any;
   onSuccess?: (data: any) => void;
   redirectTo?: string;
}

export async function doRequest(args: RequestArgs) {
   const { url, method, body, request, redirectTo } = args;

   const cookies = request.headers.get("cookie") as string;

   try {
      // @ts-ignore
      const response = await axios[method](`${process.env.HOST_URL}${url}`,
         body, {
            headers: { 'cookie': cookies }
         });
      if (redirectTo) {
         return redirect(redirectTo, { headers: response.headers });
      }
   } catch (err) {
      // console.log(err)
      // @ts-ignore
      const errors = err.response?.data.errors;
      if (errors) return { errors };
      // @ts-ignore
      console.log("Unexpected error:", err.message);
      return null;
   }
}