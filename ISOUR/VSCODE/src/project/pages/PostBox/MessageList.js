
import { useState, useEffect } from 'react';
import TeamAPI from '../../api/TeamAPI'
import styled from 'styled-components';
import { Link } from "react-router-dom";
import imgHome from '../../images/home_button.png'
import '../../CSS/Style_Login.css';
import './MessageList.css';
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

    const Styled = styled.div`
    overflow: scroll;
    &::-webkit-scrollbar{
      /*가로 스크롤 넓이*/
      width: 8px;
      /*세로 스크롤 넓이*/
      height: 8px;
      
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.4);
    }
    &::-webkit-scrollbar-thumb{
      background-color: rgba(0,0,0,0.3);
      border-radius:6px;
    }
    height: 500px;
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

  const onClickSendMessage = async () => {
    console.log("쪽지 보내기 눌렀어요.");
    inputMessage = prompt("쪽지 내용을 작성하세요.", "");

    if (inputMessage !== "") {
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
    for (let i = 0; i < boxs.length; i++) {
      var chkbox = boxs[i].rows;
      console.log("chkbox : " + chkbox);

      if (chkbox) boxs.deleteRow(i);
      // if(boxs[i] == true) 
    }
  }

  function checkAll(e) {
    let isChecked = e.target.checked;
    console.log("isChecked : " + isChecked); // true
    let boxs = document.getElementsByClassName("checkboxs");
    for (let i = 0; i < boxs.length; i++) {
      boxs[i].checked = isChecked;
    }
  }

  if (loading) {
    return <div>대기 중...</div>
  }

  return (
    <>
      <SignUpModal modalName={name} modalContent={content} show={signUpModalOn} onHide={() => setSignUpModalOn(false)} />
      <div className='Login-Container'>
        {/* 모달 테스트 중 */}

        <div className='outbox'>
          <div className='name'>Post Box</div>
          <Styled>
            <table className='tableContainer'>

              <tr className='tr1'>
                <th className='th1'><input type="checkbox" onClick={checkAll} /></th>
                <th>보낸 사람(NAME)</th>
                <th>내용(CONTENT)</th>
                <th className='th3'>시간(DATETIME)</th>
              </tr>
              {messageList && messageList.map(message => (
                <tr key={message.datetime}>
                  <td><input type="checkbox" className="checkboxs" /></td>
                  <td>{message.name}</td>
                  <td onClick={() => onClickMessage(message.name, message.content)}>{message.content}</td>
                  <td>{message.datetime}</td>
                </tr>
              ))}
            </table>
          </Styled>
          <button className='w-btn-neon2' onClick={onClickSendMessage}>{receiverId}</button>
          <button className='w-btn-neon2' onClick={onClickDelete}>삭제하기</button>
          <span>
            <Link  to="/home" className="link-box">
              <img className="link-img" src={imgHome} alt="HOME" />
              <span> HOME으로 이동 </span>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
export default MessageList;