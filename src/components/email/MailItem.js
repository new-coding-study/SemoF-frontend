import React from "react";
import { NavLink } from "react-router-dom";
import MailItemCSS from "./MailItem.module.css";

function MailItem({ email, mailNo, onSelectEmail }) {
  const handleClick = () => {
    console.log("[MailItem] handleClick, email.mailNo: " + email.mailNo);
    onSelectEmail(email.mailNo);
  };

  return (
    <div className={MailItemCSS.container}>
      <NavLink
        to={`/semof/email/send/${email.mailNo}`}
        className={`${MailItemCSS.link} ${MailItemCSS.noUnderline}`}
      >
        <li className={MailItemCSS.listItem} onClick={handleClick}>
          <div className={MailItemCSS.info}>
            <div className={MailItemCSS.senderWrapper}>
              <input
                type="checkbox"
                // checked={isChecked}
                // onChange={handleChange}
                className={MailItemCSS.checkBox}
              />
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
      </NavLink>
    </div>
  );
}

export default MailItem;
