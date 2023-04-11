import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/member/Login";
import Register from "./pages/member/Register";
// import Error from "./pages/Error";
import Layout from "./layouts/Layout";
import Main from "./pages/Main";
import Todo from "./pages/todo/Todo";
import TodoSearch from "./pages/todo/TodoSearch";
import Schedule from "./pages/schedule/Schedule";

import Approval from "./pages/approval/Approval";
import ApprovalIn from "./pages/approval/ApprovalIn";

import ReportAdmin from "./pages/report/ReportAdmin";
import WorksReportAdmin from "./pages/report/WorksReportAdmin";
import WorksAll from "./components/worksReport/WorksAll";
import Board from "./pages/board/Board";
import PostingDetail from "./components/boards/PostingDetail";
import ApprovDetail from "./pages/approval/ApprovDetail";
import ApprovalOut from "./pages/approval/ApprovalOut";
import RegistApproval from "./pages/approval/RegistApproval";
import ApprovLineList from "./pages/approval/ApprovLineList";
import RegistLine from "./pages/approval/RegistLine";
import ModifyLine from "./pages/approval/ModifyLine";

import Employees from "./pages/employees/Employees";
import Management from "./pages/employees/Management";
import EmpRegister from "./pages/employees/Register";
import Modify from "./pages/employees/Modify";
import Detail from "./pages/employees/Detail";
import Transfer from "./pages/employees/Transfer";
import Evaluation from "./pages/employees/Evaluation";
import Email from "./pages/email/Email";
import SendMail from "./pages/email/SendMail";
import SendEmailDetail from "./components/email/SendEmailDetail";
import ReceiveEmailDetail from "./components/email/ReceiveEmailDetail";
import DeleteMail from "./pages/email/DeleteMail";

import ModifyApproval from "./pages/approval/ModifyApproval";

import Attendance from "./pages/attendance/Attendance";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/semof" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="todo" element={<Todo />} />
          <Route path="todo/search" element={<TodoSearch />} />
          <Route path="schedule" element={<Schedule />} />
          {/* <Route path="schedule/search" element={<ScheduleSearch />} /> */}

          <Route path="approval" element={<Approval />} />
          <Route path="inbox" element={<ApprovalIn />} />
          <Route path="outbox" element={<ApprovalOut />} />
          <Route path="regist-approval" element={<RegistApproval />} />
          <Route path="lines" element={<ApprovLineList />} />
          <Route path="add-line" element={<RegistLine />} />
          <Route path="modify-approval" element={<ModifyApproval />} />
          <Route path="board" element={<Board />} />
          <Route path="posting-detail/:boardNo" element={<PostingDetail />} />

          <Route path="report-admin" element={<ReportAdmin />} />
          <Route path="works-report-admin" element={<WorksReportAdmin />} />
          <Route path="test-worksAll" element={<WorksAll />} />
          <Route path="inbox/:approvNo" element={<ApprovDetail />} />
          <Route path="edit-line/:lineNo" element={<ModifyLine />} />

          <Route path="employees" element={<Employees />} />
          <Route path="employees/management" element={<Management />} />
          <Route path="employees/register" element={<EmpRegister />} />
          <Route path="employees/modify" element={<Modify />} />
          <Route path="employees/detail" element={<Detail />} />
          <Route path="employees/transfer" element={<Transfer />} />
          <Route path="employees/evaluation" element={<Evaluation />} />
          <Route path="email" element={<Email />} />
          <Route path="email/send" element={<SendMail />} />
          <Route path="email/send/:mailNo" element={<SendEmailDetail />} />
          <Route
            path="email/receive/:receiveNo"
            element={<ReceiveEmailDetail />}
          />
          <Route path="email/deleted" element={<DeleteMail />} />

          <Route path="attendance" element={<Attendance />} />
        </Route>

        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
