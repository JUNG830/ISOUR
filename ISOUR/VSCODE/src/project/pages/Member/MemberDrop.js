
import { useState, useEffect } from 'react';
import TeamAPI from '../../api/TeamAPI'
import styled from 'styled-components';
import { Link } from "react-router-dom";
import imgHome from '../images/home_button.png'
import Modal from '../../util/Modal';

const MemberDrop = () => {
  const localId = window.localStorage.getItem("userId");
  const isLogin = window.localStorage.getItem("isLogin");
  if(isLogin === "FALSE") window.location.replace("/");

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

  const onChangePassword = e => {
    let temp_password = e.target.value;
    setPassword(temp_password);
  };

  const onTest = async() => {
    var message = "정말로 탈퇴하시겠습니까??";
    let result = window.confirm(message);
    console.log(result);

    if(result) {
      try {
        const res = await TeamAPI.memberDrop(localId, password);
        // 로그인을 위한 axios 호출
        console.log("호출 TRY: " + res.data.result);
  
        if(res.data.result === "OK") {
          console.log("삭제 되였습니다.");
          window.localStorage.setItem("userId", "");
          window.localStorage.setItem("userPw", "");
          window.localStorage.setItem("isLogin", "FALSE");
          alert("콘솔 확인용");
          window.location.replace("/");
        } else {
          alert("비밀번호를 확인하세요.");
        }
      } catch (e) {
        alert("오류 발생!!");
        console.log("탈퇴 에러!! 왜 또 안 될까..?");
      }
      
    } else {
      console.log("탈퇴하는 것을 취소합니다.");
    }
  };

  if(loading) { return <p>대기중...</p> }
  
  return(
    <div className="Container">
      {/* 아이디 */}
      <div className='field-wrap'>
        <div className='input-field'>
          {/* <span style={{display: 'inline-block', width: 150}}>아이디</span> */}
          <p>내 아이디 : {localId}</p>
        </div>
      </div>

      {/* 비밀번호 */}
      <div className='field-wrap'>
        <div className='input-field'>
          <span style={{display: 'inline-block', width: 150}}>비밀번호</span>
          <input type="password" value={password} onChange={onChangePassword} />
        </div>
      </div>

      {/* 탈퇴하기 */}
      <div className='field-wrap'>
        <div className='input-field'>
          <button onClick={onTest}>탈퇴하기</button>
        </div>
      </div>
    </div>
  );
}

export default MemberDrop;