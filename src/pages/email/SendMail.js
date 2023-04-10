import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import SendMailList from "../../components/email/SendMailList";

import EmailCSS from "./Email.module.css";
import SearchBox from "../../components/email/SearchBox";
import SideNavbar from "../../components/email/SideNavbar";

function SendMail({ searchKeyword }) {
  // const { mailNo } = useParams();
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
            // selectedMailNo={mailNo}
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
