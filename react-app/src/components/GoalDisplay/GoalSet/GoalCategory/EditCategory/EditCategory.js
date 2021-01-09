import React from 'react'
import Button from '../../../../UI/Button/Button';
import AutosizeInput from 'react-input-autosize';
import Trashcan from '../../../../UI/GoalHeading/Trashcan/Trashcan';
import axios from '../../../../../axios-instance';

const editCategory=(props)=>{


    const title = props.text.charAt(0).toUpperCase() + props.text.slice(1)

    const onChangeHandler=(event)=>{
        props.changed(event.target.value)
    }

    const saveHandler=()=>{
        
        axios.patch('/categories/'+props.id,{title:title})
        .then(()=>{
            props.save(false);
        })
        .catch(err=>{
            console.log(err);
        })
    }


    return(
        <React.Fragment>
            <AutosizeInput 
                type='text' 
                value = {title} 
                onChange={onChangeHandler}
                autoFocus 
                inputStyle={{
                    fontSize: '1.5em',
                    color:'#5C7EAD',
                    fontWeight: 'bolder',
                    border:'transparent',
                    outline:'none',
                    backgroundColor: 'inherit'
                }}
                />
            <Button btnType='success' clicked={saveHandler}>Save</Button>
            <Trashcan  click = {props.categoryDelete}/>
        </React.Fragment>
    );
}

export default editCategory;