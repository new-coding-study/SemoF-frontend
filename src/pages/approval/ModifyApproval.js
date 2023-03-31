import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callApprovModifyAPI, callApprovalDetailAPI } from '../../apis/ApprovalAPICalls';

function ModifyApproval(){
    const dispatch = useDispatch();
    const params = useParams();
    const approvInfo = useSelector(state => state.approvalReducer.approval);

    const [modifyMode, setModifyMode] = useState(false);

    const nav= useNavigate();

    const [approval, setApproval] = useState({});

    useEffect(
        ()=>{
            dispatch(callApprovalDetailAPI({
                approvNo : params.approvNo
            }));
        },[]
    );

    


}