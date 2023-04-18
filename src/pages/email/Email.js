import React, { useState } from "react";

import EmailCSS from "./Email.module.css";
import SearchBox from "../../components/email/SearchBox";
import SideNavbar from "../../components/email/SideNavbar";
import ReceiveMail from "./ReceiveMail";

function Email() {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchKeyword = (keyword) => {
    setSearchKeyword(keyword);
  };

  return (
    <>
      <div className={EmailCSS.contentWrapper}>
        <div className={EmailCSS.mailBody}>
          <div className={EmailCSS.navBar}>
            <SideNavbar />
          </div>
          <div className={EmailCSS.content}>
            <SearchBox onSearchKeyword={handleSearchKeyword} />
            <ReceiveMail searchKeyword={searchKeyword} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Email;
