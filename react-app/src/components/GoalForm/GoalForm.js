import React from 'react';
import Input from './Input/Input';
import Button from '../UI/Button/Button';

const goalForm = (props)=>{

    let inputElementsArray = [];
    for(let key in props.formElements){
        inputElementsArray.push(props.formElements[key])
    }


    return(
        <React.Fragment>
            {inputElementsArray.map(element=>(
                <Input
                    key = {element.elementLabel}
                    label = {element.elementLabel}
                    elementType = {element.elementType}
                    elementConfig = {element.elementConfig}
                    elementTitle = {element.elementTitle}
                    isValid = {element.validity}
                    changed = {(event)=>props.changed(event,element.elementLabel)}/>

            ))}
            <Button 
                clicked={props.close}
                btnType='danger'>Close</Button>
            <Button 
                clicked={props.save}
                btnType='success'
                disabled = {!props.isFormValid}>Save</Button>


        </React.Fragment>

    );

}

export default goalForm;