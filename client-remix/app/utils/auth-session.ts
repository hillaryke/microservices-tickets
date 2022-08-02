
import { axiosConfig } from "~/api/axios-config";
import { redirect } from "@remix-run/node";

interface UseRequestArgs {
   request: Request;
   url: string;
   method: string;
   body: Object;
   onSuccess?: (data: any) => void;
   redirectTo?: string;
}

const doRequest = async (args: UseRequestArgs) => {
   const { request, method, body, url, onSuccess, redirectTo } = args;

   let resData;
   try {
      // @ts-ignore
      const response = await axiosConfig(request)[method](url, { ...body });
      if (onSuccess) return onSuccess(response.data);
      if (redirectTo) return redirect(redirectTo);
   } catch (err) {
      // @ts-ignore
      resData = err.response.data
   }

   return resData;
};

export default doRequest;