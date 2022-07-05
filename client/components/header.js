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
              <li key={href} className="nav-item">
                 <Link href={href}>
                    <a onClick={onBtnClick ? onBtnClick : null} className="nav-link">{label}</a>
                 </Link>
              </li>
          );
       });

   return (
       <nav className="navbar navbar-light bg-light">
          <Link href="/">
             <a className="navbar-brand">GitTix</a>
          </Link>

          <div className="d-flex justify-content-end">
             <ul className="nav d-flex align-items-center">
                {links}
             </ul>
          </div>
       </nav>
   );
}