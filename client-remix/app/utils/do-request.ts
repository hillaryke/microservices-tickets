import { redirect } from "@remix-run/node";
import { axiosInstance } from "~/configs/axios-instance";

interface RequestArgs {
   request: Request;
   url: string;
   method: string;
   body: any;
   onSuccess?: (data: any) => void;
   redirectTo?: string;
}

const doRequest = async (args: RequestArgs) => {
   const { request, method, url, body, onSuccess, redirectTo } = args;

   try {
      // @ts-ignore
      const res = await axiosInstance(request)[method](url, body);
      if (redirectTo) {
         return redirect(redirectTo, {
            headers: res.headers
         });
      }
      if (onSuccess) {
         onSuccess(res.data);
      }

   } catch (err) {
      // @ts-ignore
      const errors = err.response?.data.errors;
      if (errors) return { errors };
      // @ts-ignore
      console.log("Unexpected error:", err.message);
      return null;
   }
};

export default doRequest;