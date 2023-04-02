import { useNavigate } from "react-router-dom";

function ApproveOut({approve : {approvNo, formTitle, approvTitle, empName, approvDate}}){
// formTitle 과 appstatus 받아올 수 있을 까????
    const navigate = useNavigate();
    const onClickHandler = (approvNo) =>{
        navigate(`/semof/approval/${approvNo}`)
    }
    
    return(
        <>
            <div onClick={onClickHandler(approvNo)}>
                <h3>{formTitle}</h3>
                <h3>{approvTitle}</h3>
                <h3>{empName}</h3>
                <h3>{approvDate}</h3> 
            </div>  
        </>
    );

}
export default ApproveOut;