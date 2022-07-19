import Link from "next/link";
import { doRequest } from '../pages/auth/signout';

export default ({ currentUser }) => {
   const links = [
      !currentUser && { label: 'Sign Up', href: '/auth/signup' },
      !currentUser && { label: 'Sign In', href: '/auth/signin' },
      currentUser && { label: 'Sign Out', href: '/auth/signout', onBtnClick: () => doRequest() }
   ]
       .filter(linkConfig => linkConfig)
       .map(({ label, href, onBtnClick }) => {
          return (
              <Link href={href} key={href}>
                 <a
                     className="no-underline cursor-pointer inline-block leading-5 px-4 py-2 border border-white rounded
                                sm:inline-block sm:mt-0 text-teal-200 mr-5 text-slate-50
                                hover:border-transparent hover:text-blue-800 hover:bg-white"
                     onClick={onBtnClick ? onBtnClick : null}>{label}</a>
              </Link>
          );
       });

   return (
       <nav className="flex items-center justify-between flex-wrap bg-gray-800 px-6 py-4">
          <Link href="/">
             <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-bold text-2xl">iTickets</span>
             </div>
          </Link>

          <div className="w-full block sm:flex sm:items-center sm:w-auto">
             <div className="text-sm sm:flex-grow">
                {links}
             </div>
          </div>
       </nav>
   );
}