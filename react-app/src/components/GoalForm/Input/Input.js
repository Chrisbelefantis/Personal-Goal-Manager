import React from 'react';
import classes from './Input.module.css';

const input =(props)=>{

    let elementClasses = [classes.ValidInputElement];
    let inputElement = null;

    if(!props.isValid && props.isTouched){
        elementClasses.push(classes.InvalidInput);
    }


    switch(props.elementType){
        case('input'):
            inputElement = <input className={elementClasses.join(' ')} onChange={props.changed} {...props.elementConfig}/>
            break;
        case('textarea'):
            inputElement = <textarea className={elementClasses.join(' ')} onChange={props.changed} {...props.elementConfig}/>
            break;
        case('select'):
            inputElement = (<select
                className={elementClasses.join('')} 
                onChange={props.changed}
                id = {props.elementConfig.id}
                defaultValue="default">
                <option disabled value="default"> -- select an option -- </option>
                {props.elementConfig.options.map(option=>(
                    <option key={option.value} value={option.value}>{option.display}</option>
                ))}
            <option key="newCategory" value = "newCategory">New Category</option>
            </select>)
            break;

        default:
            inputElement = <input className={elementClasses.join(' ')} onChange={props.changed} {...props.elementConfig}/>
            break;


    }

   
    return(
        <div className={classes.Input}>
            <label className={classes.Label} htmlFor={props.label}>{props.elementTitle}</label>
            {inputElement}
        </div>
    );
}


export default input;