import { createStore } from 'redux';

function reducer(state,action){
    if (state == undefined) {
      return {
        mode:null
        ,setId:null
        ,setTitle:''
        ,setBody:''
        ,topic: [
          {id:1, title:'첫글', body: '내용 1 ...'}
          ,{id:2, title:'두번째', body: '내용 2 ...'}
          ,{id:3, title:'세번째', body: '내용 3 ...'}
        ]
        ,checkAll: false
        ,setCheckedItem: []
        
      }
    }
    let newState = {...state};

    if (action.type == 'deleteCheckList') {
      console.log(newState.setCheckedItem)
      let topics = newState.topic;
      let checkList = newState.setCheckedItem;
      let newTopic = topics.filter(function(ele,idx){
        return checkList.indexOf(ele.id) == -1;
      })
      newState.topic = newTopic;
      newState.checkAll = false;
    }
    
    //업데이트 폼 보여줌
    if (action.type == 'updateForm') {
      newState.mode = 'updateForm';
      newState.setId = action.id;
      newState.setTitle = action.title;
      newState.setBody = action.body;
    } 
  
    if (action.type == 'updateTopic') {
      let updateValue = {id: action.id, title: action.title, body: action.body};
      newState.mode = '';
      state.topic.map((ele,idx,arr)=>{
        if (ele.id == action.id) {
          newState.topic[idx] = updateValue;
        }
      })
    }
  
    if (action.type == 'createForm') {
      newState.mode = 'createForm';
      newState.setId = null;
      newState.setTitle = '';
      newState.setBody = '';
    }

    if (action.type == 'createTopic') {
      let addTopic = {id: action.id, title: action.title, body: action.body};
      newState.mode = '';
      newState.topic.push(addTopic)
    }

    if (action.type == 'deleteTopic') {
        let newTopicArr = [];
        let newSetCheckedItem = [];

        //체크 되었으나 삭제 된값 제거 
        newSetCheckedItem = newState.setCheckedItem.filter(function(ele,idx){
          return ele != action.id;
        });

        console.log(newSetCheckedItem)
        newState.setCheckedItem = newSetCheckedItem


        state.topic.map((ele,idx,arr)=>{
          //기존 삭제값
          if (action.id == ele.id) {
            console.log(action.id+'제거 idx='+idx);            
          } else {         
            newTopicArr.push({id: ele.id, title: ele.title, body: ele.body});
          }

      
        });
        newState.topic = newTopicArr;
    }

    if (action.type == 'checkAll') {
      if(action.checkAll == true) {
        let topicArr = newState.topic;
        newState.setCheckedItem = [];
       for(let ele of topicArr){
         newState.setCheckedItem = [...newState.setCheckedItem,ele.id]
       }
      } else {
        newState.setCheckedItem = [];
      }
      newState.checkAll = action.checkAll;

    } 

    if (action.type == 'checkBox') {
      let checkValue = Number(action.checkId);
      //체크박스 삭제
      if (newState.setCheckedItem.indexOf(checkValue) != -1) {
          newState.setCheckedItem = newState.setCheckedItem.filter(function(ele,idx){
          return  ele != checkValue;
        })
      } else {
        //추가
        newState.setCheckedItem = [...newState.setCheckedItem,checkValue]
      }
      console.log(newState.setCheckedItem.length)
      console.log(newState.topic.length)
      if (newState.setCheckedItem.length != newState.topic.length) {
        newState.checkAll = false;
      }
    }

    if (action.type == 'resetMode') {
      newState.mode = null;
    }
    console.log(newState)
    return newState;
}
const store = createStore(reducer);

export default store;