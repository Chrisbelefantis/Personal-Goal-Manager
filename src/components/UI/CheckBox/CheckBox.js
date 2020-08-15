import React from 'react'
import IconCheck from './Icons/IconCheck'
import IconUnchecked from './Icons/IconUnchecked'
import classes from './CheckBox.module.css'

const checkBox=(props)=> {


   const checkboxState = props.checked ? <IconCheck /> : <IconUnchecked />
  

 
    return (
      <button 
        className={ classes.CheckBox} 
        onClick={props.click}>
        <div className={ classes.Check }>
          { checkboxState }
        </div>
      </button>
    );
  
}

export default checkBox;