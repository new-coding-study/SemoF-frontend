import React from "react";
import JoinCSS from "./Join.module.css";

function Join() {
  return (
    <>
      <div className={JoinCSS.photoBox}>
        <input type="file" />
        <button>사진 등록</button>
      </div>
      <div className={JoinCSS.tableWrapper}>
        <table className={JoinCSS.table}>
          <tbody className={JoinCSS.tableBody}>
            <tr>
              <td>성명</td>
              <td>
                <input type="text" />
              </td>
              <td>주민등록번호</td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td>직원구분</td>
              <td>
                <input type="text" />
              </td>
              <td>퇴사년월일</td>
              <td>재직중</td>
            </tr>
            <tr>
              <td>입사년월일</td>
              <td>
                <input type="text" />
              </td>
              <td>부서</td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td>휴대폰번호</td>
              <td>
                <input type="text" />
              </td>
              <td>지점</td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td>주소</td>
              <td>
                <input type="text" />
              </td>
              <td>직급</td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td>근로자유형</td>
              <td>정규직 근로자</td>
              <td>이메일</td>
              <td>
                <input type="text" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Join;
