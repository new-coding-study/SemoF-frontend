import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MailList from "../../components/email/MailList";

function ReceiveMail() {
  const location = useLocation();
  const [mailList, setMailList] = useState([]);

  useEffect(() => {
    if (location.state && location.state.category === "receive") {
      // 받은 메일함 목록을 불러와서 mailList 상태에 저장
      // 예시) axios.get("/api/mail/receive").then(response => setMailList(response.data));
      setMailList([
        {
          id: 1,
          from: "sender@example.com",
          subject: "Hello, World!",
          date: "2022-04-04 14:30",
          content: "This is a test email.",
        },
        // ...
      ]);
    }
  }, [location.state]);

  return <MailList category="receive" emailList={mailList} />;
}

export default ReceiveMail;
