import axios from "axios";
import { useState } from "react";

const useRequest = ({ url, method, body, onSuccess }) => {
   const [errors, setErrors] = useState('');
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
             <div className="mt-1 text-red-700" role="alert">
                <ul>
                   {err.response.data.errors.map(err => {
                      return !err.field ? <li key={err.message}>{err.message}</li> : null;
                   })}
                </ul>
             </div>
         );
      }
   };

   const displayFieldError = (field) => {
      const fieldError = errorsdev.find(err => err.field === field);
      return fieldError ?
          <div className="pt-1 text-red-700" role="alert">{fieldError.message}</div>
          : null;
   };

   return { doRequest, errors, errorsdev, displayFieldError };

};

export default useRequest;