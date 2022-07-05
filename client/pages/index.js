import axios from "axios";

const LandingPage = ({ currentUser }) => {
   console.log(currentUser);

   return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async () => {
   if (typeof window === "undefined") {
      // we are on the server!
      // http://service-name.namespace.svc.cluster.local/api/users

      const { data } = await axios.get(
          "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser", {
             headers: {
                Host: "ticketing.dev"
             }
          }
      );
      return { currentUser: data };

   } else {
      // we are on the browser!
      const { data } = await axios.get('/api/users/currentuser');

      return { currentUser: data };
   }
};

export default LandingPage;