import React from 'react';
import classes from './Button.module.css';

const button = (props)=>{

    const buttonClasses= [classes.Button];

    if(props.btnType === 'success'){
        buttonClasses.push(classes.Success)
    }
    else if(props.btnType === 'danger'){
        buttonClasses.push(classes.Danger)
    }

    return(
        <button 
            className = {buttonClasses.join(' ')}
            onClick={props.clicked}
            disabled={props.disabled}>
            {props.children}</button>
    );

};


export default button;