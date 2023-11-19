import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initialState = {
 loginData :{},
 registerData: {}
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "login_success":
      console.log(action.payload);
      return { loginData: action.payload };
    case "register_success":
      return { registerData: action.payload };
    default:
      return state;
  }
}

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;