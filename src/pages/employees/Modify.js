import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  callUpdateEmpAPI,
  callGetEmployeeDetail,
} from "../../apis/EmployeeAPICalls";
import RegisterCSS from "./Register.module.css";

function Modify(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const empNo = location.state?.empNo;

  console.log("[Modify] empNo : " + empNo);

  // 상세 정보 조회 API 호출
  useEffect(() => {
    dispatch(callGetEmployeeDetail(empNo));
  }, [dispatch, empNo]);

  // Store에서 상세 정보 조회 결과를 가져옴
  const { employeeDetail } = useSelector((state) => state.empReducer);

  const [today, setToday] = useState(
    new Date().toLocaleDateString("ko-KR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  const [employeePhoto, setEmployeePhoto] = useState(null);
  const [imageUrl, setImageUrl] = useState();
  const imageInput = useRef();
  const [form, setForm] = useState({});
  //   const [form, setForm] = useState({
  //     empName: "",
  //     empReg: "",
  //     email: "",
  //     phone: "",
  //     address: "",
  //     salary: "",
  //     gender: "",
  //     jobCode: "",
  //     deptCode: "",
  //     branchCode: "",
  //   });

  useEffect(() => {
    if (empNo) {
      dispatch(callGetEmployeeDetail(empNo));
    }
  }, [dispatch, empNo]);

  // 조회한 상세 정보를 Form에 적용
  //   useEffect(() => {
  //     if (employeeDetail) {
  //       setForm({
  //         empName: employeeDetail.empName,
  //         empReg: employeeDetail.empReg,
  //         email: employeeDetail.email,
  //         phone: employeeDetail.phone,
  //         address: employeeDetail.address,
  //         salary: employeeDetail.salary,
  //         gender: employeeDetail.gender,
  //         jobCode: employeeDetail.jobCode,
  //         deptCode: employeeDetail.deptCode,
  //         branchCode: employeeDetail.branchCode,
  //       });

  // 상세 정보에 등록된 이미지가 있으면 미리보기 설정
  //       if (employeeDetail.employeePhoto) {
  //         setImageUrl(employeeDetail.employeePhoto);
  //       }
  //     }
  //   }, [employeeDetail]);

  useEffect(() => {
    nameRef.current.focus();

    // 이미지 업로드시 미리보기 세팅
    if (employeePhoto) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result) {
          setImageUrl(result);
        }
      };
      fileReader.readAsDataURL(employeePhoto);
    }
  }, [employeePhoto]);

  //이미지 변화 이벤트
  const onChangeImageUpload = (e) => {
    const employeePhoto = e.target.files[0];
    setEmployeePhoto(employeePhoto);
  };

  //이미지 업로드 이벤트
  const onClickImageUpload = () => {
    imageInput.current.click();
  };

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //탭 이동을 위한 Ref
  const nameRef = useRef(null);
  const regRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const salaryRef = useRef(null);
  const emailRef = useRef(null);

  //키다운 이벤트, tab키 누를시 input 이동
  const handleKeyDown = (e, ref) => {
    if (e.key === "Tab") {
      e.preventDefault();
      ref.current.focus();
    }
  };

  const onClickRegisterHandler = () => {
    // console.log("[Register] onClickRegisterHandler");

    //formData 객체 생성
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

    if (employeePhoto) {
      formData.append("employeePhoto", employeePhoto);
    }

    dispatch(
      callUpdateEmpAPI({
        form: formData,
      })
    );
    window.location.reload(); //화면 초기화
  };

  // 돌아가기 클릭시 메인 페이지로 이동
  const onClickBackHandler = () => {
    navigate(-1);
  };

  return (
    <>
      <div className={RegisterCSS.header}>
        <div className={RegisterCSS.title}> 사원 정보 </div>
      </div>

      <div className={RegisterCSS.basicInfo}>
        <span className={RegisterCSS.underLine}>정보 수정</span>
      </div>

      <div className={RegisterCSS.container}>
        <div className={RegisterCSS.photoWrapper}>
          <div className={RegisterCSS.photoBox}>
            <label className={RegisterCSS.fileInput} htmlFor="fileInput">
              사진첨부
              <input
                style={{ display: "none" }}
                type="file"
                name="employeePhoto"
                id="fileInput"
                accept="image/jpg,image/png,image/jpeg,image/gif"
                onChange={onChangeImageUpload}
                ref={imageInput}
              />
            </label>
            {imageUrl && (
              <>
                <img
                  className={RegisterCSS.photoPreview}
                  src={imageUrl}
                  alt="preview"
                />

                {/* <button
                  className={RegisterCSS.fileButton}
                  onClick={onClickImageUpload}
                >
                  사진등록
                </button> */}
              </>
            )}
          </div>
        </div>
        <div className={RegisterCSS.tableWrapper}>
          <table className={RegisterCSS.registerTable}>
            <tbody className={RegisterCSS.tableBody}>
              <tr>
                <td className={RegisterCSS.tableCell}>성명</td>
                <td>
                  <input
                    className={RegisterCSS.input}
                    type="text"
                    name="empName"
                    value={form.empName}
                    ref={nameRef}
                    onKeyDown={(e) => handleKeyDown(e, regRef)}
                    onChange={onChangeHandler}
                  />
                </td>
                <td className={RegisterCSS.tableCell}>주민등록번호</td>
                <td>
                  <input
                    type="text"
                    className={RegisterCSS.input}
                    name="empReg"
                    value={form.empReg}
                    ref={regRef}
                    maxLength={14}
                    onKeyDown={(e) => handleKeyDown(e, phoneRef)}
                  />
                </td>
              </tr>
              <tr>
                <td className={RegisterCSS.tableCell}>입사년월일</td>
                <td className={RegisterCSS.indent}> {today}</td>
                <td className={RegisterCSS.tableCell}>재직여부</td>
                <td>
                  <select name="workStatus" className={RegisterCSS.select}>
                    <option value="">재직</option>
                    <option value="N">퇴사</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className={RegisterCSS.tableCell}>성별</td>
                <td>
                  <select
                    name="gender"
                    onChange={onChangeHandler}
                    className={RegisterCSS.select}
                  >
                    <option value="">성별 선택</option>
                    <option value="M">남성</option>
                    <option value="F">여성</option>
                  </select>
                </td>
                <td className={RegisterCSS.tableCell}>부서</td>
                <td>
                  <select
                    name="deptCode"
                    className={RegisterCSS.select}
                    onChange={onChangeHandler}
                  >
                    <option value="">부서선택</option>
                    <option value="NO">없음</option>
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
                <td className={RegisterCSS.tableCell}>휴대폰번호</td>
                <td>
                  <input
                    type="text"
                    className={RegisterCSS.input}
                    name="phone"
                    value={form.phone}
                    placeholder="  ' - ' 없이 입력하세요"
                    ref={phoneRef}
                    maxLength={11}
                    onChange={onChangeHandler}
                    onKeyDown={(e) => handleKeyDown(e, addressRef)}
                  />
                </td>
                <td className={RegisterCSS.tableCell}>지점</td>
                <td>
                  <select
                    name="branchCode"
                    onChange={onChangeHandler}
                    className={RegisterCSS.select}
                  >
                    <option value="">지점선택</option>
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
                <td className={RegisterCSS.tableCell}>주소</td>
                <td>
                  <input
                    type="text"
                    className={RegisterCSS.input}
                    name="address"
                    ref={addressRef}
                    onChange={onChangeHandler}
                    onKeyDown={(e) => handleKeyDown(e, salaryRef)}
                  />
                </td>
                <td className={RegisterCSS.tableCell}>직급</td>
                <td>
                  <select
                    name="jobCode"
                    onChange={onChangeHandler}
                    className={RegisterCSS.select}
                  >
                    <option value="">직급선택</option>
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
                <td className={RegisterCSS.tableCell}>연봉</td>
                <td>
                  <input
                    type="text"
                    className={RegisterCSS.input}
                    name="salary"
                    ref={salaryRef}
                    onChange={onChangeHandler}
                    onKeyDown={(e) => handleKeyDown(e, emailRef)}
                  />
                </td>
                <td className={RegisterCSS.tableCell}>이메일</td>
                <td className={RegisterCSS.indent}>
                  <input
                    type="email"
                    className={RegisterCSS.input}
                    name="email"
                    placeholder="semof@gmail.com"
                    ref={emailRef}
                    onChange={onChangeHandler}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={RegisterCSS.buttonWrapper}>
        <button onClick={onClickRegisterHandler}>등록하기</button>
        <button onClick={onClickBackHandler}>이전으로</button>
      </div>
    </>
  );
}

export default Modify;