import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MailList from "../../components/email/MailList";
import SearchBox from "../../components/email/SearchBox";
import SideNavbar from "../../components/email/SideNavbar";
import Header from "../../components/email/Header";

function SendMail() {
  const location = useLocation();
  const [mailList, setMailList] = useState([]);

  useEffect(() => {
    if (location.state && location.state.category === "send") {
      axios
        .get("mail/send")
        .then((response) => {
          setMailList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [location.state]);

  return (
    <>
      <MailList emails={mailList} />
    </>
  );
}

export default SendMail;
