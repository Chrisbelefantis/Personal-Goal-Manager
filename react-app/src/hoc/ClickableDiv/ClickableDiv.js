import React from 'react';
import classes from './ClickableDiv.module.css'

const clickableDiv=(props)=>(

    <div 
    onClick={props.click}
    className={classes.ClickableDiv}>
        {props.children}
    </div>

);

export default clickableDiv;
