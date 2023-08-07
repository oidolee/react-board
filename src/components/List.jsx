import React, { useEffect, useState } from "react";
import { Provider, useSelector, useDispatch, connect } from 'react-redux';
import '../styles/List.css'

import Form from "./Form";

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

//삭제 및 수정 아이콘
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';

//테이블 컴포넌트
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

function checkAllbox(e,dispatch){
    let checkBoolean = e.target.checked;
    dispatch({type: 'checkAll', checkAll: checkBoolean})
}  

function Nav(){
    const dispatch = useDispatch();
    const topic = useSelector((state) => state.topic);
    const mode = useSelector((state) => state.mode);
    const checkAll = useSelector((state) => state.checkAll);
    const setCheckedItem = useSelector((state) => state.setCheckedItem);

    function onCheck(e){
        //체크 박스 클릭시 리덕스로 상태값 업데이트 후 isChecked 체크 여부 파악
        let checkBox = e.target;
        //체크된 배열 추가
        if (checkBox.checked) {
            dispatch({type:'checkBox', checkId: checkBox.value , checkBoolean: checkBox.checked})
        } else {
            //체크 해제된 배열 체크
            dispatch({type:'checkBox', checkId: checkBox.value , checkBoolean: checkBox.checked})
        }
    }

    let tableList = [];
    topic.map((ele) => {
        let isChecked = false;
        // 전체체크
        if (checkAll) {
            isChecked = true
        }
        if ( setCheckedItem.indexOf(ele.id) == -1) {
            isChecked = false;
        } else {
            isChecked = true;
        }

        tableList.push(
            <TableRow key={ele.id}>
                {/* 체크박스 */}
                <TableCell style={{width:'50px'}}>
                    <FormControlLabel 
                        control={<Checkbox  name={`list_`+ele.id} value={ele.id} color="primary" onChange={(e)=>{
                            onCheck(e);
                        }} />}
                        checked={isChecked}
                    />
                </TableCell>
                {/* 제목 */}
                <TableCell>
                    <a href="" onClick={(e)=>{
                                    e.preventDefault();
                                    //업데이트 폼 보여줌
                                    dispatch(
                                        {
                                            type:'updateForm',
                                            id: ele.id,
                                            title: ele.title,
                                            body: ele.body,
                                        }
                                    );
                                }}
                    >
                        {ele.title}
                    </a>
                </TableCell>
                {/* 내용 */}
                <TableCell>
                    <a href="" onClick={(e)=>{
                                    e.preventDefault();
                                    //업데이트 폼 보여줌
                                    dispatch(
                                        {
                                            type:'updateForm',
                                            id: ele.id,
                                            title: ele.title,
                                            body: ele.body,
                                        }
                                    );
                                }}
                    >
                        {ele.body}
                    </a>

                </TableCell>
                <TableCell className="buttonTd">
                    <Button variant="outlined" startIcon={<ModeIcon />}
                        onClick={()=>{
                            //업데이트 폼 보여줌
                            dispatch(
                                {
                                    type:'updateForm',
                                    id: ele.id,
                                    title: ele.title,
                                    body: ele.body,
                                }
                            );
                        }}
                    >
                                수정
                    </Button>
                </TableCell>
                <TableCell className="buttonTd">
                    <Button variant="outlined" startIcon={<DeleteIcon />}
                        onClick={()=>{
                            dispatch(
                                {
                                    type: 'deleteTopic',
                                    id: ele.id,
                                }
                            )
                        }}
                    >
                        삭제
                    </Button>
                </TableCell>
            </TableRow>
        )
    })
    return(
        <div>
            <Table size="small" class="tableClass" maxWidth="xl">
                <TableHead>
                    <TableRow>
                    <TableCell>
                    <FormControlLabel 
                        control={<Checkbox id="checkAll" name="checkAll" value="Y" color="primary"/>}
                        onChange={(e)=>{
                            checkAllbox(e,dispatch);
                        }}
                        checked={checkAll}
                    />
                    </TableCell>
                    <TableCell>제목</TableCell>
                    <TableCell>내용</TableCell>
                    <TableCell>
                        {/* create form 보여줌 */}
                        <Button variant="outlined" startIcon={<ModeIcon />}
                            onClick={()=>{
                                dispatch({type:'createForm'})
                            }}
                        >
                            글작성
                        </Button>
                    </TableCell>
                    <TableCell>
                    <Button variant="outlined" startIcon={<DeleteIcon />}
                        onClick={()=>{
                            dispatch({type: 'deleteCheckList'})
                        }}
                    >
                        선택삭제
                    </Button>
                    </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {tableList}
                </TableBody>
            </Table>
            {/* create form 영역 */}
            <Form></Form>
        </div>
    )
}



export default Nav;