import React from 'react';
import classes from './Moto.module.css';

const moto=(props)=>{

    let motoClasses = [classes.Moto];

    if(props.inDrawer){
        motoClasses.push(classes.InDrawer);
    }
    
    return(
        <div className={motoClasses.join(' ')}>
            Dream - Plan - Accomplish
        </div>
    );

};

export default moto;