import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import JoinCSS from "./Join.module.css";

function Join() {
  const navigate = useNavigate();

  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileInputChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoUploaded(true);
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoUploaded(false);
      setPreviewUrl(null);
    }
  };

  const onClickBackHandler = () => {
    // 돌아가기 클릭시 메인 페이지로 이동
    navigate(-1);
  };

  return (
    <>
      <div className={JoinCSS.header}>
        <div className={JoinCSS.title}> 인사 </div>
      </div>

      <div className={JoinCSS.basicInfo}>
        <span className={JoinCSS.underLine}>직원 등록</span>
      </div>

      <div className={JoinCSS.container}>
        <div className={JoinCSS.photoWrapper}>
          <div className={JoinCSS.photoBox}>
            {!photoUploaded ? (
              <label className={JoinCSS.fileInput} htmlFor="fileInput">
                사진첨부
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleFileInputChange}
                />
              </label>
            ) : (
              <img
                src={URL.createObjectURL(
                  document.getElementById("fileInput").files[0]
                )}
                alt="employee_photo"
                className={JoinCSS.photoPreview}
              />
            )}

            {photoUploaded ? (
              <button className={JoinCSS.fileButton}>사진등록</button>
            ) : null}
          </div>
        </div>
        <div className={JoinCSS.tableWrapper}>
          <table className={JoinCSS.table}>
            <tbody className={JoinCSS.tableBody}>
              <tr>
                <td className={JoinCSS.tableCell}>성명</td>
                <td>
                  <input type="text" />
                </td>
                <td className={JoinCSS.tableCell}>주민등록번호</td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td className={JoinCSS.tableCell}>직원구분</td>
                <td>
                  <input type="text" />
                </td>
                <td className={JoinCSS.tableCell}>퇴사년월일</td>
                <td></td>
              </tr>
              <tr>
                <td className={JoinCSS.tableCell}>입사년월일</td>
                <td>
                  <input type="text" />
                </td>
                <td className={JoinCSS.tableCell}>부서</td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td className={JoinCSS.tableCell}>휴대폰번호</td>
                <td>
                  <input type="text" />
                </td>
                <td className={JoinCSS.tableCell}>지점</td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td className={JoinCSS.tableCell}>주소</td>
                <td>
                  <input type="text" />
                </td>
                <td className={JoinCSS.tableCell}>직급</td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td className={JoinCSS.tableCell}>근로자유형</td>
                <td>정규직 근로자</td>
                <td className={JoinCSS.tableCell}>이메일</td>
                <td>
                  <input type="text" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={JoinCSS.buttonWrapper}>
        <button>등록하기</button>
        <button>수정하기</button>
        <button onClick={onClickBackHandler}>이전으로</button>
      </div>
    </>
  );
}
export default Join;
