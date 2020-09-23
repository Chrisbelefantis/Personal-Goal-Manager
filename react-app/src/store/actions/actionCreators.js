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
            console.log(res);
            dispatch(authSuccessfull(res.data.token));
            dispatch(checkAuthTimeout(res.data.expiresIn));
        })
        .catch(err=>{
            console.log(err)
            dispatch(authFailed(err))
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
    console.log('authfailed')
    return{
        type: actionTypes.AUTH_FAILED,
        error: err
    }
};

export const logOut = () =>{
    return{
        type: actionTypes.LOG_OUT
    }
;}