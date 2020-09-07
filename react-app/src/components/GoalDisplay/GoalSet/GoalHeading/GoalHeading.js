import React from 'react';
import classes from './GoalHeading.module.css';
import ClickableDiv from '../../../../hoc/ClickableDiv/ClickableDiv';
import CheckBox from '../../../UI/CheckBox/CheckBox';
import Trashcan from '../../../UI/GoalHeading/Trashcan/Trashcan';
import Pensil from '../../../UI/GoalHeading/Pensil/Pensil';

const goalHeading =(props)=>{
    
    let checkedStyle = null;
    if(props.lineThrough){
        checkedStyle = classes.Checked;
    }
  
    
    return(
        <div className={classes.GoalHeading}>
            <CheckBox click = {props.changeCheck} checked = {props.lineThrough}/>
            <ClickableDiv  click = {props.changeContentVisibility}>
                <span className={checkedStyle}> <p>{props.title}</p> </span>
            </ClickableDiv>
            <Trashcan click = {props.delete}/>
            <Pensil/>
        </div>
    );
}

export default goalHeading;