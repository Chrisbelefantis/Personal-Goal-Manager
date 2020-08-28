import React from 'react';
import classes from './GoalContent.module.css'
import {Collapse} from 'react-collapse';

const goalContent =(props)=>(

        <Collapse 
        isOpened = {props.visible}
        theme = {{collapse: classes.Collapse, content: classes.Content}}>
            <div>
                Hello
            </div>
        </Collapse>
        
);



export default goalContent