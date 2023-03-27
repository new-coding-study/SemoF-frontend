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

    console.log('공지사항 목록')

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
            requestURL= `http://localhost:8090/boards/board-notice-lists?offset=${currentPage}`;
        } else {
            requestURL= `http://localhost:8090/boards/board-notice-lists`;
        }
    
        console.log('공지사항 목록')
    
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
            }
        }
    }
