import React from 'react'
import classes from './GoalHeading.module.css'
import ClickableDiv from '../../../../hoc/ClickableDiv/ClickableDiv'
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
        <div className={goalClasses.join(' ')}>
            <CheckBox click = {props.changeCheck} checked = {props.lineThrough}/>
            <ClickableDiv  click = {props.changeContentVisibility}>
                <p>{props.title}</p>
            </ClickableDiv>
            {props.children}
           
        </div>
    );
}

export default goalHeading;