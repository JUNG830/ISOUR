import React, { useState } from 'react';
import TeamAPI from '../api/TeamAPI';
import '../CSS/Style_Login.css';
import logo from '../images/logo.png';

function Login() {
  window.localStorage.setItem("isLogin", "FALSE");

  // 키보드 입력
  const [inputId, setInputId] = useState("");
  const [inputPassword, setInputPassoword] = useState("");

  const onChangeId = (e) => {
    // 조혜경 : e.target.value를 변수에 담아 사용하기
    let tmpID = e.target.value;
    setInputId(tmpID);
    
    // console.log("현재 tmpID :  " + tmpID);
    // console.log("현재 id : " + inputId);
  }

  const onChangePw = (e) => {
    // 조혜경 : 비밀번호 정규식
    const passwordRegex = /^(?=.*[a-z])(?=.*[0-9]).{8,25}$/
    
    // 조혜경 : e.target.value를 변수에 담아 사용하기
    let tmpPassword = e.target.value;
    setInputPassoword(tmpPassword);
    
    // console.log("현재 tmpPassword : " + tmpPassword);
    // console.log("현재 Password : " + inputPassword);
  }

  const onClickLogin = async(e) => {
    e.preventDefault();
    console.log("입력한 ID : " + inputId);
    console.log("입력한 Password : " + inputPassword);
    console.log("로그인(SIGN IN) 버튼 눌렀어요.");

    try {
      const res = await TeamAPI.userLogin(inputId, inputPassword);
      // 로그인을 위한 axios 호출
      console.log("호출 TRY: " + res.data.result);

      if(res.data.result === "OK") {
        window.localStorage.setItem("userId", inputId);
        window.localStorage.setItem("userPw", inputPassword);
        window.localStorage.setItem("isLogin", "TRUE");
        window.location.replace("/");
      } else {
        alert("아이디 또는 비밀번호를 확인하세요!");
      }
    } catch (e) {
      alert("오류 발생!! 아이디(" + inputId +")랑 비밀번호("+ inputPassword +")는 일단 넘어와요.");
      console.log("로그인 에러!! 왜 또 안 될까..?");
    }
  }

  return(
    <div className='Container'>
      <div className="Login-card-container">
        <div className="Login-card">
          <div className="Login-card-logo">
            <img src={logo} alt="logo" />
          </div>

          <div className="Login-card-header">
            <h1>Sign In</h1>
            <div>Please login to use platform</div>
          </div>

          <form action="" className="Login-card-form">

            <div className="Form-item">
              <span className="Form-item-icon material-symbols-rounded">mail</span>
              {/* 조혜경 : placeholder 값 변경, onChangeId 오타 수정 */}
              <input type="text" placeholder="Enter ID" value={inputId} onChange={onChangeId} required />
            </div>

            <div className="Form-item">
              <span className="Form-item-icon material-symbols-rounded">lock</span>
              <input type="password" placeholder="Enter Password" value ={inputPassword} onChange={onChangePw} />
            </div>

            <div className="Form-item-other">
              
              {/* 조혜경 : 삭제함 */}
              {/* -------- for -> htmlFor  카멜표기법으로 해야함!!!! */}
          {/* <div className="Checkbox">
                <input type="checkbox" id="rememberMeCheckbox" />
                <label htmlFor="rememberMeCheckbox">Remember me</label>
              </div>  */}
               
              <a href="/">I forgot my password</a>
            </div>

            <button type="submit" onClick={onClickLogin}>Sign In</button>

          </form>

          <div className="Login-card-footer">
            Don't have an account? <a href="/signup">Create a free account</a>.
          </div>

        </div>
        <div className="Login-card-social">
          <div>Other Sign-in Platform</div>

          <div className="Login-card-social-btns">
                  {/* 10/26 -> stroke-line 등등등 카멜표기법으로 변경해야함. */}
            <a href="/">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-facebook" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path>
              </svg>
            </a>

            <a href="/">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-google" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8"></path>
              </svg>
            </a>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;