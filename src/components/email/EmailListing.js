import React from "react";
import MailItem from "./MailItem";

function EmailListing({
  mailList,
  category,
  selectedMailNo,
  setSelectedMailNo,
}) {
  console.log("mailList in EmailListing: ", mailList);
  return (
    <ul>
      {mailList.map((email) => {
        const mailId = category === "receive" ? email.receiveNo : email.mailNo;
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
  );
}

export default EmailListing;
