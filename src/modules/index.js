import { combineReducers } from "redux";
import memberReducer from "./MemberModule";
import approvalReducer from "../modules/ApprovalModule";
import todoReducer from "./TodoModule";
import boardReducer from "./BoardModule";
import registerEmpReducer from "./EmployeeModule";

const rootReducer = combineReducers({
  memberReducer,
  boardReducer,
  todoReducer,
  approvalReducer,
  registerEmpReducer,
});

export default rootReducer;
