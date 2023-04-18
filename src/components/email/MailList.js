import React, { useEffect, useState } from "react";
import MailListCSS from "./MailList.module.css";
import MailItem from "./MailItem";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import SendEmailDetail from "./SendEmailDetail";
import ReceiveEmailDetail from "./ReceiveEmailDetail";
import DeletedMailDetail from "./DeletedMailDetail";
import { callSearchEmailsAPI } from "../../apis/EmailAPICalls";

function MailList({
  category,
  setSelectedMailNo,
  currentPage,
  setCurrentPage,
  selectedMailNo,
  status,
  searchKeyword,
}) {
  const emailState = useSelector((state) => state.emailReducer);
  const dispatch = useDispatch();

  const [mails, setMails] = useState([]);
  let mailList = [];

  useEffect(() => {
    // status와 category에 따라 mailList를 설정
    if (status === "Y") {
      // Show deleted mails
      const allMails = [
        ...(emailState.receivedEmails?.data ?? []),
        ...(emailState.sentEmails?.data ?? []),
      ];
      setMails(allMails.filter((email) => email.status === "Y"));
    } else {
      const filteredMails =
        category === "receive"
          ? emailState.receivedEmails?.data ?? []
          : emailState.sentEmails?.data ?? [];

      // 검색어에 따라 메일 목록을 필터링
      if (searchKeyword) {
        setMails(
          filteredMails.filter((email) =>
            email.subject.toLowerCase().includes(searchKeyword.toLowerCase())
          )
        );
      } else {
        setMails(filteredMails);
      }
    }
  }, [emailState, searchKeyword, status, category]); // emailState, searchKeyword, status, category가 변경될 때마다 실행

  mailList = mails; // 상태 변경에 따라 렌더링되는 mails를 사용

  // console.log("[MailList] emailState : " + JSON.stringify(emailState));

  const pageInfo = emailState.pageInfo;

  const totalCount = pageInfo?.totalCount ?? 0;
  const pageSize = pageInfo?.pageSize ?? 1;
  const endPage = pageInfo?.endPage;
  const itemsPerPage = pageSize;
  const totalItems = totalCount;

  const pageNumber = [];

  if (pageInfo) {
    for (let i = 1; i <= pageInfo.endPage; i++) {
      pageNumber.push(i);
    }
  }

  const renderMails = () => {
    if (mailList && mailList.length > 0) {
      return mailList.map((email) => {
        const mailId = category === "receive" ? email.receiveNo : email.mailNo;
        return (
          <MailItem
            key={mailId}
            email={email}
            category={category}
            isSelected={mailId === selectedMailNo}
            mailNo={mailId}
            onSelectMailNo={setSelectedMailNo}
            searchKeyword={searchKeyword}
          />
        );
      });
    } else {
      return <li>데이터가 없습니다.</li>;
    }
  };

  return (
    <>
      <Header
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        endPage={endPage}
        totalItems={totalItems}
        onPageChange={(newPage) => setCurrentPage(newPage)}
        searchKeyword={searchKeyword}
      />
      <div className={MailListCSS.mailList}>
        {selectedMailNo ? (
          status === "Y" ? (
            <DeletedMailDetail mailNo={selectedMailNo} />
          ) : category === "receive" ? (
            <ReceiveEmailDetail receiveNo={selectedMailNo} />
          ) : (
            <SendEmailDetail mailNo={selectedMailNo} />
          )
        ) : (
          <ul>{renderMails()}</ul>
        )}
      </div>
    </>
  );
}

export default MailList;
