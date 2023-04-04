import React from "react";
import MailListCSS from "./MailList.module.css";
import MailItem from "./MailItem";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { callSendListAPI } from "../../apis/EmailAPICalls";

function MailList({ category }) {
  const dispatch = useDispatch();
  const sendMails = useSelector((state) => state.emailReducer);

  console.log("[MailList] sendMails: " + JSON.stringify(sendMails));

  const pageInfo = sendMails.pageInfo;

  console.log("[MailList] pageInfo: " + JSON.stringify(pageInfo));

  const [currentPage, setCurrentPage] = useState(1);

  const pageNumber = [];

  if (pageInfo) {
    for (let i = 1; i <= pageInfo.endPage; i++) {
      pageNumber.push(i);
    }
  }

  useEffect(
    () => {
      dispatch(
        callSendListAPI({
          currentPage: currentPage,
        })
      );
    }, // eslint-disable-next-line
    [currentPage]
  );

  const [filteredEmails, setFilteredEmails] = useState([]);

  useEffect(() => {
    if (sendMails.data) {
      const filteredEmails = sendMails.data.filter(
        (email) => email.category === category
      );
      console.log(
        "[MailList] filteredEmails: " + JSON.stringify(filteredEmails)
      );
      setFilteredEmails(filteredEmails);
    }
  }, [sendMails, category]);

  return (
    <>
      <Header />
      <div className={MailListCSS.mailList}>
        <ul>
          {filteredEmails.map((email) => (
            <MailItem key={email.mailNo} email={email} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default MailList;
