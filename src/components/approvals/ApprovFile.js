import { callApprovalDetailAPI, callDeleteApprovAPI, callFilesAPI, callGetFormTitleAPI, callHandleStatusAPI } from '../../apis/ApprovalAPICalls';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';

function ApprovFile({approvInfo}){
    const dispatch = useDispatch();
    const fileList = useSelector(state=> state.approvalReducer.files);
    console.log(fileList);
    


    useEffect(()=>{
        dispatch(
            callFilesAPI(approvInfo.approvNo)
        )
    },[]);

    const API_SERVER = "http://localhost:8090/files/"; // 서버의 도메인과 포트를 지정합니다.

    const downloadFile = async({file}) => {
        console.log(file);
      const fullFilePath = `${API_SERVER}${file.filePath}`; // 상대 경로를 전체 URL로 변경합니다.
      console.log(fullFilePath);
      try {
        const response = await fetch(fullFilePath);
        const blob = await response.blob();
    
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = file.originName;
        link.click();
        link.remove();
      } catch (error) {
        console.error("File download failed:", error);
      }
    };
    
      
    //   const link = document.createElement("a");
    //   link.href = fullFilePath;
    //   link.download = originName;
    //   link.click();
    //   link.remove();
    // };
    
    return (
        <>
        {
fileList?.map((file, index) => (
    <li key={index}>
      <span
        onClick={() => downloadFile({file})}
      >
        {/* <img
          src={'/fileIcon.png'}
          // className={ReportRoundDetailCSS.fileImg}
        /> */}
        &nbsp;
        {file.originName} 
      </span>
    </li>
  ))
        }
        
        </>
    )
    
}export default ApprovFile;
//   const downloadFile = async (file) => {
//     try {
//       const response = await fetch(file.filePath, {
//         method: 'GET',
//         headers: {
//           // 필요한 헤더를 추가하세요. 예: 인증 토큰, 컨텐트 타입 등
//           "Accept": "*/*"
//         },
//       });
  
//       if (response.ok) {
//         const blob = await response.blob();
//         const url = window.URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', file.originName); // 원본 파일 이름을 사용하여 다운로드됩니다.
//         document.body.appendChild(link);
//         link.click();
//         link.parentNode.removeChild(link);
//       } else {
//         console.error('File download failed.');
//       }
//     } catch (error) {
//       console.error('Error during file download:', error);
//     }
//   };

  