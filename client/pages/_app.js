import '../style.css';
import 'bootstrap/dist/css/bootstrap.css';
import builClient from '../api/build-client';

const AppComponent = ({ Component, pageProps }) => {
   return (
       <div>
          <header>Header 1</header>
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

   console.log(pageProps);

   return data;
};

export default AppComponent;