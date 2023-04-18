import React, { useState, useRef, useEffect } from "react";
import ComposeModalCSS from "./ComposeModal.module.css";
import { useDispatch } from "react-redux";
import { callPostEmailAPI } from "../../apis/EmailAPICalls";
import Swal from "sweetalert2";
import { decodeJwt } from "../../utils/tokenUtils";

function ComposeModal({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    empNo: "",
    receiverAddr: "",
    title: "",
    content: "",
  });
  const [fileName, setFileName] = useState(""); // 파일 이름을 관리하는 state

  const isLogin = window.localStorage.getItem("accessToken");
  let decodedUser = null;

  if (isLogin !== undefined && isLogin !== null) {
    const temp = decodeJwt(window.localStorage.getItem("accessToken"));
    decodedUser = temp.empNo;
  }

  console.log("[ComposeModal] decodedUser: " + decodedUser);

  // form 데이터 세팅
  const onChangeHandler = (e) => {
    console.log("[ProductRegistration] onClickProductRegistrationHandler");
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  console.log("[ComposeModal] form : " + JSON.stringify(form));

  // 파일 첨부 이벤트
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // console.log(event.target.files[0]);
    setFile(file);
    setFileName(file.name); // 파일 이름 저장
  };

  const handleSendClick = () => {
    //formData 객체 생성
    const formData = new FormData();

    // form 객체의 각 프로퍼티를 FormData에 추가
    formData.append("receiverAddr", form.receiverAddr);
    console.log(
      "[ComposeModal] formData receiverAddr: ",
      formData.get("receiverAddr")
    );
    formData.append("title", form.title);
    // console.log("[ComposeModal] formData title: ", formData.get("title"));
    formData.append("content", form.content);
    // console.log("[ComposeModal] formData content: ", formData.get("content"));

    if (file) {
      formData.append("file", file);
    }

    console.log("[ComposeModal] file : " + JSON.stringify(file));

    //formData 검증
    for (let [key, value] of formData.entries()) {
      console.log(`[ComposeModal] formData ${key}:`, value);
    }

    //Todo : empNo 아이디에서 파싱해오기
    dispatch(
      callPostEmailAPI({
        form: formData,
        empNo: decodedUser,
      })
    );

    Swal.fire({
      icon: "success",
      text: "이메일을 성공적으로 전송했습니다.",
    });

    onClose();
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const modalRef = useRef();

  useEffect(() => {
    if (isOpen) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div
      className={ComposeModalCSS.composeModal}
      style={{ display: isOpen ? "flex" : "none" }}
      ref={modalRef}
      tabIndex={-1}
    >
      <div className={ComposeModalCSS.modalContainer}>
        <div className={ComposeModalCSS.modalHeader}>
          <span className={ComposeModalCSS.modalTitle}>새메일</span>
          <button className={ComposeModalCSS.closeBtn} onClick={onClose}>
            x
          </button>
        </div>
        <div className={ComposeModalCSS.formGroup}>
          <label htmlFor="toInput" />
          <input
            type="text"
            id="toInput"
            name="receiverAddr"
            onChange={onChangeHandler}
            className={ComposeModalCSS.modalInput}
            placeholder="수신자"
          />
          <label htmlFor="subjectInput" />
          <input
            type="text"
            id="subjectInput"
            name="title"
            onChange={onChangeHandler}
            className={ComposeModalCSS.modalInput}
            placeholder="제목"
          />
        </div>
        <div className={ComposeModalCSS.formGroup}>
          <label htmlFor="bodyInput" />
          <textarea
            id="bodyInput"
            name="content"
            onChange={onChangeHandler}
            className={ComposeModalCSS.modalTextArea}
            placeholder="내용"
          />
        </div>
        <div className={ComposeModalCSS.modalFooter}>
          <button className={ComposeModalCSS.sendBtn} onClick={handleSendClick}>
            보내기
          </button>
          <label htmlFor="fileInput" className={ComposeModalCSS.moreBtn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="25"
              viewBox="0 96 960 960"
              width="25"
              fill="#e52e2e"
            >
              <path d="M460 976q-91 0-155.5-62.5T240 760V330q0-64 45.5-109T395 176q65 0 110 45t45 110v394q0 38-26 64.5T460 816q-38 0-64-28.5T370 720V328h40v395q0 22 14.5 37.5T460 776q21 0 35.5-15t14.5-36V330q0-48-33.5-81T395 216q-48 0-81.5 33T280 330v432q0 73 53 123.5T460 936q75 0 127.5-51T640 760V328h40v431q0 91-64.5 154T460 976Z" />
            </svg>
          </label>
          <input
            type="file"
            id="fileInput"
            name="file"
            className={ComposeModalCSS.fileBtn}
            onChange={handleFileChange}
          />

          {file && (
            <div className={ComposeModalCSS.fileInfo}>
              <span className={ComposeModalCSS.fileIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M6 2l6 6h6a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm6 11a1 1 0 100-2 1 1 0 000 2z" />
                </svg>
              </span>
              <span className={ComposeModalCSS.fileInfoName}>{file.name}</span>
              <span className={ComposeModalCSS.fileSize}>
                ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
          )}
          <div className={ComposeModalCSS.fileName}>{fileName}</div>

          <div className={ComposeModalCSS.footerRight}></div>
        </div>
      </div>
      <div
        className={ComposeModalCSS.overlay}
        onClick={handleOverlayClick}
      ></div>
    </div>
  );
}
export default ComposeModal;
