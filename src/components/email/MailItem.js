import React from "react";
import MailItemCSS from "./MailItem.module.css";

function MailItem({ email }) {
  return (
    <div className={MailItemCSS.container}>
      <li className={MailItemCSS.listItem}>
        <div className={MailItemCSS.info}>
          <div className={MailItemCSS.senderWrapper}>
            <span className={MailItemCSS.sender}>{email.senderName}</span>
          </div>
          <div className={MailItemCSS.subjectWrapper}>
            <span className={MailItemCSS.subject}>{email.title}</span>
          </div>
        </div>
        <div className={MailItemCSS.body}>
          <p>{email.content}</p>
        </div>
        <div className={MailItemCSS.infoDate}>
          <span className={MailItemCSS.date}>{email.sendDate}</span>
        </div>
      </li>
    </div>
  );
}

export default MailItem;
