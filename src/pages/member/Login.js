import LoginCSS from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { callLoginAPI } from "../../apis/MemberAPICalls";

function Login() {
  const navigate = useNavigate();

  // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
  const dispatch = useDispatch();
  const loginMember = useSelector((state) => state.memberReducer.login); // API 요청하여 가져온 loginMember 정보

  // 폼 데이터 한번에 변경 및 State에 저장
  const [form, setForm] = useState({
    loginId: "",
    loginPwd: "",
  });

  useEffect(
    () => {
      if (loginMember.status === 200) {
        Swal.fire({
          title: "환영합니다",
          text: "메인화면으로 이동합니다.",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/semof", { replace: true });
      }
      // 아이디, 비밀번호 잘못 입력 시 alert 띄우고싶은데
      // 그러면 form을 새로 입력할 때 status 값이 400이 유지되면서 계속 alert이 뜨고 있음,,,
      // else if (loginMember.status !== 200) {
      //   Swal.fire({
      //     title: loginMember?.message,
      //     showConfirmButton: false,
      //     timer: 1000,
      //   });
      // }
    }, // eslint-disable-next-line
    [loginMember]
  );

  // 로그인 상태일 시 로그인페이지로 접근 방지
  if (loginMember.length > 0) {
    console.log("[Login] Login is already authenticated by the server");
    return <Navigate to="/" />;
  }

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onClickRegisterHandler = () => {
    navigate("/register", { replace: true });
  };

  // 로그인 버튼 클릭시 디스패처 실행 및 메인 페이지로 이동
  const onClickLoginHandler = () => {
    dispatch(
      callLoginAPI({
        // 로그인
        form: form,
      })
    );
  };

  // 비밀번호 입력 후 엔터키 클릭시 로그인 실행
  const onEnterkeyLoginHandler = (e) => {
    if (e.key === "Enter") {
      dispatch(
        callLoginAPI({
          // 로그인
          form: form,
        })
      );
    }
  };

  return (
    <div className={LoginCSS.cardBody}>
      <div className={LoginCSS.loginDiv}>
        <div className={LoginCSS.logoBox}>
          <img
            src={"/images/logo.png"}
            alt="이미지확인!"
            className={LoginCSS.logo}
          ></img>
          <h1 className={LoginCSS.title}>로그인</h1>
        </div>

        <div className={LoginCSS.registBox}>
          <div>
            <label>아이디</label>
          </div>
          <div className={LoginCSS.registContainer}>
            <input
              type="text"
              name="loginId"
              id="fileInput"
              placeholder="아이디"
              autoComplete="off"
              onChange={onChangeHandler}
              className={LoginCSS.inputBox}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#E52E2E"
              className="bi bi-person"
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
            </svg>
          </div>
        </div>
        <div className={LoginCSS.registBox}>
          {/* <div> */}
          <label>비밀번호</label>
          {/* </div> */}
          <div className={LoginCSS.registContainer}>
            <input
              type="password"
              name="loginPwd"
              placeholder="비밀번호"
              autoComplete="off"
              onChange={onChangeHandler}
              onKeyUp={onEnterkeyLoginHandler}
              className={LoginCSS.inputBox}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#E52E2E"
              className="bi bi-shield-lock"
              viewBox="0 0 16 16"
            >
              <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
              <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z" />
            </svg>
          </div>
        </div>

        <div className={LoginCSS.registBox}>
          <button className={LoginCSS.registBtn} onClick={onClickLoginHandler}>
            로그인
          </button>
        </div>
        <div>
          {/* <span>Don't have an account? </span> */}
          <span style={{
            border: "none",
            margin: 0,
            marginTop: "-10px",
            fontSize: "11px",
            height: "10px",
            color: "#e52e2e",
            fontWeight: "bold",
            textDecorationLine: "none"
          }} className={LoginCSS.login} onClick={onClickRegisterHandler}>
            회원가입
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;

// 성식 로그인
// import LoginCSS from './Login.module.css';
// import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from 'react-redux';
// import { Navigate } from "react-router-dom";
// import Swal from 'sweetalert2';

// import {
//     callLoginAPI
// } from '../../apis/MemberAPICalls'

// function Login() {

//     const navigate = useNavigate();

//     // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
//     const dispatch = useDispatch();
//     const loginMember = useSelector(state => state.memberReducer);  // API 요청하여 가져온 loginMember 정보
//     const isLogin = window.localStorage.getItem('accessToken');

//     // 폼 데이터 한번에 변경 및 State에 저장
//     const [form, setForm] = useState({
//         memberId: '',
//         memberPassword: ''
//     });

//     useEffect(() => {
//         if(loginMember.status === 200){
//             console.log("[Login] Login SUCCESS {}", loginMember);
//             navigate("/", { replace: true });
//         }
//     } // eslint-disable-next-line
//     ,[loginMember]);

//     // 로그인 상태일 시 로그인페이지로 접근 방지
//     if(isLogin !== null) {
//         console.log("[Login] Login is already authenticated by the server");
//         return <Navigate to="/"/>
//     }

//     const onChangeHandler = (e) => {
//         setForm({
//             ...form,
//             [e.target.name]: e.target.value
//         });
//     };

//     const onClickRegisterHandler = () => {
//         loginMember.status = '';
//         navigate("/register", { replace: true })
//     }

//     // 로그인 버튼 클릭시 디스패처 실행 및 메인 페이지로 이동
//     const onClickLoginHandler = () => {
//         if(form.memberId === '' && form.memberPassword === ''){
//             Swal.fire({
//                 position: 'center',
//                 icon: 'error',
//                 title: '로그인 정보를 입력해주세요.',
//                 timer: 1000
//             })
//         } else if(form.memberPassword === ''){
//             Swal.fire({
//                 position: 'center',
//                 icon: 'error',
//                 title: '비밀번호를 입력해주세요.',
//                 timer: 1000
//             })
//         } else if(form.memberId === ''){
//             Swal.fire({
//                 position: 'center',
//                 icon: 'error',
//                 title: '아이디를 입력해주세요.',
//                 timer: 1000
//             })
//         } else{
//             dispatch(callLoginAPI({	// 로그인
//                 form: form
//             }));
//         }
//     }

//     //로고 클릭 핸들러
//     const onClickLogoHandler = () => {
//         navigate("/", { replace: true })
//     }

//     // 엔터키 로그인
//     const onEnterkeyHandler = (e) => {
//         if (e.key === 'Enter') {
//             onClickLoginHandler()
//         }
//     }

//     return (
//         <div className={ LoginCSS.backgroundDiv}>
//             <button className={ LoginCSS.LogoBtn } onClick={ onClickLogoHandler }><p>In My Poket Mon</p></button>
//             <div className={ LoginCSS.loginDiv }>
//                 <h1>로그인</h1>
//                 <div></div>
//                 <input
//                     type="text"
//                     name='memberId'
//                     placeholder="아이디"
//                     autoComplete='off'
//                     autoFocus
//                     onChange={ onChangeHandler }
//                 />
//                 <input
//                     type="password"
//                     name='memberPassword'
//                     placeholder="패스워드"
//                     autoComplete='off'
//                     onChange={ onChangeHandler }
//                     onKeyDown={ onEnterkeyHandler }
//                 />
//                 <button
//                     onClick={ onClickLoginHandler }
//                     style={ { marginTop: '30px' } }
//                 >
//                     로그인
//                 </button>
//                 <button
//                     style={ { border: 'none', margin: 0, fontSize: '13px', height: '10px', background: '#F7F8FD', color : 'black' } }
//                     onClick={ onClickRegisterHandler }
//                 >
//                     회원가입
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default Login;
