const LandingPage = ({ currentUser, tickets }) => {


   return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
   const { data } = await client.get('/api/tickets');
   return { tickets: data };
};

export default LandingPage;