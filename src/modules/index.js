import { combineReducers } from "redux";
import memberReducer from "./MemberModule";
import approvalReducer from "../modules/ApprovalModule";
import todoReducer from "./TodoModule";
import boardReducer from "./BoardModule";
import replyReducer from "./ReplyModule";
import empReducer from "./EmployeeModule";
import worksReportReducer from "./WorksModule";
import emailReducer from "./EmailModule";
import AttendanceReducer from "./AttendanceModule";
import registerEmpReducer from "./EmployeeModule";

const rootReducer = combineReducers({
  memberReducer,
  boardReducer,
  todoReducer,
  approvalReducer,
  replyReducer,
  empReducer,
  worksReportReducer

  emailReducer,
  AttendanceReducer,
  registerEmpReducer,
});

export default rootReducer;
