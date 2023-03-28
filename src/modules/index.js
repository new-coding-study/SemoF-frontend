import { combineReducers } from "redux";
import memberReducer from "./MemberModule";
import todoReducer from "./TodoModule";

const rootReducer = combineReducers({
  memberReducer,
  todoReducer,
});

export default rootReducer;
