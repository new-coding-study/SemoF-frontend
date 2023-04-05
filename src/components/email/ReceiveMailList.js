import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { callTakeListAPI } from "../../apis/EmailAPICalls";
import MailList from "./MailList";

function ReceiveMailList({ selectedMailNo, setSelectedMailNo }) {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      callTakeListAPI({
        currentPage: currentPage,
        category: "receive",
      })
    );
  }, [currentPage, dispatch]);

  return (
    <MailList
      category="receive"
      selectedMailNo={selectedMailNo}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      onSelectMailNo={setSelectedMailNo}
    />
  );
}

export default ReceiveMailList;
