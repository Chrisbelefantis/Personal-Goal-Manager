import React from 'react';
import classes from './GoalContent.module.css'
import {Collapse} from 'react-collapse';




const GoalContent =(props)=>{


   
    
    let dueDate = null;
    let description = 'No Description';
    
    if(props.dueDate){
        let DateObject = new Date(props.dueDate);
        const displayDate = `${DateObject.getDay()}/${DateObject.getMonth()}/${DateObject.getFullYear()}`;

        dueDate =  <p>Due Date: <strong>{displayDate}</strong></p>
    }
    if(props.description){
        description = <p>{props.description}</p>;
    }
   

    return(
    <Collapse 
        isOpened = {props.visible}
        theme = {{collapse: classes.Collapse, content: classes.Content}}>
            <div>
            
                <React.Fragment>
                {description}
                {dueDate}
                </React.Fragment>
                
                
            </div>
    </Collapse>

    );
        
};



export default GoalContent