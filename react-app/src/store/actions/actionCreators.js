import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';
 
export const auth = (email,password,isSignup) =>{
    return (dispatch) =>{
        dispatch(authStarted());
        
        const authData ={
            email: email,
            password: password
        }

        let url = 'users/login'
        if(isSignup){
            url = 'users/signup';
        }

        axios.post(url,authData)
        .then(res=>{
            
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn*1000);
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('expirationTime',expirationDate );
            dispatch(authSuccessfull(res.data.token));
            dispatch(checkAuthTimeout(res.data.expiresIn));
        })
        .catch(err=>{
          
            dispatch(authFailed(err.response.data.message))
        })



    }
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        
        setTimeout(() => {
            
            dispatch(logOut());
        }, expirationTime * 1000);
    };
};


export const authStarted = ()=>{
    return{
        type: actionTypes.AUTH_STARTED
    }
};

export const authSuccessfull = (token)=>{
  
    return{
        type: actionTypes.AUTH_SUCCESSFULL,
        token: token
    }
};

export const authFailed = (err) =>{
   
    return{
        type: actionTypes.AUTH_FAILED,
        error: err
    }
};

export const logOut = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return{
        type: actionTypes.LOG_OUT
    }
;}


export const localStorageChecked = () =>{
    return{
        type: actionTypes.LOCAL_STORAGE_CHECKED
    }
};


export const authCheckState = () =>{
   
   console.log("checkAuth")
    return dispatch=>{
        const token = localStorage.getItem('token');
       
        if(!token){
            dispatch(logOut());
            dispatch(localStorageChecked());
           
        }else{
            const expirationTime =new Date(localStorage.getItem('expirationTime'));
            const currentTime = new Date();

            if(expirationTime.getTime() < currentTime.getTime()){
                dispatch(logOut());
                dispatch(localStorageChecked());
               
            }else{
                dispatch(authSuccessfull(token));
                dispatch(checkAuthTimeout((expirationTime.getTime()- currentTime.getTime())/1000));
                dispatch(localStorageChecked());
            }
        }

    }
};