import React from 'react'
import classes from './GoalCategory.module.css'

const goalCategory = (props)=>{

    //Capitalize first letter
    const title = props.title.charAt(0).toUpperCase() + props.title.slice(1)

    return(
        <div className={classes.GoalCategory}>
            <h2>{title}</h2>
            {props.children}
        </div>
    );
};



export default goalCategory;