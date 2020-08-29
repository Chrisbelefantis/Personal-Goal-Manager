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
            
                if(!result.data.description){
                    setContent("No Description")
                }else{
                    setContent(result.data.description);
                }
                
            
            })
            .catch(err=>{
                console.log(err);
            });
        }

    },[props.visible,props.goalID]);


    return(
    <Collapse 
        isOpened = {props.visible}
        theme = {{collapse: classes.Collapse, content: classes.Content}}>
            <div>
                {content}
            </div>
        </Collapse>
    );
        
};



export default GoalContent