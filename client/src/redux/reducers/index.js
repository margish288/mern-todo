import { combineReducers } from "redux";
import userReducer from "./userReducer";
import taskReducer, { allTaskReducer } from "./taskReducer";

const appReducers = combineReducers({
  user: userReducer,
  task: taskReducer,
  tasks: allTaskReducer,
});

const rootReducer = (state, action) => {
  let newState = state;
  if (action.type === "USER_LOGOUT") {
    newState = undefined;
  }

  return appReducers(newState, action);
};

export default rootReducer;
