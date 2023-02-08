import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT, SIGNUP_ERROR, SIGNUP_LOADING, SIGNUP_SUCCESS } from "./auth.types"

const init={
    isAuth:false,
    token:"",
    loading:false,
    error:false,
};
export const Authreducer=(state=init,{type,payload})=>{
    switch(type){

        case SIGNUP_LOADING: {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case LOGIN_LOADING:{
            return{
                ...state,
                loading:true,
                error:false
            }
        }
        case SIGNUP_ERROR: {
            return{
                ...state,
                loading: false,
                error: true
            }
        }
        case LOGIN_ERROR:{
            return{
                ...state,
                loading:false,
                error:true
            }
        }
        case SIGNUP_SUCCESS: {
            return {
                ...state, 
                loading: false,
                error: false,
                payload: payload
            }
        }
        case LOGIN_SUCCESS:{
            return{
                ...state,
                loading:false,
                error:false,
                token:payload.token,
                userData: payload,
                isAuth:true
            }
        }
        case LOGOUT:{
            return{
                ...state,
                isAuth:false,
                token:""
            }
        }

        default:{
            return state;
        }
    }
}