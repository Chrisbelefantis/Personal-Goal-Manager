import React from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary';


const layout =(props)=>{

    return(

        <Aux>
            <div>Toolbar</div>
            <div>Sidedrawer</div>
            {props.children}
        </Aux>


    );
}

export default layout;