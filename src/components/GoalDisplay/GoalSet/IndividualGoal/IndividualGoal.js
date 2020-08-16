import React from 'react';
import GoalHeading from '../GoalHeading/GoalHeading';
import GoalContent from '../GoalContent/GoalContent';
import Aux from '../../../../hoc/Auxiliary/Auxiliary'

const individualGoal = (props)=>{

    
    return(

        <Aux>
            <GoalHeading
            lineThrough = {props.checked}
            changeCheck = {props.toggleCheck}
            changeContentVisibility = {props.toogleContent} 
            contentDisplayed = {props.expanded}
            title = {props.goalTitle}/>
            <GoalContent
            visible={props.expanded}/>
        </Aux>

    );


};

export default individualGoal;