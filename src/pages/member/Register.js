import RegisterCSS from './Register.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import {
    callRegisterAPI, callCheckRegAPI, callcheckIdAPI
} from '../../apis/MemberAPICalls'

function Register() {

    const navigate = useNavigate();

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);  // API 요청하여 가져온 loginMember 정보
    const register = useSelector(state => state.memberReducer.regist)
    
    const [form, setForm] = useState({
        loginId: '',
        loginPwd: ''
        ,
        memberName:'',
        empReg: '',
        // empReg: ''
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
        navigate("/semof", { replace: true })
    }
    
    const onClickRegisterHandler = () => {
        if(form.loginPwd === form.memberName){
            dispatch(callRegisterAPI({
                form: form
            }))
        }else{
            alert("비밀번호가 다릅니다.");
        }
        
    }
    const onClickCheckHandler = () =>{
        dispatch(callCheckRegAPI(form.empReg));
    }

    const onClickCompareHandler = () => {
        dispatch(callcheckIdAPI(form.loginId));

    }
    
    useEffect(()=>{
        console.log(register.status)
        if(register.status === 201){
            navigate("/", { replace: true })
        } else{
            navigate("/register", { replace:true})
        }
    },[register])
    

    return (
        <div className={ RegisterCSS.backgroundDiv}>
            <div className={ RegisterCSS.registerDiv }>
                <h1>회원가입</h1>
                <input 
                    type="text" 
                    name="loginId"
                    placeholder="아이디" 
                    autoComplete='off'
                    required
                    onChange={ onChangeHandler }
                />
                <button
                onClick = { onClickCompareHandler }
            >   
                아이디 확인
            </button>
                <input 
                    type="password"
                    name="loginPwd" 
                    placeholder="패스워드" 
                    autoComplete='off'
                    required
                    onChange={ onChangeHandler }
                />
                <input 
                    type="password" 
                    name="memberName"
                    placeholder="비밀번호 확인" 
                    autoComplete='off'
                    required
                    onChange={ onChangeHandler }
                />
                <input 
                    type="text" 
                    name="empReg"
                    placeholder="주민번호" 
                    autoComplete='off'
                    required
                    onChange={ onChangeHandler }
                />
                <button
                onClick = { onClickCheckHandler }
            >   
                주민번호 확인
            </button>
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