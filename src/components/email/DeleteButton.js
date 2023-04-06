import React, { useState } from "react";
import PropTypes from "prop-types";
import EmailDetailCSS from "./EmailDetail.module.css";

function DeleteButton({ onClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(onClick);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDeleteClick = () => {
    // 이메일 삭제 처리
  };

  return (
    <>
      <button
        className={EmailDetailCSS.emailDeleteBtn}
        onClick={handleMenuClick}
      >
        <svg
          width="4"
          height="15"
          viewBox="0 0 4 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.00065 3.66659C2.91732 3.66659 3.66732 2.91659 3.66732 1.99992C3.66732 1.08325 2.91732 0.333252 2.00065 0.333252C1.08398 0.333252 0.333984 1.08325 0.333984 1.99992C0.333984 2.91659 1.08398 3.66659 2.00065 3.66659ZM2.00065 5.33325C1.08398 5.33325 0.333984 6.08325 0.333984 6.99992C0.333984 7.91659 1.08398 8.66659 2.00065 8.66659C2.91732 8.66659 3.66732 7.91659 3.66732 6.99992C3.66732 6.08325 2.91732 5.33325 2.00065 5.33325ZM2.00065 10.3333C1.08398 10.3333 0.333984 11.0833 0.333984 11.9999C0.333984 12.9166 1.08398 13.6666 2.00065 13.6666C2.91732 13.6666 3.66732 12.9166 3.66732 11.9999C3.66732 11.0833 2.91732 10.3333 2.00065 10.3333Z"
            fill="#767676"
          />
        </svg>
      </button>
      <div>
        {isMenuOpen && (
          <ul className={EmailDetailCSS.menuList}>
            <li className={EmailDetailCSS.menuItem} onClick={handleDeleteClick}>
              메일 삭제
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DeleteButton;
