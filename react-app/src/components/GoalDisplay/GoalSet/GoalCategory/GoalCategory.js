import React, { useState } from 'react'
import DisplayCategory from './DisplayCategory/DisplayCategory';
import EditCategory from './EditCategory/EditCategory';
import classes from './GoalCategory.module.css'


const GoalCategory = (props)=>{

    const [editMode,setEditMode] = useState(false);
    const [title,setTitle] = useState(props.title);


    const clickHandler=()=>{

        setEditMode(true);
    }

    let content = <DisplayCategory text = {title} clicked = {clickHandler}/>
    if(editMode){
        content = <EditCategory 
            text = {title} 
            id = {props.categoryId}
            categoryDelete = {props.onDelete}
            changed = {setTitle}
            save = {setEditMode}
        
        />;
    }

    

   
    return(
        <div className={classes.GoalCategory}>
            {content}
            {props.children}
        </div>
    );
};



export default GoalCategory;