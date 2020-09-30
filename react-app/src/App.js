import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import GoalsPanel from './containers/GoalsPanel/GoalsPanel';
import NewGoal from './containers/NewGoal/NewGoal';
import {Route,Switch,Redirect} from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import {connect} from 'react-redux';
import * as actionCreators from './store/actions/actionCreators';

import axios from './axios-instance';

class App extends Component {


  //The check is done after all children components are mounted
  componentDidMount(){
    console.log('[APP] Mounted');
     this.props.onAutoLogIn();
  }
  
  componentDidUpdate(){
    console.log('[APP] Updated');
  }

  render(){
    
    console.log('[APP] Rendering',this.props.token);

    //When the props.token is changed the component is re-rendered so the header is being set.
    axios.defaults.headers.common['Authorization'] = this.props.token ? `Bearer ${this.props.token}` : '';

    return (
      <Layout>
        <Switch>
          <Route path="/goals"  component = {GoalsPanel}/>
          <Route path="/new-goal" exact component = {NewGoal}/>
          <Route path="/Auth" exact component = {Auth}/>
          <Redirect from="/" exact to="/Auth" />
          <Route 
          render={()=>
            <h1 style={{marginTop: '100px'}}>Error 404: Page not Found</h1>
            }/>
        </Switch>  
      </Layout>

    );
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    onAutoLogIn: ()=>dispatch(actionCreators.authCheckState())
  }
};

const mapStateToProps = (state)=>{
  return{
    token: state.token
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(App);
