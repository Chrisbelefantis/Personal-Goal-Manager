import React from 'react'
import Switch from "react-switch";
import classes from './Toggler.module.css';

const toggler = (props)=>(

    <div className={classes.Toggler}>
        <h4>{props.text}</h4>
        <label>
            <Switch 
                onChange={props.changed} 
                checked={props.isChecked} 
                onColor="#c9c9c9"
                onHandleColor="#5C7EAD"
                handleDiameter={18}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={45}
                />
        </label>
    </div>

);



export default toggler;