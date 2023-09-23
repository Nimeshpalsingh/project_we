export const LOGIN = 'LOGIN';

const initialState = {
    LoginData: null
};

export default (state = initialState, action) => {
    if (action.type === LOGIN) {
    
        return {
            ...state,
            LoginData: action.LoginData
        }
    } 
    return state;
};