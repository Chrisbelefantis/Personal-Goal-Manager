import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

const navigationItems =()=>(

    <ul className={classes.NavigationItems}>
        <NavigationItem link = "/goals">
            Current Goals
        </NavigationItem>
        <NavigationItem link = "/new-goal" >
           New Goal
        </NavigationItem>
    </ul>


);


export default navigationItems;