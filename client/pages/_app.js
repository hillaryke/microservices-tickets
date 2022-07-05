import '../style.css';
import 'bootstrap/dist/css/bootstrap.css';
import builClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
   return (
       <div>
          <Header currentUser={currentUser}/>
          <Component {...pageProps} />
       </div>
   );

};

AppComponent.getInitialProps = async (appContext) => {
   const client = builClient(appContext.ctx);
   const { data } = await client.get('/api/users/currentuser');

   let pageProps;
   if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx);
   }

   return {
      pageProps,
      currentUser: data.currentUser
   };
};

export default AppComponent;