import {
    GET_REPLY,
    POST_REPLY,
    PUT_REPLY,
    DELETE_REPLYFORADMIN,
    DELETE_REPLYFOREMP
} from '../modules/ReplyModule.js';

export const callAllRepliesAPI = ({currentPage, boardNo}) =>{
    let requestURL;

    if(currentPage !== undefined || currentPage !==null){
        requestURL=`http://localhost:8090/replies/all-reply-lists/${boardNo}?offset=${currentPage}`
    } else {
        requestURL = `http://localhost:8090/replies/all-reply-lists/${boardNo}`
    }

    return async(dispatch, getState) =>{
        const result = await fetch(requestURL,{
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
            dispatch({type:GET_REPLY, payload:result.data});
        }
    }
}

export const callRegistReply = ({boardNo, aform, empNo}) => {
    const requestURL = `http://localhost:8090/replies/all-reply-lists`
console.log(aform);
    return async (dispatch, getState) =>{
        const result = await fetch(requestURL,{
            method:"POST",
            headers:{
                "Content-Type" : "application/json",
                "Accept":"*/*",
                "Authorization":"Bearer" + window.localStorage.getItem("accessToken")
            },
            body:JSON.stringify({
                boardNo : boardNo,
                empNo : empNo,
                replyContent : aform
            })
        })
        .then(response => response.json())

        console.log(result)
        dispatch({type:POST_REPLY, payload:result});
    }
}

export const callUpdateReply = ({form, boardNo, empNo, replyCode}) =>{
    const requestURL = `http://localhost:8090/boards/board-posting-lists/${boardNo}/replies/${replyCode}`

    return async(dispatch, getState) => {
        const result = await fetch(requestURL, {
            method:"PUT",
            headers:{
                "Accept": "*/*",
                "Authorization":"Bearer" + window.localStorage.getItem("accessToekn")
            },
            body: form
        })
        .then(response => response.json());

        dispatch({type:PUT_REPLY, payload: result})
    }
}

export const deleteReplyAdmin = ({boardNo, replyCode}) =>{
    const requestURL = `http://localhost:8090/replies/replies-delete-admin/${boardNo}/${replyCode}`

    return async (dispatch,getState) =>{
        const result = await fetch(requestURL,{
            method: "DELETE",
            headers:{
                "Accept":"*/*",
                "Authorization" : "Bearer"+window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());
        dispatch({type:DELETE_REPLYFORADMIN, payload:result})
    };
}
export const deleteReplyEmp = ({replyCode, empNo}) =>{
    const requestURL = `http://localhost:8090/replies/replies-delete-emp/${replyCode}/${empNo}`

    return async (dispatch,getState) =>{
        const result = await fetch(requestURL,{
            method: "DELETE",
            headers:{
                "Accept":"*/*",
                "Authorization" : "Bearer"+window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());
        dispatch({type:DELETE_REPLYFOREMP, payload:result})
    };
}