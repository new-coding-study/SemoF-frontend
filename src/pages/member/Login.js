import LoginCSS from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

import { callLoginAPI } from "../../apis/MemberAPICalls";

function Login() {
  const navigate = useNavigate();

  // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
  const dispatch = useDispatch();
  const loginMember = useSelector((state) => state.memberReducer); // API 요청하여 가져온 loginMember 정보

  // 폼 데이터 한번에 변경 및 State에 저장
  const [form, setForm] = useState({
    memberId: "",
    memberPassword: "",
  });

  // 상태값 확인 후 로그인되어있는 상태면 메인으로 이동시킴
  useEffect(
    () => {
      if (loginMember.status === 200) {
        console.log("[Login] Login SUCCESS {}", loginMember);
        navigate("/semof", { replace: true });
      }
    }, // eslint-disable-next-line
    [loginMember]
  );

  // 로그인 상태일 시 로그인페이지로 접근 방지
  if (loginMember.length > 0) {
    console.log("[Login] Login is already authenticated by the server");
    return <Navigate to="/semof" />;
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

  // 로그인 버튼 클릭시 디스패처 실행
  const onClickLoginHandler = () => {
    dispatch(
      callLoginAPI({
        // 로그인
        form: form,
      })
    );
  };

  return (
    <div className={LoginCSS.backgroundDiv}>
      <div className={LoginCSS.loginDiv}>
        <h1>로그인</h1>
        <input
          type="text"
          name="memberId"
          placeholder="아이디"
          autoComplete="off"
          onChange={onChangeHandler}
        />
        <input
          type="password"
          name="memberPassword"
          placeholder="패스워드"
          autoComplete="off"
          onChange={onChangeHandler}
        />
        <button onClick={onClickLoginHandler}>로그인</button>
        <button
          style={{
            border: "none",
            margin: 0,
            fontSize: "10px",
            height: "10px",
          }}
          onClick={onClickRegisterHandler}
        >
          회원가입
        </button>
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