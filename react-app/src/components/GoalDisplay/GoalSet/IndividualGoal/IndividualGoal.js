import React from 'react';
import GoalHeading from '../GoalHeading/GoalHeading';
import GoalContent from '../GoalContent/GoalContent';
import Aux from '../../../../hoc/Auxiliary/Auxiliary'

const individualGoal = (props)=>{

    
    return(

        <Aux>
            <GoalHeading
            lineThrough = {props.checked}
            delete = {props.deleteGoal}
            changeCheck = {props.toggleCheck}
            changeContentVisibility = {props.toogleContent} 
            contentDisplayed = {props.expanded}
            title = {props.goalTitle}
            goalId = {props.individualID}/>
            <GoalContent
            visible={props.expanded}
            goalID = {props.individualID}/>
        </Aux>

    );


};

export default individualGoal;