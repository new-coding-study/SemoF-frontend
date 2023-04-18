import React, { useState } from "react";
import DeletedMailList from "../../components/email/DeletedMailList";
import DeletedMailDetail from "../../components/email/DeletedMailDetail";
import EmailCSS from "./Email.module.css";
import SearchBox from "../../components/email/SearchBox";
import SideNavbar from "../../components/email/SideNavbar";

function DeleteMail() {
  const [selectedMailNo, setSelectedMailNo] = useState(null);

  const handleSelectMailNo = (mailNo) => {
    setSelectedMailNo(mailNo);
  };

  return (
    <div className={EmailCSS.contentWrapper}>
      <div className={EmailCSS.mailBody}>
        <div className={EmailCSS.navBar}>
          <SideNavbar />
        </div>
        <div className={EmailCSS.content}>
          <SearchBox />
          {selectedMailNo ? (
            <DeletedMailDetail mailNo={selectedMailNo} />
          ) : (
            <DeletedMailList onSelectMailNo={handleSelectMailNo} />
          )}
        </div>
      </div>
    </div>
  );
}

export default DeleteMail;
