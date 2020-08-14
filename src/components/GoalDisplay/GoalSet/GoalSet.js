import React from 'react'
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import IndividualGoal from './IndividualGoal/IndividualGoal';


const goalSet =(props)=>{


    return(

        <Aux>
            {props.goals.map(goal=>{
                return (
                    <IndividualGoal key = {goal.id} goalTitle = {goal.title}/>
                );
            })}
           
        </Aux>

    );

}


export default goalSet;