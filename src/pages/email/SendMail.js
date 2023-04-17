import React, { useState } from "react";
import SendMailList from "../../components/email/SendMailList";

import EmailCSS from "./Email.module.css";
import SearchBox from "../../components/email/SearchBox";
import SideNavbar from "../../components/email/SideNavbar";

function SendMail({ searchKeyword }) {
  const [selectedMailNo, setSelectedMailNo] = useState(null);

  return (
    <div className={EmailCSS.contentWrapper}>
      <div className={EmailCSS.mailBody}>
        <div className={EmailCSS.navBar}>
          <SideNavbar />
        </div>
        <div className={EmailCSS.content}>
          <SearchBox />
          <SendMailList
            category="send"
            selectedMailNo={selectedMailNo}
            setSelectedMailNo={setSelectedMailNo}
            searchKeyword={searchKeyword}
          />
        </div>
      </div>
    </div>
  );
}

export default SendMail;
