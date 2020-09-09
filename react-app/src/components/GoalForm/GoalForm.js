import React from 'react';
import Input from './Input/Input';
import Button from '../UI/Button/Button';
import classes from './GoalForm.module.css';

const goalForm = (props)=>{

    let inputElementsArray = [];
    for(let key in props.formElements){
        inputElementsArray.push(props.formElements[key])
    }


    return(
        <div className={classes.GoalForm}>
            {inputElementsArray.map(element=>(
                <Input
                    key = {element.elementLabel}
                    label = {element.elementLabel}
                    elementType = {element.elementType}
                    elementConfig = {element.elementConfig}
                    elementTitle = {element.elementTitle}
                    isValid = {element.validity}
                    isTouched = {element.touched}
                    changed = {(event)=>props.changed(event,element.elementLabel)}/>

            ))}
            <div className={classes.Buttons}>
                <Button 
                    clicked={props.close}
                    btnType='danger'>Close</Button>
                <Button 
                    clicked={props.save}
                    btnType='success'
                    disabled = {!props.isFormValid}>Save</Button>
            </div>


        </div>

    );

}

export default goalForm;