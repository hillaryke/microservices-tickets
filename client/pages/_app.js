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

   console.log(data);

   return data;
};

export default AppComponent;