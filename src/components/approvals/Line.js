import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { callDeleteLineAPI } from "../../apis/ApprovalAPICalls";
function Line({line}){

    const nav = useNavigate();
    const dispatch  = useDispatch();
    // {console.log(line.approvOrderDTOList[0].empName)}
    return(
        <>
        {/* <div> 다른건 뜨니? </div> */}
            <div>
                {/* order관련 map orderdiv와 화살표 */}
                <h3>{line.branchName}</h3>
                {/* <h3>{approvOrderDTOList.jobName}</h3> */}
                {(line.approvOrderDTOList).map((order) => (
                    <h3>{order.empName}</h3>
                ))}
            </div>  
            <div>
                <button onClick={()=>{
                    nav(`/semof/edit-line/${line.lineNo}`);
                }}>수정</button>
                <button onClick={()=>{
                    dispatch(callDeleteLineAPI(line.lineNo));
                }}>삭제</button>
            </div>
        </>
    );

}
export default Line;