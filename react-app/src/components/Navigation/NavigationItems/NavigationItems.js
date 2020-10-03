import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/actionCreators';

const navigationItems =(props)=>{

    let navigationItems = (
        <React.Fragment>
            <NavigationItem link = "/home">
            Homepage
            </NavigationItem>
            <NavigationItem link = "/about">
                About
            </NavigationItem>
           
        </React.Fragment>
    );

    if(props.isLoggedIn){
        navigationItems = ( <React.Fragment>
                <NavigationItem link = "/goals">
                Current Goals
                </NavigationItem>
                <NavigationItem link = "/new-goal" >
                New Goal
                </NavigationItem>
                <NavigationItem 
                    link = "/home"
                    clicked = {props.onLogout}>Log Out</NavigationItem>
            </React.Fragment>
        );
    }
   

    return(
        <ul className={classes.NavigationItems}>
            {navigationItems}
        </ul>
    );


};


const mapStateToProps = (state) =>{
    return{
        isLoggedIn : state.isAuthenticated
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onLogout: ()=>dispatch(actions.logOut())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(navigationItems);