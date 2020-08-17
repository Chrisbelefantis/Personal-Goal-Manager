import React from 'react'
import classes from './Toolbar.module.css'
import NavigationItems from '../NavigationItems/NavigationItems'
import Moto from '../NavigationItems/Moto/Moto'

const toolbar=(props)=>(

    <header className={classes.Toolbar}>
        <Moto/>
        <NavigationItems/>
    </header>

);

export default toolbar;