import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/member/Login";
import Register from "./pages/member/Register";
import Error from "./pages/Error";
import Layout from "./layouts/Layout";
import Main from "./pages/Main";
import Todo from "./pages/todo/Todo";

import Approval from "./pages/approval/Approval";
import ApprovalIn from "./pages/approval/ApprovalIn";
import Board from "./pages/board/Board";

import NoticeDetail from "./components/common/boards/NoticeDetail";
import PostingDetail from "./components/common/boards/PostingDetail";

import ApprovalOut from "./pages/approval/ApprovalOut";
import RegistApproval from "./pages/approval/RegistApproval";
import ApprovLineList from "./pages/approval/ApprovLineList";
import RegistLine from "./pages/approval/RegistLine";

import Employees from "./pages/employees/Employees";
import EmpRegister from "./pages/employees/Register";
import Transfer from "./pages/employees/Transfer";

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
          <Route path="add-approval" element={<RegistApproval />} />

          <Route path="board" element={<Board />} />

          <Route path="approval" element={<Approval/>}/>
          <Route path="inbox" element={<ApprovalIn/>}/>
          <Route path="outbox" element={<ApprovalOut/>}/>
          <Route path="regist-approval" element={<RegistApproval/>}/>
          <Route path="lines" element={<ApprovLineList/>}/>
          <Route path="add-line" element={<RegistLine/>}/>

          <Route path="board" element={<Board />} />

          <Route path="notice-detail/:boardNo" element={<NoticeDetail/>}/>
          <Route path="posting-detail/:boardNo" element={<PostingDetail/>}/>

          <Route path="employees" element={<Employees />} />
          <Route path="employees/register" element={<EmpRegister />} />
          <Route path="employees/transfer" element={<Transfer />} />
        </Route>

        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
