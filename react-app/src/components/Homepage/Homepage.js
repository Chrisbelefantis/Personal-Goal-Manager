import React, {  useState } from 'react';
import classes from './Homepage.module.css';
import Button from '../../components/UI/Button/Button';
import Auth from '../../containers/Auth/Auth';



const Homepage = (props)=>{

    const [displayAuth, setDisplayAuth] = useState(false);


    const toogleAuth=()=>{
        setDisplayAuth(!displayAuth);
    }


    return(
        <div  className={classes.Homepage}>
            <h1>Welcome to your personal goal manager app.</h1>
            <p>This is a tool that will help you keep track of your goals.
                Use this app to motivate yourself setting goals and make progress
                towards them. Because remember, <strong>your future is determined by your
                present actions.</strong>
            </p>
            <Button disabled = {displayAuth} clicked = {toogleAuth} btnType="success"> Continue </Button>
        
            {displayAuth ? <Auth/> : null} 

           

        </div>


        
    );
}


export default Homepage;