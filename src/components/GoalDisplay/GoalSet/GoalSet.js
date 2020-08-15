import React from 'react'
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import GoalCategory from '../../../hoc/GoalCategory/GoalCategory'
import IndividualGoal from './IndividualGoal/IndividualGoal';


const goalSet =(props)=>{


    const goals = props.goals.map(goal=>{
        return (
            <IndividualGoal 
            key = {goal.id} 
            goalTitle = {goal.title}
            checked = {goal.isChecked}
            toggleCheck = {()=>props.checked(props.category,goal.id)}/>
        );
    })

    return(

        <GoalCategory title = {props.category}>
            {goals}
        </GoalCategory>

    );

}


export default goalSet;