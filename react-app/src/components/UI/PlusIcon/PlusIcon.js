import React, { useState } from 'react';


const PlusIcon = (props) =>{

    //I used this method for the style because I wanted the width
    //and heigth to be controlled dynamically from the props
    const [isHovered,setIconHover] = useState(false);
    
    
    const styles = {
        PlusIcon: {
            margin: props.size==='small'?'0':'0 auto 0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: props.size==='small'?'30px':'90px',
            height: props.size==='small'?'30px':'90px',
            borderRadius: '50px',
            backgroundColor: '#ccc'
        },
        PlusIconHover:{
            margin: props.size==='small'?'0':'0 auto 0 auto',
            backgroundColor: 'rgb(190, 190, 190)',
            width: props.size==='small'?'30px':'90px',
            height: props.size==='small'?'30px':'90px',
            borderRadius: '50px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        PlusSymbol:{
            boxSizing : 'border-box',
            fontSize : props.size==='small'?'23px':'73px',
            fontWeight : 'lighter'
        }
    }

    

    return(
        <div 
            onClick={props.clicked} 
            onPointerEnter={()=>setIconHover(true)}
            onPointerLeave={()=>setIconHover(false)}
            style = {isHovered? styles.PlusIconHover: styles.PlusIcon}>
            <h1 style = {styles.PlusSymbol}>+</h1>
        </div>
    );
}

export default PlusIcon;