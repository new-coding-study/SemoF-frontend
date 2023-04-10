import React from "react";
import HeaderCSS from "./Header.module.css";
// import ActionMenu from "./ActionMenu";

function Header(props) {
  const { currentPage, itemsPerPage, totalItems, onPageChange, endPage } =
    props;

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 이전 페이지로 이동
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // 다음 페이지로 이동
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={HeaderCSS.header}>
      {/* <ActionMenu /> */}
      <div className={HeaderCSS.buttons}>
        <span className={HeaderCSS.info}>
          {totalItems} 개 중 {itemsPerPage} - {totalPages}
          {/* {itemsPerPage}개 {currentPage} of {totalPages} */}
        </span>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.12581 10.2075L2.92748 6L7.12581 1.7925L5.83331 0.5L0.333313 6L5.83331 11.5L7.12581 10.2075Z"
              fill="black"
              fillOpacity="0.37"
            />
          </svg>
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === endPage || totalItems === 0}
        >
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.874268 10.2075L5.0726 6L0.874268 1.7925L2.16677 0.5L7.66677 6L2.16677 11.5L0.874268 10.2075Z"
              fill="black"
              fillOpacity="0.37"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Header;
