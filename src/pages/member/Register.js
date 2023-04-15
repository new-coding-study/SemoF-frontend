import RegisterCSS from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  callRegisterAPI,
  callCheckRegAPI,
  callcheckIdAPI,
} from "../../apis/MemberAPICalls";

function Register() {
  const navigate = useNavigate();

  // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
  const dispatch = useDispatch();
  const member = useSelector((state) => state.memberReducer); // API 요청하여 가져온 loginMember 정보
  const register = useSelector((state) => state.memberReducer.regist);
  console.log(member);

  const [form, setForm] = useState({
    loginId: "",
    loginPwd: "",
    checkPwd: "",
    empReg: "",
  });

  const { empReg } = form;

  // 아이디 중복체크 여부
  const [checkId, setCheckId] = useState(false);
  // 비밀번호 일치 여부
  const [checkPwd, setCheckPwd] = useState(false);
  // DB에 사원 존재 여부
  const [checkReg, setCheckReg] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  // 주민번호 검증으로 받아온 empNo을 설정
  const [empNo, setEmpNo] = useState("");

  // 아이디 입력 및 아이디 체크

  // 비밀번호 입력 및 비밀번호 확인
  const onChangePwdHandler = (e) => {
    setPassword(e.target.value);
  };

  const onChangeConfirmPwdHandler = (e) => {
    setConfirmPwd(e.target.value);
  };

  // const checkPwd = password === confirmPwd;

  // 최종적으로 회원가입에 필요한 값들을 form 으로 묶어서 보냄
  // const [form, setForm] = useState({
  //   loginId: "",
  //   loginPwd: password,
  //   empNo: empNo
  // });

  useEffect(
    () => {
      if (member.status === 201) {
        console.log("[Login] Register SUCCESS {}", member);
        navigate("/login", { replace: true });
      }
    }, // eslint-disable-next-line
    [member]
  );

  // 회원가입 정보 입력 핸들러
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "loginId") {
      setCheckId(false);
      // 중복체크해서 가입 가능한 아이디면 true 로 바껴야 하는데, dispatch에 then을 걸어야하나?!
    }
  };

  // 돌아가기 클릭시 로그인 페이지로 이동
  const onClickBackHandler = () => {
    navigate("/", { replace: true });
  };

  // 회원가입 버튼 클릭 시 비밀번호가 일치하는지 확인하고 디스패치를 보냄
  const onClickRegisterHandler = () => {
    if (form.loginPwd === form.checkPwd) {
      dispatch(
        callRegisterAPI({
          form: form,
        })
      );
    }
    // else {
    //   Swal.fire({
    //       title: "입력하신 비밀번호가 다릅니다.",
    //       showConfirmButton: false,
    //       timer: 1000,
    //     });
    // }
  };

  // 주민번호를 보내서 DB에 존재하는 사원인지 확인
  const onClickCheckRegHandler = (e) => {
    console.log("주민번호 확인 : ", e.target.value);
    if (e.target.value !== "") {
      dispatch(callCheckRegAPI(form.empReg));
      setCheckReg(true);
    }
  };

  // 존재여부가 확인되면 반환받은 값을 empNo로 설정해줌
  useEffect(
    () => {
      const checkEmpNo = member?.checkReg.data;
      // console.log(checkempNo);
      // console.log(checkempNo === "일치하는 사원이 없습니다.");
      if (checkEmpNo === "일치하는 사원이 없습니다.") {
        setCheckReg(false);
        setEmpNo("");
      } else {
        setEmpNo(checkEmpNo);
      }
    }, // eslint-disable-next-line
    [checkReg]
  );

  console.log("empNo 확인 : ", empNo);

  // 입력한 ID를 보내서 사용 가능한 아이디인지 확인
  const onClickCheckIdHandler = () => {
    dispatch(callcheckIdAPI(form.loginId));
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
        <h1>회원가입</h1>
        <div className={RegisterCSS.inputIdWrapper}>
          <input
            type="text"
            name="loginId"
            placeholder="아이디"
            autoComplete="off"
            required
            onChange={onChangeHandler}
          />
          <button onClick={onClickCheckIdHandler}>아이디 확인</button>
        </div>
        <input
          type="password"
          name="loginPwd"
          placeholder="패스워드"
          autoComplete="off"
          required
          // onChange={onChangeHandler}
          onChange={onChangePwdHandler}
        />
        <input
          type="password"
          name="confirmPwd"
          placeholder="비밀번호 확인"
          autoComplete="off"
          required
          // onChange={onChangeHandler}
          onChange={onChangeConfirmPwdHandler}
        />
        <div>
          {password?.length === 0 && confirmPwd?.length === 0
            ? "비밀번호를 입력해주세요"
            : checkPwd
            ? "비밀번호가 일치합니다."
            : "비밀번호가 일치하지 않습니다."}
        </div>
        <div className={RegisterCSS.inputRegWrapper}>
          <input
            type="text"
            name="empReg"
            maxLength="14"
            placeholder="주민번호"
            autoComplete="off"
            required
            onChange={onChangeHandler}
            // onChange={onChangeEmpRegHandler}
            // value={maskingReg?.length === 0 ? empReg : maskingReg}
          />
          <button onClick={onClickCheckRegHandler}>주민번호 확인</button>
        </div>
        <div>
          {empNo === "" || empNo === undefined
            ? "주민번호를 확인해주세요"
            : "주민번호가 확인되었습니다."}
        </div>

        <button onClick={onClickRegisterHandler}>회원가입</button>
        <button
          style={{
            border: "none",
            margin: 0,
            fontSize: "10px",
            height: "10px",
          }}
          onClick={onClickBackHandler}
        >
          돌아가기
        </button>
      </div>
    </div>
  );
}

