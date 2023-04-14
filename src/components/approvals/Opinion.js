import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { callOpinionsAPI, callRegistOpiniontAPI } from "../../apis/ApprovalAPICalls";
import { decodeJwt } from '../../utils/tokenUtils';

function Opinion({approvInfo}){

    const isLogin = window.localStorage.getItem('accessToken');
    console.log('로그인? ',isLogin);
    let decoded = null;
    let tokenEmpNo = null;
    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.auth[0];
        tokenEmpNo = temp.empNo;
        console.log('??', temp.empNo)
    }
console.log(tokenEmpNo);
    console.log('decoded', decoded);
    const nav = useNavigate();
    const dispatch  = useDispatch();
    // {console.log(line.approvOrderDTOList[0].empName)}
    const opin = useSelector(state => state.approvalReducer.opinions);
    const postOpinion = useSelector(state => state.approvalReducer.opinion);
    console.log(opin)
    const [opinCt, setOpinCt] = useState(
        
        ''
    );
    // empNo:tokenEmpNo,
    // approvNo:approv.approvNo,
    useEffect(
        () => {
            if(postOpinion.status === 201){
                dispatch(callOpinionsAPI(
                    parseInt(approvInfo.approvNo)
                )); 
            }
            
            
        } // eslint-disable-next-line
        ,[postOpinion]
    );

    const opinionHandler = (e) =>{
        setOpinCt(e.target.value);
    }


            
    const registerHandler = ()=> {
        const formData = new FormData();
        formData.append("opinContent", opinCt);
        console.log(formData.get("opinContent"));
        
        formData.append("empNo", JSON.stringify(tokenEmpNo));
        console.log(formData.get("empNo"));
        formData.append("approvNo", JSON.stringify(approvInfo.approvNo));
        console.log(formData.get("approvNo"));
        dispatch(callRegistOpiniontAPI({
            form : formData
        }
            
            ))
                    
    }
    const downloadFile = async (file) => {
        try {
          const response = await fetch(file.filePath, {
            method: 'GET',
            headers: {
              // 필요한 헤더를 추가하세요. 예: 인증 토큰, 컨텐트 타입 등
            },
          });
      
          if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file.fileOriginName); // 원본 파일 이름을 사용하여 다운로드됩니다.
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
          } else {
            console.error('File download failed.');
          }
        } catch (error) {
          console.error('Error during file download:', error);
        }
      };
      
    return(
      <>
      {/* <div> 다른건 뜨니? </div> */}
      {opin && opin.length > 0 ? (
        <div>
          {opin.map((o, id) => (
            <div key={id}>
              <h6>{o.empName}</h6>
              <h5>{o.opinContent}</h5>
            </div>
          ))}
        </div>
      ) : null}
      <div>
        {decoded === "ROLE_ADMIN" && (
          <>
            <textarea
              style={{ resize: "none", height: "100px", width: "400px" }}
              placeholder="의견작성"
              onChange={opinionHandler}
            ></textarea>
            &nbsp;&nbsp;
            <button
              style={{ width: "80px", height: "30px" }}
              onClick={registerHandler}
            >
              등록
            </button>
          </>
        )}
      </div>
    </>
    );

}
export default Opinion;