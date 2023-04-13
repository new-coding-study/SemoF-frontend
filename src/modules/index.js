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
import tripReportReducer from "./TripModule";
import salesReportReducer from "./SalesModule";
import meetingReportReducer from "./MeetingModule";

const rootReducer = combineReducers({
  memberReducer,
  boardReducer,
  todoReducer,
  approvalReducer,
  replyReducer,
  empReducer,
  worksReportReducer,
  tripReportReducer,
  emailReducer,
  AttendanceReducer,
  registerEmpReducer,
  salesReportReducer,
  meetingReportReducer
});

export default rootReducer;
