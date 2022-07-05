import axios from "axios";
import { useState } from "react";

const UseRequest = ({ url, method, body }) => {
   const [errors, setErrors] = useState([]);

   const doRequest = async () => {
      try {
         const response = await axios[method](url, body);
         return response.data;
      } catch (err) {
         setErrors(
             <div className="alert alert-danger" role="alert">
                <h4>Ooops...</h4>
                <ul className="my-0">
                   {err.response.data.errors.map(err => (
                       <li key={err.message}>{err.message}</li>
                   ))}
                </ul>
             </div>
         );
      }
   };

   return { doRequest, errors };

};