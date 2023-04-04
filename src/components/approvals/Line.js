import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { callDeleteLineAPI } from "../../apis/ApprovalAPICalls";
function Line({line : {lineNo, branchName, approvOrderDTOList}}){

    const nav = useNavigate();
    const dispatch  = useDispatch();
    return(
        <>
        <div> 다른건 뜨니? </div>
            <div>
                {/* order관련 map orderdiv와 화살표 */}
                <h3>{branchName}</h3>
                {/* <h3>{approvOrderDTOList.jobName}</h3> */}
                {/* <h3>{approvOrderDTOList.empNo}</h3> */}

            </div>  
            <div>
                <button onClick={()=>{
                    nav(`semof/edit-line`);
                }}>수정</button>
                <button onClick={()=>{
                    dispatch(callDeleteLineAPI(lineNo));
                }}>삭제</button>
            </div>
        </>
    );

}
export default Line;