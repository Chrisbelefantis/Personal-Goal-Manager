import React from 'react';
import classes from './SideDrawer.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Moto from '../Moto/Moto';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer=(props)=>{

    let sideDrawerClasses = [classes.SideDrawer];
    if(props.show){
        sideDrawerClasses.push(classes.Open);
    }


    return(
        <Aux>
            <Backdrop show={props.show}
            click = {props.closeDrawer}/>
            <div className={sideDrawerClasses.join(' ')}>
                <Moto inDrawer ={true}/>
                <NavigationItems/>
            </div>
        </Aux>
    );

};



export default sideDrawer;