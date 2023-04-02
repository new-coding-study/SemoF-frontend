import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/member/Login";
import Register from "./pages/member/Register";
import Error from "./pages/Error";
import Layout from "./layouts/Layout";
import Main from "./pages/Main";
import Todo from "./pages/todo/Todo";

import Approval from "./pages/approval/Approval";
import ApprovalList from "./pages/approval/Approval";
import Board from "./pages/board/Board";

import Hr from "./pages/hr/HRMain";
import NoticeDetail from "./components/boards/NoticeDetail";
import PostingDetail from "./components/boards/PostingDetail";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/semof" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="todo" element={<Todo />} />

          <Route path="approval" element={<Approval/>} />

          <Route path="board" element={<Board />} />
          <Route path="notice-detail/:boardNo" element={<NoticeDetail/>}/>
          <Route path="posting-detail/:boardNo" element={<PostingDetail/>}/>
          <Route path="hr" element={<Hr />} />


        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
