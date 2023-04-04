import React from "react";
import MailListCSS from "./MailList.module.css";
import MailItem from "./MailItem";
import Header from "./Header";

function MailList(props) {
  const emails = [
    {
      id: 1,
      sender: "John Doe",
      subject: "Meeting Request",
      date: "10:00 AM",
      body: "Hi, I'd like to schedule a meeting with you next week. Are you available?",
    },
    {
      id: 2,
      sender: "Jane Smith",
      subject: "Reminder: Staff Meeting",
      date: "9:00 AM",
      body: "Don't forget that we have a staff meeting at 2:00 PM today in the conference room.",
    },
  ];

  return (
    <>
      <Header />
      <div className={MailListCSS.mailList}>
        <ul>
          {emails.map((email) => (
            <MailItem key={email.id} email={email} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default MailList;
