import React from 'react'


const displayGoal =(props)=>{

  
    const title = props.text.charAt(0).toUpperCase() + props.text.slice(1)

    return(
        <h2 onClick={props.clicked}>{title}</h2>
    );

}

export default displayGoal;