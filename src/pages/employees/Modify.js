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
  const employeeDetail = useSelector((state) => state.empReducer);

  console.log("[Modify] employeeDetail : " + JSON.stringify(employeeDetail));

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

  //재직날짜
  const enrollDate = employeeDetail?.enrollDate || "";
  const dateOnly = enrollDate.split(" ")[0];

  //재직 주민등록번호 포맷
  const regFormat = () => {
    if (employeeDetail?.empReg) {
      const maskedRegNo = employeeDetail.empReg.slice(0, 6) + "-*******";
      return maskedRegNo;
    }
  };

  //재직여부
  const isWorking = () => {
    if (employeeDetail?.workStatus === "Y") {
      return <span>재직</span>;
    } else {
      return <span>퇴직</span>;
    }
  };

  // 상세 정보에 등록된 이미지가 있으면 미리보기 설정
  //       if (employeeDetail.employeePhoto) {
  //         setImageUrl(employeeDetail.employeePhoto);
  //       }
  //     }
  //   }, [employeeDetail]);

  useEffect(() => {
    // nameRef.current.focus();

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
  // const nameRef = useRef(null);
  // const regRef = useRef(null);
  // const phoneRef = useRef(null);
  // const addressRef = useRef(null);
  // const salaryRef = useRef(null);
  // const emailRef = useRef(null);

  //키다운 이벤트, tab키 누를시 input 이동
  // const handleKeyDown = (e, ref) => {
  //   if (e.key === "Tab") {
  //     e.preventDefault();
  //     ref.current.focus();
  //   }
  // };

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
                <td>{employeeDetail?.empName || ""}</td>
                <td className={RegisterCSS.tableCell}>주민등록번호</td>
                <td>{regFormat()}</td>
              </tr>
              <tr>
                <td className={RegisterCSS.tableCell}>입사년월일</td>
                <td className={RegisterCSS.indent}>{dateOnly}</td>
                <td className={RegisterCSS.tableCell}>재직여부</td>
                <td>{isWorking()}</td>
              </tr>
              <tr>
                <td className={RegisterCSS.tableCell}>성별</td>
                <td>{employeeDetail?.gender || ""}</td>
                <td className={RegisterCSS.tableCell}>부서</td>
                <td>{employeeDetail?.deptName || ""}</td>
              </tr>
              <tr>
                <td className={RegisterCSS.tableCell}>휴대폰번호</td>
                <td>
                  <input
                    type="text"
                    className={RegisterCSS.input}
                    name="phone"
                    value={form.phone}
                    placeholder={employeeDetail?.phone || ""}
                    // ref={phoneRef}
                    maxLength={11}
                    onChange={onChangeHandler}
                    // onKeyDown={(e) => handleKeyDown(e, addressRef)}
                  />
                </td>
                <td className={RegisterCSS.tableCell}>지점</td>
                <td>{employeeDetail?.branchName || ""}</td>
              </tr>
              <tr>
                <td className={RegisterCSS.tableCell}>주소</td>
                <td>
                  <input
                    type="text"
                    className={RegisterCSS.input}
                    name="address"
                    // ref={addressRef}
                    onChange={onChangeHandler}
                    placeholder={employeeDetail?.address || ""}
                    // onKeyDown={(e) => handleKeyDown(e, salaryRef)}
                  />
                </td>
                <td className={RegisterCSS.tableCell}>직급</td>
                <td>{employeeDetail?.jobName || ""}</td>
              </tr>
              <tr>
                <td className={RegisterCSS.tableCell}>연봉</td>
                <td>
                  <input
                    type="text"
                    className={RegisterCSS.input}
                    name="salary"
                    placeholder={employeeDetail?.salary || ""}
                    // ref={salaryRef}
                    onChange={onChangeHandler}
                    // onKeyDown={(e) => handleKeyDown(e, emailRef)}
                  />
                </td>
                <td className={RegisterCSS.tableCell}>이메일</td>
                <td className={RegisterCSS.indent}>
                  <input
                    type="email"
                    className={RegisterCSS.input}
                    name="email"
                    placeholder={employeeDetail?.email || ""}
                    // ref={emailRef}
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
