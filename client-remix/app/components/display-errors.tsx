interface ActionError {
   field?: string;
   message: string;
}

export const displayErrors = (actionErrors: Array<ActionError>, field?: string) => {
   if (field) {
      const fieldError = actionErrors?.find((err: ActionError) => err.field === field);
      return fieldError ?
         <div className="pt-1 text-red-700" role="alert">{fieldError.message}</div> : null;
   }

   const customErrors = actionErrors?.map(err => {
      return !err.field ? <li key={err.message}>{err.message}</li> : null;
   });
   return (
      <div className="mt-1 text-red-700" role="alert">
         <ul>{customErrors}</ul>
      </div>
   );
};