export default Register;

// 성식 회원가입
// import RegisterCSS from './Register.module.css';
// import { useNavigate } from 'react-router-dom';
// import { useEffect, useRef, useState } from "react";
// import { useSelector, useDispatch } from 'react-redux';
// import Swal from 'sweetalert2';

// import {
//     callRegisterAPI,
//     callGetMemberAPI
// } from '../../apis/MemberAPICalls'

// function Register() {

//     const navigate = useNavigate();

//     // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
//     const dispatch = useDispatch();
//     const member = useSelector(state => state.memberReducer);  // API 요청하여 가져온 loginMember 정보

//     const inputRef = useRef([]);

//     const [form, setForm] = useState({
//         memberId: '',
//         memberPassword: '',
//         memberName: '',
//         memberEmail: ''
//     });

//     useEffect(() => {
//         if(member.status === 201){
//             console.log("[Login] Register SUCCESS {}", member);
//             navigate("/login", { replace: true })
//         }
//         console.log('member.data', member.data)

//         if(member.data === undefined){
//             inputRef.current[1].focus();                // # 값이 없을경우 비밀번호로 포커스
//         } else {
//             inputRef.current[0].focus();                // # 값이 있을경우(사용불가 아이디)일때 포커스 아이디로
//         }
//         console.log('checkId', checkId)
//     }, // eslint-disable-next-line
//     [member]);

//     const [checkId, setCheckId] = useState();

//     const onChangeHandler = (e) => {
//         setForm({
//             ...form,
//             [e.target.name]: e.target.value
//         });
//         if (e.target.name === 'memberId'){
//             setCheckId(false)
//             console.log('checkId', checkId)
//         }
//     };

//     const onClickBackHandler = () => {
//         // 돌아가기 클릭시 메인 페이지로 이동
//         navigate("/", { replace: true })
//     }

//     const onClickIdCheckHandler = () => {

//         dispatch(callGetMemberAPI({
//             memberId: form.memberId
//         }));

//     //로고 클릭 핸들러
//     const onClickLogoHandler = () => {
//         navigate("/", { replace: true })
//     }

//     const onClickRegisterHandler = () => {
//         if(form.memberId === '' || form.memberPassword === '' || form.memberName === ''){
//             for(let i = 0; i<inputRef.current.length; i++){
//                 if(inputRef.current[i].value === ""){
//                     Swal.fire({
//                         position: 'center',
//                         icon: 'error',
//                         title: inputRef.current[i].placeholder + "은(는) 필수 입력사항입니다.",
//                         timer: 1000
//                     })
//                     inputRef.current[i].focus();
//                 break;
//                 }
//             }
//         } else{
//             dispatch(callRegisterAPI({
//                 form: form
//             }));
//         }

//     }

//     return (
//         <div className={ RegisterCSS.backgroundDiv}>
//             <button className={ RegisterCSS.LogoBtn } onClick={ onClickLogoHandler }><p>In My Poket Mon</p></button>
//             <div className={ RegisterCSS.registerDiv }>
//                 <h1>회원가입</h1>
//                 <div></div>
//                 <div className={ RegisterCSS.checkId }>
//                     <input
//                         type="text"
//                         name="memberId"
//                         placeholder="아이디"
//                         autoComplete='off'
//                         autoFocus
//                         ref={refObj => inputRef.current[0] = refObj}
//                         onChange={ onChangeHandler }
//                     />
//                     <button onClick = { onClickIdCheckHandler }>
//                         중복확인
//                     </button>

//                 </div>
//                 {checkId ? <p style={ {marginTop : 2, marginBottom : 2, fontSize : 11, marginRight : 150 } }>사용 가능한 아이디입니다.</p> : <p style={ {marginTop : 2, marginBottom : 2, fontSize : 11, marginRight : 150 } }>사용 불가능한 아이디입니다.</p>}
//                 <input
//                     type="password"
//                     name="memberPassword"
//                     placeholder="패스워드"
//                     autoComplete='off'
//                     ref={refObj => inputRef.current[1] = refObj}
//                     onChange={ onChangeHandler }
//                 />
//                 <input
//                     type="text"
//                     name="memberName"
//                     placeholder="이름"
//                     autoComplete='off'
//                     ref={refObj => inputRef.current[2] = refObj}
//                     onChange={ onChangeHandler }
//                 />
//                 <input
//                     type="text"
//                     name="memberEmail"
//                     placeholder="이메일"
//                     autoComplete='off'
//                     onChange={ onChangeHandler }
//                 />
//                 <button
//                     onClick = { onClickRegisterHandler }
//                     disabled = { checkId ? false : true}
//                     style={ checkId ? { marginTop: '30px' } : { background : 'red', marginTop: '30px'}}
//                 >
//                     회원가입
//                 </button>
//                 <button
//                     style={ { border: 'none', margin: 0, marginBottom: -50, fontSize: '13px', height: '10px', background: '#F7F8FD', color : 'black' } }
//                     onClick = { onClickBackHandler }
//                 >
//                     돌아가기
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default Register;
