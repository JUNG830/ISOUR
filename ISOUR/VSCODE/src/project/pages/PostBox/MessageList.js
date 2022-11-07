
import { useState, useEffect } from 'react';
import TeamAPI from '../../api/TeamAPI'
import styled from 'styled-components';
import { Link } from "react-router-dom";
import imgHome from '../../images/home_button.png'
import '../../CSS/Style_Login.css';
import SignUpModal from './SignUpModal'
// import 'bootstrap/dist/css/bootstrap.min.css';

const MessageList = () => {
  const localId = window.localStorage.getItem("userId");

  
  const [messageList, setMessageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  let inputMessage;
  // 테스트중
  
  // const namesList = window.localStorage.getItem("userId");
  // const [namesList , setNamesList ] = useState([]);


  let receiverId = 'dleldi';
  const MemberListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3em;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px) {
      width: 100%;
      padding-left: 1em;
      padding-right:1em;
    }
  `;

  const MemberList = styled.table`
    border-collapse: collapse;
    width: 768px;
    margin: 0 auto;
    font-size: 1.125em;
    @media screen and (max-width: 768px) {
      witdh: 100%;
    }
    th, td {
      border:1px solid #ccc;
      padding: 2px;
    }
    th {
      background-color: bisque;
    }
  `;

  const MemberTitle = styled.table`
    font-size: 2em;
    text-align: center;
  `;

  useEffect(() => {
    const messageData = async () => {
      setLoading(true);
      try {
        const response = await TeamAPI.messageStorage(localId);
        console.log("응답 메시지 : " + response);
        setMessageList(response.data);
        // console.log("response.data : " + response.data);

        window.localStorage.setItem("namesList", response.data);

        // const temp_list = response.data;
        // const testArray = temp_list.map(message => message);
        // console.log("testArray : " + testArray);

        // for(let i=0; i <testArray.length; i++) {
        //   console.log("testArray[" + i + "] : " + testArray[i]);
        // }
        
        // console.log(response.data[0].name);
        // console.log("typeof(response.data) : " + typeof(response.data));

        
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    messageData();
  }, []);

  // 여기부터는 모달 테스트
  const [signUpModalOn, setSignUpModalOn] = useState(false);

  // const testArray = messageList.map(message => message);
  // console.log("testArray : " + testArray);
  // window.localStorage.setItem("userName", memberInfo.name);

  // 여기까지 모달 테스트

  const onClickSendMessage = async() => {
    console.log("쪽지 보내기 눌렀어요.");
    inputMessage = prompt("쪽지 내용을 작성하세요.", "");
    
    if(inputMessage !== "") {
      const messageReg = await TeamAPI.messageReg(localId, receiverId, inputMessage);
      console.log("\n\nlocalId : " + messageReg);
      console.log("받는 사람(receiverId) : " + messageReg.receiverId);
      console.log("inputMessage : " + messageReg.inputMessage);
      alert("쪽지 보내기 완료!")

    } else {
      console.log("오류 발생");
      alert("쪽지 보내기 실패!")
    }

  }

  const onClickMessage = (name, content) => {
    console.log("name : " + name);
    setName(name);

    console.log("content : " + content);
    setContent(content);

    setSignUpModalOn(true);

  }

  const onClickDelete = () => {
    let arryaids = [];
    let boxs = document.getElementsByClassName("checkboxs");
    console.log("boxs : " + boxs);
    console.log("boxs.length : " + boxs.length);

    // let selectedMessage = [];
    for(let i=0; i<boxs.length; i++) {
      var chkbox = boxs[i].rows;
      console.log("chkbox : " + chkbox);

      if(chkbox) boxs.deleteRow(i);
      // if(boxs[i] == true) 
    }
  }

  function checkAll(e) {
    let isChecked = e.target.checked;
    console.log("isChecked : " + isChecked); // true
    let boxs = document.getElementsByClassName("checkboxs");
    for(let i=0; i<boxs.length; i++) {
      boxs[i].checked = isChecked;
    }
  }

  if(loading) {
    return <MemberListBlock>대기 중...</MemberListBlock>
  }

  return(
    <>
      <SignUpModal modalName={name} modalContent={content} show={signUpModalOn} onHide={()=>setSignUpModalOn(false)}/>
      <div className='Container'>
        {/* 모달 테스트 중 */}
        
        <MemberListBlock>
          <MemberList>
            {localId}
            <MemberTitle>받은 쪽지함</MemberTitle>
            <button onClick={onClickSendMessage}>{receiverId}</button>
            <button onClick={onClickDelete}>삭제하기</button>
            <tr>
              <th><input type="checkbox" onClick={checkAll} /></th>
              <th>보낸 사람(NAME)</th>
              <th>내용(CONTENT)</th>
              <th>시간(DATETIME)</th>
            </tr>
            {messageList && messageList.map(message => (
              <tr key={message.datetime}>
                <td><input type="checkbox" className="checkboxs" /></td>
                <td>{message.name}</td>
                <td onClick={()=>onClickMessage(message.name, message.content)}>{message.content}</td>
                <td>{message.datetime}</td>
              </tr>
            ))}
          </MemberList>
          <Link to="/home" className="link-box">
            <img className="link-img" src={imgHome} alt="HOME" />
          <p>HOME으로 이동</p>
          </Link>
        </MemberListBlock>
      </div>
    </>
  );
}
export default MessageList;