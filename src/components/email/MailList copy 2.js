import React, { useState, useEffect } from "react";
import MailListCSS from "./MailList.module.css";
import MailItem from "./MailItem";
import Header from "./Header";
import { useSelector } from "react-redux";
import SendEmailDetail from "./SendEmailDetail";
import ReceiveEmailDetail from "./ReceiveEmailDetail";

function MailList({
  category,
  status,
  emails,
  setSelectedMailNo,
  currentPage,
  setCurrentPage,
  selectedMailNo,
}) {
  const emailState = useSelector((state) => state.emailReducer);

  let receivedMails = emailState.receivedEmails?.data ?? [];

  console.log("[MailList] receivedMails : " + JSON.stringify(receivedMails));

  let sentMails = emailState.sentEmails?.data ?? [];

  console.log("[MailList] sentMails : " + JSON.stringify(sentMails));

  let deletedMails = emailState.deleteEmails?.data ?? [];

  console.log("[MailList] deletedMails : " + JSON.stringify(deletedMails));

  let mailList;

  if (status === "Y") {
    if (category === "receive") {
      mailList = deletedMails.filter((email) => email.category === "receive");
    } else if (category === "send") {
      mailList = deletedMails.filter((email) => email.category === "send");
    } else {
      mailList = deletedMails;
    }
  } else {
    if (category === "receive") {
      mailList = receivedMails;
    } else if (category === "send") {
      mailList = sentMails;
    }
  }

  // console.log("[MailList] emailState : " + JSON.stringify(emailState));

  const pageInfo = emailState.pageInfo;

  // console.log("[MailList] pageInfo : " + JSON.stringify(pageInfo));

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
          category === "receive" ? (
            <ReceiveEmailDetail receiveNo={selectedMailNo} />
          ) : (
            <SendEmailDetail mailNo={selectedMailNo} />
          )
        ) : (
          <ul>
            {mailList.map((email) => {
              const mailId =
                category === "receive" ||
                (category === "all" && email.receiveNo)
                  ? email.receiveNo
                  : email.mailNo;

              const itemCategory =
                category === "all" && email.receiveNo ? "receive" : category;

              return (
                <MailItem
                  key={mailId}
                  email={email}
                  category={itemCategory}
                  isSelected={mailId === selectedMailNo}
                  mailNo={mailId}
                  // setSelectedMailNo={setSelectedMailNo}
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
