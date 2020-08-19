import React from 'react'
import classes from './Hamburger.module.css'


const hamburger=(props)=>{

    return(

        <div className={classes.Hamburger} onClick={props.open}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );

}

export default hamburger;