import { useNavigate } from "react-router-dom";

function Line({line : {lineNo, branchCode, approvOrderDTOList}}){
    return(
        <>
        <div> 다른건 뜨니? </div>
            <div>
                {/* order관련 map orderdiv와 화살표 */}
                <h3>{branchCode}</h3>
                {/* <h3>{approvOrderDTOList.jobName}</h3> */}
                <h3>{approvOrderDTOList.empNo}</h3>

            </div>  
        </>
    );

}
export default Line;