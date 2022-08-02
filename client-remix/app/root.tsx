import type { MetaFunction } from "@remix-run/node";
import {
   Links,
   Meta,
   Outlet,
   Scripts,
   ScrollRestoration,
} from "@remix-run/react";
import { axiosConfig } from "~/routes/api/axios-config";

import styles from "./styles/app.css";
import { LoaderFunction } from "@remix-run/node";
import https from "https";
import axios from "axios";

export function links() {
   return [{ rel: "stylesheet", href: styles }];
}

export const loader: LoaderFunction = async ({ request }) => {
   const { data } = await axiosConfig(request).get('/api/users/currentuser');
   return { currentUser: data };
};

export const meta: MetaFunction = () => ({
   charset: "utf-8",
   title: "New Remix App",
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