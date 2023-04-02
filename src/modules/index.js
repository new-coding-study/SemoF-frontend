import { combineReducers } from "redux";
import memberReducer from "./MemberModule";
import approvalReducer  from "../modules/ApprovalModule"
import todoReducer from "./TodoModule";
import boardReducer from "./BoardModule";
import replyReducer from "./ReplyModule";

const rootReducer = combineReducers({
  memberReducer,
  boardReducer,
  todoReducer,
  approvalReducer,
  replyReducer
});

export default rootReducer;
