import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initialState = {
    loginData: {},
    registerData: {},
    users: [],
    user: {},
    userWin: {} 
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "login_success":
            return { loginData: action.payload };
        case "register_success":
            return { registerData: action.payload };
        case "user_fetch_success":
            return { users: action.payload };
        case "userById_fetch_success":
            return { user: action.payload };
        case "userWin_patch_success":
            return { user: action.payload };
        default:
            return state;
    }
}

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
