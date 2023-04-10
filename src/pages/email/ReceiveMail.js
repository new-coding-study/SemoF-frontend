import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import ReceiveMailList from "../../components/email/ReceiveMailList";
import ReceiveEmailDetail from "../../components/email/ReceiveEmailDetail";

function ReceiveMail({ searchKeyword }) {
  const [selectedMailNo, setSelectedMailNo] = useState(null);
  // const { receiveNo } = useParams();

  return selectedMailNo ? (
    <ReceiveEmailDetail receiveNo={selectedMailNo} />
  ) : (
    <ReceiveMailList
      category="receive"
      selectedMailNo={selectedMailNo}
      setSelectedMailNo={setSelectedMailNo}
      searchKeyword={searchKeyword}
    />
  );
}

export default ReceiveMail;
