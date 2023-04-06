import React from "react";
import { NavLink } from "react-router-dom";
import MailItemCSS from "./MailItem.module.css";

function MailItem({ email, category, isSelected, mailNo, onSelectMailNo }) {
  const linkRoute =
    category === "send"
      ? `/semof/email/send/${email.mailNo}`
      : `/semof/email/receive/${email.receiveNo}`;

  // const handleClick = (e) => {
  //   e.preventDefault(); // Prevent default navigation
  //   onSelectMailNo(mailNo);
  // };
  // onClick = { handleClick };

  // 이름 처리
  const senderName = email.senderName;
  const startIdx = senderName.indexOf('"') + 1;
  const endIdx = senderName.lastIndexOf('"');
  const name = senderName.substr(startIdx, endIdx - startIdx);

  return (
    <div className={MailItemCSS.container}>
      <NavLink
        to={linkRoute}
        className={`${MailItemCSS.link} ${MailItemCSS.noUnderline}`}
      >
        <li className={MailItemCSS.listItem}>
          <div className={MailItemCSS.info}>
            <div className={MailItemCSS.senderWrapper}>
              <input
                type="checkbox"
                // checked={isChecked}
                // onChange={handleChange}
                className={MailItemCSS.checkBox}
              />
              <span className={MailItemCSS.sender}>{name}</span>
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
