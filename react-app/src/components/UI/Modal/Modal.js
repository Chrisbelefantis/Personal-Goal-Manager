import React from 'react'
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const modal =(props)=>(

    <Aux>
        <Backdrop show/>
        <div className={classes.Modal}>
            {props.children}
        </div>
    </Aux>

);

export default modal;