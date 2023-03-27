import { combineReducers } from "redux";
import memberReducer from "./MemberModule";
import boardReducer from "./BoardModule";

const rootReducer = combineReducers({
  memberReducer,
  boardReducer
});

export default rootReducer;
