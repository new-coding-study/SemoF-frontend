import {
    GET_BOARD_NOTICE,
    GET_BOARD_NOTICES,
    GET_BOARD_NOTICES_TOP3,
    GET_BOARD_POSTING,
    GET_BOARD_POSTINGS,
    POST_BOARD_NOTICE,
    PUT_BOARD_NOTICE,
    DELETE_BOARD_NOTICE,
    POST_BOARD_POSTING,
    PUT_BOARD_POSTING,
    DELETE_BOARD_POSTING
} from '../modules/BoardModule.js';

// 공지사항 리스트 조회를 위한 API
export const callBoardNoticeListAPI=({currentPage})=>{
    let requestURL;

    if(currentPage !== undefined || currentPage !==null){
        requestURL= `http://localhost:8090/boards/board-notice-lists?offset=${currentPage}`;
    } else {
        requestURL= `http://localhost:8090/boards/board-notice-lists`;
    }

    console.log('공지사항 목록 조회')

    return async(dispatch, getstate) => {
        const result = await fetch(requestURL, {
            method:"GET",
            headers:{
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Access-Control-Allow-Origin" : "*"
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log(result);
            dispatch({type: GET_BOARD_NOTICES, payload: result.data});
        };
    }
}
    // 게시글 리스트 조회를 위한 API
    export const callBoardPostingListAPI=({currentPage})=>{
        let requestURL;
    
        if(currentPage !== undefined || currentPage !==null){
            requestURL= `http://localhost:8090/boards/board-posting-lists?offset=${currentPage}`;
        } else {
            requestURL= `http://localhost:8090/boards/board-posting-lists`;
        }
    
        console.log('게시글 목록 조회')
    
        return async(dispatch, getstate) => {
            const result = await fetch(requestURL, {
                method:"GET",
                headers:{
                    "Content-Type" : "application/json",
                    "Accept": "*/*",
                    "Access-Control-Allow-Origin" : "*"
                }
            })
            .then(response => response.json());
            if(result.status === 200){
                console.log(result);
                dispatch({type: GET_BOARD_POSTINGS, payload: result.data});
            }
        }
    }

    export const callBoardNoticeTop3Lists = () => {
        let requestURL;

        requestURL = `http://localhost:8090/boards/board-notice-top3`;

        console.log('공지사항 최신 3개 목록 조회')

        return async (dispatch, getState) => {
            const result = await fetch (requestURL, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Access-Control-Allow-Origin" : "*"
            }
        })
        .then (response => response.json());
        if(result.status === 200){
            console.log(result);
            dispatch({type: GET_BOARD_NOTICES_TOP3, payload: result.data})
            }
        }
    }

    export const callBoardNoticeDetail = ({boardNo}) => {
        let requestURL;

        requestURL = `http://localhost:8090/boards/board-notice/${boardNo}`;

        console.log('공지사항 상세조회')

        return async (dispatch, getState) =>{
            const result = await fetch (requestURL,{
                method: "GET",
                headers: {
                    "Content-type":"application/json",
                    "Accept":"*/*"
                }
            })
            .then(response => response.json());
            console.log(result);

            if(result.status === 200){
                console.log('공지사항 상세조회 완료');
                dispatch({type:GET_BOARD_NOTICE, payload: result.data})
            }
        }; 
    }

    export const callBoardPostingDetail = ({boardNo}) => {
        let requestURL;

        requestURL = `http://localhost:8090/boards/board-posting-lists/${boardNo}`;

        console.log('게시글 상세조회')

        return async (dispatch, getState) =>{
            const result = await fetch (requestURL,{
                method: "GET",
                headers: {
                    "Content-type":"application/json",
                    "Accept":"*/*"
                }
            })
            .then(response => response.json());
            console.log(result);

            if(result.status === 200){
                console.log('공지사항 상세조회 완료');
                dispatch({type:GET_BOARD_POSTING, payload: result.data})
            }
        }; 
    }    

    export const callRegistNoticeAPI = ({noticeInfo}) => {
        console.log('공시사항 API 시작');

        const requestURL = `http://localhost:8090/boards/board-notice-lists`;
        
        return async (dispatch, getState) => {
            console.log('공지사항 등록 비동기시작');
            const result = await fetch(requestURL, {
                method:"POST",
                headers:{
                    "Accept":"*/*",
                    "Authorization":"Bearer" + window.localStorage.getItem("accessToken")
                },
                body: noticeInfo
            })
            .then(response => response.json());

            dispatch({type:POST_BOARD_NOTICE, payload: result});

            console.log('공지사항등록==========완료')
        };
         
    }

    export const callRegistPostingAPI = ({postingInfo}) => {
        console.log('게시글 등록 api call');

        const requestURL = `http://localhost:8090/boards/board-posting-lists`;

        return async (dispatch, getState) => {
            console.log('게시글 등록 api 시작');
            const result = await fetch(requestURL,{
                method:"POST",
                headers:{
                    "Accept":"*/*",
                    "Authorization":"Bearer" + window.localStorage.getItem("accessToken")
                },
                body: postingInfo
            })
            .then(response => response.json());
            
            console.log(result);

            dispatch({type:POST_BOARD_POSTING, payload:result});
        }
    }

    export const callUpdateNoticeAPI = ({form, boardNo}) => {
        const requestURL = `http://localhost:8090/boards/board-all-lists/${boardNo}`;

        return async (dispatch, getState) => {
            const result = await fetch(requestURL, {
                method:"PUT",
                headers:{
                    "Accept": "*/*",
                    "Authorization":"Bearer" + window.localStorage.getItem("accessToekn")
                },
                body: form
            })
            .then(response => response.json());

            console.log("callupdatenoticeapi"+result);

            dispatch({type: PUT_BOARD_NOTICE, payload: result})
        }
    }

    export const callUpdatePostingAPIForAdmin = ({form, boardNo}) => {
        const requestURL = `http://localhost:8090/boards/board-all-lists/${boardNo}`;

        return async (dispatch, getState) => {
            const result = await fetch(requestURL, {
                method:"PUT",
                headers:{
                    "Accept": "*/*",
                    "Authorization":"Bearer" + window.localStorage.getItem("accessToekn")
                },
                body: form
            })
            .then(response => response.json());

            console.log("callupdatenoticeapi"+result);

            dispatch({type: PUT_BOARD_POSTING, payload: result})
        }
    }

    
    export const callUpdatePostingAPIForEmp = ({form, boardNo, empNo}) => {
        const requestURL = `http://localhost:8090/boards/board-all-lists/${boardNo}/${empNo}`;

        return async (dispatch, getState) => {
            const result = await fetch(requestURL, {
                method:"PUT",
                headers:{
                    "Accept": "*/*",
                    "Authorization":"Bearer" + window.localStorage.getItem("accessToekn")
                },
                body: form
            })
            .then(response => response.json());

            console.log("callupdatenoticeapi"+result);

            dispatch({type: PUT_BOARD_POSTING, payload: result})
        }
    }

    export const callDeleteNoticeAPI = ({boardNo}) => {
        const requestURL = `http://localhost:8090/boards/board-all-lists/${boardNo}`;
        
        return async (dispatch, getState) => {
            const result = await fetch(requestURL,{
                method: "DELETE",
                headers:{
                    "Accept":"*/*",
                    "Authorization" : "Bearer"+window.localStorage.getItem("accessToken")
                }
            })
            .then(response => response.json());
            dispatch({type: DELETE_BOARD_NOTICE, payload: result})
        };
    }

    export const callDeletePostingAPIForAdmin = ({boardNo}) => {
        const requestURL = `http://localhost:8090/boards/board-all-lists/${boardNo}`;
        
        return async (dispatch, getState) => {
            const result = await fetch(requestURL,{
                method: "DELETE",
                headers:{
                    "Accept":"*/*",
                    "Authorization" : "Bearer"+window.localStorage.getItem("accessToken")
                }
            })
            .then(response => response.json());
            dispatch({type: DELETE_BOARD_POSTING, payload: result})
        };
    }
    
    export const callDeletePostingAPIForEmp = ({boardNo, empNo}) => {
        const requestURL = `http://localhost:8090/boards/board-posting-lists/${boardNo}/${empNo}`;
        
        return async (dispatch, getState) => {
            const result = await fetch(requestURL,{
                method: "DELETE",
                headers:{
                    "Accept":"*/*",
                    "Authorization" : "Bearer"+window.localStorage.getItem("accessToken")
                }
            })
            .then(response => response.json());
            dispatch({type: DELETE_BOARD_POSTING, payload: result})
        };
    }