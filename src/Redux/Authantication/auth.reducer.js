import { 
  GET_USERS, 
  LOGIN_ERROR, 
  LOGIN_REQUEST, 
  LOGIN_SUCCESSFUL, 
  LOGOUT_USER, 
  REGISTER_ERROR, 
  REGISTER_REQUEST, 
  REGISTER_SUCCESSFUL 
} from "./auth.actionType"

const initialState = {
    activeUser: JSON.parse(localStorage.getItem('MkuserData')) || {},
    isAuth: JSON.parse(localStorage.getItem('MkisAuth')) || false,
    isError: false,
    isLoading: false,
    user: []
}

export const LoginReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case LOGIN_REQUEST : 
            return { ...state, isLoading: true }
        case LOGIN_SUCCESSFUL : 
            return { ...state, isAuth: true, isLoading: false, activeUser: payload }
        case LOGIN_ERROR : 
            return { ...state, isLoading: false, isError: true }
        
        case REGISTER_REQUEST : 
            return { ...state, isLoading: true }
        case REGISTER_SUCCESSFUL : 
            return { ...state, isAuth: true, isLoading: false, activeUser: payload }
        case REGISTER_ERROR : 
            return { ...state, isLoading: false, isError: true }

        case GET_USERS : 
            return { ...state, isLoading: false, isError: false, user: payload }

        case LOGOUT_USER : 
            return { ...state, isLoading: false, isError: false, activeUser: {}, isAuth: false }

        default: 
            return state
    }
}
