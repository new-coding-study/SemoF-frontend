import RegisterCSS from './Register.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import {
    callRegisterAPI
} from '../../apis/MemberAPICalls'

function Register() {

    const navigate = useNavigate();

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);  // API 요청하여 가져온 loginMember 정보
    
    const [form, setForm] = useState({
        memberId: '',
        memberPassword: '',
        memberName: '',
        memberEmail: ''
    });
    useEffect(() => {
        if(member.status === 201){
            console.log("[Login] Register SUCCESS {}", member);
            navigate("/login", { replace: true })
        }
    }, // eslint-disable-next-line
    [member]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };    

    const onClickBackHandler = () => {
        // 돌아가기 클릭시 메인 페이지로 이동
        navigate("/", { replace: true })
    }
    
    const onClickRegisterHandler = () => {
        dispatch(callRegisterAPI({
            form: form
        }));
    }

    return (
        <div className={ RegisterCSS.backgroundDiv}>
            <div className={ RegisterCSS.registerDiv }>
                <h1>회원가입</h1>
                <input 
                    type="text" 
                    name="memberId"
                    placeholder="아이디" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input 
                    type="password"
                    name="memberPassword" 
                    placeholder="패스워드" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input 
                    type="text" 
                    name="memberName"
                    placeholder="이름" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input 
                    type="text" 
                    name="memberEmail"
                    placeholder="이메일" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <button
                    onClick = { onClickRegisterHandler }
                >   
                    회원가입
                </button>
                <button
                    style={ { border: 'none', margin: 0, fontSize: '10px', height: '10px' } }
                    onClick = { onClickBackHandler }
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