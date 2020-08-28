import React from 'react';
import classes from './Spinner.module.css';

const spinner = (props)=>(

    <div className={classes.skcase}>
        <div className={classes.skchasedot}></div>
        <div className={classes.skchasedot}></div>
        <div className={classes.skchasedot}></div>
        <div className={classes.skchasedot}></div>
        <div className={classes.skchasedot}></div>
        <div className={classes.skchasedot}></div>
    </div>


);

export default spinner;