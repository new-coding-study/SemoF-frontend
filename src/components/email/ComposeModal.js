import React, { useState, useRef, useEffect } from "react";
import ComposeModalCSS from "./ComposeModal.module.css";
import { useDispatch } from "react-redux";

function ComposeModal({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const [toValue, setToValue] = useState("");
  const [subjectValue, setSubjectValue] = useState("");
  const [bodyValue, setBodyValue] = useState("");
  const [file, setFile] = useState(null);

  const handleToChange = (event) => {
    setToValue(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubjectValue(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBodyValue(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSendClick = () => {
    const formData = new FormData();
    formData.append("to", toValue);
    formData.append("subject", subjectValue);
    formData.append("body", bodyValue);
    formData.append("file", file);

    console.log(formData);
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
            value={toValue}
            onChange={handleToChange}
            className={ComposeModalCSS.modalInput}
            placeholder="수신자"
          />
          <label htmlFor="subjectInput" />
          <input
            type="text"
            id="subjectInput"
            value={subjectValue}
            onChange={handleSubjectChange}
            className={ComposeModalCSS.modalInput}
            placeholder="제목"
          />
        </div>
        <div className={ComposeModalCSS.formGroup}>
          <label htmlFor="bodyInput" />
          <textarea
            id="bodyInput"
            value={bodyValue}
            onChange={handleBodyChange}
            className={ComposeModalCSS.modalTextArea}
            placeholder="내용"
          />
        </div>
        <div className={ComposeModalCSS.modalFooter}>
          <label htmlFor="fileInput">
            {/* <button className={ComposeModalCSS.moreBtn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 96 960 960"
                width="48"
              >
                <path d="M460 976q-91 0-155.5-62.5T240 760V330q0-64 45.5-109T395 176q65 0 110 45t45 110v394q0 38-26 64.5T460 816q-38 0-64-28.5T370 720V328h40v395q0 22 14.5 37.5T460 776q21 0 35.5-15t14.5-36V330q0-48-33.5-81T395 216q-48 0-81.5 33T280 330v432q0 73 53 123.5T460 936q75 0 127.5-51T640 760V328h40v431q0 91-64.5 154T460 976Z" />
              </svg>
            </button> */}
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
          />
          <button className={ComposeModalCSS.sendBtn} onClick={handleSendClick}>
            보내기
          </button>
          {/* <button className={ComposeModalCSS.discardBtn} onClick={onClose}>
            저장하기
          </button> */}
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
