import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { callGetDelteListAPI } from "../../apis/EmailAPICalls";
import MailList from "./MailList";

function DeletedMailList({ selectedMailNo, setSelectedMailNo }) {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  console.log("[DeleteMailList] selectedMailNo : " + selectedMailNo);

  useEffect(() => {
    console.log("[DeleteMailList] useEffect called");
    dispatch(
      callGetDelteListAPI({
        currentPage: currentPage,
      })
    );
  }, [currentPage, dispatch]);

  return (
    <MailList
      status="Y"
      selectedMailNo={selectedMailNo}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      onSelectMailNo={setSelectedMailNo}
    />
  );
}

export default DeletedMailList;
