import { combineReducers } from "redux";
import memberReducer from "./MemberModule";
import approvalReducer  from "../modules/ApprovalModule"
import todoReducer from "./TodoModule";
import boardReducer from "./BoardModule";

const rootReducer = combineReducers({
  memberReducer,
  boardReducer,
  todoReducer,
  approvalReducer
});

export default rootReducer;
