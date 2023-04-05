import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ReceiveMailList from "../../components/email/ReceiveMailList";
import ReceiveEmailDetail from "../../components/email/ReceiveEmailDetail";

function ReceiveMail() {
  const [selectedMailNo, setSelectedMailNo] = useState(null);
  const { receiveNo } = useParams();

  return selectedMailNo ? (
    <ReceiveEmailDetail receiveNo={selectedMailNo} />
  ) : (
    <ReceiveMailList
      category="receive"
      selectedMailNo={selectedMailNo}
      setSelectedMailNo={setSelectedMailNo}
    />
  );
}

export default ReceiveMail;
