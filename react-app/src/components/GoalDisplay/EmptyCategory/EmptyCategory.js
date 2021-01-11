import React from 'react';
import GoalCategory from '../GoalSet/GoalCategory/GoalCategory';
import PlusIcon from '../../UI/PlusIcon/PlusIcon';
import classes from './EmptyCategory.module.css'

const emptyCategory=(props)=>{

    return(
        <div className={classes.EmptyCategory}>        
            <GoalCategory 
            title={props.category}
            categoryId = {props.id}
            onDelete = {()=>props.deleteCategory(props.id,true)} 
            />  
            
            <div className={classes.AddNewGoal}>
                <p>Add new goal</p>
                <PlusIcon size='small'/>
            </div>

        </div> 
    );


}

export default emptyCategory;