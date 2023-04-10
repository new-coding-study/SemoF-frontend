import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { callOpinionsAPI, callRegistOpiniontAPI } from "../../apis/ApprovalAPICalls";
import { decodeJwt } from '../../utils/tokenUtils';

function Opinion({approv}){

    const isLogin = window.localStorage.getItem('accessToken');
    console.log('로그인? ',isLogin);
    let decoded = null;
    let tokenEmpNo = null;
    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.auth[0];
        tokenEmpNo = temp.empNo;
        console.log('??', temp)
    }

    console.log('decoded', decoded);
    const nav = useNavigate();
    const dispatch  = useDispatch();
    // {console.log(line.approvOrderDTOList[0].empName)}
    const opin = useSelector(state => state.approvalReducer.opinion);
    console.log(opin)
    const [opinCt, setOpinCt] = useState(
        
        ''
    );
    // empNo:tokenEmpNo,
    // approvNo:approv.approvNo,
    useEffect(
        () => {
            
            dispatch(callOpinionsAPI(
                 approv.approvNo
            )); 
            
        } // eslint-disable-next-line
        ,[]
    );

    const opinionHandler = (e) =>{
        setOpinCt(e.target.value);
    }


            
    const registerHandler = ()=> {
        const formData = new FormData();
        formData.append()
        dispatch(callRegistOpiniontAPI(
            ))
                    
    }
    return(
        <>
        {/* <div> 다른건 뜨니? </div> */}
            <div>
                {/* order관련 map orderdiv와 화살표 */}
                {
                    opin.map(o =>{
                        <div>
                        <h3>{o.empName}</h3>
                        <h3>{o.opinContent}</h3> 
                        </div>
                    })
                }
                

            </div>  
            
            <div>
            <div>
                { decoded ==="ROLE_ADMIN" &&
                <textarea placeholder="의견작성"
                onChange={opinionHandler}
                >
                    
                </textarea>
                }
            </div>
            <div>
                <button onClick={registerHandler}>등록</button>
                <button onClick={()=>{
                    nav(-1);
                }}>뒤로가기</button>
                </div>
            
            </div>
        
        </>
    );

}
export default Opinion;