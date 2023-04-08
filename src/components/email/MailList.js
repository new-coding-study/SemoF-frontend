import React from "react";
import MailListCSS from "./MailList.module.css";
import MailItem from "./MailItem";
import Header from "./Header";
import { useSelector } from "react-redux";
import SendEmailDetail from "./SendEmailDetail";
import ReceiveEmailDetail from "./ReceiveEmailDetail";
import DeletedMailDetail from "./DeletedMailDetail";

function MailList({
  category,
  setSelectedMailNo,
  currentPage,
  setCurrentPage,
  selectedMailNo,
  status,
}) {
  const emailState = useSelector((state) => state.emailReducer);

  let mailList = [];

  if (status === "Y") {
    // Show deleted mails
    const allMails = [
      ...(emailState.receivedEmails?.data ?? []),
      ...(emailState.sentEmails?.data ?? []),
    ];
    mailList = allMails.filter((email) => email.status === "Y");
  } else {
    mailList =
      category === "receive"
        ? emailState.receivedEmails?.data ?? []
        : emailState.sentEmails?.data ?? [];
  }

  console.log("[MailList] emailState : " + JSON.stringify(emailState));

  const pageInfo = emailState.pageInfo;

  const pageNumber = [];

  if (pageInfo) {
    for (let i = 1; i <= pageInfo.endPage; i++) {
      pageNumber.push(i);
    }
  }

  return (
    <>
      <Header
        currentPage={currentPage}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
      <div className={MailListCSS.mailList}>
        {selectedMailNo ? (
          status === "Y" ? (
            <DeletedMailDetail mailNo={selectedMailNo} />
          ) : category === "receive" ? (
            <ReceiveEmailDetail receiveNo={selectedMailNo} />
          ) : (
            <SendEmailDetail mailNo={selectedMailNo} />
          )
        ) : (
          <ul>
            {mailList.map((email) => {
              const mailId =
                category === "receive" ? email.receiveNo : email.mailNo;
              return (
                <MailItem
                  key={mailId}
                  email={email}
                  category={category}
                  isSelected={mailId === selectedMailNo}
                  mailNo={mailId}
                  onSelectMailNo={setSelectedMailNo}
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
