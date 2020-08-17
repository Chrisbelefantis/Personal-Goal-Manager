import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

const navigationItems =()=>(

    <ul className={classes.NavigationItems}>
        <NavigationItem link = "/" active = {true}>
            Current Goals
        </NavigationItem>
        <NavigationItem link = "/" active = {false}>
           New Goal
        </NavigationItem>
    </ul>


);


export default navigationItems;