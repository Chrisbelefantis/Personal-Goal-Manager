import React from 'react'
import Switch from "react-switch";
import classes from './ToogleEmptyCategories.module.css';

const toogleEmptyCategories = (props)=>(

    
    <label className={classes.ToogleEmptyCategories}>
        <h4>Show Empty Categories</h4>
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
   

);



export default toogleEmptyCategories;