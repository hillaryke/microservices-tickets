import axios from "axios";
import { useState } from "react";

const useRequest = ({ url, method, body, onSuccess }) => {
   const [errors, setErrors] = useState([]);
   const [errorsdev, setDevErrors] = useState([]);

   const doRequest = async () => {
      try {
         setErrors(null);
         const response = await axios[method](url, body);

         if (onSuccess) {
            onSuccess(response.data);
         }

         return response.data;
      } catch (err) {
         setDevErrors(err.response.data.errors);

         setErrors(
             <div className="text-red" role="alert">
                <h4>Ooops...</h4>
                <ul>
                   {err.response.data.errors.map(err => (
                       <li key={err.message}>{err.message}</li>
                   ))}
                </ul>
             </div>
         );
      }
   };

   return { doRequest, errors, errorsdev };

};

export default useRequest;