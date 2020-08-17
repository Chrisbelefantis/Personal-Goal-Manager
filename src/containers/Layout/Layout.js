import React from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const layout =(props)=>{

    return(

        <Aux>
            <Toolbar/>
            <div>Sidedrawer</div>
            {props.children}
        </Aux>


    );
}

export default layout;