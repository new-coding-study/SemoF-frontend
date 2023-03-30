import { combineReducers } from "redux";
import memberReducer from "./MemberModule";
import approvalReducer  from "../modules/ApprovalModule"
import todoReducer from "./TodoModule";
import boardReducer from "./BoardModule";
import AttendanceReducer from "./AttendanceModule";

const rootReducer = combineReducers({
  memberReducer,
  boardReducer,
  todoReducer,
  approvalReducer,
  AttendanceReducer
});

export default rootReducer;
