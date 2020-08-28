import React from 'react'
import classes from './GoalCategory.module.css'

const goalCategory = (props)=>(

    <div className={classes.GoalCategory}>
        <h2>{props.title}</h2>
        {props.children}
    </div>
);



export default goalCategory;