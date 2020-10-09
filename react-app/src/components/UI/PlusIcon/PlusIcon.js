import React from 'react';
import classes from './PlusIcon.module.css';

const PlusIcon = (props) =>{

    return(
        <div onClick={props.clicked} className = {classes.PlusIcon}>
            <h1>+</h1>
        </div>
    );
}

export default PlusIcon;