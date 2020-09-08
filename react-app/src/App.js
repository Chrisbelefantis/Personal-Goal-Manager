import React from 'react';
import Layout from './containers/Layout/Layout';
import GoalsPanel from './containers/GoalsPanel/GoalsPanel';
import NewGoal from './containers/NewGoal/NewGoal';
import {Route,Switch,Redirect} from 'react-router-dom';



const  App=()=>{
  return (
    <Layout>
      <Switch>
        <Route path="/goals"  component = {GoalsPanel}/>
        <Route path="/new-goal" exact component = {NewGoal}/>
        <Redirect from="/" exact to="/goals" />
        <Route 
        render={()=>
          <h1 style={{marginTop: '100px'}}>Error 404: Page not Found</h1>
          }/>
      </Switch>  
    </Layout>

  );
}

export default App;