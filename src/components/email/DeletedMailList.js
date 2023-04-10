import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { callGetDelteListAPI } from "../../apis/EmailAPICalls";
import MailList from "./MailList";

function DeletedMailList({ onSelectMail }) {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

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
      category=""
      status="Y"
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      onSelectMail={onSelectMail}
    />
  );
}

export default DeletedMailList;
