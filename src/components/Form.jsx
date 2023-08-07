import React, { useEffect, useState } from "react";
import { Provider, useSelector, useDispatch, connect } from 'react-redux';
import Button from '@mui/material/Button';

//생성박스 컴포넌트
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

function Form(){
    //Redux 상태값
    const setTitle = useSelector((state)=>state.setTitle);
    const setBody = useSelector((state)=>state.setBody);
    const mode = useSelector((state) => state.mode);
    let setId = useSelector((state)=>state.setId)


    //form 변경값 체크
    let [changeSetTitle, setChangeTitle] = useState(setTitle);
    let [changeSetBody, setChangeSetBody] = useState(setBody);
    let [chageMode, setMode] = useState(mode);
    let topic = useSelector((state) => state.topic);
    let [open, setOpen] = React.useState(false);
       
    //[setTitle, setBody] 변화 될떄만 렌더링
    useEffect(()=>{
        setChangeTitle(setTitle)
        setChangeSetBody(setBody)
        if (mode == 'createForm' || mode == 'updateForm') {
            setOpen(true)
        }
    },[setTitle, setBody,mode]);

    const dispatch = useDispatch();
 
    const handleClose = ()=> {
        dispatch({type:'resetMode'})
        setOpen(false)
    }
    function submitForm(mode){
        let typeMode = 'updateTopic';
        let e = document.querySelector("#createForm");
    
        if (topic.length == 0) {
            setId = 1;
        }
        if (setId == undefined) {
            //생성시 state 배열의 id 마지막 값 갖고오기
            let lastId = topic[topic.length-1].id; 
            setId = (lastId + 1); 
        }
        if (mode == 'createForm') typeMode = 'createTopic';
        let action = {
            type: typeMode,
            id: setId,
            // title: e.target.title.value,
            title: e.title.value,
            body: e.body.value
        }
        setOpen(false);
        dispatch(action)
    }

    return(
        <div>
            <Dialog  open={open}>
            {/* <Dialog  open={false}> */}
                <DialogTitle>게시글 작성</DialogTitle>
                <DialogContent>
                    <form id="createForm" action=""
                        onSubmit={(e)=>{
                            e.preventDefault();
                            let typeMode = 'updateTopic';
                            if (topic.length == 0) {
                                setId = 1;
                            }
                            if (setId == undefined) {
                                //생성시 state 배열의 id 마지막 값 갖고오기
                                let lastId = topic[topic.length-1].id; 
                                setId = (lastId + 1); 
                            }
                            if (mode == 'createForm') typeMode = 'createTopic';
                            let action = {
                                type: typeMode,
                                id: setId,
                                title: e.target.title.value,
                                body: e.target.body.value
                            }
                            dispatch(action)
                        }}
                    >
                        <p><input type="text" name="title" id="title" value={changeSetTitle} placeholder="title 입력하시오" onChange={(e)=>{
                            setChangeTitle(e.target.value)
                        }}/></p>
                        <p><textarea name="body" id="body" cols="30" rows="10" value={changeSetBody} placeholder="body를 입력하시오" onChange={(e)=>{
                            setChangeSetBody(e.target.value)
                        }}></textarea></p>
                        <p>
                            <DialogActions>
                                <Button onClick={()=>{submitForm( (mode !='updateForm')? 'createForm':'' )}} variant="outlined">{mode == 'updateForm'? '업데이트':'생성'}</Button>
                                <Button onClick={handleClose} variant="outlined">취소</Button>
                            </DialogActions>
                        </p>                
                    </form>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default Form;