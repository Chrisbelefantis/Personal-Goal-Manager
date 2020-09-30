import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isAuthenticated: false,
    token: null,
    loading: false,
    isLocalStoragedChecked: false,
    error: null
};


const reducer = (state=initialState,action) =>{
    
    switch(action.type){
        case actionTypes.AUTH_STARTED:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.AUTH_SUCCESSFULL:
            return{
                ...state,
                loading: false,
                token: action.token,
                isAuthenticated: true
            }
        case actionTypes.AUTH_FAILED:
            return{
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.LOG_OUT:
            return{
                ...state,
                isAuthenticated:false,
                token: null
            }
        
        case actionTypes.LOCAL_STORAGE_CHECKED:
            return{
                ...state,
                isLocalStoragedChecked: true
            }
        default: 
            return state
    }

}


export default reducer;