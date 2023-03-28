import { combineReducers } from "redux";
import memberReducer from "./MemberModule";
import boardReducer from "./BoardModule";
import todoReducer from "./TodoModule";

const rootReducer = combineReducers({
  memberReducer,
  todoReducer,
  boardReducer,
});

export default rootReducer;
