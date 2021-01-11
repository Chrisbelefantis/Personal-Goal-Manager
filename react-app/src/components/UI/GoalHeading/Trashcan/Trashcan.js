import React from 'react';
import { Icon } from '@iconify/react';
import trashcanIcon from '@iconify/icons-octicon/trashcan';
import classes from './Trashcan.module.css';

const trashcan = (props)=>{
 
 
    return(
        <div 
            className={props.isGoalTrashcan?classes.GoalTrashcan:classes.CategoryTrashcan} 
            onClick = {props.click}>
            <Icon 
                icon={trashcanIcon} 
                color={props.isGoalTrashcan?"#fffd7a":"black"} 
                height={props.isGoalTrashcan?"16px":"26px"}/>
        </div>
    );
};



export default trashcan;