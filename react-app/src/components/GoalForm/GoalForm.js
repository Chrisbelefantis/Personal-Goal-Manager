import React from 'react';
import Input from './Input/Input';

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
                    changed = {(event)=>props.onChangeHandler(event,element.elementLabel)}/>

            ))}
        </React.Fragment>

    );

}

export default goalForm;