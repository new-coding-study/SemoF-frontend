import { combineReducers } from "redux";
import memberReducer from "./MemberModule";
import todoReducer from "./TodoModule";
import boardReducer from "./BoardModule";

const rootReducer = combineReducers({
  memberReducer,
  boardReducer
  todoReducer,
});

export default rootReducer;
