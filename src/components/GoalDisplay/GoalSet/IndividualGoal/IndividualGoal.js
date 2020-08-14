import React from 'react'
import CheckBox from '../../../UI/CheckBox/CheckBox'
import classes from './IndividualGoal.module.css'

const individualGoal = (props)=>(


    <div className={classes.IndividualGoal}>
        <CheckBox/>
        <p>{props.goalTitle}</p>
    </div>


);

export default individualGoal;