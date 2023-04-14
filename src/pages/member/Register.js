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

  const [form, setForm] = useState({
    loginId: "",
    loginPwd: "",
    checkPwd: "",
    empReg: "",
  });

  const { empReg } = form;

  const [checkId, setCheckId] = useState(false);
  // const [originReg, setOriginReg] = useState();
  const [maskingReg, setMaskingReg] = useState();

  // console.log(originReg);
  // console.log(maskingReg);

  // console.log(
  //   form.empReg
  //     .replace(/[^0-9]/g, "")
  //     .replace(/^(\d{0,6})(\d{0,7})$/g, "$1-$2")
  //     .replace(/-{1,2}$/g, "")
  // );
  // console.log(maskingReg);

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

  // const onChangeEmpRegHandler = (e) => {

  //   // setMaskingReg()
  // };

  // 주민등록번호 마스킹하는 코드 => 마스킹하려면 우선 하이픈이 있는 상태여야함
  // var rrnMatchValue = MaskingData.match(
  //   /(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-4]{1}[0-9]{6}\b/gi
  // );
  // if (checkValueNull(rrnMatchValue) == true) {
  //   MaskingData = MaskingData;
  // } else {
  //   len = rrnMatchValue.toString().split("-").length;
  //   MaskingData = MaskingData.toString().replace(
  //     rrnMatchValue,
  //     rrnMatchValue
  //       .toString()
  //       .replace(/(-?)([1-4]{1})([0-9]{6})\b/gi, "$1$2******")
  //   );
  // }
  // useEffect(() => {
  //   if (empReg.length > 0 && empReg.length < 7) {
  //     setForm({
  //       empReg: empReg,
  //     });
  //   } else if (empReg.length > 6 && empReg.length < 14) {
  //     setForm({
  //       empReg: empReg
  //         .replace(/[^0-9]/g, "")
  //         .replace(/^(\d{0,6})(\d{0,7})$/g, "$1-$2")
  //         .replace(/-{1,2}$/g, ""),
  //     });
  //   }
  // }, [empReg]);

  // useEffect(() => {
  //   setForm({
  //     empReg: empReg
  //       .replace(/[^0-9]/g, "")
  //       .replace(/^(\d{0,6})(\d{0,7})$/g, "$1-$2")
  //       .replace(/-{1,2}$/g, ""),
  //   });
  // }, [empReg]);

  // useEffect(() => {
  //   if (empReg.length > 6) {
  //     setMaskingReg(
  //       empReg.replace(/-/g, "").replace(/(\d{6})(\d{1})(\d{6})/, "$1-$2******")
  //     );
  //   }
  // }, [empReg]);

  // console.log(empReg);

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
    } else {
      alert("비밀번호가 다릅니다.");
    }
  };

  // 주민번호를 보내서 DB에 존재하는 사원인지 확인
  const onClickCheckRegHandler = () => {
    dispatch(callCheckRegAPI(form.empReg));
  };

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
          onChange={onChangeHandler}
        />
        <input
          type="password"
          name="checkPwd"
          placeholder="비밀번호 확인"
          autoComplete="off"
          required
          onChange={onChangeHandler}
        />
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
            value={maskingReg?.length === 0 ? empReg : maskingReg}
          />
          <button onClick={onClickCheckRegHandler}>주민번호 확인</button>
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
