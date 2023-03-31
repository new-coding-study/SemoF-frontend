import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { callGetFormTitleAPI, callApprovRegistAPI } from "../../apis/ApprovalAPICalls"
import { useNavigate, useParams } from 'react-router-dom';

function RegistApproval() {
    const params = useNavigate();
    const dispatch = useDispatch();
    const formInfo = useSelector(state => state.approvalReducer.form);
    const [files, setFiles] = useState([]);
    const [filePath, setFilePath] = useState();
    const fileInput = useRef();
    const [approval, setApproval] = useState({
        // 문제는 이게 하나하나의 필드가 아닌,,, 테이블이라는 점?////
        approvTitle:''
        // ,이게 리스트로 들어가려면??
        , approvContentDTOList : [
            { content : ''}
        ]

    })
    useEffect(
        () => {
            dispatch(callGetFormTitleAPI({	
                formCode: params.formCode
            }));  

        } // eslint-disable-next-line
        ,[]
    );
    // useEffect(() => {
    //     // 이미지 업로드시 미리보기 세팅
    //     if(files){
    //         const fileReader = new FileReader();
    //         fileReader.onload = (e) => {
    //             const { result } = e.target;
    //             if( result ){
    //                 setFilePath(result);
    //             }
    //         }
    //         fileReader.readAsDataURL(files);
    //     }
    // },
    // [files]);


    const selectHandler = (e)=>{
// select에서 받은 값을 저장해서 일치여부를 확인하고 form을 띄워야하나?
    }
    const onChangeFileUpload= (e) =>{
        setFiles(e.target.files);
    }
    const onClickfilesUpload = () => {
        fileInput.current.click();
    }
    const onChangeHandler = (e) => {
        setApproval({
            ...approval,
            [e.target.name]: e.target.value
        });
    };

    const onClickApprovRegistrationHandler = () => {

        console.log('[ProductRegistration] onClickProductRegistrationHandler');

        const formData = new FormData();

        formData.append("approvTitle", approval.approvTitle);
        formData.append("content", approval.content);
        // formData.append("productOrderable", approval.productOrderable);
        // formData.append("categoryCode", approval.categoryCode);
        // formData.append("productStock", approval.productStock);
        // formData.append("productDescription", approval.productDescription);

        if(files){
            formData.append("files", files);
        }
        // console.log('[ProductRegistration] formData : ', formData.get("productName"));
        // console.log('[ProductRegistration] formData : ', formData.get("productPrice"));
        // console.log('[ProductRegistration] formData : ', formData.get("productOrderable"));
        // console.log('[ProductRegistration] formData : ', formData.get("categoryCode"));
        // console.log('[ProductRegistration] formData : ', formData.get("productStock"));
        // console.log('[ProductRegistration] formData : ', formData.get("productDescription"));
        // console.log('[ProductRegistration] formData : ', formData.get("productImageUrl"));

        dispatch(callApprovRegistAPI({	// 상품 상세 정보 조회
            approval: formData
        }));        
        
        
        // alert('상품 리스트로 이동합니다.');
        // navigate('/product-management', { replace: true });
        // window.location.reload();
// 현재 상황 : 셀렉트 박스에서 선택을 하면 그에 맞는 양식을 불러와야하는데
// 지금은 formCode를 option에도 설정하고 api로도 call했다... 그말은 즉,,,,, 시점을 언제로 인식할 건지를 모르겠음... 안될 것 같은데
// 어떻게 해야할까 이게 아예 안될 문제는 아닐텐데
    return(
        <>
            <div 
            // className={title}
            >
                결재 상신
            </div>
            <div 
            // className={category}
            >
                <p>카테고리</p>
                <select onChange={selectHandler}>
                    <option value="none" disabled>작성유형선택</option>
                    <option value="A" name="formCode">지출결의서</option>
                    <option value="B" name="formCode">지출계획서</option>
                    <option value="C" name="formCode">경조금지급신청서</option>
                    <option value="D" name="formCode">연차</option>
                    <option value="E" name="formCode">연장근무</option>
                    <option value="F" name="formCode">출장</option>
                    <option value="G" name="formCode">반차</option>
                    <option value="H" name="formCode">구매요청서</option>
                </select>

            </div>
            <div 
            // className={docuName}
            >
                <p>제목</p>
                <input 
                // className={nameInput} 
                onChange={onChangeHandler} placeholder="제목 입력" name='approvTitle'></input>
                
            </div>
            <div 
            // className={application}
            >
                <p>신청서 작성</p>
                <div 
                // className={application}
                >
                {formInfo.approvContentDTOList.map(dto => (
                <div key={dto.contentNo}>
                <span>{dto.formTitle}</span>:
                <span>{dto.content}</span>
                </div>
                ))}
            </div>
                <div 
                // className={contentTitle}
                >
                    {formInfo.formTitle.map(t =>(
                        <div key={t.formCode}>
                        <span>{t.formTitle}</span>:
                        <input name='content' onChange={onChangeHandler}
                                        // className={  }
                                            />
                    </div>
                    ))

                    }

                </div>
                {/* { filePath && <img 
                            // className={ ProductRegistrationCSS.productImage } 
                            src={ filePath } 
                            alt="preview"
                        />} */}
                <input                
                            // style={ { display: 'none' }}
                            type="file"
                            name='file' 
                            accept=""
                            multiple onChange={ onChangeFileUpload }
                            ref={ fileInput }
                        />
                        <button 
                            // className={ ProductRegistrationCSS.productImageButton }
                            onClick={ onClickfilesUpload } 
                        >
                            파일 업로드
                            </button>
            </div>
            <button 
            // className={btnTurn}
            >취소</button>
            <button type="submit" 
            // className={btnSend} 
            onClick={onClickApprovRegistrationHandler}>결재상신</button>
        </>
    )
}
}
export default RegistApproval;