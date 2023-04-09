import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import MailItemCSS from "./MailItem.module.css";

function MailItem({ email, category, isSelected, mailNo, onSelectMailNo }) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const linkRoute =
    category === "send"
      ? `/semof/email/send/${email.mailNo}`
      : category === "receive"
      ? `/semof/email/receive/${email.receiveNo}`
      : "#"; // 휴지통에서는 빈 링크를 사용

  const senderName = email.senderName;
  // eslint-disable-next-line
  const name = senderName.replace(/\"?([^"]*)\"?\s*<(.+)>/, "$1").trim();

  const editedName = () => {
    return category === "send" ? (
      <span className={MailItemCSS.sender}>{email.senderName}</span>
    ) : (
      <span className={MailItemCSS.sender}>{name}</span>
    );
  };

  return (
    <div
      className={MailItemCSS.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <NavLink
        to={`${linkRoute}`}
        className={`${MailItemCSS.link} ${MailItemCSS.noUnderline}`}
      >
        <li className={MailItemCSS.listItem}>
          <div className={MailItemCSS.info}>
            <div className={MailItemCSS.senderWrapper}>{editedName()}</div>
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
