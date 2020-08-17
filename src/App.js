import React from 'react';
import Layout from './containers/Layout/Layout'
import GoalsPanel from './containers/GoalsPanel/GoalsPanel';
import QuotePanel from './containers/QuotePanel/QuotePanel'

const  App=()=>{
  return (
    <Layout>
      <GoalsPanel/>
      <QuotePanel/>
    </Layout>

  );
}

export default App;
