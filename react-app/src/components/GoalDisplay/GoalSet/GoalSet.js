import React from 'react'
import GoalCategory from '../GoalSet/GoalCategory/GoalCategory';
import IndividualGoal from './IndividualGoal/IndividualGoal';


const goalSet =(props)=>{

    let goals = null;
    if(props.goals){
        goals = props.goals.map(goal=>{
            return (
                <IndividualGoal 
                key = {goal.id} 
                individualID = {goal.id}
                goalTitle = {goal.title}
                goalDescription = {goal.description}
                goalDueDate = {goal.dueDate}
                checked = {goal.isCompleted}
                expanded = {goal.isExpanded}
                deleteGoal = {()=>props.deleteGoal(props.category,goal.id)}
                toggleCheck = {()=>props.checked(props.category,goal.id)}
                toogleContent={()=>props.expanded(props.category,goal.id)}/>
            );
        })

    }

    return(

        <GoalCategory 
            title = {props.category}
            categoryId = {props.id}
            onDelete={()=>props.deleteCategory(props.id)}
        >
            {goals}
        </GoalCategory>

    );

}


export default goalSet;