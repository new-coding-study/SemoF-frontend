import RegisterCSS from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

import {
  callRegisterAPI,
  callCheckRegAPI,
  callcheckIdAPI,
} from "../../apis/MemberAPICalls";
import { width } from "@mui/system";

function Register() {
  const navigate = useNavigate();

  // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
  const dispatch = useDispatch();
  const member = useSelector((state) => state.memberReducer); // API 요청하여 가져온 loginMember 정보
  const register = useSelector((state) => state.memberReducer.regist);
  console.log(member);

  // 1. 아이디 관련 상태값 => 아이디 중복 체크 여부
  const [checkId, setCheckId] = useState(false);
  const [checkClickBtn, setCheckClickBtn] = useState(false);

  // 2. 비밀번호 관련 상태값 => 두 개의 값이 일치하는지 체크 여부
  const [checkPwd, setCheckPwd] = useState(false);

  //3. 주민번호 관련 상태값 => 주민번호를 보내서 DB에 사원 존재하는지 체크 여부
  const [checkReg, setCheckReg] = useState(false);

  // 주민번호 검증으로 받아온 empNo을 설정
  const [empNo, setEmpNo] = useState("");

  // 최종적으로 회원가입에 필요한 값들만 form 으로 묶어서 보냄
  const [form, setForm] = useState({
    loginId: "",
    loginPwd: "",
    confirmPwd: "",
    empReg: "",
    empNo: "",
  });

  const { empReg } = form;

  // 회원가입 정보 입력 핸들러
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "loginId") {
      setCheckId(false);
      setCheckClickBtn(false);
      console.log("아이디 변경됨 다시 확인 요망");
    }
    if (e.target.name === "empReg") {
      setCheckReg(false);
      console.log("주민번호 변경됨 다시 확인 요망");
    }
  };

  // 1. 아이디 입력 및 아이디 체크
  // 1-1. 입력한 ID를 보내서 사용 가능한 아이디인지 확인
  const onClickCheckIdHandler = () => {
    setCheckClickBtn(true);
    dispatch(callcheckIdAPI(form.loginId));
  };

  // 1-2. 아이디 중복 체크 결과에 따라서 checkId 상태값을 설정
  useEffect(
    () => {
      if (member?.checkId.status === 201) {
        console.log("아이디 중복 체크 상태값 확인 :", member?.checkId.date);
        setCheckId(true);
      } else {
        console.log("아이디 중복 체크 상태값 확인 :", member?.checkId.date);
        setCheckId(false);
      }
    }, // eslint-disable-next-line
    [member?.checkId]
  );

  // 2. 비밀번호 입력 및 비밀번호 체크
  useEffect(
    () => {
      if (
        form.loginPwd !== "" &&
        form.confirmPwd !== "" &&
        form.loginPwd === form.confirmPwd
      ) {
        console.log("비밀번호 일치함 :");
        setCheckPwd(true);
      } else {
        console.log("비밀번호 일치하지 않음");
        setCheckPwd(false);
      }
    }, // eslint-disable-next-line
    [form.loginPwd, form.confirmPwd]
  );

  // 3. 존재하는 사원인지 확인
  // 3-1. 주민번호를 보내서 DB에 존재하는 사원인지 확인
  const onClickCheckRegHandler = (e) => {
    console.log("주민번호 확인 : ", form.empReg);
    if (form.empReg.length === 14) {
      // 입력받은 주민번호의 길이가 14자리 일때만 dispatch 호출
      dispatch(callCheckRegAPI(form.empReg));
    }
  };

  // 3-2. 존재여부가 확인되면 반환받은 값을 empNo로 설정해줌
  useEffect(
    () => {
      const checkEmpNo = member?.checkReg.data;

      if (
        checkEmpNo === "일치하는 사원이 없습니다." ||
        checkEmpNo === "이미 가입된 사원입니다." ||
        checkEmpNo === undefined
      ) {
        setCheckReg(false);
        setEmpNo("");
      } else {
        console.log("checkEmpNo 확인", checkEmpNo);
        setCheckReg(true);
        setEmpNo(checkEmpNo);
        setForm({
          ...form,
          empNo: checkEmpNo,
        });
      }
    }, // eslint-disable-next-line
    [member?.checkReg]
  );

  console.log("form 데이터 확인 : ", form.empNo);

  // 돌아가기 클릭시 로그인 페이지로 이동
  const onClickBackHandler = () => {
    navigate("/", { replace: true });
  };

  // 회원가입 버튼 클릭 시 비밀번호가 일치하는지 확인하고 디스패치를 보냄
  const onClickRegisterHandler = () => {
    console.log(
      "상태값확인 - checkId - checkPwd - checkReg",
      checkId,
      checkPwd,
      checkReg
    );
    if (checkId && checkPwd && checkReg) {
      Swal.fire({
        title: "입력하신 정보로 회원가입하시겠습니까?",
        showCancelButton: true,
        cancelButtonText: "아니오",
        confirmButtonText: "예",
        confirmButtonColor: "#e52e2e",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "회원가입되었습니다. ",
            text: "로그인 후 이용해주세요",
            timer: 1500,
            showConfirmButton: false,
          }).then(
            dispatch(callRegisterAPI({ form: form })),
            navigate(`/`, { replace: true })
            // window.location.reload()
          );
        }
      });
    } else {
      Swal.fire({
        title: "누락된 정보가 있습니다.",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  // 회원가입에 대한 상태가 바뀌면 렌더링. 정상 가입되면 로그인창으로, 안되면 다시 회원가입창으로 이동
  useEffect(
    () => {
      console.log(register.status);
      if (register.status === 201) {
        navigate("/", { replace: true });
      } else {
        navigate("/register", { replace: true });
      }
    }, // eslint-disable-next-line
    [register]
  );

  return (
    <div className={RegisterCSS.backgroundDiv}>
      <div className={RegisterCSS.registerDiv}>
        <div style={{ marginBottom: "-12px" }} className={RegisterCSS.logoBox}>
          <img
            src={"/images/logo.png"}
            alt="이미지확인!"
            className={RegisterCSS.logo}
          ></img>
          <h1 className={RegisterCSS.title}>회원가입</h1>
        </div>
        <div className={RegisterCSS.inputIdWrapper}>
          <input
            type="text"
            name="loginId"
            placeholder="아이디"
            autoComplete="off"
            required
            onChange={onChangeHandler}
          />
          <button
            style={{ marginLeft: "18px" }}
            onClick={onClickCheckIdHandler}
          >
            아이디 확인
          </button>
        </div>
        <div style={{ marginTop: "-10px", fontSize: "13px" }}>
          {checkId
            ? "가입 가능한 아이디 입니다."
            : checkClickBtn
            ? "중복된 아이디입니다. 다른 아이디를 입력해주세요"
            : "아이디 중복 확인을 진행해주세요"}
        </div>
        <input
          type="password"
          name="loginPwd"
          placeholder="비밀번호"
          autoComplete="off"
          required
          onChange={onChangeHandler}
          style={{ width: "24em" }}
        />
        <input
          type="password"
          name="confirmPwd"
          placeholder="비밀번호 확인"
          autoComplete="off"
          required
          onChange={onChangeHandler}
          style={{ width: "24em" }}
        />
        <div style={{ marginTop: "5px", fontSize: "13px" }}>
          {form.loginPwd?.length === 0 && form.confirmPwd?.length === 0
            ? "비밀번호를 입력해주세요"
            : checkPwd
            ? "비밀번호가 일치합니다."
            : "비밀번호가 일치하지 않습니다."}
        </div>
        <div style={{ marginTop: "0px", marginBottom: "-25px" }}>
          <input
            type="password"
            name="empReg"
            maxLength="14"
            placeholder="주민번호"
            autoComplete="off"
            required
            onChange={onChangeHandler}
          />
          <button
            style={{ marginLeft: "18px" }}
            onClick={onClickCheckRegHandler}
          >
            주민번호 확인
          </button>
        </div>
        <div
          style={{ marginTop: "30px", fontSize: "13px", marginBottom: "-10px" }}
        >
          {empNo === "" || empNo === undefined
            ? member?.checkReg.data
            : "주민번호가 확인되었습니다."}
        </div>

        <div className={RegisterCSS.registBox}>
          <button
            className={RegisterCSS.registBtn}
            onClick={onClickRegisterHandler}
          >
            회원가입
          </button>
        </div>
        <button
          style={{
            border: "none",
            margin: 0,
            marginTop: "-10px",
            fontSize: "11px",
            height: "10px",
            color: "#e52e2e",
            textDecorationLine: "none",
          }}
          className={RegisterCSS.login}
          onClick={onClickBackHandler}
        >
          돌아가기
        </button>
      </div>
    </div>
  );
}

export default Register;
