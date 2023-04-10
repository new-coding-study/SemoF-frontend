import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { callSendListAPI } from "../../apis/EmailAPICalls";
import MailList from "./MailList";

function SendMailList({ selectedMailNo }) {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      callSendListAPI({
        currentPage: currentPage,
        category: "send",
      })
    );
  }, [currentPage, dispatch]);

  return (
    <MailList
      category="send"
      selectedMailNo={selectedMailNo}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
}

export default SendMailList;
