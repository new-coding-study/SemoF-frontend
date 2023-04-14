import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch } from "react-redux";
import {useEffect} from "react";
import { callDeleteLineAPI, callLineDetailAPI } from "../../apis/ApprovalAPICalls";
import { decodeJwt } from '../../utils/tokenUtils';
import Linecss from './Linecss.module.css';

function Line({line}){
    const lineInfo = useSelector(state => state.approvalReducer.lineInfo);
    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;
    console.log('로그인', isLogin)
    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.auth[0];
        console.log(temp);
        console.log('??', temp)
        console.log('decoded', decoded);
    }
    useEffect(
        () => {
            
            dispatch(callLineDetailAPI(
                 parseInt(line?.lineNo)
            )); 
            
        } // eslint-disable-next-line
        ,[]
    );

    const nav = useNavigate();
    const dispatch  = useDispatch();

    // {console.log(line.approvOrderDTOList[0].empName)}
    return(
        <>
        <br/>
        <br/>
        {decoded == 'ROLE_ADMIN' &&
        <button className={Linecss.deletebtn} onClick={()=>{
                    dispatch(callDeleteLineAPI({
                        lineNo : line.lineNo, 
                        form : lineInfo}));
                        nav(`/semof/lines`, {replace: true})
                        window.location.reload();

                }}>x</button>
            }
            <div className={Linecss.titleoutLine}>
                <h2>{line.branchName} : {line.deptName}</h2>
                <hr/>
                <br/>
                {(line.approvOrderDTOList).map((order, index, arr) => (
            <label className={Linecss.content} style={{fontSize:'30px', textAlign:'center'}}>
            &nbsp;&nbsp;
            <label>{order.jobName} : </label>  
            <label>{order.empName}</label> &nbsp;
            {index !== arr.length - 1 && <label><img className={Linecss.arrow} src="/images/left-arrow (2).png"/></label>}
            </label> 
            ))}
            </div>  
        </>
    );

}
export default Line;