import React, { useState, useEffect } from "react";
import MailListCSS from "./MailList.module.css";
import MailItem from "./MailItem";
import Header from "./Header";
import { useSelector } from "react-redux";
import SendEmailDetail from "./SendEmailDetail";
import ReceiveEmailDetail from "./ReceiveEmailDetail";

function MailList({
  category,
  emails,
  setSelectedMailNo,
  currentPage,
  setCurrentPage,
  selectedMailNo,
}) {
  const emailState = useSelector((state) => state.emailReducer);

  const mailList =
    category === "receive"
      ? emailState.receivedEmails?.data ?? []
      : emailState.sentEmails?.data ?? [];

  console.log("[MailList] emailState : " + JSON.stringify(emailState));

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
                category === "receive" ? email.receiveNo : email.mailNo;
              return (
                <MailItem
                  key={mailId}
                  email={email}
                  category={category}
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
