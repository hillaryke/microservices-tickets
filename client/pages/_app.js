import '../dist/style.css';
import builClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
   return (
       <div className="flex flex-col">
          <Header currentUser={currentUser}/>
          <Component currentUser={currentUser} {...pageProps}/>
       </div>
   );

};

// AppComponent.getInitialProps = async (appContext) => {
//    // const client = builClient(appContext.ctx);
//    // const { data } = await client.get('/api/users/currentuser');
//
//    // let pageProps;
//    // if (appContext.Component.getInitialProps) {
//    //    pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
//    // }
//    //
//    // return {
//    //    pageProps,
//    //    currentUser: data.currentUser
//    // };
// };

export default AppComponent;