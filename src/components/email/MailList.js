import React, { useState, useEffect } from "react";
import MailListCSS from "./MailList.module.css";
import MailItem from "./MailItem";
import Header from "./Header";
import { useSelector } from "react-redux";
import SendEmailDetail from "./SendEmailDetail";
import ReceiveEmailDetail from "./ReceiveEmailDetail";

function MailList({ category, selectedMailNo, currentPage, setCurrentPage }) {
  const mails = useSelector((state) => state.emailReducer);
  const mailList = mails.data;

  console.log("[MailList] mails : " + JSON.stringify(mails));

  const pageInfo = mails.pageInfo;

  console.log("[MailList] pageInfo : " + JSON.stringify(pageInfo));

  const pageNumber = [];

  if (pageInfo) {
    for (let i = 1; i <= pageInfo.endPage; i++) {
      pageNumber.push(i);
    }
  }

  const [filteredEmails, setFilteredEmails] = useState([]);

  useEffect(() => {
    if (mailList) {
      const filteredEmails =
        mailList.filter((email) => email.category === category) ?? [];
      setFilteredEmails(filteredEmails);
    }
  }, [mailList, category]);

  return (
    <>
      <Header
        currentPage={currentPage}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
      <div className={MailListCSS.mailList}>
        {selectedMailNo ? (
          category === "receive" ? (
            <ReceiveEmailDetail receiveNo={selectedMailNo} />
          ) : (
            <SendEmailDetail mailNo={selectedMailNo} />
          )
        ) : (
          <ul>
            {filteredEmails.map((email) => {
              const mailId =
                category === "receive" ? email.receiveNo : email.mailNo;

              return (
                <MailItem
                  key={mailId}
                  email={email}
                  category={category}
                  isSelected={mailId === selectedMailNo}
                  mailNo={mailId}
                />
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}

export default MailList;
