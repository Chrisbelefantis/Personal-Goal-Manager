import React from 'react';
import { Icon } from '@iconify/react';
import trashcanIcon from '@iconify/icons-octicon/trashcan';
import classes from './Trashcan.module.css';

const trashcan = (props)=>(

    <div className={classes.Trashcan} onClick = {props.click}>
        <Icon icon={trashcanIcon} color="#fffd7a" />
   </div>

);



export default trashcan;