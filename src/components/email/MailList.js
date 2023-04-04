import React, { useState, useEffect } from "react";
import MailListCSS from "./MailList.module.css";
import MailItem from "./MailItem";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { callSendListAPI, callTakeListAPI } from "../../apis/EmailAPICalls";
import EmailDetail from "./EmailDetail";
import { useNavigate } from "react-router-dom";

function MailList({ category }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mails = useSelector((state) => state.emailReducer);
  const mailList = mails.data;

  console.log("[MailList] mails : " + JSON.stringify(mails));

  const pageInfo = mails.pageInfo;

  console.log("[MailList] pageInfo : " + JSON.stringify(pageInfo));

  const [currentPage, setCurrentPage] = useState(1);

  const pageNumber = [];

  if (pageInfo) {
    for (let i = 1; i <= pageInfo.endPage; i++) {
      pageNumber.push(i);
    }
  }

  useEffect(() => {
    dispatch(
      callSendListAPI({
        currentPage: currentPage,
        category: category,
      })
    );
  }, [currentPage, category, dispatch]);

  useEffect(() => {
    dispatch(
      callTakeListAPI({
        currentPage: currentPage,
        category: category,
      })
    );
  }, [currentPage, category, dispatch]);

  // useEffect(
  //   () => {
  //     dispatch(
  //       callSendListAPI({
  //         currentPage: currentPage,
  //       })
  //     );
  //   }, // eslint-disable-next-line
  //   [currentPage]
  // );
  // useEffect(
  //   () => {
  //     dispatch(
  //       callTakeListAPI({
  //         currentPage: currentPage,
  //       })
  //     );
  //   }, // eslint-disable-next-line
  //   [currentPage]
  // );

  const [filteredEmails, setFilteredEmails] = useState([]);

  useEffect(() => {
    if (mailList) {
      const filteredEmails =
        mailList.filter((email) => email.category === category) ?? [];
      setFilteredEmails(filteredEmails);
    }
  }, [mailList, category]);

  const [selectedMailNo, setSelectedMailNo] = useState(null);

  const handleSelectEmail = (mailNo) => {
    console.log("[MailList] handleSelectEmail mailNo: " + mailNo);

    navigate(`/email/detail/${mailNo}`);
  };

  const handleGoBack = () => {
    setSelectedMailNo(null);
  };

  return (
    <>
      <Header />
      <div className={MailListCSS.mailList}>
        {/* {console.log("[MailList] selectedMailNo: " + selectedMailNo)} */}
        {selectedMailNo ? (
          <EmailDetail mailNo={selectedMailNo} onGoBack={handleGoBack} />
        ) : (
          <ul>
            {filteredEmails.map((email) => (
              <MailItem
                key={email.mailNo}
                email={email}
                category={category}
                isSelected={email.mailNo === selectedMailNo}
                onSelectEmail={handleSelectEmail}
                mailNo={email.mailNo}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default MailList;
