import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/member/Login";
import Register from "./pages/member/Register";
import Error from "./pages/Error";
import Layout from "./layouts/Layout";
import Main from "./pages/Main";
import Todo from "./pages/todo/Todo";

import Approval from "./pages/approval/Approval";
import ApprovalIn from "./pages/approval/ApprovalIn";

import ReportAdmin from "./pages/report/ReportAdmin";
import WorksReportAdmin from "./pages/report/WorksReportAdmin"
import WorksAll from "./components/worksReport/WorksAll";
import Board from "./pages/board/Board";
import PostingDetail from "./components/boards/PostingDetail";

import ApprovalOut from "./pages/approval/ApprovalOut";
import RegistApproval from "./pages/approval/RegistApproval";
import ApprovLineList from "./pages/approval/ApprovLineList";
import RegistLine from "./pages/approval/RegistLine";

import Employees from "./pages/employees/Employees";
import EmpRegister from "./pages/employees/Register";
import Transfer from "./pages/employees/Transfer";
import Evaluation from "./pages/employees/Evaluation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/semof" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="todo" element={<Todo />} />

          <Route path="approval" element={<Approval />} />
          <Route path="inbox" element={<ApprovalIn />} />
          <Route path="outbox" element={<ApprovalOut />} />
          <Route path="regist-approval" element={<RegistApproval />} />
          <Route path="lines" element={<ApprovLineList />} />
          <Route path="add-line" element={<RegistLine />} />

          <Route path="board" element={<Board />} />
          <Route path="posting-detail/:boardNo" element={<PostingDetail/>}/>

          <Route path="report-admin" element={<ReportAdmin/>}/>
          <Route path="works-report-admin" element={<WorksReportAdmin/>}/>
          <Route path="test-worksAll" element = {<WorksAll/>}/>
          <Route path="employees" element={<Employees />} />
          <Route path="employees/register" element={<EmpRegister />} />
          <Route path="employees/transfer" element={<Transfer />} />
          <Route path="employees/evaluation" element={<Evaluation />} />
        </Route>

        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
