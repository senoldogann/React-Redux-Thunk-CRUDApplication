import * as types from "./actionType";
const initialState = {
    users: [],
    user: {},
    loading: true
}

const usersReducers = (state = initialState , action) => {
    switch(action.type){
           // FOR USERS LIST
        case types.GET_USERS:
            return{
                ...state,
                users:action.payload,
                loading:false,
            }
            
           // FOR DELETE USER
           // FOR ADD USER
           // FOR UPDATE  USER
        case types.DELETE_USER:
        case types.ADD_USER:
        case types.UPDATE_USER:
            return{
                ...state,
                loading:false,
            }

            // FOR EDIT USER
        case types.GET_SINGLE_USER:
            return{
                ...state,
                user:action.payload,
                loading:false,
            }
        default:
            return state;
    }
}

export default usersReducers;