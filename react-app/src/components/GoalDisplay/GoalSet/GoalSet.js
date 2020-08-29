import React from 'react'
import GoalCategory from '../../../hoc/GoalCategory/GoalCategory'
import IndividualGoal from './IndividualGoal/IndividualGoal';


const goalSet =(props)=>{


    const goals = props.goals.map(goal=>{
        return (
            <IndividualGoal 
            key = {goal.id} 
            individualID = {goal.id}
            goalTitle = {goal.title}
            checked = {goal.isCompleted}
            expanded = {goal.isExpanded}
            deleteGoal = {()=>props.delete(props.category,goal.id)}
            toggleCheck = {()=>props.checked(props.category,goal.id)}
            toogleContent={()=>props.expanded(props.category,goal.id)}/>
        );
    })

    return(

        <GoalCategory title = {props.category}>
            {goals}
        </GoalCategory>

    );

}


export default goalSet;