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
        requestURL=`http://localhost:8090/boards/board-posting-lists/${boardNo}/replies`
    } else {
        requestURL = `http://localhost:8090/boards/board-posting-lists/${boardNo}`
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

export const callRegistReply = ({form, boardNo, empNo}) => {
    const requestURL = `http://localhost:8090/boards/board-posting-lists/${boardNo}/replies`

    return async (dispatch, getState) =>{
        const result = await fetch(requestURL,{
            method:"POST",
            headers:{
                "Accept":"*/*",
                    "Authorization":"Bearer" + window.localStorage.getItem("accessToken")
            },
            body:form
        })
        .then(response => response.json())

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
    const requestURL = `http://localhost:8090/boards/board-posting-lists/${boardNo}/replies-delete-admin/${replyCode}`

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
export const deleteReplyEMP = ({boardNo, replyCode, empNo}) =>{
    const requestURL = `http://localhost:8090/boards/board-posting-lists/${boardNo}/replies-delete-emp/${replyCode}`

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