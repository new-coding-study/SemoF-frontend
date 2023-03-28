import { combineReducers } from "redux";
import memberReducer from "./MemberModule";
import approvalReducer  from "../modules/ApprovalModule"

const rootReducer = combineReducers({
  memberReducer,

  approvalReducer
});

export default rootReducer;
