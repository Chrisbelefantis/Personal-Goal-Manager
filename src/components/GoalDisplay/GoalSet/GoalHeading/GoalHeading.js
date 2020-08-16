import React from 'react'
import classes from './GoalHeading.module.css'
import CheckBox from '../../../UI/CheckBox/CheckBox'

const goalHeading =(props)=>{
    
    let goalClasses = [classes.GoalHeading];
    if(props.lineThrough){
        goalClasses.push(classes.Checked)
    }
    if(props.contentDisplayed){
        goalClasses.push(classes.Expanded)
    }
    
    return(
        <div 
        className={goalClasses.join(' ')}>
            <CheckBox click = {props.changeCheck} checked = {props.lineThrough}/>
            <p  onClick={props.changeContentVisibility}>{props.title}</p>
            {props.children}
        </div>
    );
}

export default goalHeading;