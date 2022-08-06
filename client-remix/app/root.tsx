import type { MetaFunction } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import {
   Links,
   Meta,
   Outlet,
   Scripts,
   ScrollRestoration,
} from "@remix-run/react";

import styles from "./styles/app.css";
import Header from "~/components/Header";
import axios from "axios";

export function links() {
   return [{ rel: "stylesheet", href: styles }];
}

export const loader: LoaderFunction = async ({ request }) => {
   const res = await axios.get(`${process.env.HOST_URL}/api/users/currentuser`, {
      headers: {
         "cookie": request.headers.get("cookie") as string,
      }
   });
   const currentUser = res.data.currentUser

   return { currentUser }
};

export const meta: MetaFunction = () => ({
   charset: "utf-8",
   title: "🎯 iTickets",
   viewport: "width=device-width,initial-scale=1",
});

export default function App() {
   return (
      <html lang="en">
      <head>
         <Meta/>
         <Links/>
      </head>
      <body>
      <Header/>
      <Outlet/>
      <ScrollRestoration/>
      <Scripts/>
      </body>
      </html>
   );
}


export function ErrorBoundary({ error }: { error: Error }) {
   console.error(error);

   return <div>An unexpected error occurred: {error.message}</div>;
}