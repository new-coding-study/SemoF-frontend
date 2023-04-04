import React from "react";
import MailListCSS from "./MailList.module.css";
import MailItem from "./MailItem";
import Header from "./Header";

function MailList({ category, emailList = [] }) {
  const filteredEmails =
    category === "send"
      ? emailList.filter((email) => email.category === "send")
      : emailList.filter((email) => email.category === "receive");

  return (
    <>
      <Header />
      <div className={MailListCSS.mailList}>
        <ul>
          {filteredEmails.map((email) => (
            <MailItem key={email.id} email={email} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default MailList;
