import { useState } from "react";
import useRequest from "../../hooks/use-request";

const NewTicket = () => {
   const [title, setTitle] = useState('');
   const [price, setPrice] = useState('');
   const { doRequest, errors, errorsdev } = useRequest({
      url: '/api/tickets',
      method: 'post',
      body: {
         title, price
      },
      onSuccess: (ticket) => console.log(ticket)
   });

   const onSubmit = (event) => {
      event.preventDefault();

      doRequest();
      console.log(errors);
   };

   const onBlur = () => {
      const value = parseFloat(price);

      if (isNaN(value)) {
         return;
      }

      setPrice(value.toFixed(2));
   };

   return (
       <div className="flex min-h-full flex-col justify-center mt-9">
          <div className="mx-auto w-full max-w-md px-8">
             <div className="mb-6">
                <h1 className="text-xl">Create a Ticket</h1>
             </div>
             <form onSubmit={onSubmit} method="post" className="space-y-6">
                <div>
                   <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Title
                   </label>
                   <div className="mt-1">
                      <input
                          value={title}
                          onBlur={onBlur}
                          onChange={e => setTitle(e.target.value)}
                          id="title"
                          autoFocus={true}
                          type="text"
                          className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                      />
                      {errorsdev.length >= 1 ? errorsdev.map(err => {
                         return err.field === 'title' &&
                             <div className="pt-1 text-red-700">{err.message}</div>;
                      }) : null}
                   </div>
                </div>

                <div>
                   <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Price
                   </label>
                   <div className="mt-1">
                      <input
                          value={price}
                          onChange={e => setPrice(e.target.value)}
                          onBlur={onBlur}
                          id="price"
                          className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                      />
                      {errorsdev.length >= 1 ? errorsdev.map(err => {
                         return err.field === 'price' &&
                             <div className="pt-1 text-red-700">{err.message}</div>;
                      }) : null}
                   </div>
                </div>

                <button
                    type="submit"
                    //  @TODO add padding top
                    className="w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
                >
                   Create Ticket
                </button>
                <div className="flex items-center justify-between">
                </div>
             </form>
          </div>
       </div>
   );
};

export default NewTicket;