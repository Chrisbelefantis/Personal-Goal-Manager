import React from 'react'
import classes from './Toolbar.module.css'
import NavigationItems from '../NavigationItems/NavigationItems'
import Moto from '../Moto/Moto'
import Hamburger from '../../UI/Hamburger/Hamburger';

const toolbar=(props)=>{

    let moto = null;
    if(props.isDrawerClosed){
        moto = <Moto inDrawer={false}/>;
    }

    return(
        <header className={classes.Toolbar}>
            <Hamburger open = {props.openDrawer}/>
            {moto}
            <NavigationItems/>
        </header>
    );

};

export default toolbar;