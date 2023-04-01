import { useNavigate } from "react-router-dom";

function Line({line : {lineNo, branchName, approvOrderDTOList}}){
    return(
        <>
            <div>
                {/* order관련 map orderdiv와 화살표 */}
                <h3>{branchName}</h3>
                <h3>{approvOrderDTOList.jobName}</h3>
                <h3>{approvOrderDTOList.empName}</h3>

            </div>  
        </>
    );

}
export default Line;