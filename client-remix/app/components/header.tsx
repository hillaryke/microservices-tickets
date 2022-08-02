import { Link, useMatches } from "@remix-run/react";

export default () => {
   const matches = useMatches();
   const matchRoot = matches.find((match) => match.pathname === '/');
   const currentUser = matchRoot?.data?.currentUser;

   const links = [
      !currentUser && { label: 'Sign Up', to: '/auth/signup', isActionRoute: false },
      !currentUser && { label: 'Sign In', to: '/auth/signin', isActionRoute: false },
      currentUser && { label: 'Sell Tickets', to: '/tickets/new', isActionRoute: false },
      currentUser && { label: 'My Orders', to: '/orders', isActionRoute: false },
      currentUser && { label: 'Sign Out', to: '/auth/signout', isActionRoute: true }
   ];

   const linkClassName = "no-underline cursor-pointer inline-block leading-5 px-4 py-2 border border-white rounded sm:inline-block sm:mt-0 text-teal-200 mr-5 text-slate-50 hover:border-transparent hover:text-blue-800 hover:bg-white";

   const renderLink = (label: string, to: string, isActionRoute: boolean = false) => {
      if (isActionRoute) {
         return (
            <form action={to} method="post">
               <button type="submit" className={linkClassName}>{label}</button>
            </form>
         );
      } else {
         return (
            <Link to={to} key={to} className={linkClassName}>
               {label}
            </Link>
         );
      }
   };

   const displayLinks = links.filter(linkConfig => linkConfig)
      .map(({ label, to, isActionRoute}) => {
         return renderLink(label, to, isActionRoute);
      });

   console.log(links);

   return (
      <div className="bg-gray-800 flex justify-center">
         <nav className="flex items-center justify-between px-6 py-4 max-w-screen-lg w-screen">
            <Link to="/">
               <div className="flex items-center flex-shrink-0 text-white mr-6 pl-1.5 hover:cursor-pointer">
                  <span className="font-bold text-2xl">iTickets</span>
               </div>
            </Link>

            <div className="w-full block sm:flex sm:items-center sm:w-auto">
               <div className="text-sm sm:flex-grow -mr-5">
                  {displayLinks}
               </div>
            </div>
         </nav>
      </div>
   );
}