import React, { useEffect, useState } from 'react';
import classes from './GoalContent.module.css'
import {Collapse} from 'react-collapse';
import axios from '../../../../axios-instance';



const GoalContent =(props)=>{


    const [content,setContent] = useState(null);
    

    useEffect(()=>{

        if(props.visible){
            axios.get('goals/'+props.goalID)
            .then(result=>{
            
                let description = null;
                let date = null;

                if(result.data.description){
                    description = result.data.description
                }
                if(result.data.dueDate){
                    date = result.data.dueDate
                }

                setContent({
                    description: description,
                    date: date
                });
                
            
            })
            .catch(err=>{
                console.log(err);
            });
        }
        
    },[props.visible,props.goalID]);

    
    let dueDate = null;
    let description = 'No Description';
    if(content){
        if(content.date){
            dueDate =  <p>Due Date: <strong>{content.date}</strong></p>
        }
        if(content.description){
            description = <p>{content.description}</p>;
        }
    }

    return(
    <Collapse 
        isOpened = {props.visible}
        theme = {{collapse: classes.Collapse, content: classes.Content}}>
            <div>
                {content ?
                    <React.Fragment>
                    {description}
                    {dueDate}
                    </React.Fragment>
                :null}
                
            </div>
    </Collapse>

    );
        
};



export default GoalContent