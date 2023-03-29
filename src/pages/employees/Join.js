import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import JoinCSS from "./Join.module.css";
import callJoinAPI from "../../apis/JoinAPICalls";

function Join() {
  const navigate = useNavigate();
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [today, setToday] = useState(
    new Date().toLocaleDateString("ko-KR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );
  const [regNumber, setRegNumber] = useState(""); //주민등록번호 관리
  const [previewRegNumber, setPreviewRegNumber] = useState(""); //즉시변환
  const [modifyMode, setModifyMode] = useState(false); //수정모드관리
  const [form, setForm] = useState({}); //폼 관리

  const nameRef = useRef(null);
  const regRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const salaryRef = useRef(null);
  const emailRef = useRef(null);

  const dispatch = useDispatch(); // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언

  // form 데이터 세팅
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log("form : ", form);
  };

  //  const onClickModifyModeHandler = () => {
  //    // 수정모드
  //    setModifyMode(true);
  //    setForm({
  //      empNo: join.empNo,
  //    });
  //  };

  //사진 첨부 이벤트
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

  // 주민등록번호 마스킹 및 포맷팅 처리 함수
  const maskAndFormatRegNumber = (input) => {
    const regex = /^[0-9]*$/;
    const numbersOnly = input.replace(/[^0-9]/g, "");

    if (numbersOnly.length > 13) {
      return "";
    } else if (numbersOnly.length === 13) {
      const formattedValue =
        numbersOnly.substring(0, 6) + "-" + numbersOnly.substring(6, 13);
      const maskedValue =
        formattedValue.substring(0, formattedValue.length - 7) + "*******";
      return maskedValue;
    } else {
      return numbersOnly;
    }
  };

  // 입력값이 변경될 때 처리 함수 수정
  const handleRegNumberChange = (e) => {
    const value = e.target.value;
    const maskedValue = maskAndFormatRegNumber(value);
    setRegNumber(maskedValue);
  };

  //키다운 이벤트, tab키 누를시 input 이동
  const handleKeyDown = (e, ref) => {
    if (e.key === "Tab") {
      e.preventDefault();
      ref.current.focus();
    }
  };

  //포커스 이벤트
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  // FormData 객체를 생성
  const formData = new FormData();

  // form 객체의 각 프로퍼티를 FormData에 추가
  formData.append("empName", form.empName);
  formData.append("email", form.email);
  formData.append("empReg", form.empReg);
  formData.append("phone", form.phone);
  formData.append("address", form.address);
  formData.append("salary", form.salary);
  formData.append("gender", form.gender);
  formData.append("jobCode", form.jobCode);
  formData.append("deptCode", form.deptCode);
  formData.append("branchCode", form.branchCode);
  formData.append("employeePhoto", form.employeePhoto);

  //등록 이벤트
  const onClickJoinHandler = () => {
    dispatch(
      callJoinAPI({
        formData: formData,
      })
    );
  };

  // 돌아가기 클릭시 메인 페이지로 이동
  const onClickBackHandler = () => {
    navigate(-1);
  };

  return (
    <>
      <div className={JoinCSS.header}>
        <div className={JoinCSS.title}> 사원 관리 </div>
      </div>

      <div className={JoinCSS.basicInfo}>
        <span className={JoinCSS.underLine}>사원 등록</span>
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
                  <input
                    type="text"
                    ref={nameRef}
                    onKeyDown={(e) => handleKeyDown(e, regRef)}
                  />
                </td>
                <td className={JoinCSS.tableCell}>주민등록번호</td>
                <td>
                  <input
                    type="text"
                    ref={regRef}
                    onChange={handleRegNumberChange}
                    value={regNumber}
                    maxLength={14}
                    onKeyDown={(e) => handleKeyDown(e, phoneRef)}
                  />
                </td>
              </tr>
              <tr>
                <td className={JoinCSS.tableCell}>입사년월일</td>
                <td className={JoinCSS.indent}> {today}</td>
                <td className={JoinCSS.tableCell}>퇴사년월일</td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td className={JoinCSS.tableCell}>성별</td>
                <td>
                  <select>
                    <option value="">성별 선택</option>
                    <option value="M">남성</option>
                    <option value="F">여성</option>
                  </select>
                </td>
                <td className={JoinCSS.tableCell}>부서</td>
                <td>
                  <select>
                    <option value="">부서 선택</option>
                    <option value="PL">기획</option>
                    <option value="HR">인사관리</option>
                    <option value="AC">회계</option>
                    <option value="SL">영업</option>
                    <option value="MT">마케팅</option>
                    <option value="BS">경영지원</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className={JoinCSS.tableCell}>휴대폰번호</td>
                <td>
                  <input
                    type="text"
                    placeholder="010-0000-0000"
                    ref={phoneRef}
                    onKeyDown={(e) => handleKeyDown(e, addressRef)}
                  />
                </td>
                <td className={JoinCSS.tableCell}>지점</td>
                <td>
                  <select>
                    <option value="">지점 선택</option>
                    <option value="1">SEMOF 본사</option>
                    <option value="2">SEMOF 구로점</option>
                    <option value="3">SEMOF 도봉점</option>
                    <option value="4">SEMOF 여의도점</option>
                    <option value="5">SEMOF 동대문점</option>
                    <option value="6">SEMOF 상암점</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className={JoinCSS.tableCell}>주소</td>
                <td>
                  <input
                    type="text"
                    ref={addressRef}
                    onKeyDown={(e) => handleKeyDown(e, salaryRef)}
                  />
                </td>
                <td className={JoinCSS.tableCell}>직급</td>
                <td>
                  <select>
                    <option value="">직급 선택</option>
                    <option value="1">임원</option>
                    <option value="2">부장</option>
                    <option value="3">지점장</option>
                    <option value="4">차장</option>
                    <option value="5">과장</option>
                    <option value="6">대리</option>
                    <option value="7">사원</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className={JoinCSS.tableCell}>연봉</td>
                <td>
                  <input
                    type="text"
                    ref={salaryRef}
                    onKeyDown={(e) => handleKeyDown(e, emailRef)}
                  />
                </td>
                <td className={JoinCSS.tableCell}>이메일</td>
                <td className={JoinCSS.indent}>
                  <input
                    type="email"
                    placeholder="semof@gmail.com"
                    ref={emailRef}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={JoinCSS.buttonWrapper}>
        <button onClick={onClickJoinHandler}>등록하기</button>
        <button>수정하기</button>
        <button onClick={onClickBackHandler}>이전으로</button>
      </div>
    </>
  );
}
export default Join;
