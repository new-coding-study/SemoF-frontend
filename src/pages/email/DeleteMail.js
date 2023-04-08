import React, { useState } from "react";
import DeletedMailList from "../../components/email/DeletedMailList";

function DeleteMail() {
  const [selectedMailNo, setSelectedMailNo] = useState(null);

  return (
    <DeletedMailList
      selectedMailNo={selectedMailNo}
      setSelectedMailNo={setSelectedMailNo}
    />
  );
}

export default DeleteMail;
