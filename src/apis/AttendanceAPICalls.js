
import { 
    GET_STICKER,
    GET_STICKERS,
    // GET_STICKERS_LEGEND,
    // GET_STICKERS_FIRST,
    // GET_STICKERS_SECOND,
    POST_STICKER,
    PUT_STICKER,
    DELETE_STICKER
} from '../modules/StickerModule.js';

// 스티커 검색
export const callSearchStickerAPI = ({searchValue, condition}) => {
    console.log('[StickerAPICalls] callSearchStickerAPI Call');

    console.log(searchValue)
    console.log(condition)

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/stickers/search?condition=${condition}&searchValue=${searchValue}`;

    console.log(requestURL)
    
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());

        console.log('[StickerAPICalls] callSearchStickerAPI RESULT : ', result);

        dispatch({ type: GET_STICKERS,  payload: result.data });
        
    };    
};

// 스티커 전체조회
export const callStickerListAPI = ({currentPage}) => {
    
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/stickers?offset=${currentPage}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/stickers`;
    }
    
    console.log('[StickerAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"                
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log('[StickerAPICalls] callStickerAPI RESULT : ', result);
            dispatch({ type: GET_STICKERS,  payload: result.data });
        }
        
    };
}

// 스티커 상세조회
export const callStickerDetailAPI = ({stickerCode}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/stickers/${stickerCode}`;

    return async (dispatch, getState) => {


        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());

        console.log('[StickerAPICalls] callStickerDetailAPI RESULT : ', result);
        if(result.status === 200){
            console.log('[StickerAPICalls] callStickerDetailAPI SUCCESS');
            dispatch({ type: GET_STICKER,  payload: result.data });
        }
        
        
    };
}

// 관리자용 스티커 리스트 조회
export const callStickerListForAdminAPI = ({currentPage}) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/stickers-management?offset=${currentPage}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/stickers-management`;
    }
    
    console.log('[StickerAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log('[StickerAPICalls] callStickerListForAdminAPI RESULT : ', result);
            dispatch({ type: GET_STICKERS,  payload: result.data });
        }
        
    };
}

// 관리자용 스티커 상세조회
export const callStickerDetailForAdminAPI = ({stickerCode}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/stickers-management/${stickerCode}`;

    return async (dispatch, getState) => {


        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        console.log('[StickerAPICalls] callStickerDetailAPI RESULT : ', result);
        if(result.status === 200){
            console.log('[StickerAPICalls] callStickerDetailAPI SUCCESS');
            dispatch({ type: GET_STICKER,  payload: result.data });
        }
    };
}

// 관리자용 스티커 등록
export const callStickerRegistAPI = ({form}) => {
    console.log('[StickerAPICalls] callStickerRegistAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/stickers-management`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form
        })
        .then(response => response.json());

        console.log('[StickerAPICalls] callStickerRegistAPI RESULT : ', result);

        dispatch({ type: POST_STICKER,  payload: result });
        
    };    
}

// 관리자용 스티커 삭제
export const callStickerDeleteAPI = ({stickerCode}) => {
    console.log('[StickerAPICalls] callStickerDeleteAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/stickers-management/${stickerCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        console.log('[StickerAPICalls] callStickerDeleteAPI RESULT : ', result);

        dispatch({ type: DELETE_STICKER,  payload: result });
        
    };    
}

// 관리자용 스티커 수정
export const callStickerUpdateAPI = ({form}) => {
    console.log('[StickerAPICalls] callStickerUpdateAPI Call');
    
    const stickerCode = form.get('stickerCode')     // # formData에 있는 값을 가져올땐 .get메소드로 가져옴

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/stickers-management/${stickerCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form
        })
        .then(response => response.json());

        console.log('[StickerAPICalls] callStickerUpdateAPI RESULT : ', result);

        dispatch({ type: PUT_STICKER,  payload: result });
        
    };    
}

//카테고리별 스티커 목록 조회
export const callStickerListAboutCategoryAPI = ({categoryCode}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/stickers/categories/${categoryCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"                
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log('[StickerAPICalls] callStickerListAboutCategoryAPI RESULT : ', result);
            dispatch({ type: GET_STICKERS,  payload: result.data });
        }
        
    };
}

//타입별 스티커 목록 조회
export const callStickerListAboutTypeAPI = ({typeCode}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/stickers/types/${typeCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"                
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log('[StickerAPICalls] callStickerListAboutTypeAPI RESULT : ', result);
            dispatch({ type: GET_STICKERS,  payload: result.data });
        }
        
    };
}