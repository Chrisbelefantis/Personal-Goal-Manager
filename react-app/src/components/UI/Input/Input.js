import React from 'react';
import classes from './Input.module.css';

const input =(props)=>{

    let elementClasses = classes.ValidInputElement;
    let inputElement = null;

    switch(props.elementType){
        case('input'):
            inputElement = <input className={elementClasses} onChange={props.changed} {...props.elementConfig}/>
            break;
        case('textarea'):
            inputElement = <textarea className={elementClasses} onChange={props.changed} {...props.elementConfig}/>
            break;
        default:
            inputElement = <input className={elementClasses} onChange={props.changed} {...props.elementConfig}/>
            break;


    }

   
    return(
        <div className={classes.Input}>
            <label htmlFor={props.label}>{props.elementTitle}</label>
            {inputElement}
        </div>
    );
}


export default input;