import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  callUpdateEmpAPI,
  callGetEmployeeDetail,
  callGetEmpPhoto,
  callGetEmployeesAPI,
} from "../../apis/EmployeeAPICalls";
import RegisterCSS from "./EmpRegister.module.css";

function EmpModify(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const empNo = location.state?.empNo;
  const pageInfo = location.state?.pageInfo;

  console.log("[Modify] empNo : " + empNo);

  // Store에서 상세 정보 조회 결과를 가져옴
  const employeeDetail = useSelector((state) => state.empReducer);
  const empPhoto = useSelector((state) => state.empReducer.empPhoto);

  console.log("[Modify] pageInfo : " + JSON.stringify(pageInfo));

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
  const [form, setForm] = useState({
    phone: employeeDetail?.phone || "",
  });

  const [currentPage, setCurrentPage] = useState(1);

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

  // 마운트 시에, detail과 empPhoto 세팅
  useEffect(() => {
    console.log("[Modify] empNo :", empNo);
    dispatch(callGetEmployeeDetail(empNo));
    dispatch(callGetEmpPhoto(empNo));
  }, [empNo, dispatch]);

  // 사진이 바뀌면 경로 설정
  useEffect(() => {
    if (empPhoto) {
      setImageUrl(empPhoto);
      console.log("Employee Photo Data:", empPhoto);
    }
  }, [empPhoto]);

  // 새 파일을 선택 했을 때 세팅
  useEffect(() => {
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

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Remove all non-digit characters from the input value
      const formattedValue = value.replace(/\D/g, "");

      // If the formattedValue is an empty string or has less than 10 digits, don't format it
      if (formattedValue === "" || formattedValue.length < 11) {
        setForm({
          ...form,
          phone: value,
        });
      } else {
        // Format the phone number as "010-1111-1111"
        const formattedPhoneNumber =
          formattedValue.substring(0, 3) +
          "-" +
          formattedValue.substring(3, 7) +
          "-" +
          formattedValue.substring(7);

        setForm({
          ...form,
          phone: formattedPhoneNumber,
        });
      }
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const onClickRegisterHandler = () => {
    // console.log("[Register] onClickRegisterHandler");

    //formData 객체 생성
    const formData = new FormData();

    // form 객체의 각 프로퍼티를 FormData에 추가
    formData.append("email", form.email);
    console.log("[Register] formData email : " + formData.get("email"));
    formData.append("phone", form.phone);
    console.log("[Register] formData phone : " + formData.get("phone"));
    formData.append("address", form.address);
    console.log("[Register] formData address : " + formData.get("address"));
    formData.append("salary", form.salary);
    console.log("[Register] formData salary : " + formData.get("salary"));
    formData.append("empNo", empNo);
    console.log("[Register] formData empNo : " + formData.get("empNo"));

    if (employeePhoto) {
      formData.append("employeePhoto", employeePhoto);
    }

    dispatch(callUpdateEmpAPI({ form: formData })).then(() => {
      dispatch(callGetEmployeesAPI({}));
      navigate("/semof/employees/management", {
        state: { pageNo: pageInfo.pageNo },
      });
    });
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
            {imageUrl ? (
              <img
                key={imageUrl}
                className={RegisterCSS.photoPreview}
                src={imageUrl}
                alt="preview"
              />
            ) : (
              <p>사진이 존재하지 않습니다.</p>
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
                    maxLength={11}
                    onChange={onChangeHandler}
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
        <button onClick={onClickRegisterHandler}>저장하기</button>
        <button onClick={onClickBackHandler}>이전으로</button>
      </div>
    </>
  );
}

export default EmpModify;
