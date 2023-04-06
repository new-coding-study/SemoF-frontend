import React from "react";

import TransferCSS from "./Transfer.module.css";

function Transfer() {
  return (
    <>
      <div className={TransferCSS.header}>
        <div className={TransferCSS.title}> 발령 </div>
      </div>
      <div className={TransferCSS.searchWrapper}>
        <div>
          <select className={TransferCSS.select}>
            <option>부서</option>
            <option>지점</option>
          </select>
        </div>
        <input
          className={TransferCSS.searchBox}
          type="text"
          placeholder="검색할 사원의 이름을 입력해주세요"
        />
      </div>
    </>
  );
}

export default Transfer;
