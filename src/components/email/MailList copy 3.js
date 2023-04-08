import React from "react";
import { useSelector } from "react-redux";
import MailItem from "./MailItem";
import ReceiveEmailDetail from "./ReceiveEmailDetail";
import SendEmailDetail from "./SendEmailDetail";
import DeletedMailList from "./DeletedMailList"; // Import the new component
import Header from "./Header";
import MailListCSS from "./MailList.module.css";

function MailList({
  setSelectedMailNo,
  currentPage,
  setCurrentPage,
  selectedMailNo,
}) {
  const emailState = useSelector((state) => state.emailReducer);

  const allMails = [...(emailState.receivedEmails?.data ?? []), ...(emailState.sentEmails?.data ?? [])];
  const mailList = allMails.filter((email) => email.status === "Y");

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
          <DeletedMailDetail mailNo={selectedMailNo} /> // Render the new component for deleted mail details
        ) : (
          <ul>
            {mailList.map((email) => {
              const mailId = email.mailNo;
              return (
                <MailItem
                  key={mailId}
                  email={email}
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
