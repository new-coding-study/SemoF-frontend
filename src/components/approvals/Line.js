import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { callDeleteLineAPI } from "../../apis/ApprovalAPICalls";
import { decodeJwt } from '../../utils/tokenUtils';
import Linecss from './Linecss.module.css';

function Line({line}){
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
    
    const nav = useNavigate();
    const dispatch  = useDispatch();
    // {console.log(line.approvOrderDTOList[0].empName)}
    return(
        <>
        <br/>
        <br/>
        <button className={Linecss.deletebtn} onClick={()=>{
                    dispatch(callDeleteLineAPI(line.lineNo));
                }}>x</button>
            <div className={Linecss.titleoutLine}>
                <h3>{line.branchName} : {line.deptName}</h3>
                <hr/>
                {/* <h3>{approvOrderDTOList.jobName}</h3> */}
                {(line.approvOrderDTOList).map((order, index, arr) => (
            <label>
            <label>{order.jobName}</label>  
            <label>{order.empName}</label>
            {index !== arr.length - 1 && <label> ▶ </label>}
            </label>
            ))}
            </div>  
        </>
    );

}
export default Line;